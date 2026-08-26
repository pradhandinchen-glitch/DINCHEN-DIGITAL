import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { Resend } from 'resend';

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

const resend = new Resend(process.env.RESEND_API_KEY);

try {
  await resend.emails.send({
    from: 'DINCHEN DIGITAL <onboarding@resend.dev>',
    to: recipient,
    subject: `New service booking from ${name}`,
    text: enquiry
  });

  return response.status(201).json({
    ok: true,
    message: 'Booking received. We will contact you shortly.'
  });
} catch (error) {
  console.error('Email delivery failed:', error);
  return response.status(500).json({
    error: 'We could not send your booking. Please call or WhatsApp us directly.'
  })
} 
});
app.listen(port, () => console.log(`DINCHEN DIGITAL backend listening on port ${port}`));
