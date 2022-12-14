import fs from 'fs/promises'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from 'components/Header.js'
import { Grid } from "@nextui-org/react";

export default function Home({comics}) {
  return (
    <div>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <h2>Latest Comics</h2>
        <Grid.Container gap={2} justify="center">
          {
            comics.map(comic => (
              <Grid xs={12} sm={6} md={4} key={comic.id} justify='center'>
                <Link href={`/comic/${comic.id}`}>
                  <h3 style={{textAlign: 'center'}}>{comic.title}</h3>
                  <Image src={comic.img} alt={comic.alt} width={comic.width} height={comic.height} style={{objectFit: 'contain'}} />
                </Link>
              </Grid>
            ))
          }
        </Grid.Container>
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const last6Files = files.slice(-6);
  const promisesReadFiles = last6Files.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)
  return {
    props: {
      comics: latestComics
    }, // will be passed to the page component as props
  }
}