import previewEmail from "preview-email"
var postmark = require("postmark")
type ResetPasswordMailer = {
  to: string
  token: string
}
var client = new postmark.ServerClient("9c6aeaad-149b-48b2-b78f-f811d6231e97")

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN

  const resetUrl = `${origin}/reset-password?token=${token}`

  const html = `
    <h1>Reset Your Password</h1>
    <h3>NOTE: You must set up a production email integration in mailers/forgotPasswordMailer.ts</h3>

    <a href="${resetUrl}">
      Click here to set a new password
    </a>
  `

  const message = {
    From: "support@sprightly.app",
    To: to,
    Subject: "Your Password Reset Instructions",
    HtmlBody: html,
    TextBody: "Your Password Reset Instructions",
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        try {
          await await client.send(message)
        } catch (err) {
          console.error(err)
        }
      } else {
        // Preview email in the browser
        await previewEmail({
          from: "support@sprightly.app",
          to: to,
          html: html,
        })
      }
    },
  }
}
