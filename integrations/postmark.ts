var postmark = require("postmark")

var client = new postmark.ServerClient(<string>process.env.POSTMARK_API_KEY || "apiString")
export default client
