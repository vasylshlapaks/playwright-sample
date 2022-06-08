import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';
import {MetamaskPage} from "./metamaskPage";

export class ConnectWalletPage extends WebPage {
  readonly connectWalletButton: Locator;
  readonly connectViaMetamaskButton: Locator;
  readonly metamaskPage: MetamaskPage;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page);
    this.connectWalletButton = page.locator('button:text("Connect Wallet")');
    this.connectViaMetamaskButton = page.locator('[id="connect-METAMASK"]');
  }

  async connectMetaMask() {
    await this.connectWalletButton.click();
    const metamaskPopUpPage = await this.openNewPageBy(this.connectViaMetamaskButton.click());

    await metamaskPopUpPage.click(this.metamaskPage.nextMetamaskPopUpButton);
    const metamaskSignPopUpPage = await this.openNewPageBy(metamaskPopUpPage.click(this.metamaskPage.connectMetamaskPopUpButton));
    await metamaskSignPopUpPage.click(this.metamaskPage.signMetamaskRequestPopUpButton);
  }
}
