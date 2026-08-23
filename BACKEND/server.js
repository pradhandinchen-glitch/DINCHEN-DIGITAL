import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT || 3000;
const recipient = process.env.CONTACT_EMAIL || 'pradhandinchen@gmail.com';

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json({ limit: '20kb' }));

app.get('/', (_request, response) => {
  response.json({
    ok: true,
    service: 'DINCHEN DIGITAL',
    message: 'Backend is running successfully!'
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'DINCHEN DIGITAL' });
});

app.post('/api/contact', async (request, response) => {
  const { name, phone, service, message } = request.body || {};
  if (!name || !phone || !service || !message) {
    return response.status(400).json({ error: 'Please complete all booking fields.' });
  }

  const enquiry = `Name: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`New DINCHEN DIGITAL enquiry:\n${enquiry}`);
    return response.status(201).json({ ok: true, message: 'Booking received. We will contact you shortly.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipient,
      replyTo: process.env.SMTP_USER,
      subject: `New service booking from ${name}`,
      text: enquiry
    });
    return response.status(201).json({ ok: true, message: 'Booking received. We will contact you shortly.' });
  } catch (error) {
    console.error('Email delivery failed:', error.message);
    return response.status(500).json({ error: 'We could not send your booking. Please call or WhatsApp us directly.' });
  }
});

app.listen(port, () => console.log(`DINCHEN DIGITAL backend listening on port ${port}`));
