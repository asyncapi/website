import Head from 'next/head'

export default function WorkshopPreregistrationPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <title>Pre-register Workshop</title>
        <style type="text/css">{`
          html {
            margin: 0;
            height: 100%;
            overflow: hidden;
          }

          iframe {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            border: 0;
          }`}
        </style>
      </Head>
      <iframe id="typeform-full" width="100%" height="100%" frameborder="0"
        src="https://asyncapiinitiative.typeform.com/to/r9YLG4" />
      <script type="text/javascript" src="https://embed.typeform.com/embed.js" />
    </>
  )
}