import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from React Router
export const servicesData = [
  {
    id: 1,
    title: <>Brand & Marketing <br /> Events</>,
    link: "/elite-event-management",
    icon: "icon-theater",
    delay: "100ms",
    points: [
      "Product Launches",
      "Brand Activations",
      "Roadshows & Promos"
    ]
  },
  {
    id: 2,
    title: <>Employee Engagement <br /> Events</>,
    link: "/dream-event-planners",
    icon: "icon-magic-show",
    delay: "200ms",
    points: [
      "Corporate Gala Nights",
      "Team-Building Programs",
      "Award Ceremonies"
    ]
  },
  {
    id: 3,
    title: <>Corporate Events & <br /> Summits</>,
    link: "/event-prodigy",
    icon: "icon-location",
    delay: "300ms",
    points: [
      "Conferences & Seminars",
      "Annual General Meetings",
      "Executive Summits"
    ]
  }
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
                  <span className={service.icon}></span>
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
                <Link to={service.link} className="services-two__btn">
                    Read More <span className="icon-arrow-right"></span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
