import type { Handler, HandlerEvent } from '@netlify/functions';

import config from '../../config/kit-config.json';

const KIT_BASE = 'https://api.kit.com/v4';
const REQUEST_TIMEOUT_MS = 15_000;

function isAbortError(err: unknown): boolean {
  return err instanceof Error && err.name === 'AbortError';
}

async function kitFetch(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'The specified HTTP method is not allowed.' })
    };
  }

  let body: unknown;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body.' })
    };
  }

  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid subscription request.' })
    };
  }

  const { email, name, interest } = body as Partial<Record<'email' | 'name' | 'interest', unknown>>;

  if (
    typeof email !== 'string' ||
    typeof interest !== 'string' ||
    !Object.prototype.hasOwnProperty.call(config.tags, interest)
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid subscription request.' })
    };
  }

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

  const firstName = typeof name === 'string' ? name : '';

  const headers = {
    'X-Kit-Api-Key': process.env.KIT_API_KEY,
    'Content-Type': 'application/json'
  };

  try {
    const subRes = await kitFetch(`${KIT_BASE}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email_address: email, first_name: firstName, state: 'active' })
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

    const tagRes = await kitFetch(`${KIT_BASE}/tags/${tagId}/subscribers`, {
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
  } catch (err) {
    if (isAbortError(err)) {
      return {
        statusCode: 504,
        body: JSON.stringify({
          message: 'Subscription service timed out. Please try again later.'
        })
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An unexpected error occurred. Please try again later.'
      })
    };
  }
};
