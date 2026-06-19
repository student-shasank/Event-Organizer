"use client";
import React from "react"; // Add useState here
import { Link } from 'react-router-dom'; // Use react-router-dom for routing.
import TeamImg1 from '../../assets/images/team/whychooseus1.png'
import TeamImg2 from '../../assets/images/team/whychooseus2.png'
import TeamImg3 from '../../assets/images/team/whychooseus3.png'
import TeamImg4 from '../../assets/images/team/whychooseus7.png'
import TeamImg5 from '../../assets/images/team/whychooseus5.png'
import TeamImg6 from '../../assets/images/team/whychooseus6.png'

const teamMembers = [
  {
    name: "Corporate-Focused Expertise",
    role: "Speaker",
    img: TeamImg1,
    description:
      "Specialized in delivering professional corporate events that align with business goals, company culture, and audience expectations.",
  },
  {
    name: "Brand-Aligned Event Design",
    role: "Singer",
    img: TeamImg2,
    description:
      "Every event is thoughtfully designed to reflect your brand identity, messaging, and values for a consistent experience.",
  },
  {
    name: "Experienced Project Management Team",
    role: "Content Creator",
    img: TeamImg3,
    description:
      "Our skilled project managers oversee every detail, ensuring seamless planning, coordination, and successful event delivery.",
  },
  {
    name: "Timely & Hassle-Free Execution",
    role: "Speaker",
    img: TeamImg4,
    description:
      "From setup to completion, we handle logistics efficiently so your event runs smoothly and on schedule.",
  },
  {
    name: "Transparent Budgeting",
    role: "Singer",
    img: TeamImg5,
    description:
      "Clear pricing, detailed cost breakdowns, and budget-conscious planning help you stay informed throughout the process.",
  },
  {
    name: "Dedicated Client Support",
    role: "Content Creator",
    img: TeamImg6,
    description:
      "Receive personalized assistance and responsive communication from a dedicated team committed to your event’s success.",
  },
];
export default function Home() {
  return (

          <section className="team-page">
            <div className="container">
               <div className="section-title text-center">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Why Choose Us</span>
          </div>
          <h2 className="section-title__title section-title__title--two">
          Building Relationships

<br />  Driving Results
          </h2>
        </div>
              <div className="row">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className={`col-xl-4 col-lg-6 col-md-6 wow fadeIn${
                      index % 2 === 0 ? "Left" : "Right"
                    }`}
                    data-wow-delay={`${(index + 1) * 100}ms`}
                  >
                    <div className="team-one__single">
                      <div className="team-one__img-box">
                        <div className="team-one__img">
                          <img src={member.img} alt={member.name} />
                          <div className="team-one__content">
                            <h4 className="team-one__name">
                              <Link to="/">{member.name}</Link>
                            </h4>
                         
                          </div>
                          <div className="team-one__content-hover">
                            <h4 className="team-one__name-hover">
                              <Link to="/">{member.name}</Link>
                            </h4>
                            
                            <p className="team-one__text-hover">
                              {member.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


  );
}
