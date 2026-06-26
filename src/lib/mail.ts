import { MailtrapClient } from "mailtrap";
import { config } from "./config";
import { generateGuestPassPdf } from "./pdf";

const mailtrap = new MailtrapClient({
  token: process.env.MAILTRAP_API_KEY ?? "",
  sandbox: true,
  testInboxId: Number(process.env.MAILTRAP_INBOX_ID),
});

const fromAddress = {
  email: "noreply@rhemafeast.com",
  name: "Rhema Feast",
};

interface SendGuestInviteParams {
  to: { name: string; email: string };
  eventName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  guestName: string;
  guestTitle: string;
  guestCategory: string;
  maxCompanions: number;
  rsvpUrl: string;
}

export async function sendGuestInviteEmail(params: SendGuestInviteParams) {
  const {
    to,
    eventName,
    eventDate,
    eventTime,
    venue,
    guestName,
    guestTitle,
    guestCategory,
    maxCompanions,
    rsvpUrl,
  } = params;

  const guestFullName = guestTitle ? `${guestTitle} ${guestName}` : guestName;

  const companionsText =
    maxCompanions > 0
      ? `You may bring up to <strong>${maxCompanions} companion${maxCompanions > 1 ? "s" : ""}</strong>.`
      : "This is an individual invitation.";

  const emailHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #f5f5f5; }
      .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
      .card { background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
      .header { background: linear-gradient(135deg, #b8860b 0%, #daa520 100%); padding: 32px 24px; text-align: center; }
      .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
      .header p { color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 16px; }
      .body { padding: 32px 24px; }
      .greeting { font-size: 18px; font-weight: 600; color: #1a1a1a; margin: 0 0 16px; }
      .details { background: #fafaf5; border-radius: 12px; padding: 20px; margin: 20px 0; }
      .details-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e8e8e0; }
      .details-row:last-child { border-bottom: none; }
      .details-label { width: 100px; font-size: 13px; color: #888; flex-shrink: 0; }
      .details-value { font-size: 14px; color: #1a1a1a; font-weight: 500; }
      .companions-note { font-size: 14px; color: #555; margin: 16px 0; padding: 12px 16px; background: #fff8e1; border-radius: 8px; border-left: 4px solid #daa520; }
      .cta { text-align: center; margin: 24px 0; }
      .cta a { display: inline-block; background: #daa520; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 30px; font-size: 16px; font-weight: 600; }
      .cta a:hover { background: #c8960e; }
      .cta-secondary { text-align: center; margin: 12px 0; }
      .cta-secondary a { display: inline-block; background: #f0f0e8; color: #555; text-decoration: none; padding: 12px 32px; border-radius: 30px; font-size: 14px; font-weight: 500; }
      .footer { text-align: center; padding: 24px; font-size: 12px; color: #aaa; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <h1>You're Invited!</h1>
          <p>${eventName}</p>
        </div>
        <div class="body">
          <p class="greeting">Dear ${guestFullName},</p>
          <p style="color:#555; line-height:1.6;">
            We are honored to invite you as a special guest to <strong>${eventName}</strong>.
            Your presence will make this occasion truly memorable.
          </p>

          <div class="details">
            <div class="details-row">
              <span class="details-label">Event</span>
              <span class="details-value">${eventName}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Date</span>
              <span class="details-value">${eventDate}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Time</span>
              <span class="details-value">${eventTime}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Venue</span>
              <span class="details-value">${venue}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Category</span>
              <span class="details-value">${guestCategory}</span>
            </div>
          </div>

          <div class="companions-note">${companionsText}</div>

          <div class="cta">
            <a href="${rsvpUrl}/accept">Accept Invitation</a>
          </div>
          <div class="cta-secondary">
            <a href="${rsvpUrl}/decline">Decline Invitation</a>
          </div>
        </div>
      </div>
      <div class="footer">
        <p>Rhema Feast &mdash; An event by Ruach Assembly</p>
        <p>If you have any questions, please contact the event organizer.</p>
      </div>
    </div>
  </body>
</html>`;

  const textBody = `
You're Invited to ${eventName}!

Dear ${guestFullName},

We are honored to invite you as a special guest to ${eventName}.

Event: ${eventName}
Date: ${eventDate}
Time: ${eventTime}
Venue: ${venue}
Category: ${guestCategory}

${maxCompanions > 0 ? `You may bring up to ${maxCompanions} companion(s).` : "This is an individual invitation."}

Accept: ${rsvpUrl}/accept
Decline: ${rsvpUrl}/decline

Rhema Feast — An event by Ruach Assembly
`;

  await mailtrap.send({
    from: fromAddress,
    to: [{ name: to.name, email: to.email }],
    subject: `You're Invited: ${eventName}`,
    text: textBody,
    html: emailHtml,
    category: "Guest Invitation",
  });
}

interface SendGuestConfirmationParams {
  to: { name: string; email: string };
  eventName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  guestName: string;
  guestTitle: string;
  guestCategory: string;
  companionNames: string[];
}

export async function sendGuestConfirmationEmail(params: SendGuestConfirmationParams) {
  const {
    to,
    eventName,
    eventDate,
    eventTime,
    venue,
    guestName,
    guestTitle,
    guestCategory,
    companionNames,
  } = params;

  const guestFullName = guestTitle ? `${guestTitle} ${guestName}` : guestName;

  const qrPayload = JSON.stringify({
    guestName,
    eventName,
    eventDate,
    venue,
    ts: Date.now(),
  });

  const pdfBuffer = await generateGuestPassPdf({
    eventName,
    eventDate,
    eventTime,
    venue,
    guestName,
    guestTitle,
    guestCategory,
    companionNames,
    qrPayload,
  });

  const companionList = companionNames.length > 0
    ? `\nCompanions:\n${companionNames.map((n) => `  • ${n}`).join("\n")}`
    : "";

  const textBody = `
Thank you for confirming your attendance, ${guestFullName}!

Event: ${eventName}
Date: ${eventDate}
Time: ${eventTime}
Venue: ${venue}
${companionList}

Your guest pass is attached to this email (PDF).
Please bring it with you — printed or on your phone — for check-in at the entrance.

We look forward to seeing you!

Rhema Feast — An event by Ruach Assembly
`;

  const emailHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #f5f5f5; }
      .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
      .card { background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
      .header { background: linear-gradient(135deg, #b8860b 0%, #daa520 100%); padding: 40px 24px; text-align: center; }
      .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
      .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 15px; }
      .body { padding: 32px 24px; }
      .greeting { font-size: 17px; font-weight: 600; color: #1a1a1a; margin: 0 0 8px; }
      .details { background: #fafaf5; border-radius: 12px; padding: 20px; margin: 20px 0; }
      .details-row { display: flex; padding: 6px 0; border-bottom: 1px solid #e8e8e0; font-size: 14px; }
      .details-row:last-child { border-bottom: none; }
      .details-label { width: 80px; color: #888; flex-shrink: 0; }
      .details-value { color: #1a1a1a; font-weight: 500; }
      .companions { margin: 16px 0; padding: 12px 16px; background: #fff8e1; border-radius: 8px; border-left: 4px solid #daa520; font-size: 14px; color: #555; }
      .attachment-note { text-align: center; margin: 24px 0; padding: 16px; background: #f0f7ff; border-radius: 12px; border: 1px dashed #b8860b; }
      .attachment-note strong { color: #b8860b; }
      .footer { text-align: center; padding: 24px; font-size: 12px; color: #aaa; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <h1>You're Confirmed!</h1>
          <p>${eventName}</p>
        </div>
        <div class="body">
          <p class="greeting">Dear ${guestFullName},</p>
          <p style="color:#555; line-height:1.6;">
            Thank you for confirming your attendance. Your special guest pass is attached to this email.
          </p>

          <div class="details">
            <div class="details-row">
              <span class="details-label">Event</span>
              <span class="details-value">${eventName}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Date</span>
              <span class="details-value">${eventDate}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Time</span>
              <span class="details-value">${eventTime}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Venue</span>
              <span class="details-value">${venue}</span>
            </div>
          </div>

          ${companionNames.length > 0 ? `<div class="companions"><strong>Companions:</strong><br>${companionNames.map((n) => `${n}`).join("<br>")}</div>` : ""}

          <div class="attachment-note">
            <strong>Your Guest Pass (PDF)</strong> is attached — please bring it printed or on your phone for check-in.
          </div>
        </div>
      </div>
      <div class="footer">
        <p>Rhema Feast &mdash; An event by Ruach Assembly</p>
      </div>
    </div>
  </body>
</html>`;

  const pdfBase64 = pdfBuffer.toString("base64");

  await mailtrap.send({
    from: fromAddress,
    to: [{ name: to.name, email: to.email }],
    subject: `Your Guest Pass: ${eventName}`,
    text: textBody,
    html: emailHtml,
    category: "Guest Confirmation",
    attachments: [
      {
        filename: "Guest-Pass.pdf",
        content: pdfBase64,
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  });
}
