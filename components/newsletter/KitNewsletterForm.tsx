import React from 'react';

/**
 * KitNewsletterForm component renders a subscription form that posts directly to Kit.com.
 *
 * This component assumes Kit.com provides a direct POST endpoint for newsletter subscriptions,
 * similar to how services like Mailchimp typically offer embeddable forms.
 * The form's action URL is fetched from an environment variable, allowing easy switching
 * between different Kit.com accounts (e.g., personal testing account vs. organizational plan).
 *
 * For this migration, the most straightforward approach is to replace the existing Mailchimp form
 * with this Kit.com-compatible form, relying on Kit.com to handle the submission and any
 * subsequent user feedback (e.g., via a redirect or a new tab).
 *
 * In a more advanced scenario, if Kit.com offers a JavaScript SDK or a JSON API endpoint,
 * you might implement an AJAX-based submission to provide dynamic client-side feedback
 * without page reloads. However, for a direct migration, this simple POST form is often sufficient.
 */
const KitNewsletterForm: React.FC = () => {
  // The form action URL should be provided by Kit.com and configured via environment variables.
  // Example: NEXT_PUBLIC_KIT_NEWSLETTER_FORM_ACTION_URL="https://forms.kit.com/your-form-id/subscribe"
  const formActionUrl = process.env.NEXT_PUBLIC_KIT_NEWSLETTER_FORM_ACTION_URL;

  if (!formActionUrl) {
    return (
      <div className="newsletter-container configuration-error">
        <h3>Newsletter Service Configuration Required</h3>
        <p>
          The newsletter subscription service is not fully configured.
          Please ensure the <code>NEXT_PUBLIC_KIT_NEWSLETTER_FORM_ACTION_URL</code>
          environment variable is set with your Kit.com form's action URL.
        </p>
        <p>
          This is required to connect the form to your Kit.com account (personal for testing, organizational later).
        </p>
        <style jsx>{`
          .newsletter-container.configuration-error {
            background-color: #fff3cd; /* Light yellow */
            border: 1px solid #ffeeba; /* Darker yellow border */
            color: #856404; /* Dark yellow text */
            padding: 15px 20px;
            border-radius: 8px;
            max-width: 500px;
            margin: 20px auto;
            text-align: left;
            font-size: 0.95em;
          }
          .newsletter-container.configuration-error h3 {
            color: #856404;
            margin-bottom: 10px;
            font-size: 1.5em;
            text-align: center;
          }
          .newsletter-container.configuration-error p {
            margin-bottom: 10px;
            line-height: 1.5;
          }
          .newsletter-container.configuration-error code {
            background-color: #e9ecef; /* Light gray */
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
            font-size: 0.9em;
            color: #bd4147; /* Reddish for variable */
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="newsletter-container">
      <h3>Subscribe to Our Newsletter</h3>
      <p>Stay up-to-date with our latest news and community updates!</p>
      <form
        action={formActionUrl}
        method="post"
        name="kit-newsletter-form"
        id="kit-newsletter-form"
        target="_blank" // Often used for embedded forms to show success on a new page or tab.
        noValidate      // Disable default browser validation if Kit.com handles its own.
        aria-label="Newsletter Subscription Form"
      >
        <div className="form-group">
          {/* Label moved to be visually hidden but available for screen readers */}
          <label htmlFor="kit-email" className="sr-only">Email Address</label>
          <input
            type="email"
            name="email" // Assuming 'email' is the expected field name by Kit.com. Verify with Kit.com documentation.
            id="kit-email"
            placeholder="Enter your email address"
            required
            aria-required="true"
          />
        </div>
        {/*
          If Kit.com requires specific hidden fields (e.g., for list IDs, form identifiers, etc.),
          they would be added here based on Kit.com's provided embed code or API documentation.
          Example: <input type="hidden" name="list_id" value="your_kit_list_id" />
        */}

        <button type="submit" className="button">
          Subscribe
        </button>
      </form>
      <style jsx>{`
        .newsletter-container {
          background-color: #f7f7f7;
          border: 1px solid #eee;
          padding: 25px 30px;
          border-radius: 8px;
          max-width: 500px;
          margin: 20px auto;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        h3 {
          color: #333;
          margin-bottom: 15px;
          font-size: 2em;
          font-weight: 700;
        }
        p {
          color: #666;
          margin-bottom: 30px;
          line-height: 1.6;
          font-size: 1.1em;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        input[type="email"] {
          width: calc(100% - 24px); /* Account for padding */
          padding: 14px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          box-sizing: border-box;
          font-size: 17px;
          margin-bottom: 10px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        input[type="email"]:focus {
          border-color: #0070f3;
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.25);
        }
        button {
          background-color: #0070f3;
          color: white;
          padding: 14px 30px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(0, 112, 243, 0.2);
        }
        button:hover {
          background-color: #005bb5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 112, 243, 0.3);
        }
        button:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0, 112, 243, 0.2);
        }
      `}</style>
    </div>
  );
};

export default KitNewsletterForm;
