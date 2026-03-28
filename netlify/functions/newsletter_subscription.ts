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

  const headers = {
    'X-Kit-Api-Key': process.env.KIT_API_KEY!,
    'Content-Type': 'application/json'
  };

  try {
    await fetch(`${KIT_BASE}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email_address: email, first_name: name, state: 'active' })
    });

    const tagRes = await fetch(`${KIT_BASE}/tags/${tagId}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email_address: email })
    });

    if (!tagRes.ok) {
      const errBody = await tagRes.json().catch(() => ({}));
      return {
        statusCode: tagRes.status,
        body: JSON.stringify(errBody)
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscribed successfully.' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: (err as Error).message })
    };
  }
};
