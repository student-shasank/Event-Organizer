import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ContactMain = () => {
  const services = [
    'Business Conferences & Seminars',
    'Annual General Meetings (AGM)',
    'Corporate Meetings & Executive Summits',
    'Team-Building Programs',
    'Leadership & Development Workshops',
    'Brand & Marketing Training Events',
    'Corporate Gala Nights & Parties',
    'Award & Recognition Ceremonies',
    'Product Launches & Brand Activations',
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .send(
        'service_u8hsfdr',
        'template_jhsv59e',
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service_type: formData.serviceType,
          message: formData.message,
          to_email: 'andre@gtnomads.com',
        },
        'kNqOxZ2-qe3IsXNnW'
      )
      .then(() => {
        alert('Thank you! Your inquiry has been submitted successfully.');

        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error(error);
        alert('Something went wrong. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      {/*Contact One Start*/}
      <section className="contact-one">
        <div className="container">
          <div className="contact-one__inner">
            <h3 className="contact-one__title">
              Write here below?
            </h3>

            <p className="contact-one__text">
              From corporate gatherings to exclusive experiences, our team is
              ready to make your event exceptional.
            </p>

            <form
              className="contact-form-validated contact-one__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <div className="select-box">
                      <select
                        name="serviceType"
                        className="selectmenu wide"
                        value={formData.serviceType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select Event Service
                        </option>

                        {services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-xl-12">
                  <div className="contact-one__input-box text-message-box">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="contact-one__btn-box">
                    <button
                      type="submit"
                      className="thm-btn contact-one__btn"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Submit Now'}
                      <span className="icon-arrow-right"></span>
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="result"></div>
          </div>
        </div>
      </section>
      {/*Contact One End*/}

      {/*Contact Two Start*/}
      <section className="contact-two">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4">
              <div className="contact-two__single">
                <div className="contact-two__icon">
                  <span className="icon-pin"></span>
                </div>
                <h3 className="contact-two__title">Location</h3>
                <p className="contact-two__text">
                  2972 Westheimer Rd. Santa Ana,
                  <br />
                  Illinois 85486
                </p>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4">
              <div className="contact-two__single">
                <div className="contact-two__icon">
                  <span className="icon-paper-plan"></span>
                </div>

                <h3 className="contact-two__title">E-mail</h3>

                <p className="contact-two__text">
                  <Link to="mailto:tim.jennings@example.com">
                    sheldon@gtnomads.com
                  </Link>
                </p>

                <p className="contact-two__text">
                  <a href="mailto:debra.holt@example.com">
                    andre@gtnomads.com
                  </a>
                </p>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4">
              <div className="contact-two__single">
                <div className="contact-two__icon">
                  <span className="icon-call"></span>
                </div>

                <h3 className="contact-two__title">Contact</h3>

                <p className="contact-two__text">
                  <a href="tel:919822959761">
                    91 9822959761
                  </a>
                  ,
                  <a href="tel:919822980756">
                    {' '}
                    91 9822980756
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Contact Two End*/}
    </React.Fragment>
  );
};

export default ContactMain;