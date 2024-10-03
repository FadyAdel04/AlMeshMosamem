import React from "react";
import { AiFillYoutube, AiFillFacebook, AiOutlineWhatsApp } from "react-icons/ai"; // Import WhatsApp icon
import { translations } from '../translations/translations'; // Import your translations

function Footer({ language }) {
  const date = new Date();
  const year = date.getFullYear();
  const phoneNumber = "01127436064"; // Add your phone number here (replace with the actual number)
  const message = "Hello, I would like to inquire about your services."; // Static message to send

  return (
    <div className="footer">
      <div className="footer-row">
        <div className="footer-left">
          <h3>
            {translations[language].footer.designedBy}{" "}
            <a
              className="links" 
              href="https://fadyadel-fady-adels-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fady Adel
            </a>
          </h3>
        </div>
        <div className="footer-center">
          <h3>
            {translations[language].footer.copyright} {year}{" "}
            <a
              className="links" 
              href="https://www.facebook.com/VenomFree/?notif_id=1727835741740490&notif_t=page_post_liker_invite_follow&ref=notif"
              target="_blank"
              rel="noopener noreferrer"
            >
              AlMeshMosamem
            </a>
          </h3>
        </div>
        <div className="footer-right">
          <ul className="footer-icons">
            <li className="social-icon">
              <a
                href="http://www.youtube.com/@MahmoudDesign_0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillYoutube />
              </a>
            </li>
            <li className="social-icon">
              <a
                href="https://www.facebook.com/profile.php?id=61565743537507"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillFacebook />
              </a>
            </li>
            <li className="social-icon">
              <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`} // WhatsApp link with pre-filled message
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineWhatsApp />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
