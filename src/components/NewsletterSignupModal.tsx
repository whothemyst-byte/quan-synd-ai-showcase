import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Mail, X } from "lucide-react";
import { toast } from "sonner";

type NewsletterSignupModalProps = {
  open: boolean;
  onClose: () => void;
};

export function NewsletterSignupModal({ open, onClose }: NewsletterSignupModalProps) {
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      toast.error("Enter a valid email address.");
      return;
    }

    toast.success("You’re on the list. We’ll email launch updates soon.");
    setEmail("");
    onClose();
  };

  return (
    <div
      className="release-notes-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
      onClick={onClose}
      style={{ zIndex: 260 }}
    >
      <section
        className="release-notes-modal newsletter-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="release-notes-header">
          <div>
            <span className="release-notes-kicker">Coming Soon</span>
            <div className="release-notes-title-row">
              <h2>Get launch updates</h2>
              <span className="release-notes-pill">Newsletter</span>
            </div>
            <p>Join the Vibe ADE list and we’ll email you when downloads open.</p>
          </div>
          <button
            type="button"
            className="outline-ink-btn"
            onClick={onClose}
            aria-label="Close newsletter dialog"
            style={{ padding: "10px 14px", borderRadius: "10px" }}
          >
            <X size={15} />
          </button>
        </header>

        <div className="newsletter-layout">
          <div className="release-notes-intro">
            <strong>Be first when Vibe ADE is ready.</strong>
            <p>
              We’re opening downloads soon. Add your email now and we’ll send a
              launch notice, release highlights, and early access updates.
            </p>

            <div className="newsletter-feature-list" aria-label="Newsletter benefits">
              <div className="newsletter-feature">
                <span className="newsletter-feature-dot" aria-hidden="true" />
                <div>
                  <strong>Launch notice</strong>
                  <span>Get the first download announcement.</span>
                </div>
              </div>
              <div className="newsletter-feature">
                <span className="newsletter-feature-dot" aria-hidden="true" />
                <div>
                  <strong>Release notes</strong>
                  <span>See what changed before everyone else.</span>
                </div>
              </div>
              <div className="newsletter-feature">
                <span className="newsletter-feature-dot" aria-hidden="true" />
                <div>
                  <strong>Early access</strong>
                  <span>Stay near the front of the queue.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="newsletter-panel">
            <form className="newsletter-form" onSubmit={submitNewsletter}>
              <label className="newsletter-label" htmlFor="newsletter-email">
                Email address
              </label>
              <div className="newsletter-input-row">
                <Mail size={15} style={{ color: "var(--amber)", flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="newsletter-input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <button type="submit" className="amber-btn newsletter-submit">
                <span>Sign me up</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
              <p className="newsletter-note">
                No spam. Just the Vibe ADE launch email and occasional product
                updates.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
