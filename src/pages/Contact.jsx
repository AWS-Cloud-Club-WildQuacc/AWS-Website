import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle, Clock, Send } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import facebookLogo from "../assets/facebook.png";
import gmailLogo from "../assets/gmail.png";
import linkedinLogo from "../assets/linkedin.png";

const subjects = ["General inquiry", "Partnership or sponsorship", "Membership", "Event inquiry", "Other"];

function Field({ label, id, error, wide = false, children }) {
  const errorId = `${id}-error`;
  return (
    <div className={`field ${wide ? "field--wide" : ""} ${error ? "field--error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="field__error" id={errorId}><AlertCircle size={13} />{error}</span>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.subject) next.subject = "Choose a subject.";
    if (!form.message.trim()) next.message = "Tell us how we can help.";
    else if (form.message.trim().length < 10) next.message = "Use at least 10 characters.";
    return next;
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 900);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <MainLayout>
      <PageHero compact eyebrow="Let’s connect" title="Start a" accent="Conversation" description="Whether you want to join, partner, volunteer, or simply learn more, there’s a place for your message here." />

      <section className="section section--paper">
        <div className="site-container">
          <Reveal><SectionHeader eyebrow="Reach out" index="01" title="Tell us what you want to build." description="This form currently demonstrates the complete interface and validation flow; backend delivery will be connected separately." /></Reveal>
          <Reveal className="contact-layout">
            <div className="contact-form">
              {submitted ? (
                <div className="success-state" aria-live="polite">
                  <div>
                    <span className="success-state__icon"><CheckCircle size={30} /></span>
                    <h2 ref={successRef} tabIndex={-1}>Message ready.</h2>
                    <p>The interface completed successfully. Because this is still a frontend prototype, no message was delivered to a server.</p>
                    <Button variant="dark" onClick={reset}>Send another message</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2>Send a message</h2>
                  <form className="form-grid" onSubmit={submit} noValidate aria-busy={sending}>
                    <Field id="name" label="Full name" error={errors.name}>
                      <input id="name" name="name" value={form.name} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
                    </Field>
                    <Field id="email" label="Email address" error={errors.email}>
                      <input id="email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
                    </Field>
                    <Field id="subject" label="Subject" error={errors.subject} wide>
                      <select id="subject" name="subject" value={form.subject} onChange={update} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined}>
                        <option value="">Choose a subject</option>
                        {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                      </select>
                    </Field>
                    <Field id="message" label="Message" error={errors.message} wide>
                      <textarea id="message" name="message" value={form.message} onChange={update} maxLength={800} aria-invalid={Boolean(errors.message)} aria-describedby={`${errors.message ? "message-error " : ""}message-count`.trim()} />
                      <span id="message-count" style={{ justifySelf: "end", color: "#667078", fontSize: ".72rem" }}>{form.message.length} / 800</span>
                    </Field>
                    <div className="field--wide">
                      <Button type="submit" variant="orange" disabled={sending}>{sending ? "Preparing…" : <><Send size={16} /> Send message</>}</Button>
                    </div>
                  </form>
                </>
              )}
            </div>

            <aside className="contact-panel" aria-label="WildQuacc contact details">
              <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" />Other ways to connect</p>
              <h2 style={{ marginTop: "1.5rem" }}>Find us where builders gather.</h2>
              <p>For the fastest updates, follow our community channels or send an email directly.</p>
              <div className="contact-methods">
                <div className="contact-method"><img src={gmailLogo} alt="" /><div><strong>Email</strong><a href="mailto:awssc.wildquacc@university.edu">awssc.wildquacc@university.edu</a></div></div>
                <div className="contact-method"><Clock size={20} /><div><strong>Office hours</strong><span>Monday & Wednesday<br />4:00–6:00 PM · Discord</span></div></div>
              </div>
              <div className="social-row">
                <a className="social-link" href="https://www.facebook.com/share/18jibnjyZu/" target="_blank" rel="noreferrer" aria-label="WildQuacc on Facebook"><img src={facebookLogo} alt="" /></a>
                <a className="social-link" href="https://www.linkedin.com/company/aws-sbg-wildquacc/" target="_blank" rel="noreferrer" aria-label="WildQuacc on LinkedIn"><img src={linkedinLogo} alt="" /></a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </MainLayout>
  );
}
