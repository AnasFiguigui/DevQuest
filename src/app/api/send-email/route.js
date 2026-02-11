import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { fullName, phone, email, message, _timestamp } = await request.json()

    // Spam protection: Check if submission was too fast (less than 3 seconds)
    const submissionTime = Date.now() - Number(_timestamp)
    if (_timestamp && submissionTime < 3000) {
      // Too fast, likely a bot
      return Response.json({ success: true, id: 'blocked' })
    }

    // Validate required fields
    if (!fullName || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'DevQuest <devquest@contact.anasfiguigui.xyz>',
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Message from ${fullName}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
New Contact Form Submission

Name: ${fullName}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true, id: data.id })
  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
