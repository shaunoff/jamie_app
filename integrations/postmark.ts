const postmark = require("postmark")
import * as PostmarkTypes from "postmark"

const client: PostmarkTypes.ServerClient = new postmark.ServerClient(
  <string>process.env.POSTMARK_API_KEY
)

export default client
