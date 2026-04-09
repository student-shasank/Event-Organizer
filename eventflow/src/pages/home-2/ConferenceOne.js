// components/ConferenceOne.js
"use client"; // Enable client-side hooks
import ConferencImg1 from '../../assets/images/resources/conference-one-img-1.jpg';
import ConferencImg2 from '../../assets/images/resources/conference-one-img-2.jpg';
import ConferencImg3 from '../../assets/images/resources/conference-one-img-3.jpg';
import ConferencImg4 from '../../assets/images/resources/conference-one-img-4.jpg';
import ConferencImg5 from '../../assets/images/resources/conference-one-img-5.jpg';

import { useState } from 'react';
// data/conferenceData.js
// Updated data/conferenceData.js based on the image
export const conferenceData = [
  {
    step: ' Step 1',
    title: 'Strategic Planning',
    description: 'Deep dive into your goals to craft a tailored roadmap and creative vision.',
    image: ConferencImg1, // Aap apne purane image references yahan rehne de sakte hain
  },
  {
    step: 'Step  2',
    title: 'Budget & Creative Design',
    description: 'Optimized budgeting paired with high-end, brand-aligned aesthetic concepts.',
    image: ConferencImg2,
  },
  {
    step: ' Step 3',
    title: 'Execution & Coordination',
    description: 'Managing seamless travel, vendor coordination, and global supply chains.',
    image: ConferencImg3,
  },
  {
    step: ' Step 4',
    title: 'On-Site Management',
    description: 'Expert on-ground leadership ensuring every detail is delivered flawlessly.',
    image: ConferencImg4,
  },
];

export default function ConferenceOne() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <section className="conference-one">
      <div className="container">
        <div className="section-title text-center">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Our Process</span>
          </div>
          <h2 className="section-title__title section-title__title--two">
            From Vision to a Flawless
            <br /> Event — Every Time
          </h2>
        </div>

        <div className="conference-one__main-tab-box tabs-box">
          {/* Tab Buttons with Step Numbers (01, 02, etc.) */}
          <ul className="tab-buttons clearfix list-unstyled">
            {conferenceData.map((conference, index) => (
              <li
                key={index}
                className={`tab-btn ${activeTab === index ? 'active-btn' : ''}`}
                onClick={() => handleTabClick(index)}
                style={{ cursor: 'pointer' }}
              >
                {/* Circle step number like in the image */}
                <div className="step-circle">
                   <p>{conference.step}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="tabs-content">
            {conferenceData.map((conference, index) => (
             <div 
      key={index} 
      className={`tab ${activeTab === index ? 'active-tab' : ''}`} 
      style={{ display: activeTab === index ? 'block' : 'none' }}
    >
      <div className="conference-one__tab-content-box">
        {/* Image Section */}
        <div className="conference-one__img">
          <img src={conference.image} alt={conference.title} />
        </div>

        <div className="conference-one__tab-content-bottom">
          <div className="row">
            <div className="col-xl-12">
              <div className="conference-one__tab-content-bottom-left">
                {/* Title: Strategic Planning, etc. */}
                <h4 className="conference-one__tab-content-title">
                   {conference.title}
                </h4>
                
                {/* Blue marked area: Address/Date ki jagah ab Description yahan aayega */}
                <div className="conference-one__description-metadata" style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '16px', color: '#666' }}>
                    {conference.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}