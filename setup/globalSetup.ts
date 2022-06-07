import {downloadMetamask} from "../extensions/exensionsHelpers";
import * as fs from "fs";

const pathToDownloadMetamask = './extensions/metamask.zip';
const pathToExtractedMetamask = './extensions/metamaskFiles-master';

async function globalSetup() {
  let metamaskExists = await fs.existsSync(pathToExtractedMetamask);

  if (!metamaskExists) {
    await downloadMetamask(pathToDownloadMetamask);
  }
}

export default globalSetup;

