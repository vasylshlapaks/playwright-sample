import  {expect} from "@playwright/test";
import { Web3Helpers} from '../helpers/web3/web3'
import { test } from '../fixtures/baseFixture';
import {metamaskWallet} from "../helpers/web3/metamaskData";

test.describe('Check sending of crypto via web3', () => {
  test(`Check sending of kova via web3`, async ({ page }) => {
    const web3 = new Web3Helpers();
    const secondWallet = '0xe2943d1fc805bea8b8b39f3a5c0e1e53ba8c945a';
    const valueToSend = 0.00001;
    const balanceOfSeccondWallet = await web3.getEthBalance(secondWallet);

    await web3.sendCrypto(metamaskWallet, secondWallet, valueToSend);

    await expect(parseFloat(await web3.getEthBalance(secondWallet))).toBeCloseTo(parseFloat(balanceOfSeccondWallet) + valueToSend, 5);
  });
});
