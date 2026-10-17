import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'node:fs';

/**
 * Diagnostic serverless function to reveal exact production filesystem and imports.
 *
 * @param {IncomingMessage} _req - Inbound request.
 * @param {ServerResponse} res - Outbound response.
 */
export default async function handler(_req: IncomingMessage, res: ServerResponse): Promise<void> {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const filesInTask: Record<string, string[]> = {};
  const listDirSafe = (dir: string) => {
    try {
      return fs.readdirSync(dir);
    } catch (e: any) {
      return [`ERROR: ${e.message}`];
    }
  };

  filesInTask['/var/task'] = listDirSafe('/var/task');
  filesInTask['/var/task/api'] = listDirSafe('/var/task/api');
  filesInTask['/var/task/api/lib'] = listDirSafe('/var/task/api/lib');

  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    filesInTask,
  };

  try {
    const prismaModule = await import('../lib/prisma.js');
    diagnostics.prismaJsImport = 'success';
    diagnostics.getPrismaClientResult = Boolean(prismaModule.getPrismaClient());
  } catch (prismaErr: any) {
    diagnostics.prismaJsImport = 'error: ' + (prismaErr?.message || String(prismaErr));
  }

  try {
    const mailModule = await import('../lib/mail.js');
    diagnostics.mailJsImport = 'success';
    diagnostics.hasMailSend = typeof mailModule.sendWaitlistConfirmationEmail === 'function';
  } catch (mailErr: any) {
    diagnostics.mailJsImport = 'error: ' + (mailErr?.message || String(mailErr));
  }

  res.statusCode = 200;
  res.end(JSON.stringify(diagnostics, null, 2));
}
