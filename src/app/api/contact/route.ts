import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    // Use environment variables for credentials
    const GMAIL_USER = process.env.GMAIL_USER; // e.g. lorenzo.ebraico@gmail.com
    const GMAIL_PASS = process.env.GMAIL_PASS; // app password or OAuth2 token

    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error('[Contact API] Missing GMAIL credentials in environment');
      return NextResponse.json({ success: false, error: 'Mailer not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    // Compose message
    const mailOptions = {
      from: `${GMAIL_USER}`,
      to: GMAIL_USER,
      subject: `[Portfolio Contact] Nuovo messaggio da ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
      replyTo: email,
      headers: {
        'X-Form-Origin': 'portfolio-contact-form',
      },
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('[Contact API] Email sent', result.messageId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API] Error handling request', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
