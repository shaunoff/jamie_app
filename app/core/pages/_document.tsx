import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/ } from "blitz"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead>
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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&family=Quicksand:wght@300;500;700&display=swap"
            rel="stylesheet"
          />
        </DocumentHead>
        <body className="h-full bg-gray-100">
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
