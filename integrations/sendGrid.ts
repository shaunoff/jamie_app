import sgMail from "@sendgrid/mail"

sgMail.setApiKey(<string>process.env.SENDGRID_API_KEY)

export default sgMail
