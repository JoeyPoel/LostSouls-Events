/**
 * Lost Souls Mailing Service (Serverless Backend)
 * Utilizes the Resend HTTP REST API to dispatch dark-mode confirmation transmissions
 * and administrator alerts for waiting list registrations.
 */

export interface WaitlistEmailInput {
  email: string;
  source?: string;
  timestamp?: string;
}

/**
 * Generates the responsive dark-mode HTML email template adhering to
 * Lost Souls' signature underground techno visual identity.
 *
 * @param {string} email - Recipient email address.
 * @returns {string} Fully inline-styled HTML string.
 */
export function generateWaitlistConfirmationHtml(_email?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LØST SØULS</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: 'Space Mono', 'Courier New', Courier, monospace; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000; min-height: 100vh; padding: 60px 16px;">
    <tr>
      <td align="center" valign="middle">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background-color: #020611; border: 1px solid #0044FF; box-shadow: 0 0 35px rgba(0, 68, 255, 0.25); text-align: center;">
          <tr>
            <td style="padding: 64px 32px; text-align: center;">
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 42px; font-weight: 900; letter-spacing: 0.18em; color: #ffffff; text-transform: uppercase;">
                LØST SØULS
              </h1>
              <p style="margin: 16px 0 0 0; font-family: 'Space Mono', 'Courier New', Courier, monospace; font-size: 13px; letter-spacing: 0.35em; color: #00E5FF; text-transform: uppercase;">
                SOMETHING BIG IS COMING...
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Sends a confirmation email to the subscriber using the Resend REST API.
 *
 * @param {WaitlistEmailInput} input - Subscriber parameters.
 * @returns {Promise<boolean>} True if dispatched or safely skipped; false on HTTP failure.
 */
export async function sendWaitlistConfirmationEmail(input: WaitlistEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[LostSouls Mail] RESEND_API_KEY is not defined. Skipping subscriber confirmation dispatch.');
    return false;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Lost Souls <onboarding@resend.dev>';
  const htmlContent = generateWaitlistConfirmationHtml(input.email);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: input.email,
        subject: 'LØST SØULS // SOMETHING BIG IS COMING...',
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[LostSouls Mail] Failed to dispatch subscriber email via Resend:', errorText);
      return false;
    }

    console.log(`[LostSouls Mail] Waiting list confirmation dispatched to ${input.email}`);
    return true;
  } catch (err: unknown) {
    console.error('[LostSouls Mail] Exception while dispatching subscriber email:', err);
    return false;
  }
}

/**
 * Sends an administrative alert email notifying event directors of a new waitlist registration.
 *
 * @param {WaitlistEmailInput} input - Subscriber parameters.
 * @returns {Promise<boolean>} True if dispatched or safely skipped; false on failure.
 */
export async function sendAdminWaitlistNotification(input: WaitlistEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return false;
  }

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'joeywognum@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Lost Souls <onboarding@resend.dev>';
  const timestamp = input.timestamp || new Date().toISOString();

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: adminEmail,
        reply_to: input.email,
        subject: `[Lost Souls] New Waiting List Signup: ${input.email}`,
        html: `
          <div style="font-family: monospace; background: #000; color: #fff; padding: 24px; border: 1px solid #0044FF;">
            <h2 style="color: #00E5FF; margin-top: 0;">NEW WAITING LIST TRANSMISSION</h2>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Source:</strong> ${input.source || 'teaser_waitlist'}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[LostSouls Mail] Admin notification failed:', errorText);
      return false;
    }

    return true;
  } catch (err: unknown) {
    console.error('[LostSouls Mail] Exception sending admin notification:', err);
    return false;
  }
}
