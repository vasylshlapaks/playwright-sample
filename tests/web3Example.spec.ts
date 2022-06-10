import { Web3Helpers} from '../helpers/web3/web3'
import { test } from '../fixtures/metamaskFixture';
import {metamaskWallet} from "../helpers/web3/metamaskData";

test.describe('Check connection of wallet', () => {
  test(`Check the ability to connect Metamask`, async ({ page }) => {
    const secondWallet = '0xe2943d1fc805bea8b8b39f3a5c0e1e53ba8c945a';
    const web3 = new Web3Helpers();

    console.log(await web3.getEthBalance(secondWallet));
    await web3.sendCrypto(metamaskWallet, secondWallet, '0.00001');
    console.log(await web3.getEthBalance(secondWallet));
  });
});
