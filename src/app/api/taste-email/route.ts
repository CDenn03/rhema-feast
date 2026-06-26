// app/api/send-invite/route.ts
import { MailtrapClient } from "mailtrap";

const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_KEY,
  sandbox: true,
  testInboxId: Number(process.env.MAILTRAP_INBOX_ID),
});

export async function POST() {
  return Response.json(
    await client.send({
      from: { name: "Your App", email: "sandbox@example.com" },
      to: [{ email: "recipient@example.com" }],
      template_uuid: process.env.MAILTRAP_TEMPLATE_UUID,
      template_variables: {
        name: "Alex Johnson",
        event_name: "Annual Gala",
        companions_allowed: 2,
      },
    }),
  );
}