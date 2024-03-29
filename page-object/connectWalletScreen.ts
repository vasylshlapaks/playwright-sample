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
  readonly loaderIcon: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page, context);
    this.connectWalletButton = page.locator('button:text("Connect Wallet")');
    this.connectViaMetamaskButton = page.locator(this.connectViaMetamaskButtonSelector);
    this.connectedStatusButton = page.locator('[id="web3-status-connected"]');
    this.helpPopUpButton = page.locator('[data-testid="launcher"]');
    this.loaderIcon = page.locator('img[alt="Loading..."]')
  }

  async clickConnectWalletButton() {
    await this.connectWalletButton.click();
  }

  /*
  Method checks if there are new sign requests and sign them
  this is needed for correct working of tests
  when they are running in parallel
  */

  async signMetamaskConnectionIfRequestAppeared() {
    let triesLeft = 5;

    do {
      await this.loaderIcon.waitFor({state: "detached", timeout: timeouts.shortTimeout});
      await this.page.waitForTimeout(timeouts.timeoutForSignWindow);

      const pages = this.context.pages().length;

      if (pages > 3) {
        const signPage = this.context.pages()[3];
        await this.metamaskPage.signMetamask(signPage);
      }
      triesLeft--
    } while (triesLeft);
  }

  async connectAndSignMetamask(openedMetamaskPage: Page) {
    await Promise.all([
      this.context.waitForEvent('page', {timeout: timeouts.shortTimeout})
        .then(async () => {
          const signPage = this.context.pages()[3];
          await this.metamaskPage.signMetamask(signPage);
        })
        .catch(async () => {
          const signPage = this.context.pages()[3];
          await this.metamaskPage.signMetamask(signPage);
        }),

      openedMetamaskPage.click(this.metamaskPage.metamaskElements.connectMetamaskPopUpButton),
    ]);

    await this.signMetamaskConnectionIfRequestAppeared();
  }

  async connectMetaMask() {
    await this.clickConnectWalletButton();
    const metamaskPopUpPage = await this.openNewPageByClick(this.page, this.connectViaMetamaskButtonSelector);
    await metamaskPopUpPage.click(this.metamaskPage.metamaskElements.nextMetamaskPopUpButton);

    await this.connectAndSignMetamask(metamaskPopUpPage);

    await expect(this.connectedStatusButton).toBeVisible();
  }
}
