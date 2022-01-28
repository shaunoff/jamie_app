import { Client } from "postmark"

const client = new Client(<string>process.env.POSTMARK_API_KEY)

export default client
