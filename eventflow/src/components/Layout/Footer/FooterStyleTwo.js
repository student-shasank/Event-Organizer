import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Import images
import footerLogo from '../../../assets/images/resources/logo-1.png';
import footerLogo2 from '../../../assets/images/resources/logo2.png';

const FooterTwo = () => {
    const location = useLocation();

    // Home page check
    const isHomePage =
        location.pathname === '/home' || location.pathname === '/';

    // Contact page check
    const isContactPage =
        location.pathname === '/contact' ||
        location.pathname === '/contact-us' ||
        location.pathname.includes('contact');

    // Dynamic logo
    const currentLogo = isContactPage ? footerLogo : footerLogo2;

    // Dynamic CSS with !important for home page
    const footerStyles = `
        ${isHomePage ? `
            .site-footer-two {
                color: black !important;
                background-color: #f8f8f8 !important;
            }

            .site-footer-two h3 {
                color: black !important;
            }

            .site-footer-two a {
                color: black !important;
            }

            .site-footer-two li {
                color: black !important;
            }

            .footer-widget__title {
                color: black !important;
            }

            .footer-widget-two__about-text {
                color: black !important;
            }

            .footer-widget-two__newsletter-text {
                color: black !important;
            }

            .address_t p {
                color: black !important;
            }

            .site-footer-two__top-content {
                background-color: white !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
                color: black !important;
            }

            .site-footer-two__top-content span,
            .site-footer-two__top-content i {
                color: #c622a8 !important;
            }

            .site-footer-two__social a,
            .site-footer-two__social i {
                color: white !important;
            }

            .site-footer-two__bottom-text,
            .site-footer-two__bottom-menu,
            .site-footer-two__bottom-menu li,
            .site-footer-two__bottom-menu a {
                color: white !important;
            }
        ` : ''}
    `;

    const contactDetails = {
        email: [
            "sheldon@gtnomads.com",
            "andre@gtnomads.com"
        ],
        address: "O-303, Roshina Enclave, Margao, Goa",
        phone: [
            "91 9822980756",
            "91 9822959761"
        ],
    };

    return (
        <>
            <style>{footerStyles}</style>

            <footer className="site-footer-two">
                <div className="site-footer-two__top">
                    <div className="container">
                        <div className="site-footer-two__top-inner">
                            <Link to="/#events" className="site-footer-two__top-content">
                                Explore <span>Events</span>
                                <i className="icon-arrow-up"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="site-footer-two__middle">
                    <div className="container">
                        <div className="site-footer-two__middle-inner">
                            <div className="row">

                                {/* About */}
                                <div
                                    className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                                    data-wow-delay="100ms"
                                >
                                    <div className="footer-widget__column footer-widget-two__about">
                                        <div className="site-footer-two__logo">
                                            <Link to="/">
                                                <img
                                                    src={currentLogo}
                                                    alt="GT Nomads"
                                                    style={{ width: "180px" }}
                                                />
                                            </Link>
                                        </div>

                                        <p className="footer-widget-two__about-text">
                                            Nomadic Event Pvt Ltd — curating bespoke journeys
                                            and world-class events since 2008 Registered in Goa,
                                            India with overseas offices in UAE.
                                        </p>

                                        <div className="site-footer-two__social">
                                            <Link to="#">
                                                <i className="icon-facebook"></i>
                                            </Link>

                                            <Link to="#">
                                                <i className="icon-fi"></i>
                                            </Link>

                                            <Link to="#">
                                                <i className="icon-instagram"></i>
                                            </Link>

                                            <Link to="#">
                                                <i className="icon-pinterest"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div
                                    className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                                    data-wow-delay="300ms"
                                >
                                    <div className="footer-widget__column footer-widget__contact">
                                        <div className="footer-widget__title-box">
                                            <h3 className="footer-widget__title">
                                                Contact
                                            </h3>
                                        </div>

                                        <div className="footer-widget__contact-inner">
                                            <ul className="footer-widget__contact-list list-unstyled">

                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-envelop"></span>
                                                    </div>

                                                    <div className="text">
                                                        {contactDetails.email.map((email, index) => (
                                                            <p key={index}>
                                                                <a href={`mailto:${email}`}>
                                                                    {email}
                                                                </a>
                                                            </p>
                                                        ))}
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-pin"></span>
                                                    </div>

                                                    <div className="text address_t">
                                                        <p>{contactDetails.address}</p>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-call"></span>
                                                    </div>

                                                    <div className="text">
                                                        <p>
                                                            <a href={`tel:${contactDetails.phone[0]}`}>
                                                                {contactDetails.phone.join(", ")}
                                                            </a>
                                                        </p>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Newsletter */}
                                <div
                                    className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                                    data-wow-delay="400ms"
                                >
                                    <div className="footer-widget__column footer-widget-two__newsletter">
                                        <div className="footer-widget__title-box">
                                            <h3 className="footer-widget__title">
                                                Newsletter
                                            </h3>
                                        </div>

                                        <p className="footer-widget-two__newsletter-text">
                                            Stay updated on destinations, events
                                            <br />
                                            and exclusive offers from GTNomads.
                                        </p>

                                        <form
                                            className="footer-widget-two__newsletter-form mc-form"
                                            data-url="MC_FORM_URL"
                                            noValidate
                                        >
                                            <div className="footer-widget-two__newsletter-form-input-box">
                                                <input
                                                    type="email"
                                                    placeholder="Email address.."
                                                    name="EMAIL"
                                                />

                                                <button
                                                    type="submit"
                                                    className="footer-widget-two__newsletter-btn"
                                                >
                                                    <span className="icon-paper-plan"></span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="site-footer-two__bottom">
                    <div className="container">
                        <div className="site-footer-two__bottom-inner">
                            <p className="site-footer-two__bottom-text">
                                Copyright © 2026 Gtnomads | Designed by Metabyte.
                            </p>

                            <ul className="list-unstyled site-footer-two__bottom-menu">
                                <li>
                                    <Link to="/">Terms & Conditions</Link>
                                </li>

                                <li>
                                    <Link to="/">Privacy Policy</Link>
                                </li>

                                <li>
                                    <Link to="/">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterTwo;