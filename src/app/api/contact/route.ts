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

    // If credentials are missing, operate in MOCK mode for local development.
    if (!GMAIL_USER || !GMAIL_PASS) {
      console.log('⚠️ [MOCK MODE] GMAIL credentials missing — simulating send');
      console.log(`Mock send -> from: ${email}, name: ${name}, message: ${message}`);

      // Simulate network latency so UX feels realistic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return NextResponse.json({ success: true, message: 'Messaggio inviato con successo (Modalità Demo)!', mocked: true });
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

    return NextResponse.json({ success: true, message: 'Messaggio inviato con successo!' });
  } catch (err) {
    console.error('[Contact API] Error handling request', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
