import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Health check endpoint for verifying serverless execution.
 *
 * @param {IncomingMessage} _req - Inbound HTTP request.
 * @param {ServerResponse} res - Outbound HTTP response.
 */
export default function handler(
  _req: IncomingMessage,
  res: ServerResponse & { json?: (data: unknown) => void; status?: (code: number) => any }
): void {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.end(
    JSON.stringify({
      status: 'operational',
      environment: process.env.NODE_ENV || 'production',
      timestamp: new Date().toISOString(),
    })
  );
}
