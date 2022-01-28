import postmark from "postmark"

const client = new postmark.ServerClient(<string>process.env.POSTMARK_API_KEY)

export default client
