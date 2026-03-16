// newsletterService.ts
import { subscribeToNewsletter } from './kitcomApi';

// Function to handle backend subscription logic
export const handleNewsletterSubscription = async (email: string, name: string) => {
  try {
    const subscriptionData = { email, name };
    const response = await subscribeToNewsletter(subscriptionData);
    return response;
  } catch (error) {
    console.error('Backend subscription failed:', error);
    throw new Error('Backend subscription failed');
  }
};