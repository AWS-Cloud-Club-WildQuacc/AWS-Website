import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandMark from "./ui/BrandMark";
import Button from "./ui/Button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = menuRef.current?.querySelectorAll("a, button");
    focusable?.[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key === "Tab" && focusable?.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const active = (to) => to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <nav className={`site-nav ${scrolled || open ? "site-nav--scrolled" : ""}`} aria-label="Primary navigation">
        <div className="site-nav__inner site-container">
          <Link to="/" className="site-nav__brand" aria-label="AWS Cloud Club WildQuacc home">
            <BrandMark compact inverted />
            <span className="site-nav__brand-copy">
              <strong>AWSCC WildQuacc</strong>
              <small>Student Cloud Community</small>
            </span>
          </Link>

          <div className="site-nav__links">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className={`site-nav__link ${active(link.to) ? "site-nav__link--active" : ""}`}>
                {link.label}
              </Link>
            ))}
            <span className="site-nav__divider" aria-hidden="true" />
            <Button to="/contact" variant="light">Join the Club <span aria-hidden="true">→</span></Button>
          </div>

          <button
            ref={triggerRef}
            className="site-nav__menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" ref={menuRef} className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
        {links.map((link, index) => (
          <Link key={link.to} to={link.to} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            {link.label}<span>0{index + 1}</span>
          </Link>
        ))}
        <Button to="/contact" variant="orange" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>Join our community <span aria-hidden="true">→</span></Button>
      </div>
    </>
  );
}
