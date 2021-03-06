import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
const withPWA = require("next-pwa")

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "sprightly",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  env: {
    GOOGLE_MAPS: "AIzaSyC5reto2smbU9JjznWM1EAWN8nuTZXdiaw",
  },
  // pwa: {
  //   dest: "public",
  // },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = withPWA(config)
