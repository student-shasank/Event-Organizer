'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import testimonialImg1 from '../../assets/images/testimonial/priyasharma.webp'
import testimonialImg2 from '../../assets/images/testimonial/testimonial-one-client-1-2.jpg'
import testimonialImg3 from '../../assets/images/testimonial/testimonial-one-client-1-3.jpg'
import testimonialImg4 from '../../assets/images/testimonial/testimonial-one-client-1-4.jpg'
import { Link } from "react-router-dom"


const testimonials = [
    {
        name: "Priya Sharma",
        role: "Corporate Travel Manager",
        text: "Globetrotting Nomads organized our entire annual company retreat across three countries. The seamless coordination and attention to detail were truly world-class. Our team still talks about it!",
        image: testimonialImg1
    },
    {
        name: "Ahmed Al-Rashid",
        role: "CEO, Dubai Tech Group",
        text: "Since their UAE office opened, working with Nomadic Event has been effortless. They understood our culture, our expectations, and delivered a luxury incentive trip beyond anything we imagined.",
        image: testimonialImg2
    },
    {
        name: "Sophie Leclerc",
        role: "Wedding Planner, Paris",
        text: "I've collaborated with many travel firms, but Globetrotting Nomads stands apart. Their 15+ years of experience shows in every small detail — from destination selection to on-ground execution.",
        image: testimonialImg3
    },
    {
        name: "Rajan Mehta",
        role: "Director, Goa Tourism Board",
        text: "Having them registered right here in Goa is a point of pride for us. Nomadic Event brings international standards to Indian hospitality — a genuine gem in our event management ecosystem.",
        image: testimonialImg4
    },
    {
        name: "Lena Hoffmann",
        role: "HR Director, Berlin",
        text: "Our employees returned from the retreat inspired and connected. Globetrotting Nomads curated an experience that blended adventure and culture perfectly — exactly what we asked for.",
        image: testimonialImg4
    },
    {
        name: "Carlos Mendoza",
        role: "Event Coordinator, Mexico City",
        text: "From first contact to the final farewell, every touchpoint was handled with professionalism. Their passion for creating transformative experiences is evident and infectious.",
        image: testimonialImg4
    },
];

export default function Testimonial() {
    const enableLoop = testimonials.length > 2; // Enable loop if there are more than 2 slides

    return (
        <section id="th-testimonials" className="testimonial-one">
            <div className="container">
                <div className="section-title text-center">
                    <div className="section-title__tagline-box">
                        <span className="section-title__tagline">Client Testimonials</span>
                    </div>
                    <h2 className="section-title__title section-title__title--two">
                       Trusted by Travelers & Corporates Worldwide
                    </h2>
                </div>
                <div className="testimonial-one__carousel-box">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        slidesPerView={1}
                        spaceBetween={0}
                        speed={2000}
                        loop={enableLoop} // Conditionally enable loop
                        autoplay={{ delay: 9000 }}
                        pagination={{
                            el: ".swiper-dot-style1",
                            type: "bullets",
                            clickable: true
                        }}
                        navigation={{
                            nextEl: '.swiper-button-prev1',
                            prevEl: '.swiper-button-next1',
                        }}
                        breakpoints={{
                            0: { spaceBetween: 0, slidesPerView: 1 },
                            375: { spaceBetween: 0, slidesPerView: 1 },
                            575: { spaceBetween: 0, slidesPerView: 1 },
                            768: { spaceBetween: 30, slidesPerView: 2 },
                            992: { spaceBetween: 30, slidesPerView: 2 },
                            1200: { spaceBetween: 30, slidesPerView: 2 },
                            1320: { spaceBetween: 30, slidesPerView: 2 },
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimonial-one__single">
                                    <div className="testimonial-one__client-info-and-review">
                                        <div className="testimonial-one__client-info">
                                            <div className="testimonial-one__client-img">
    <img 
        src={testimonial.image} 
        alt={testimonial.name}
        style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            objectFit: 'cover',
            objectPosition: 'center'
        }} 
    />
</div>
                                            <div className="testimonial-one__client-content">
                                                <h4 className="testimonial-one__client-name">
                                                    <Link to="/">{testimonial.name}</Link>
                                                </h4>
                                                <p className="testimonial-one__sub-title">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <div className="testimonial-one__review">
                                            {[...Array(4)].map((_, i) => (
                                                <span className="icon-star" key={i}></span>
                                            ))}
                                            <span className="icon-star clr-start"></span>
                                        </div>
                                    </div>
                                    <p className="testimonial-one__text">{testimonial.text}</p>
                                    <div className="testimonial-one__quote">
                                        <span className="icon-quote"></span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="testimonial-one__nav">
                        <div className="swiper-button-next1">
                            <i className="icon-angle-left"></i>
                        </div>
                        <div className="swiper-button-prev1">
                            <i className="icon-angle-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
