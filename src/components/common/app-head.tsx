import Head from 'next/head';

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>X</title>
      <meta name='og:title' content='X' />
      <link rel='icon' type='image/svg+xml' href='/x-logo.svg' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <meta name='twitter:site' content='@ccrsxx' />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
}
