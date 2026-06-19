"use client";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import SchedulImg1 from '../../assets/images/resources/Business Conferences & seminars image.jpg';
import SchedulImg2 from '../../assets/images/resources/Annual General Meetings image.jpg';
import SchedulImg3 from '../../assets/images/resources/Corporate Meetings & Executive Summits image.jpg';
import SchedulImg4 from '../../assets/images/resources/Team Building Programs image.jpg';
import SchedulImg5 from '../../assets/images/resources/Leadership & Development Workshops image.jpg';
import SchedulImg6 from '../../assets/images/resources/Brand & Marketing Training Events image.jpg';
import SchedulImg7 from '../../assets/images/resources/Corporate Gala Nights & Parties image.jpg';
import SchedulImg8 from '../../assets/images/resources/Award.jpg';
import SchedulImg9 from '../../assets/images/resources/Product Launches & Brand Activations image.jpg';

const tabsData = [
    {
        id: '1st-day',
        label: 'Conferences & Seminars',
        events: [
            {
                image: SchedulImg1,
                title: 'Business Conferences & Seminars',
                description: 'From intimate boardroom discussions to large-scale industry conferences, we deliver seamless, high-impact events that drive meaningful conversations.',
                location: 'Goa, India',
                attendees: '600+ Attendees',
            },
            {
                image: SchedulImg2,
                title: 'Annual General Meetings (AGM)',
                description: 'Professional AGM management with precise logistics, AV support, and executive coordination — ensuring every stakeholder engagement is flawless.',
                location: 'Dubai, UAE',
             attendees: '800+ Attendees',
            },
            {
                image: SchedulImg3,
                title: 'Corporate Meetings & Executive Summits',
                description: 'Curated executive summits that combine world-class venues, premium hospitality, and strategic agenda design for impactful leadership gatherings.',
                location: 'Budapest, Hungary',
                attendees: '2000+ Attendees',
            },
        ],
    },
    {
        id: '2nd-day',
        label: 'Workshops & Training Sessions',
        events: [
            {
                image: SchedulImg4,
                title: 'Team-Building Programs',
                description: 'Dynamic team-building workshops designed to strengthen collaboration, boost morale, and create lasting bonds among your workforce.',
                location: 'Bali, Indonesia',
               attendees: '600+ Attendees',
            },
            {
                image: SchedulImg5,
                title: 'Leadership & Development Workshops',
                description: 'Empowering training sessions that sharpen leadership skills, drive professional growth, and align teams with your company vision.',
                location: 'Thailand',
             attendees: '500+ Attendees',
            },
            {
                image: SchedulImg6,
                title: 'Brand & Marketing Training Events',
                description: 'Engaging roadshows and brand activation workshops that energize your marketing teams and align brand messaging across regions.',
                location: 'Malaysia',
               attendees: '500+ Attendees',
            },
        ],
    },
    {
        id: '3rd-day',
        label: 'Company Parties & Celebrations',
        events: [
            {
                image: SchedulImg7,
                title: 'Corporate Gala Nights & Parties',
                description: 'Spectacular gala evenings with premium décor, entertainment, and dining — creating unforgettable nights that celebrate your team\'s achievements.',
                location: 'Dubai, UAE',
               attendees: '600+ Attendees',
            },
            {
                image: SchedulImg8,
                title: 'Award & Recognition Ceremonies',
                description: 'Prestigious award ceremonies crafted to honour excellence, inspire performance, and celebrate milestones with elegance and style.',
                location: 'Amsterdam, Netherlands',
                attendees: '500+ Attendees',
            },
            {
                image: SchedulImg9,
                title: 'Product Launches & Brand Activations',
                description: 'High-energy product launch events that create buzz, engage your audience, and put your brand in the spotlight on a global stage.',
                location: 'Baku, Azerbaijan',
               attendees: '500+ Attendees',
            },
        ],
    },
];

const EventCard = ({ image, title, description, location, attendees }) => (
    <div className="schedule-two__sinlge">
        <div className="row">
            <div className="col-xl-4 col-lg-4">
                <div className="schedule-two__img">
                    <img src={image} alt={title}  />
                </div>
            </div>
            <div className="col-xl-8 col-lg-8">
                <div className="schedule-two__right">
                    <div className="schedule-two__right-content">
                        <h4 className="schedule-two__title">
                            <Link to="">{title}</Link>
                        </h4>
                        <p className="schedule-two__text">{description}</p>
                    </div>
                    <ul className="list-unstyled schedule-two__address">
                        <li>
                            <div className="icon"><span className="icon-pin"></span></div>
                            <div className="text"><p>{location}</p></div>
                        </li>
                       <li>
    <div className="icon"><span className="icon-user"></span></div>
    <div className="text"><p>{attendees}</p></div>
</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const ScheduleTwo = () => {
    const [activeTab, setActiveTab] = useState(tabsData[0].id);

    return (
        <section id="th-event" className="schedule-two">
            <div className="container">
                <div className="schedule-one__inner">
                    <div className="section-title text-left">
                        <div className="section-title__tagline-box">
                            <span className="section-title__tagline">Event Portfolio</span>
                        </div>
                        <h2 className="section-title__title section-title__title--two">
                            Our Events & Services
                        </h2>
                    </div>

                    <div className="schedule-two__main-tab-box tabs-box">
                        <div className="tabs-content">

                            <ul className="tab-buttons clearfix list-unstyled" style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px', flexWrap: 'nowrap' }}>
                                {tabsData.map((tab) => (
                                    <li
                                        key={tab.id}
                                        style={{ flex: 1, textAlign: 'center' }}
                                        className={`tab-btn ${activeTab === tab.id ? 'active-btn' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <h3>{tab.label}</h3>
                                    </li>
                                ))}
                            </ul>

                            {tabsData.map((tab) => (
                                <div
                                    key={tab.id}
                                    className={`tab ${activeTab === tab.id ? 'active-tab' : ''}`}
                                    id={tab.id}
                                >
                                    <div className="schedule-two__tab-content-box">
                                        {tab.events.map((event, index) => (
                                            <EventCard key={index} {...event} />
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleTwo;