import type { Handler, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'The specified HTTP method is not allowed.'
      })
    };
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Newsletter service is not configured. Missing KIT_API_KEY or KIT_FORM_ID environment variables.'
      })
    };
  }

  const { email, name } = JSON.parse(event.body || '');

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email address is required.' })
    };
  }

  try {
    const response = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': apiKey
      },
      body: JSON.stringify({
        email_address: email,
        ...(name ? { first_name: name } : {})
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify(data)
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err instanceof Error ? err.message : 'An unexpected error occurred.'
      })
    };
  }
};
