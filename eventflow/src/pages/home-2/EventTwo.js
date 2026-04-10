"use client"; // Add this directive at the very top
import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from React Router
import CountUp from 'react-countup';
import EventImg1 from '../../assets/images/resources/Event2image2.jpg';
import EventImg2 from '../../assets/images/resources/Event2image3.JPG';
import eventShape from '../../assets/images/shapes/event-two-shape-1.png';
// data/eventData.js
export const eventData = {
    image1: EventImg1,
    image2: EventImg2,
    trustedCustomerCount: 6.5,
    sectionTitleTagline: 'About our event',
    sectionTitlePart1: 'Celebrate Events.', 
    sectionTitlePart2: 'Celebrate With Us.',
    points: [
      {
        id: 1,
        icon: 'icon-camera-two',
        count: 12,
        label: 'Countries'
      },
      {
        id: 2,
        icon: 'icon-clown',
        count: 17,
        label: 'Years Experience'
      }
    ]
  };
  

export default function EventTwo() {
  return (
    <section id="th-about" className="event-two">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-6 wow slideInLeft"
            data-wow-delay="100ms"
            data-wow-duration="2500ms"
          >
            <div className="event-two__left">
              <div className="event-two__img-box">
                <div className="event-two__img">
                 <img 
                    src={eventData.image1} 
                    alt="Event-1" 
                    style={{ 
                      width: '290px', 
                      height: '505px', 
                      objectFit: 'cover',
                      borderRadius: '20px' 
                    }} 
                  />
                </div>
                <div className="event-two__trusted-customer">
                  <div className="event-two__trusted-customer-icon-and-count-box">
                    <div className="event-two__trusted-customer-icon">
                      <span className="icon-ionic-ios-people"></span>
                    </div>
                    <div className="event-two__trusted-customer-count">
                      <h3 className="odometer">
                        <CountUp end={eventData.trustedCustomerCount * 1000} duration={2.5} />
                      </h3>
                      <span className="event-two__trusted-customer-count-plus">K+</span>
                    </div>
                  </div>
                  <p className="event-two__trusted-customer-text">Trusted Clients</p>
                </div>
                <div className="event-two__img-two">
                <img 
                    src={eventData.image2} 
                    alt="Event-2" 
                    style={{ 
                      width: '310px', 
                      height: '402px', 
                      objectFit: 'cover',
                      borderRadius: '20px'
                    }} 
                  />
                </div>
                <div className="event-two__shape-1 float-bob-y">
                  <img src={eventShape} alt="Shape" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-6 wow fadeInRight"
            data-wow-delay="300ms"
          >
            <div className="event-two__right">
              <div className="section-title text-left">
                <div className="section-title__tagline-box">
                  <span className="section-title__tagline">{eventData.sectionTitleTagline}</span>
                </div>
               <h2 className="section-title__title section-title__title--two">
  {eventData.sectionTitlePart1} 
  <br /> 
  {eventData.sectionTitlePart2}
</h2>
              </div>
              <ul className="list-unstyled event-two__points">
                {eventData.points.map(point => (
                  <li key={point.id}>
                    <div className="event-two__points-icon">
                      <span className={point.icon}></span>
                    </div>
                    <div className="event-two__points-text-box">
                      <div className="event-two__points-count">
                        <h3 className="odometer">
                          <CountUp end={point.count} duration={2.5} />
                        </h3>
                        <span className="event-two__points-count-plus">+</span>
                      </div>
                      <p className="event-two__points-text">{point.label}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="event-two__text">
             Globetrotting Nomads, founded in 2008, has grown into Nomadic Event Pvt Ltd, registered in Goa in 2025 with a UAE office launched in July 2025. We specialize in creating unique global travel and event experiences, offering end-to-end services including planning, travel, visas, logistics, resort stays, venue bookings, and full event execution
              </p>
              <div className="event-two__btn-box">
                <Link to="/about" className="event-two__btn thm-btn">
                    More About Us <span className="icon-arrow-right"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
