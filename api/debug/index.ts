import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Diagnostic serverless function to reveal exact production environment issues.
 *
 * @param {IncomingMessage} _req - Inbound request.
 * @param {ServerResponse} res - Outbound response.
 */
export default async function handler(_req: IncomingMessage, res: ServerResponse): Promise<void> {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    env: {
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
      hasResendFromEmail: Boolean(process.env.RESEND_FROM_EMAIL),
      hasAdminEmail: Boolean(process.env.ADMIN_NOTIFICATION_EMAIL),
    },
  };

  try {
    const prismaModule = await import('../../src/lib/prisma');
    diagnostics.prismaImport = 'success';
    diagnostics.getPrismaClientResult = Boolean(prismaModule.getPrismaClient());
  } catch (prismaErr: any) {
    diagnostics.prismaImport = 'error';
    diagnostics.prismaError = {
      message: prismaErr?.message,
      stack: prismaErr?.stack,
    };
  }

  try {
    const mailModule = await import('../../src/lib/mail');
    diagnostics.mailImport = 'success';
    diagnostics.hasSendFunction = typeof mailModule.sendWaitlistConfirmationEmail === 'function';
  } catch (mailErr: any) {
    diagnostics.mailImport = 'error';
    diagnostics.mailError = {
      message: mailErr?.message,
      stack: mailErr?.stack,
    };
  }

  res.statusCode = 200;
  res.end(JSON.stringify(diagnostics, null, 2));
}
