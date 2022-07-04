import {WebPage} from "./webPage";
import {Locator, Page, BrowserContext, expect} from '@playwright/test';
import {MetamaskPage} from "./actions/metamaskPage";
import {timeouts} from "../helpers/timeouts";

export class ConnectWalletScreen extends WebPage {
  readonly connectWalletButton: Locator;
  readonly connectViaMetamaskButton: Locator;
  readonly connectViaMetamaskButtonSelector: string = '[id="connect-METAMASK"]';
  readonly metamaskPage: MetamaskPage;
  readonly connectedStatusButton: Locator;
  readonly helpPopUpButton: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page, context);
    this.connectWalletButton = page.locator('button:text("Connect Wallet")');
    this.connectViaMetamaskButton = page.locator(this.connectViaMetamaskButtonSelector);
    this.connectedStatusButton = page.locator('[id="web3-status-connected"]');
    this.helpPopUpButton = page.locator('[data-testid="launcher"]')
  }

  async connectAndSignMetamask(openedMetamaskPage: Page) {
    const numberOfPagesBeforeSign = await this.context.pages().length;

    await Promise.all([
      this.context.waitForEvent('page', {timeout: timeouts.shortTimeout})
        .then(async (page) => {
          console.log('then');
          
          await page.waitForLoadState();

          await this.metamaskPage.signMetamask(page);
        })
        .catch(async () => {
          await openedMetamaskPage.close();
          console.log('catch');
          const [signPage] = await Promise.all([
            this.context.waitForEvent('page', {timeout: timeouts.shortTimeout}),
            this.page.reload()
          ]);
          await signPage.waitForLoadState();

          await this.metamaskPage.signMetamask(signPage);
        }),

      openedMetamaskPage.click(this.metamaskPage.metamaskElements.connectMetamaskPopUpButton),
    ]);

    const numberOfPagesAfterSign = await this.context.pages().length;
    await expect(numberOfPagesAfterSign).toBe(numberOfPagesBeforeSign - 1);
  }

  async connectMetaMask() {
    await this.connectWalletButton.click();
    const metamaskPopUpPage = await this.openNewPageByClick(this.page, this.connectViaMetamaskButtonSelector);
    await metamaskPopUpPage.click(this.metamaskPage.metamaskElements.nextMetamaskPopUpButton);

  //  const signPage = await this.openNewPageByClick(metamaskPopUpPage, this.metamaskPage.metamaskElements.connectMetamaskPopUpButton);

    await this.connectAndSignMetamask(metamaskPopUpPage);

 //   await signPage.click(this.metamaskPage.metamaskElements.signMetamaskRequestPopUpButton);
    await expect(this.connectedStatusButton).toBeVisible();
  }
}
