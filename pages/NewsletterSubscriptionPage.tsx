import React from 'react';
import KitNewsletterForm from '../components/newsletter/KitNewsletterForm';

const NewsletterSubscriptionPage: React.FC = () => {
  return (
    <div className="page-container newsletter-page">
      <header className="newsletter-header">
        <h1>Subscribe to Our Newsletter</h1>
        <p>
          Be the first to know about our exciting updates, events, and community news!
          Join our growing community and never miss a beat.
        </p>
      </header>
      <section className="newsletter-form-section">
        {/*
          This KitNewsletterForm component replaces any previous Mailchimp form
          or integration that was present on the newsletter subscription page.
          If there was a Mailchimp component (e.g., <MailchimpForm />), it would
          be removed from here and replaced with <KitNewsletterForm />.
        */}
        <KitNewsletterForm />
      </section>
      <footer className="newsletter-footer">
        <p>Thank you for your interest in our community!</p>
      </footer>
    </div>
  );
};

export default NewsletterSubscriptionPage;
