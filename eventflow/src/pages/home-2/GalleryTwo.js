'use client';
import React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import galleryImg1 from '../../assets/images/gallery/our gallery.JPG';
import galleryImg2 from '../../assets/images/gallery/ourgallery2.JPG';
import galleryImg3 from '../../assets/images/gallery/ourgallery3.JPG';
import galleryImg4 from '../../assets/images/gallery/ourgallery4.JPG';
import galleryImg5 from '../../assets/images/gallery/ourgallery5.jpg';
import galleryImg6 from '../../assets/images/gallery/ourgallery6.jpg';
import galleryImg7 from '../../assets/images/gallery/ourgallery7.jpg';
import galleryImg8 from '../../assets/images/gallery/ourgallery8.JPG';
import galleryImg9 from '../../assets/images/gallery/ourgallery9.jpg';


const galleryItems = [
    { image: galleryImg1, title: "Elite Event Management", subtitle: "Dream Event" },
    { image: galleryImg2, title: "Elite Event Management", subtitle: "Dream Event" },
    { image: galleryImg3, title: "Elite Event Management", subtitle: "Dream Event" },
    { image: galleryImg4, title: "Elite Event Management", subtitle: "Dream Event" },
    { image: galleryImg5, title: "Elite Event Management", subtitle: "Dream Event" },
    { image: galleryImg6, title: "Elite Event Management", subtitle: "Dream Event" },
    { image: galleryImg7, title: "Elite Event Management", subtitle: "Dream Event" },
    { image: galleryImg8, title: "Elite Event Management", subtitle: "Dream Event" },
     { image: galleryImg9, title: "Elite Event Management", subtitle: "Dream Event" },
];

const commonBreakpoints = {
    0:    { slidesPerView: 1 },
    768:  { slidesPerView: 2 },
    1200: { slidesPerView: 4 },
};

const renderSlides = () =>
    galleryItems.map((item, index) => (
        <SwiperSlide key={index}>
            <div className="gallery-two__single">
                <div
                    className="gallery-two__img"
                    style={{ height: '502px', width: '100%', overflow: 'hidden', borderRadius: '20px' }}
                >
                    <img
                        src={item.image}
                        alt={item.subtitle}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* <div className="gallery-two__content">
                        <div className="gallery-two__sub-title-box">
                            <div className="gallery-two__sub-title-shape"></div>
                            <p className="gallery-two__sub-title">{item.subtitle}</p>
                        </div>
                        <h4 className="gallery-two__title">
                            <a href="#">{item.title}</a>
                        </h4>
                    </div> */}
                </div>
            </div>
        </SwiperSlide>
    ));

export default function GalleryTwo() {
    return (
        <section className="gallery-two">

            {/* ✅ TOP SECTION — Heading */}
            <div className="gallery-two__top">
                <div className="container">
                    <div className="gallery-two__top-inner">
                        <div className="section-title text-left">
                            <div className="section-title__tagline-box">
                                <span className="section-title__tagline">
                                    MOMENTS WE'VE CRAFTED
                                </span>
                            </div>
                            <h2 className="section-title__title section-title__title--two">
                                Capturing World-Class Events
                                <br />
                                Across the Globe
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ CAROUSEL 1 — Left to Right */}
            <div className="gallery-two__bottom" style={{ marginBottom: '30px' }}>
                <div className="container">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        speed={4000}
                        loop={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        breakpoints={commonBreakpoints}
                    >
                        {renderSlides()}
                    </Swiper>
                </div>
            </div>

            {/* ✅ CAROUSEL 2 — Right to Left */}
            <div className="gallery-two__bottom">
                <div className="container">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        speed={4000}
                        loop={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            reverseDirection: true,
                        }}
                        breakpoints={commonBreakpoints}
                    >
                        {renderSlides()}
                    </Swiper>
                </div>
            </div>

        </section>
    );
}