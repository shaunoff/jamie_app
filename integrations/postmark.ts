var postmark = require("postmark")
// import * as PostmarkTypes from "postmark"

// const client: PostmarkTypes.ServerClient = new postmark.ServerClient(
//   <string>process.env.POSTMARK_API_KEY || "xxx"
// )

var client = new postmark.ServerClient("9c6aeaad-149b-48b2-b78f-f811d6231e97")
export default client
