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
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
  {
    name: "Brand-Aligned Event Design",
    role: "Singer",
    img: TeamImg2,
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
  {
    name: "Experienced Project Management",
    role: "Content Creator",
    img: TeamImg3,
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
  {
    name: "Transparent Budgeting",
    role: "Speaker",
    img: TeamImg4,
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
  {
    name: "Dedicated Client Support",
    role: "Singer",
    img: TeamImg5,
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
  {
    name: "Global Footprint",
    role: "Content Creator",
    img: TeamImg6,
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
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
                              <Link to="team-details">{member.name}</Link>
                            </h4>
                         
                          </div>
                          <div className="team-one__content-hover">
                            <h4 className="team-one__name-hover">
                              <Link to="team-details">{member.name}</Link>
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
