import { Resend } from 'resend'

/**
 * Vercel Serverless Function: POST /api/contact
 * Handles official direct email inquiries sent from the portfolio contact modal.
 *
 * Environment Variables:
 * - RESEND_API_KEY: Resend API Key (configured in Vercel dashboard)
 * - CONTACT_EMAIL: Target inbox email (defaults to rayyanqatrunada3@gmail.com)
 */
export default async function handler(req, res) {
  // Set CORS headers if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  try {
    const { name, email, subject, message } = req.body || {}

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Sender name is required.' })
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Sender email is required.' })
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message content is required.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    const apiKey = process.env.RESEND_API_KEY
    const targetEmail = process.env.CONTACT_EMAIL || 'rayyanqatrunada3@gmail.com'

    // If API key is not yet set up (e.g. local preview or initial deployment),
    // return a clean mock response so the frontend functions gracefully
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set in environment variables.')
      return res.status(200).json({
        success: true,
        mock: true,
        message: 'Message received in development mode (configure RESEND_API_KEY in Vercel to deliver to live inbox).',
      })
    }

    const resend = new Resend(apiKey)

    const formattedTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Jakarta',
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date())

    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanSubject = (subject && subject.trim()) || 'Direct Technical Inquiry'
    const cleanMessage = message.trim()

    const { data, error } = await resend.emails.send({
      from: 'Rayy Portfolio <onboarding@resend.dev>',
      to: [targetEmail],
      replyTo: `${cleanName} <${cleanEmail}>`,
      subject: `[Portfolio Inquiry] ${cleanSubject} — from ${cleanName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 24px; color: #111; }
            .card { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #000000; padding: 32px; box-sizing: border-box; }
            .header-mono { font-family: 'JetBrains Mono', monospace, Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #777; margin-bottom: 6px; }
            .title { font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; margin: 0 0 20px 0; border-bottom: 1px solid #000000; padding-bottom: 14px; }
            .row { display: flex; padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
            .label { font-family: 'JetBrains Mono', monospace, Courier, monospace; font-size: 11px; text-transform: uppercase; color: #666; width: 140px; shrink: 0; }
            .val { font-weight: 500; color: #000; }
            .msg-box { margin-top: 24px; padding: 18px; background: #fafafa; border-left: 3px solid #000000; font-size: 14px; line-height: 1.6; white-space: pre-wrap; font-family: inherit; }
            .footer-note { margin-top: 28px; padding-top: 14px; border-top: 1px solid #eee; font-family: 'JetBrains Mono', monospace, Courier, monospace; font-size: 11px; color: #888; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header-mono">RAYY.DEV · OFFICIAL DIRECT TRANSMISSION</div>
            <h1 class="title">New Client Inquiry</h1>

            <div class="row">
              <div class="label">SENDER:</div>
              <div class="val">${cleanName}</div>
            </div>
            <div class="row">
              <div class="label">OFFICIAL EMAIL:</div>
              <div class="val"><a href="mailto:${cleanEmail}" style="color: #000; text-decoration: underline;">${cleanEmail}</a></div>
            </div>
            <div class="row">
              <div class="label">PROJECT SCOPE:</div>
              <div class="val">${cleanSubject}</div>
            </div>
            <div class="row">
              <div class="label">DATE / TIME:</div>
              <div class="val">${formattedTime} WIB</div>
            </div>

            <div style="margin-top: 20px;">
              <div class="header-mono">TRANSMITTED MESSAGE:</div>
              <div class="msg-box">${cleanMessage}</div>
            </div>

            <div class="footer-note">
              Press <strong>Reply</strong> in your email client to respond directly to <strong>${cleanEmail}</strong>.
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend delivery error:', error)
      return res.status(500).json({ error: error.message || 'Delivery error.' })
    }

    return res.status(200).json({ success: true, id: data?.id })
  } catch (err) {
    console.error('API Contact Handler Error:', err)
    return res.status(500).json({ error: err.message || 'Internal server error.' })
  }
}
