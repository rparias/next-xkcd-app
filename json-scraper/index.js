import fs from "fs-extra";
import axios from "axios";

const INITIAL_ID_XKCD_COMIC = 2500;
const MAX_ID_XKCK_COMIC = 2600;

for (let id = INITIAL_ID_XKCD_COMIC; id < MAX_ID_XKCK_COMIC; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`;
  const { data } = await axios.get(url);
  const { num, news, transcript, ...restOfComic } = data;
  const comicToStore = {
    id,
    ...restOfComic
  }
  console.log(comicToStore);
  await fs.writeJSON(`../comics/${id}.json`, comicToStore);
}