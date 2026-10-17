/**
 * Lost Souls Mailing Service
 * Adapted from the portfolio inquiry mailing service in Own-Website.
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
export function generateWaitlistConfirmationHtml(email: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LØST SØULS // WAITING LIST VERIFIED</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: 'Space Mono', 'Courier New', Courier, monospace; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000; min-height: 100vh; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #020611; border: 1px solid #0044FF; box-shadow: 0 0 35px rgba(0, 68, 255, 0.25); text-align: left;">
          
          <!-- Top Telemetry Ribbon -->
          <tr>
            <td style="padding: 12px 24px; border-bottom: 1px solid rgba(0, 102, 255, 0.25); background-color: #050e20; font-size: 11px; letter-spacing: 0.25em; color: #00E5FF; text-transform: uppercase;">
              <span style="display: inline-block; width: 6px; height: 6px; background-color: #00E5FF; margin-right: 8px; vertical-align: middle;"></span>
              SECURE DISPATCH // LEVEL 01 ACCESS
            </td>
          </tr>

          <!-- Hero Headline -->
          <tr>
            <td style="padding: 40px 32px 20px 32px;">
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 44px; font-weight: 900; letter-spacing: 0.18em; color: #ffffff; text-transform: uppercase;">
                LØST SØULS
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 13px; letter-spacing: 0.35em; color: #00E5FF; text-transform: uppercase;">
                SOMETHING BIG IS COMING...
              </p>
            </td>
          </tr>

          <!-- Status Indicator Pill -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <div style="display: inline-block; padding: 6px 14px; border: 1px solid #00E5FF; background-color: rgba(0, 229, 255, 0.08); font-size: 11px; font-weight: bold; letter-spacing: 0.2em; color: #E0F7FF;">
                [ WAITING LIST CONFIRMED // ALLOCATION RESERVED ]
              </div>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 0 32px 32px 32px; font-size: 14px; line-height: 1.8; color: #cbd5e1;">
              <p style="margin: 0 0 18px 0;">
                Transmission target: <strong style="color: #ffffff;">${email}</strong>
              </p>
              <p style="margin: 0 0 18px 0;">
                Your address has been committed to the underground ledger. You are now positioned at the forefront of the upcoming reveal.
              </p>
              <p style="margin: 0 0 18px 0;">
                When the next chapter breaks into the void, your priority reservation token and private ticket batch access will be dispatched directly to your inbox before the general public.
              </p>

              <!-- Industrial Ledger Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 24px 0; border: 1px solid rgba(0, 102, 255, 0.3); background-color: #030712;">
                <tr>
                  <td style="padding: 14px 18px; font-size: 12px; color: #64748b; line-height: 1.7; letter-spacing: 0.08em;">
                    <div style="color: #00E5FF; font-weight: bold; margin-bottom: 6px;">■ PROTOCOL PROTO-01 // ESSENTIALS</div>
                    <div>• Strictly 18+ entry — Physical government ID mandatory.</div>
                    <div>• Zero camera flash policy — Total dancefloor immersion.</div>
                    <div>• 140–165 BPM industrial pressure & hybrid live sonic sets.</div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #94a3b8; font-size: 12px; letter-spacing: 0.15em;">
                Stand by for temporal coordinates and line-up transmission.
              </p>
            </td>
          </tr>

          <!-- Bottom Telemetry Footer -->
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid rgba(0, 102, 255, 0.25); background-color: #000000; font-size: 11px; color: #475569; letter-spacing: 0.15em; line-height: 1.6;">
              <div style="color: #64748b; font-weight: bold; margin-bottom: 4px;">
                LOST SOULS // UNDERGROUND TECHNO COLLECTIVE
              </div>
              <div>ROTTERDAM • AMSTERDAM // ALL RIGHTS RESERVED</div>
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
 * Follows the pattern established in Own-Website's inquiryService.
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
        subject: 'LØST SØULS // Waiting List Confirmed — Something Big Is Coming',
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
