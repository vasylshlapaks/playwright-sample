import  {expect} from "@playwright/test";
import { Web3Helpers} from '../helpers/web3/web3'
import { test } from '../fixtures/metamaskFixture';
import {metamaskWallet} from "../helpers/web3/metamaskData";

test.describe('Check connection of wallet', () => {
  test(`Check the ability to connect Metamask`, async ({ page }) => {
    const web3 = new Web3Helpers();
    const secondWallet = '0xe2943d1fc805bea8b8b39f3a5c0e1e53ba8c945a';
    const valueToSend = 0.00001;
    const balanceOfSeccondWallet = await web3.getEthBalance(secondWallet);

    await web3.sendCrypto(metamaskWallet, secondWallet, valueToSend);

    await expect(parseFloat(await web3.getEthBalance(secondWallet))).toBeCloseTo(parseFloat(balanceOfSeccondWallet) + valueToSend);
  });
});
