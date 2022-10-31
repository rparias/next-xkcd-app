import Head from 'next/head'
import Image from 'next/image'
import { Header } from 'components/Header.js'
import { readFile } from 'fs/promises'

export default function Comic ({ img, alt, title, width, height }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <section>
          <h1>{title}</h1>
          <Image src={img} alt={alt} width={width} height={height} style={{objectFit: 'contain'}} />
          <p>{alt}</p>
        </section>  
      </main>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '2500' } } //2500 for testing
    ],
    fallback: false // false or 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, 'utf-8')
  const comic = JSON.parse(content)

  return {
    props: {
      ...comic
    }, // will be passed to the page component as props
  }
}