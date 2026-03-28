import type { Handler, HandlerEvent } from '@netlify/functions';

import config from '../../config/kit-config.json';

const KIT_BASE = 'https://api.kit.com/v4';

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'The specified HTTP method is not allowed.' })
    };
  }

  const { email, name, interest } = JSON.parse(event.body || '');
  const tagId = config.tags[interest as keyof typeof config.tags];

  if (!process.env.KIT_API_KEY) {
    return {
      statusCode: 503,
      body: JSON.stringify({ message: 'Subscription is temporarily unavailable. Please try again later.' })
    };
  }

  if (tagId == null || Number(tagId) === 0) {
    return {
      statusCode: 503,
      body: JSON.stringify({ message: 'Subscription is temporarily unavailable. Please try again later.' })
    };
  }

  const headers = {
    'X-Kit-Api-Key': process.env.KIT_API_KEY,
    'Content-Type': 'application/json'
  };

  try {
    const subRes = await fetch(`${KIT_BASE}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email_address: email, first_name: name, state: 'active' })
    });

    if (!subRes.ok) {
      await subRes.text().catch(() => undefined);
      return {
        statusCode: 502,
        body: JSON.stringify({
          message: 'Subscription could not be completed. Please try again later.'
        })
      };
    }

    const tagRes = await fetch(`${KIT_BASE}/tags/${tagId}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email_address: email })
    });

    if (!tagRes.ok) {
      await tagRes.text().catch(() => undefined);
      return {
        statusCode: 502,
        body: JSON.stringify({
          message: 'Subscription could not be completed. Please try again later.'
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscribed successfully.' })
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An unexpected error occurred. Please try again later.'
      })
    };
  }
};
