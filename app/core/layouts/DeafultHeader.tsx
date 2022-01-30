import { Head } from "blitz"

const DefaultHeader = ({ title }: { title: string }) => (
  <Head>
    <title>{title || "sprightly"}</title>
    <link rel="icon" href="/favicon.ico" />
    <meta name="application-name" content="Sprightly" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="PWA App" />
    <meta name="description" content="Best PWA App in the world" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="msapplication-TileColor" content="#2B5797" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="theme-color" content="#000000" />
    {/* Android */}
    <meta name="theme-color" content="red"></meta>
    <meta name="mobile-web-app-capable" content="yes" />
    {/* iOS */}
    <link rel="apple-touch-icon" sizes="180x180" href="/192"></link>
    <meta name="apple-mobile-web-app-title" content="Sprightly" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />

    <link rel="icon" type="image/png" sizes="32x32" href="/32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/16.png" />
    <link rel="shortcut icon" href="/32.png" />
    <link rel="manifest" href="/manifest.json" />
  </Head>
)

export default DefaultHeader
