import {WebPage} from "./webPage";
import { Locator, Page, BrowserContext} from '@playwright/test';
import {MetamaskPage} from "./actions/metamaskPage";

export class ConnectWalletScreen extends WebPage {
  readonly connectWalletButton: Locator;
  readonly connectViaMetamaskButton: Locator;
  readonly connectViaMetamaskButtonSelector: string = '[id="connect-METAMASK"]';
  readonly metamaskPage: MetamaskPage;
  readonly connectedStatusButton: Locator;
  readonly helpPopUpButton: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page);
    this.connectWalletButton = page.locator('button:text("Connect Wallet")');
    this.connectViaMetamaskButton = page.locator(this.connectViaMetamaskButtonSelector);
    this.connectedStatusButton = page.locator('[id="web3-status-connected"]');
    this.helpPopUpButton = page.locator('[data-testid="launcher"]')
  }

  async connectMetaMask() {
    await this.connectWalletButton.click();
    const metamaskPopUpPage = await this.openNewPageByClick(this.page, this.connectViaMetamaskButtonSelector);

    await metamaskPopUpPage.click(this.metamaskPage.metamaskElements.nextMetamaskPopUpButton);
    const metamaskSignPopUpPage = await this.openNewPageByClick(metamaskPopUpPage, this.metamaskPage.metamaskElements.connectMetamaskPopUpButton);
    await metamaskSignPopUpPage.click(this.metamaskPage.metamaskElements.signMetamaskRequestPopUpButton);
  }
}
