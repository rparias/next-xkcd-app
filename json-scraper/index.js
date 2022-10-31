import fs from "fs-extra";
import axios from "axios";
import { getImageSize } from "./getImageSize.js";

const log = (...args) => console.log('json-scraper] ', ...args);

const INITIAL_ID_XKCD_COMIC = 2500;
const MAX_ID_XKCK_COMIC = 2600;

for (let id = INITIAL_ID_XKCD_COMIC; id < MAX_ID_XKCK_COMIC; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`;
  log(`Fetching ${url}...`);

  const { data } = await axios.get(url);
  const { num, news, transcript, img, ...restOfComic } = data;
  log(`Fetched comic #${num}. Getting image dimensions...`);

  const { width, height } = await getImageSize(img);
  log(`Got image dimensions: ${width}x${height}`);

  const comicToStore = {
    id,
    img,
    width,
    height,
    ...restOfComic
  }
  const jsonFile = `../comics/${id}.json`;
  await fs.writeJSON(jsonFile, comicToStore);
  log(`Wrote ${jsonFile}! ✅`);
}