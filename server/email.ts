import { Inbound } from "inboundemail";

const apiKey = process.env.INBOUND_API_KEY || "";
const from = "Cledwyn from Lekker Network <cledwyn@lekker.network>";

if (!apiKey) {
  console.warn("INBOUND_API_KEY not found - emails will not be sent");
}

const client = apiKey ? new Inbound(apiKey) : null;

interface ContactFormEmail {
  fullName: string;
  email: string;
  service: string;
  message: string;
}

export async function sendContactFormNotification(data: ContactFormEmail) {
  if (!client) {
    console.error("INBOUND_API_KEY not configured; skipping contact form emails");
    return { success: false };
  }

  try {
    // Send email to admin
    const adminResponse = await client.emails.send({
      from,
      to: "info@ephaphatha.co.za",
      subject: `New Contact Form Submission from ${data.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff8c00; border-bottom: 3px solid #ff8c00; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${data.fullName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 10px 0;"><strong>Service of Interest:</strong> ${data.service}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 3px; line-height: 1.6;">${data.message}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This email was sent from the Ephaphatha Construction website contact form.
          </p>
        </div>
      `,
    });

    // Send confirmation email to user
    const userResponse = await client.emails.send({
      from,
      to: data.email,
      subject: "Thank you for contacting Ephaphatha Construction",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff8c00; border-bottom: 3px solid #ff8c00; padding-bottom: 10px;">Thank You for Reaching Out!</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Dear ${data.fullName},
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Thank you for contacting Ephaphatha Construction. We have received your message and will get back to you as soon as possible.
          </p>
          
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 10px 0;"><strong>Your Message Details:</strong></p>
            <p style="margin: 10px 0;"><strong>Service of Interest:</strong> ${data.service}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 3px; line-height: 1.6;">${data.message}</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            In the meantime, feel free to reach us directly at:
          </p>
          
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;">📞 Phone: <a href="tel:+27680222228" style="color: #ff8c00; text-decoration: none;">+27 68 022 2228</a></li>
            <li style="margin: 10px 0;">📧 Email: <a href="mailto:Ephaphathac@gmail.com" style="color: #ff8c00; text-decoration: none;">Ephaphathac@gmail.com</a></li>
            <li style="margin: 10px 0;">📍 Address: 37723 Freedom Square, Bloemfontein</li>
          </ul>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Best regards,<br>
            <strong>Ephaphatha Construction (Pty) Ltd</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #666; font-size: 12px; text-align: center;">
            © 2025 Ephaphatha Construction (Pty) Ltd. All Rights Reserved.<br>
            B-BBEE Level 1 Contributor | Tax Compliant
          </p>
        </div>
      `,
    });

    console.log("✅ Email sent successfully to admin and user");
    return { success: true, adminResponse, userResponse };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
}
