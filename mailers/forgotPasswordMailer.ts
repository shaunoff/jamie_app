import previewEmail from "preview-email"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shaunoff@googlemail.com",
    pass: "Woodbird966%", // naturally, replace both with your real credentials or an application-specific password
  },
})

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN

  const resetUrl = `${origin}/reset-password?token=${token}`

  const html = `
    <h1>Reset Your Password</h1>

    <a href="${resetUrl}">
      Click here to set a new password
    </a>
  `

  const message = {
    from: "shaunoff@googlemail.com",
    to: to,
    subject: "Your Password Reset Instructions",
    html: html,
    text: "Your Password Reset Instructions",
  }

  return {
    async send() {
      if (true) {
        try {
          await await transporter.sendMail(message)
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
