import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  //   static async getInitialProps(ctx) {
  //     const sheet = new ServerStyleSheet();
  //     const originalRenderPage = ctx.renderPage;
  //     try {
  //       ctx.renderPage = () =>
  //         originalRenderPage({
  //           enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
  //         });
  //       const initialProps = await Document.getInitialProps(ctx);
  //       return {
  //         ...initialProps,
  //         styles: (
  //           <>
  //             {initialProps.styles}
  //             {sheet.getStyleElement()}
  //           </>
  //         ),
  //       };
  //     } finally {
  //       sheet.seal();
  //     }
  //   }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.0/mapsjs-ui.css?dp-version=1533195059" />
          <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-core.js"></script>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-service.js"></script>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-ui.js"></script>
          <script type="text/javascript" src="https://js.api.here.com/v3/3.0/mapsjs-mapevents.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
