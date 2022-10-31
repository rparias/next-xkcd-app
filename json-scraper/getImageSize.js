import { parse } from 'url'
import { get } from 'https'
import sizeOf from 'image-size'

export const getImageSize = (imgUrl) => {
  return new Promise(resolve => {
    const options = parse(imgUrl)
    get(options, response => {
      const chunks = []
      response.on('data', chunk => {
        chunks.push(chunk)
      }).on('end', () => {
        const buffer = Buffer.concat(chunks)
        const { width, height } = sizeOf(buffer)
        resolve({ width, height });
      })
    })
  })
}
