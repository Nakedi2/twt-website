import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a56db;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Subject:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.subject}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td>
          <td style="padding: 8px;">${data.message}</td>
        </tr>
      </table>
    </div>
  `;

  const confirmationHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a56db;">Thank You for Contacting The Walking Textbooks</h2>
      <p>Hi ${data.name},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <p>Here is a summary of your submission:</p>
      <ul>
        <li><strong>Subject:</strong> ${data.subject}</li>
        <li><strong>Message:</strong> ${data.message}</li>
      </ul>
      <p>Best regards,<br/>The Walking Textbooks Team</p>
    </div>
  `;

  await Promise.all([
    sendEmail({
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER!,
      subject: `[TWT Contact] ${data.subject}`,
      html: adminHtml,
    }),
    sendEmail({
      to: data.email,
      subject: "We received your message - The Walking Textbooks",
      html: confirmationHtml,
    }),
  ]);
}
