import {WebPage} from "../webPage";
import {Page, BrowserContext, expect} from '@playwright/test';
import {MetamaskPageElements} from "../elements/metamaskPageElements";
import {timeouts} from "../../helpers/timeouts";

export class MetamaskPage extends WebPage {
  readonly context: BrowserContext;
  readonly metamaskElements: MetamaskPageElements;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskElements = new MetamaskPageElements(page);
    this.context = context;
  }

  async makeSureMetamaskLoaded() {
    await this.metamaskElements.confirmButton.waitFor({timeout: timeouts.shortTimeout})
      .catch(async () => {
        await this.reloadPage();
      });
  }

  async enterRecoveryPhrase(recoveryPhrase: string) {
    const arrayOfWords = recoveryPhrase.split(" ");
    const listOfFields = await this.metamaskElements.secretWord.elementHandles();

    for (let i=0; i<listOfFields.length; i++) {
      await listOfFields[i].fill(arrayOfWords[i]);
    }
  }

  async fullyLoginToMetamask(recoveryPhrase: string, password: string) {
    if (!recoveryPhrase) throw new Error('Recovery phrase for Metamask is not set');
    if (!password) throw new Error('Password for Metamask is not set');

    // proceed to recovery phrase
    await this.metamaskElements.confirmButton.click();
    await this.metamaskElements.iAmNewButton.click();
    await this.metamaskElements.nextButton.click();

    // enter recovery phrase and password
    await this.enterRecoveryPhrase(recoveryPhrase);
    await this.metamaskElements.passwordField.fill(password);
    await this.metamaskElements.confirmPasswordField.fill(password);
    await this.metamaskElements.createNewWalletCheckbox.click();
    await this.metamaskElements.confirmButton.click();
    await expect(this.metamaskElements.endOfFlowEmoji).toBeVisible();
    await this.page.waitForTimeout(timeouts.tinyTimeout);

    // open wallet and close info pop-up
    await this.metamaskElements.confirmButton.click();
    await this.metamaskElements.closeInfoPopUp.click();
  }

  async openAccountDetails() {
    await this.metamaskElements.optionMenuButton.click();
    await this.metamaskElements.accountDetailsMenuButton.click();
  }

  async connectAndSignMetamask(openedMetamaskPage: Page) {
    await Promise.all([
      this.context.waitForEvent('page', {timeout: timeouts.shortTimeout})
        .then(async (page) => {
          console.log('then');
          console.log(this.context.pages().length);
          const signButton = page.locator(this.metamaskElements.signMetamaskRequestPopUpButton);

          await signButton.click();
          await page.waitForEvent('close')
          console.log('after close then');
          console.log(this.context.pages().length);
        })
        .catch(async () => {
          console.log('catch');
          console.log(this.context.pages().length);
          const signButton = openedMetamaskPage.locator(this.metamaskElements.signMetamaskRequestPopUpButton);

          await signButton.click();
          await openedMetamaskPage.waitForEvent('close')
          console.log('after close catch');
          console.log(this.context.pages().length);
        }),
      openedMetamaskPage.click(this.metamaskElements.connectMetamaskPopUpButton)
    ]);
  }
}
