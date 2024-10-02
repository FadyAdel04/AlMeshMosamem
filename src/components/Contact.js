import React, { useState } from "react";
import contactImage from "../source/contact.jpg"; // Using your uploaded image
import { FaPaperPlane } from 'react-icons/fa';
import { translations } from '../translations/translations'; // Import your translations

const Contact = ({ language }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <section className="contact">
      <h2 className={`section-title ${language}`}>{translations[language].contactSection.title}</h2>
      <div className="contact-card">
        {/* Left Side: Text and Image */}
        <div className={`contact-title ${language}`}>
          <img src={contactImage} alt="Contact Me" className="contact-image" />
          <h3 className="contact-title">
            {translations[language].contactSection.contactTitle}
            
          </h3>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className={`form-title ${language}`}>{translations[language].contactSection.formTitle}</h2>
            <div className={`form-group ${language}`}>
              <label>{translations[language].contactSection.nameLabel}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className={`form-group ${language}`}>
              <label>{translations[language].contactSection.emailLabel}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className={`form-group ${language}`}>
              <label>{translations[language].contactSection.messageLabel}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="input-field-message"
              />
            </div>
            <button type="submit" className="submit-btn">
              <FaPaperPlane style={{ marginRight: '8px' }} /> {translations[language].contactSection.sendButton}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
