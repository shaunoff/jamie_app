let postmark = require("postmark")

const client = new postmark.Client(<string>process.env.POSTMARK_API_KEY)

export default client
