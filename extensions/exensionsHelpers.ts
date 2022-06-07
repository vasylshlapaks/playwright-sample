import {downloadFile} from "../helpers/api/downloadFile";
const extract = require('extract-zip');

const metamaskLink = 'https://github.com/vasylshlapaks/metamaskFiles/archive/refs/heads/master.zip';

export const downloadMetamask = async (pathToSaveMetamask: string) => {
  await downloadFile(metamaskLink, pathToSaveMetamask);
  await extract(pathToSaveMetamask, { dir: __dirname });
};
