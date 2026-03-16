// kitcomApi.ts
import axios from 'axios';

// Define the Kit.com API endpoint
const API_ENDPOINT = 'https://api.kit.com/v1/newsletter/subscribe';

// Interface for the subscription request
interface SubscriptionRequest {
  email: string;
  name: string;
}

// Function to send subscription request to Kit.com API
export const subscribeToNewsletter = async (data: SubscriptionRequest) => {
  try {
    const response = await axios.post(API_ENDPOINT, data);
    return response.data;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw new Error('Subscription failed');
  }
};