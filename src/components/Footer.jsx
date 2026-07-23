import { Link } from "react-router-dom";
import BrandMark from "./ui/BrandMark";
import facebookLogo from "../assets/facebook.png";
import gmailLogo from "../assets/gmail.png";
import linkedinLogo from "../assets/linkedin.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About us" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__wordmark" aria-hidden="true">AWSCC WILDQUACC</div>
        <div className="site-footer__rule" />
        <div className="site-footer__grid">
          <div>
            <div className="site-footer__brand">
              <BrandMark compact inverted />
              <span><strong>AWSCC WildQuacc</strong><small>Student Cloud Community</small></span>
            </div>
            <p className="site-footer__about">Empowering students with practical AWS knowledge, certification support, and a community that learns by building.</p>
            <div className="social-row" aria-label="Social links">
              <a className="social-link" href="https://www.facebook.com/share/18jibnjyZu/" target="_blank" rel="noreferrer" aria-label="WildQuacc on Facebook"><img src={facebookLogo} alt="" /></a>
              <a className="social-link" href="https://www.linkedin.com/company/aws-sbg-wildquacc/" target="_blank" rel="noreferrer" aria-label="WildQuacc on LinkedIn"><img src={linkedinLogo} alt="" /></a>
              <a className="social-link" href="mailto:awssc.wildquacc@university.edu" aria-label="Email WildQuacc"><img src={gmailLogo} alt="" /></a>
            </div>
          </div>
          <div>
            <h3>Navigate</h3>
            <div className="site-footer__links">
              {links.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
            </div>
          </div>
          <div>
            <h3>Connect</h3>
            <div className="site-footer__links">
              <a href="mailto:awssc.wildquacc@university.edu">awssc.wildquacc@university.edu</a>
              <span>Virtual office hours</span>
              <span>Mon & Wed · 4–6 PM</span>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} AWSCC WildQuacc. All rights reserved.</span>
          <em>Build what comes next.</em>
        </div>
      </div>
    </footer>
  );
}
