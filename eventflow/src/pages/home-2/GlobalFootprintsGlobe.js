import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import * as TWEEN_LIB from '@tweenjs/tween.js';

// Handle both default export styles (CommonJS vs ESM)
const TWEEN = TWEEN_LIB.default ?? TWEEN_LIB;

// ─── Data ────────────────────────────────────────────────────────────────────
const LOCATIONS = [
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946, description: 'Our India R&D Hub' },
  { name: 'California', lat: 37.7749, lon: -122.4194, description: 'Our US Headquarters' },
  { name: 'Tokyo', lat: 35.6895, lon: 139.6917, description: 'Our APAC Center' },
  { name: 'Malaysia', lat: 3.1390, lon: 101.6869, description: 'Our Southeast Asia Gateway' },
  { name: 'Thailand', lat: 13.7563, lon: 100.5018, description: 'Innovation Hub Bangkok' },
  { name: 'Vietnam', lat: 21.0285, lon: 105.8542, description: 'Hanoi Tech Branch' },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, description: 'Oceania Operations' },
  { name: 'Bali', lat: -8.4095, lon: 115.1889, description: 'Digital Nomad Center' },
  { name: 'Baku', lat: 40.4093, lon: 49.8671, description: 'Caspian Region Office' },
  { name: 'Budapest', lat: 47.4979, lon: 19.0402, description: 'Central Europe Hub' },
  { name: 'Armenia', lat: 40.1772, lon: 44.5035, description: 'Yerevan Tech Lab' },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, description: 'Middle East Strategy Center' },
  { name: 'Amsterdam', lat: 52.3676, lon: 4.9041, description: 'EU Logistics Hub' },
  { name: 'Switzerland', lat: 46.8182, lon: 8.2275, description: 'Global Finance & Security' }
];

const GLOBE_RADIUS = 10;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  root: {
    width: '100vw',
    height: '100vh',
    background: '#000',
    fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
  },
  canvasWrapper: {
    position: 'absolute',
    inset: 0,
  },
  infoBox: {
    position: 'absolute',
    top: 24,
    left: 24,
    padding: '18px 22px',
    background: 'rgba(5, 8, 20, 0.72)',
    borderRadius: 14,
    border: '1px solid rgba(120,180,255,0.13)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    maxWidth: 300,
    zIndex: 10,
    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
  },
  infoTitle: {
    margin: '0 0 8px 0',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: '-0.5px',
    color: '#e8f0ff',
  },
  infoSubtitle: {
    margin: 0,
    fontSize: 13,
    color: '#8a9ec9',
    lineHeight: 1.6,
  },
  locationsList: {
    position: 'absolute',
    top: 24,
    right: 24,
    background: 'rgba(5, 8, 20, 0.72)',
    borderRadius: 14,
    border: '1px solid rgba(120,180,255,0.13)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    padding: '8px',
    zIndex: 10,
    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  locationItem: (hovered) => ({
    padding: '11px 20px',
    borderRadius: 9,
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 500,
    color: hovered ? '#a8c8ff' : '#c8d8f8',
    background: hovered ? 'rgba(80,140,255,0.12)' : 'transparent',
    border: hovered ? '1px solid rgba(80,140,255,0.25)' : '1px solid transparent',
    transition: 'all 0.2s ease',
    letterSpacing: '0.01em',
    userSelect: 'none',
  }),
};

// ─── Label DOM styles (injected once via <style>) ─────────────────────────────
const LABEL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap');
  .globe-label {
    color: #e8f0ff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    background: rgba(5, 8, 20, 0.80);
    border: 1px solid rgba(80,140,255,0.28);
    border-radius: 9px;
    padding: 7px 12px;
    pointer-events: none;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    text-align: center;
    transition: opacity 0.3s;
    box-shadow: 0 4px 24px rgba(0,0,0,0.45);
    white-space: nowrap;
  }
  .globe-label .gl-title {
    font-weight: 600;
    font-size: 14px;
    letter-spacing: -0.2px;
  }
  .globe-label .gl-desc {
    font-size: 11px;
    color: #7090c0;
    margin-top: 3px;
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Globe3D() {
  const mountRef = useRef(null);
  const sceneRef = useRef({});
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Inject label CSS once
  useEffect(() => {
    const tag = document.createElement('style');
    tag.textContent = LABEL_CSS;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  // Three.js setup
  useEffect(() => {
    const container = mountRef.current;
    const W = container.clientWidth;
    const H = container.clientHeight;

    // Scene / Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 5, 30);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // CSS2D Renderer (for labels)
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(W, H);
    Object.assign(labelRenderer.domElement.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      pointerEvents: 'none',
    });
    container.appendChild(labelRenderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 15;
    controls.maxDistance = 100;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enablePan = false;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 2.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    // Globe
    const textureLoader = new THREE.TextureLoader();
    const earthTex = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/land_ocean_ice_cloud_2048.jpg'
    );
    earthTex.colorSpace = THREE.SRGBColorSpace;
    earthTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64),
      new THREE.MeshStandardMaterial({ map: earthTex, roughness: 0.7, metalness: 0.1 })
    );
    // Globe + markers all go inside globeGroup so rotation animates everything together
    const globeGroup = new THREE.Group();
    globeGroup.add(globe);
    scene.add(globeGroup);

    // Stars
    const starVerts = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      const d = x * x + y * y + z * z;
      if (d > 10000 && d < 800000) starVerts.push(x, y, z);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.8 })
      )
    );


    // Markers + Labels (added to globeGroup so they rotate with the globe)
    const markerObjects = LOCATIONS.map((loc) => {
      // Position in LOCAL space (before any group rotation)
      const pos = latLonToVector3(loc.lat, loc.lon, GLOBE_RADIUS);

      const markerMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x4f8cff })
      );
      markerMesh.position.copy(pos);
      globeGroup.add(markerMesh);

      // Glow ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.18, 0.28, 32),
        new THREE.MeshBasicMaterial({ color: 0x4f8cff, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
      );
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      ring.rotateX(Math.PI / 2);
      globeGroup.add(ring);

      const div = document.createElement('div');
      div.className = 'globe-label';
      div.innerHTML = `<div class="gl-title">${loc.name}</div><div class="gl-desc">${loc.description}</div>`;
      const label = new CSS2DObject(div);
      label.position.copy(pos);
      globeGroup.add(label);

      // Store original local-space position for visibility check
      return { markerMesh, ring, label, localPos: pos };
    });

    // ── flyToLocation: rotate the globeGroup so the chosen city faces the camera ──
   // ── flyToLocation: Align the globe so the marker is dead-center ──
    function flyToLocation(index) {
      const loc = LOCATIONS[index];
      
      // Convert Lat/Lon to the rotation values needed to face the camera
      // We use Math.PI / 2 offset because of how Three.js spheres are mapped
      const targetY = -(loc.lon + 90) * (Math.PI / 180);
      const targetX = (loc.lat) * (Math.PI / 180);

      // Current rotation state
      const startRot = {
        x: globeGroup.rotation.x,
        y: globeGroup.rotation.y
      };

      // Destination rotation state
      // We use a small trick to ensure it takes the shortest path
      const endRot = {
        x: targetX,
        y: targetY
      };

      // Stop current animations/auto-rotate
      const wasAutoRotate = controls.autoRotate;
      controls.autoRotate = false;
      controls.enabled = false;

      const tweenGroup = new TWEEN.Group();

      new TWEEN.Tween(startRot, tweenGroup)
        .to(endRot, 1200) // Duration in ms
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => {
          globeGroup.rotation.x = startRot.x;
          globeGroup.rotation.y = startRot.y;
        })
        .onComplete(() => {
          controls.enabled = true;
          controls.autoRotate = wasAutoRotate;
          activeTweenGroup = null;
        })
        .start();

      activeTweenGroup = tweenGroup;
    }

    let activeTweenGroup = null;

    // Expose flyToLocation so React UI can call it
    sceneRef.current.flyToLocation = flyToLocation;

    // Visibility check — uses world position of each marker
    function checkVisibility() {
      const camPos = new THREE.Vector3();
      camera.getWorldPosition(camPos);
      const camDir = camPos.clone().normalize();

      markerObjects.forEach(({ markerMesh, ring, label, localPos }) => {
        // Convert local pos to world
        const worldPos = localPos.clone().applyEuler(globeGroup.rotation);
        const markerDir = worldPos.clone().normalize();
        const dot = camDir.dot(markerDir);
        const visible = dot > 0.05; // in front of globe
        markerMesh.visible = visible;
        ring.visible = visible;
        label.visible = visible;
        label.element.style.opacity = visible ? '1' : '0';
      });
    }

    // Animation loop
    let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);
      if (activeTweenGroup) activeTweenGroup.update();
      controls.update();
      // Globe auto-spin only when not tweening
      if (!activeTweenGroup && controls.autoRotate) {
        globeGroup.rotation.y += 0.0005;
      }
      checkVisibility();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    }
    animate();

    // Resize handler
    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      labelRenderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      activeTweenGroup = null;
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      if (container.contains(labelRenderer.domElement)) container.removeChild(labelRenderer.domElement);
    };
  }, []);

  return (
    <div style={styles.root}>
      {/* Three.js canvas mount point */}
      <div ref={mountRef} style={styles.canvasWrapper} />

      {/* Info box */}
      <div style={styles.infoBox}>
        <h1 style={styles.infoTitle}>Our Global Offices</h1>
        <p style={styles.infoSubtitle}>
          Click a location on the right to focus, or drag the globe to explore.
        </p>
      </div>

      {/* Locations list */}
      <div style={styles.locationsList}>
        {LOCATIONS.map((loc, idx) => (
          <div
            key={loc.name}
            style={styles.locationItem(hoveredIdx === idx)}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => sceneRef.current.flyToLocation?.(idx)}
          >
            {loc.name}
          </div>
        ))}
      </div>
    </div>
  );
}