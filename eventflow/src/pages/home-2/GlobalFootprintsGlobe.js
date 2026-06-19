"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import * as TWEEN_LIB from '@tweenjs/tween.js';

const TWEEN = TWEEN_LIB.default ?? TWEEN_LIB;

// ─── Data ─────────────────────────────────────────────────────────────────────
const LOCATIONS = [
  { name: 'Bangalore',   lat: 12.9716,  lon: 77.5946,   description: 'India R&D Hub',          flag: '🇮🇳', color: '#ff4d8d' },
  { name: 'California',  lat: 37.7749,  lon: -122.4194, description: 'US Headquarters',         flag: '🇺🇸', color: '#4fc3f7' },
  { name: 'Tokyo',       lat: 35.6895,  lon: 139.6917,  description: 'APAC Center',             flag: '🇯🇵', color: '#ff8a65' },
  { name: 'Malaysia',    lat: 3.1390,   lon: 101.6869,  description: 'SE Asia Gateway',         flag: '🇲🇾', color: '#81c784' },
  { name: 'Thailand',    lat: 13.7563,  lon: 100.5018,  description: 'Bangkok Innovation Hub',  flag: '🇹🇭', color: '#ffb74d' },
  { name: 'Vietnam',     lat: 21.0285,  lon: 105.8542,  description: 'Hanoi Tech Branch',       flag: '🇻🇳', color: '#e57373' },
  { name: 'Sydney',      lat: -33.8688, lon: 151.2093,  description: 'Oceania Operations',      flag: '🇦🇺', color: '#4dd0e1' },
  { name: 'Bali',        lat: -8.4095,  lon: 115.1889,  description: 'Digital Nomad Center',    flag: '🇮🇩', color: '#f06292' },
  { name: 'Baku',        lat: 40.4093,  lon: 49.8671,   description: 'Caspian Region Office',  flag: '🇦🇿', color: '#ba68c8' },
  { name: 'Budapest',    lat: 47.4979,  lon: 19.0402,   description: 'Central Europe Hub',      flag: '🇭🇺', color: '#7986cb' },
  { name: 'Armenia',     lat: 40.1772,  lon: 44.5035,   description: 'Yerevan Tech Lab',        flag: '🇦🇲', color: '#a1887f' },
  { name: 'Dubai',       lat: 25.2048,  lon: 55.2708,   description: 'Middle East Strategy',    flag: '🇦🇪', color: '#ffd54f' },
  { name: 'Amsterdam',   lat: 52.3676,  lon: 4.9041,    description: 'EU Logistics Hub',        flag: '🇳🇱', color: '#4db6ac' },
  { name: 'Switzerland', lat: 46.8182,  lon: 8.2275,    description: 'Finance & Security',      flag: '🇨🇭', color: '#ef5350' },
];

const GLOBE_RADIUS = 10;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function latLonToVector3(lat, lon, radius) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createArc(p1, p2, color) {
  const mid = p1.clone().add(p2).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(GLOBE_RADIUS * 1.55);
  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  const pts   = curve.getPoints(60);
  const geo   = new THREE.BufferGeometry().setFromPoints(pts);
  const mat   = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.5,
  });
  return new THREE.Line(geo, mat);
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ─── Label CSS ────────────────────────────────────────────────────────────────
const LABEL_CSS = `
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  .globe-label {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    background: rgba(8, 3, 25, 0.88);
    border-radius: 9px;
    padding: 6px 11px;
    pointer-events: none;
    backdrop-filter: blur(12px);
    text-align: center;
    white-space: nowrap;
    transition: opacity 0.3s;
  }
  .globe-label .gl-title {
    font-weight: 600;
    font-size: 13px;
    color: #fff;
  }
  .globe-label .gl-desc {
    font-size: 10px;
    color: rgba(255,255,255,0.45);
    margin-top: 2px;
  }
  .globe-label .gl-dot {
    display: inline-block;
    width: 7px; height: 7px;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: -2px;
  }
  .globe-scroll::-webkit-scrollbar { width: 4px; }
  .globe-scroll::-webkit-scrollbar-track { background: transparent; }
  .globe-scroll::-webkit-scrollbar-thumb { background: rgba(180,100,255,0.3); border-radius: 4px; }

  @media (max-width: 600px) {
    .globe-label {
      font-size: 10px;
      padding: 4px 8px;
      border-radius: 7px;
    }
    .globe-label .gl-title {
      font-size: 11px;
    }
    .globe-label .gl-desc {
      font-size: 9px;
    }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Globe3D() {
  const mountRef    = useRef(null);
  const sceneRef    = useRef({});
  const [hoveredIdx,  setHoveredIdx]  = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isMobile,    setIsMobile]    = useState(false);
  const [isTablet,    setIsTablet]    = useState(false);
  const [listOpen,    setListOpen]    = useState(false);

  useEffect(() => {
    const tag = document.createElement('style');
    tag.textContent = LABEL_CSS;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  // ─── Responsive breakpoint detection ───────────────────────────────────────
  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      setIsMobile(w < 480);
      setIsTablet(w >= 480 && w < 900);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    const W = container.clientWidth;
    const H = container.clientHeight;

    // Scene / Camera
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 5, 30);

    // Renderers
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(W, H);
    Object.assign(labelRenderer.domElement.style, {
      position: 'absolute', top: '0', left: '0', pointerEvents: 'none',
    });
    container.appendChild(labelRenderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping    = true;
    controls.dampingFactor    = 0.05;
    controls.minDistance      = 15;
    controls.maxDistance      = 60;
    controls.enableZoom       = false;
    controls.enablePan        = false;
    controls.autoRotate       = true;
    controls.autoRotateSpeed  = 0.35;

    // Lighting — give the globe a coloured mood
    scene.add(new THREE.AmbientLight(0x8888ff, 1.8));
    const sun = new THREE.DirectionalLight(0xffffff, 3.0);
    sun.position.set(10, 10, 10);
    scene.add(sun);
    const rimLight = new THREE.DirectionalLight(0xff3399, 1.2);
    rimLight.position.set(-12, -4, -8);
    scene.add(rimLight);
    const fillLight = new THREE.DirectionalLight(0x4466ff, 0.8);
    fillLight.position.set(0, -10, 0);
    scene.add(fillLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Earth texture
    const loader   = new THREE.TextureLoader();
    const earthTex = loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/land_ocean_ice_cloud_2048.jpg'
    );
    earthTex.colorSpace = THREE.SRGBColorSpace;
    earthTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64),
      new THREE.MeshStandardMaterial({ map: earthTex, roughness: 0.55, metalness: 0.2 })
    ));

    // Atmosphere glow — inner
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.04, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x3366ff, transparent: true, opacity: 0.07, side: THREE.BackSide })
    ));
    // Atmosphere glow — outer
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.14, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x9933ff, transparent: true, opacity: 0.04, side: THREE.BackSide })
    ));

    // Stars
    const sv = [];
    for (let i = 0; i < 14000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      const d = x*x + y*y + z*z;
      if (d > 10000 && d < 800000) sv.push(x, y, z);
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.Float32BufferAttribute(sv, 3));
    scene.add(new THREE.Points(sg, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.18, transparent: true, opacity: 0.75
    })));

    // Hub position = Bangalore
    const hubPos = latLonToVector3(LOCATIONS[0].lat, LOCATIONS[0].lon, GLOBE_RADIUS);

    // Markers + Labels + Arcs
    const pulseData     = [];
    const markerObjects = LOCATIONS.map((loc, i) => {
      const pos   = latLonToVector3(loc.lat, loc.lon, GLOBE_RADIUS);
      const color = new THREE.Color(loc.color);

      // Core dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color })
      );
      dot.position.copy(pos);
      globeGroup.add(dot);

      // Pulse ring A
      const mkRing = (opacity) => {
        const r = new THREE.Mesh(
          new THREE.RingGeometry(0.22, 0.36, 32),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide })
        );
        r.position.copy(pos);
        r.lookAt(new THREE.Vector3(0, 0, 0));
        r.rotateX(Math.PI / 2);
        globeGroup.add(r);
        return r;
      };
      const ringA = mkRing(0.7);
      const ringB = mkRing(0.4);

      pulseData.push(
        { ring: ringA, phase: (i / LOCATIONS.length) * Math.PI * 2 },
        { ring: ringB, phase: (i / LOCATIONS.length) * Math.PI * 2 + Math.PI }
      );

      // Arc line from Bangalore hub
      if (i !== 0) globeGroup.add(createArc(hubPos, pos, loc.color));

      // Label
      const div = document.createElement('div');
      div.className = 'globe-label';
      div.style.borderLeft = `3px solid ${loc.color}`;
      div.innerHTML = `
        <div class="gl-title">
          <span class="gl-dot" style="background:${loc.color};box-shadow:0 0 6px ${loc.color}"></span>
          ${loc.name}
        </div>
        <div class="gl-desc">${loc.description}</div>
      `;
      const label = new CSS2DObject(div);
      label.position.copy(pos.clone().multiplyScalar(1.09));
      globeGroup.add(label);

      return { dot, ringA, ringB, label, localPos: pos };
    });

    // flyToLocation
    function flyToLocation(index) {
      const loc     = LOCATIONS[index];
      const targetY = -(loc.lon + 90) * (Math.PI / 180);
      const targetX =  loc.lat        * (Math.PI / 180);
      const startRot = { x: globeGroup.rotation.x, y: globeGroup.rotation.y };
      const endRot   = { x: targetX, y: targetY };
      const wasAuto  = controls.autoRotate;
      controls.autoRotate = false;
      controls.enabled    = false;
      const tg = new TWEEN.Group();
      new TWEEN.Tween(startRot, tg)
        .to(endRot, 1400)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => {
          globeGroup.rotation.x = startRot.x;
          globeGroup.rotation.y = startRot.y;
        })
        .onComplete(() => {
          controls.enabled    = true;
          controls.autoRotate = wasAuto;
          activeTween = null;
        })
        .start();
      activeTween = tg;
    }
    let activeTween = null;
    sceneRef.current.flyToLocation = flyToLocation;

    // Visibility
    function checkVisibility() {
      const camPos = new THREE.Vector3();
      camera.getWorldPosition(camPos);
      const camDir = camPos.clone().normalize();
      markerObjects.forEach(({ dot, ringA, ringB, label, localPos }) => {
        const worldDir = localPos.clone().applyEuler(globeGroup.rotation).normalize();
        const visible  = camDir.dot(worldDir) > 0.08;
        dot.visible = ringA.visible = ringB.visible = label.visible = visible;
        label.element.style.opacity = visible ? '1' : '0';
      });
    }

    // Loop
    let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      pulseData.forEach(({ ring, phase }) => {
        const p = ((t * 0.7 + phase) % (Math.PI * 2)) / (Math.PI * 2);
        ring.scale.setScalar(1 + p * 2.8);
        ring.material.opacity = (1 - p) * 0.65;
      });
      if (activeTween) activeTween.update();
      controls.update();
      if (!activeTween && controls.autoRotate) globeGroup.rotation.y += 0.0005;
      checkVisibility();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      labelRenderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement))      container.removeChild(renderer.domElement);
      if (container.contains(labelRenderer.domElement)) container.removeChild(labelRenderer.domElement);
    };
  }, []);

  const sel = selectedIdx !== null ? LOCATIONS[selectedIdx] : null;

  // ─── Responsive layout values ───────────────────────────────────────────────
  const panelPadding     = isMobile ? '14px 16px' : isTablet ? '18px 20px' : '22px 24px';
  const panelMaxWidth    = isMobile ? '100%'       : isTablet ? 240         : 285;
  const panelBorderRadius = isMobile ? 14 : 18;
  const panelFontSize    = isMobile ? 17 : 20;
  const panelDescSize    = isMobile ? 11 : 12;
  const panelTagSize     = isMobile ? 9  : 10;
  const panelStatFontSize = isMobile ? 16 : 20;
  const selTitleSize     = isMobile ? 20 : 26;

  // Info panel position: top-left on tablet/desktop, top-center-ish on mobile
  const infoPanelStyle = isMobile ? {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    zIndex: 10,
    padding: panelPadding,
    background: 'rgba(8, 3, 25, 0.78)',
    borderRadius: panelBorderRadius,
    border: '1px solid rgba(180,80,255,0.22)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    maxWidth: '100%',
    boxShadow: '0 0 60px rgba(120,40,255,0.18), 0 8px 40px rgba(0,0,0,0.6)',
  } : {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 10,
    padding: panelPadding,
    background: 'rgba(8, 3, 25, 0.78)',
    borderRadius: panelBorderRadius,
    border: '1px solid rgba(180,80,255,0.22)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    maxWidth: panelMaxWidth,
    boxShadow: '0 0 60px rgba(120,40,255,0.18), 0 8px 40px rgba(0,0,0,0.6)',
  };

  // Destinations list position: bottom on mobile, right side on tablet/desktop
  const listPanelStyle = isMobile ? {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    background: 'rgba(8, 3, 25, 0.92)',
    borderRadius: '18px 18px 0 0',
    border: '1px solid rgba(180,80,255,0.2)',
    borderBottom: 'none',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    padding: '6px',
    maxHeight: listOpen ? '55dvh' : 48,
    overflowY: listOpen ? 'auto' : 'hidden',
    boxShadow: '0 0 60px rgba(120,40,255,0.15), 0 8px 40px rgba(0,0,0,0.6)',
    minWidth: 'unset',
    transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
  } : isTablet ? {
    position: 'absolute',
    top: 24,
    right: 12,
    zIndex: 10,
    background: 'rgba(8, 3, 25, 0.78)',
    borderRadius: 18,
    border: '1px solid rgba(180,80,255,0.2)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    padding: '6px',
    maxHeight: 'calc(100dvh - 48px)',
    overflowY: 'auto',
    boxShadow: '0 0 60px rgba(120,40,255,0.15), 0 8px 40px rgba(0,0,0,0.6)',
    minWidth: 165,
  } : {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 10,
    background: 'rgba(8, 3, 25, 0.78)',
    borderRadius: 18,
    border: '1px solid rgba(180,80,255,0.2)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    padding: '6px',
    maxHeight: 'calc(100vh - 48px)',
    overflowY: 'auto',
    boxShadow: '0 0 60px rgba(120,40,255,0.15), 0 8px 40px rgba(0,0,0,0.6)',
    minWidth: 190,
  };

  return (
    <div style={{
      width: '100vw', height: '100dvh', overflow: 'hidden', position: 'relative',
      background: 'radial-gradient(ellipse 120% 100% at 30% 50%, #0e0530 0%, #05021a 45%, #000008 100%)',
      fontFamily: "'Space Grotesk','Segoe UI',sans-serif",
      color: '#fff',
    }}>
      {/* Three.js canvas */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />

      {/* ── Info Panel ── */}
      <div style={infoPanelStyle}>
        {/* Gradient top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 20, right: 20, height: 2, borderRadius: 2,
          background: 'linear-gradient(90deg,#ff4d8d,#9b4dff,#4d9fff)',
        }} />

        {/* Tag */}
        <div style={{
          fontSize: panelTagSize, letterSpacing: 3, textTransform: 'uppercase',
          fontWeight: 700, marginBottom: isMobile ? 8 : 12,
          background: 'linear-gradient(90deg,#ff4d8d,#9b4dff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Our Global Footprints
        </div>

        {sel ? (
          /* Selected city detail */
          <>
            <div style={{ fontSize: selTitleSize, fontWeight: 700, marginBottom: 4, lineHeight: 1.2 }}>
              {sel.flag} {sel.name}
            </div>
            <div style={{
              display: 'inline-block', marginBottom: isMobile ? 8 : 12,
              fontSize: 11, padding: '3px 10px', borderRadius: 20,
              background: `rgba(${hexToRgb(sel.color)},0.15)`,
              border: `1px solid rgba(${hexToRgb(sel.color)},0.4)`,
              color: sel.color,
            }}>
              {sel.description}
            </div>
            {!isMobile && (
              <div style={{ marginBottom: 16, fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                Click any city on the list to fly to its location on the globe.
              </div>
            )}
            <button
              onClick={() => setSelectedIdx(null)}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.75)', borderRadius: 9,
                padding: isMobile ? '6px 13px' : '7px 16px',
                fontSize: isMobile ? 11 : 12, cursor: 'pointer',
                letterSpacing: 0.5,
              }}
            >
              ← All Destinations
            </button>
          </>
        ) : (
          /* Default overview */
          <>
            <div style={{ fontSize: panelFontSize, fontWeight: 700, lineHeight: 1.35, marginBottom: isMobile ? 6 : 10 }}>
              From Goa to Dubai —{' '}
              <span style={{
                background: 'linear-gradient(90deg,#ff4d8d,#9b4dff)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                world-class events
              </span>
            </div>
            {!isMobile && (
              <div style={{ fontSize: panelDescSize, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 18 }}>
                Curating iconic destination events across 14 cities since 2008.
              </div>
            )}
            {/* Stats */}
            <div style={{ display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', marginTop: isMobile ? 6 : 0 }}>
              {[['500+','Events'],['14','Cities'],['16+','Years']].map(([num, lbl], i) => (
                <div key={lbl} style={{
                  flex: 1, textAlign: 'center', padding: isMobile ? '8px 4px' : '12px 8px',
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  <div style={{
                    fontSize: panelStatFontSize, fontWeight: 700,
                    background: 'linear-gradient(135deg,#ff4d8d,#9b4dff)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{num}</div>
                  <div style={{ fontSize: isMobile ? 9 : 10, color: 'rgba(255,255,255,0.4)', marginTop: 3, letterSpacing: 1 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Destinations List ── */}
      <div
        className="globe-scroll"
        style={listPanelStyle}
      >
        {/* Mobile: tap-to-expand header */}
        <div
          style={{
            fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.3)',
            textAlign: 'center', padding: isMobile ? '10px 12px 8px' : '8px 12px 6px',
            textTransform: 'uppercase', fontWeight: 700,
            cursor: isMobile ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            userSelect: 'none',
          }}
          onClick={() => isMobile && setListOpen(o => !o)}
        >
          Destinations
          {isMobile && (
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s',
              transform: listOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              fontSize: 10,
              color: 'rgba(255,255,255,0.5)',
            }}>▲</span>
          )}
        </div>

        {/* List items — always rendered, hidden via max-height on mobile */}
        <div style={{
          display: isMobile ? 'flex' : 'block',
          flexWrap: isMobile ? 'wrap' : 'unset',
          gap: isMobile ? 4 : 0,
          padding: isMobile ? '0 4px 8px' : 0,
        }}>
          {LOCATIONS.map((loc, idx) => {
            const isHov = hoveredIdx  === idx;
            const isSel = selectedIdx === idx;
            return (
              <div
                key={loc.name}
                style={{
                  padding: isMobile ? '7px 10px' : '9px 14px',
                  borderRadius: 11,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? 6 : 9,
                  color: isSel || isHov ? '#fff' : 'rgba(255,255,255,0.6)',
                  background: isSel
                    ? `rgba(${hexToRgb(loc.color)},0.15)`
                    : isHov ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: isSel
                    ? `1px solid rgba(${hexToRgb(loc.color)},0.45)`
                    : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  flex: isMobile ? '0 0 auto' : 'unset',
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => {
                  setSelectedIdx(idx);
                  sceneRef.current.flyToLocation?.(idx);
                  if (isMobile) setListOpen(false);
                }}
              >
                {/* Glowing dot */}
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: loc.color,
                  boxShadow: isSel || isHov ? `0 0 8px ${loc.color}, 0 0 16px ${loc.color}55` : 'none',
                  transition: 'box-shadow 0.2s',
                }} />
                <span style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1 }}>{loc.flag}</span>
                <span style={{ fontSize: isMobile ? 12 : 13, fontWeight: isSel ? 600 : 400 }}>{loc.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}