import React, { useState } from "react";
import contactImage from "../source/contact.jpg"; // Using your uploaded image
import { FaPaperPlane } from 'react-icons/fa';
import { translations } from '../translations/translations'; // Import your translations
import emailjs from 'emailjs-com'; // Import EmailJS
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Contact = ({ language }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mobile: "", // Include mobile in the state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for mobile and filter out non-numeric characters
    if (name === 'mobile') {
      // Only allow digits
      const filteredValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: filteredValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS parameters
    const serviceId = 'service_lkkr0ta'; // Add your service ID
    const templateId = 'template_1cpb7z4'; // Add your template ID
    const userId = 'rGMcvkTggEP-sVn3V'; // Add your user ID from EmailJS dashboard

    // Send form data via EmailJS
    emailjs.send(serviceId, templateId, formData, userId)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success(translations[language].contactSection.successMessage); // Show success toast
      }, (err) => {
        console.log('FAILED...', err);
        toast.error(translations[language].contactSection.errorMessage); // Show error toast
      });
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
            {/* Mobile Number Input */}
            <div className={`form-group ${language}`}>
              <label>{translations[language].contactSection.mobileLabel}</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="input-field"
                inputMode="numeric"
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
      <ToastContainer /> {/* Add ToastContainer here */}
    </section>
  );
};

export default Contact;
