import {WebPage} from "../webPage";
import {Page, BrowserContext, expect} from '@playwright/test';
import {MetamaskPageElements} from "../elements/metamaskPageElements";

export class MetamaskPage extends WebPage{
  readonly context: BrowserContext;
  readonly metamaskElements: MetamaskPageElements;

  constructor(page: Page, context?: BrowserContext) {
    super(page);
    this.metamaskElements = new MetamaskPageElements(page);
    this.context = context;
  }

  async enterRecoveryPhrase(recoveryPhrase: string) {
    const arrayOfWords = recoveryPhrase.split(" ");
    const listOfFields = await this.metamaskElements.secretWord.elementHandles();

    for (let i=0; i<listOfFields.length; i++) {
      await listOfFields[i].fill(arrayOfWords[i]);
    }
  }

  async fullyLoginToMetamask(recoveryPhrase: string, password: string) {
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
    await this.page.waitForTimeout(3000);

    // open wallet and close info pop-up
    await this.metamaskElements.confirmButton.click();
    await this.metamaskElements.closeInfoPopUp.click();
  }

  async openAccountDetails() {
    await this.metamaskElements.optionMenuButton.click();
    await this.metamaskElements.accountDetailsMenuButton.click();
  }
}