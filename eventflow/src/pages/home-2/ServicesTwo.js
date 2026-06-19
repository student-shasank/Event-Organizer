import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from React Router
import Event from "../../assets/images/backgrounds/event.svg"
export const servicesData = [
  {
    id: 1,
    title: <>Corporate Events</>,
    link: "/",
    icon: "icon-location",
    delay: "300ms",
    points: [
      "Business Conferences & Seminars",
      "Annual General Meetings (AGM)",
      "Corporate Meetings & Executive Summits"
    ]
  },
  {
    id: 2,
    title: <>Employee Engagement <br /> Events</>,
    link: "/",
    icon: Event,
    delay: "200ms",
    points: [
      "Corporate Parties & Gala Nights",
      "Team-Building Programs",
      "Award & Recognition Ceremonies"
    ]
  },
  {
    id: 3,
    title: <>Brand & Marketing <br /> Events</>,
    link: "/",
    icon: "icon-theater",
    delay: "100ms",
    points: [
      "Product Launches",
      "Brand Activations",
      "Roadshows & Promotional Events"
    ]
  },
];
   // Adjust the path according to your project structure

export default function ServicesTwo() {
  return (
    <section id="th-service" className="services-two">
      <div className="container">
        <div className="section-title text-center">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Our Services</span>
          </div>
          <h2 className="section-title__title section-title__title--two">
           Explore What We Do
<br />  For Your Brand 
          </h2>
        </div>
        <div className="row">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`col-xl-4 col-lg-4 wow fadeIn${service.delay === '100ms' ? 'Left' : service.delay === '200ms' ? 'Up' : 'Right'}`}
              data-wow-delay={service.delay}
            >
              <div className="services-two__single">
                <div className="services-two__icon">
  {service.icon.toString().startsWith('icon-') 
    ? <span className={service.icon}></span>
    : <img src={service.icon} alt="icon" width={45} height={45} style={{filter: 'brightness(0) invert(1)'}} />
  }
</div>
                <h3 className="services-two__title">
                  <Link to={service.link}>
                    {service.title}
                  </Link>
                </h3>
               <ul className="services-two__text">
  {service.points.map((point, index) => (
    <li key={index}>→ {point}</li>
  ))}
</ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
