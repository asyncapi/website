import type { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  return {
    statusCode: 204,
  };
};
