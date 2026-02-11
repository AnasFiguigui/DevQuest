import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function generateEmailTemplate({ fullName, email, phone, message }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                ✉️ New Message
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                Someone reached out through DevQuest
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Sender Info Card -->
              <table role="presentation" style="width: 100%; background-color: #f8fafc; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="width: 48px; vertical-align: top;">
                          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ffffff; font-size: 20px; font-weight: 600; line-height: 48px; text-align: center; display: block; width: 100%;">${fullName.charAt(0).toUpperCase()}</span>
                          </div>
                        </td>
                        <td style="padding-left: 16px; vertical-align: top;">
                          <p style="margin: 0; font-size: 18px; font-weight: 600; color: #18181b;">${fullName}</p>
                          <p style="margin: 4px 0 0 0; font-size: 14px; color: #71717a;">
                            <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
                          </p>
                          ${phone ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #71717a;">📱 ${phone}</p>` : ''}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <div style="margin-bottom: 32px;">
                <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #a1a1aa;">
                  Message
                </p>
                <div style="background-color: #fafafa; border-left: 4px solid #6366f1; padding: 20px; border-radius: 0 8px 8px 0;">
                  <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #3f3f46; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <!-- Quick Actions -->
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    <a href="mailto:${email}?subject=Re: Your message on DevQuest" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 14px; font-weight: 600; letter-spacing: 0.3px;">
                      Reply to ${fullName.split(' ')[0]}
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 24px 40px; border-top: 1px solid #e4e4e7;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0; font-size: 13px; color: #a1a1aa;">
                      Sent from <a href="https://anasfiguigui.xyz" style="color: #6366f1; text-decoration: none; font-weight: 500;">DevQuest</a> contact form
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #d4d4d8;">
                      ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

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
      subject: `New message from ${fullName}`,
      replyTo: email,
      html: generateEmailTemplate({ fullName, email, phone, message }),
      text: `
New Contact Form Submission

From: ${fullName}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Sent from DevQuest contact form
      `.trim(),
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
