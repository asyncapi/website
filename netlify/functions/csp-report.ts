import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  try {
    if (event.body) {
      const report = JSON.parse(event.body);

      console.warn('[CSP Violation Report]', {
        report,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('[CSP Report Parse Error]', error);
  }

  return {
    statusCode: 204,
  };
};
