import sgMail from "@sendgrid/mail"

console.log("fhgdshjfgsdjhgfdjh", process.env.SENDGRID_API_KEY)
sgMail.setApiKey(<string>process.env.SENDGRID_API_KEY)
//sgMail.setApiKey("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")

export default sgMail
