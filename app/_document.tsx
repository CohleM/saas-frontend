import { Html, Head, Main, NextScript } from 'next/document'
import { useRef } from 'react';

const portalRef = useRef(null);
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        {/* <div id="portal" /> */}
        <NextScript />
      </body>
    </Html>
  )
}