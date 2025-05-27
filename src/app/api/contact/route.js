import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Please fill in all fields.' }), { status: 400 })
    }

    // Create transporter (example with Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 })
  } catch (error) {
    console.error('Email error:', error)
    return new Response(JSON.stringify({ error: 'Failed to send message.' }), { status: 500 })
  }
}
