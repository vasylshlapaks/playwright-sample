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
        await this.page.waitForTimeout(timeouts.tinyTimeout)
      });
  }

  async enterRecoveryPhrase(recoveryPhrase: string) {
    const arrayOfWords = recoveryPhrase.split(" ");
    const listOfFields = await this.metamaskElements.secretWord.elementHandles();

    for (let i=0; i<listOfFields.length; i++) {
      await listOfFields[i].fill(arrayOfWords[i]);
    }
  }


  async proceedToRecoveryPhrase() {
    await this.metamaskElements.confirmButton.click();
    await this.metamaskElements.iAmNewButton.click();
    await this.metamaskElements.nextButton.click();

    await expect(this.metamaskElements.passwordField).toBeVisible()
      .catch(async () => {
        await this.metamaskElements.confirmButton.click();
        await this.metamaskElements.iAmNewButton.click();
        await this.metamaskElements.nextButton.click();
      })
  }

  async fullyLoginToMetamask(recoveryPhrase: string, password: string) {
    if (!recoveryPhrase) throw new Error('Recovery phrase for Metamask is not set');
    if (!password) throw new Error('Password for Metamask is not set');

    await this.proceedToRecoveryPhrase();

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

  async signMetamask(page: Page) {
    const signButton = page.locator(this.metamaskElements.signMetamaskRequestPopUpButton);

    await Promise.all([
      page.waitForEvent('close'),
      signButton.click()
    ]);
  }

  async enterPasswordsForNewWallet(password: string) {
    await this.metamaskElements.createPasswordField.fill(password);
    await this.metamaskElements.confirmPasswordField.fill(password)
  }

  async selectTermsCheckbox() {
    await this.metamaskElements.termsCheckbox.click()
  }

  async clickCreateNewWalletButton() {
    await this.metamaskElements.confirmButton.click()
  }

  async getSeedPhrase() {
    await this.metamaskElements.revealSeedPhraseButton.click();
    return await this.metamaskElements.seedPhraseBlock.textContent();
  }

  async selectSeedPhraseInCorrectOrder(seedPhrase: string) {
    const arrayOfWords =  seedPhrase.split(" ");

    for (const word of arrayOfWords) {
      let wordSelector = this.page.locator(`[data-testid="draggable-seed-${word}"]`);

      await wordSelector.click();
    }
  }

  async changeNetworkTo(network: String) {
    await this.metamaskElements.networksDropdown.click();
    await this.metamaskElements.showTestNetworksButton.click();
    await this.metamaskElements.showTestNetworksToggle.click();
    await this.metamaskElements.networksDropdown.click();

    const networkToSelect = this.page.locator(`//span[contains(text(), "${network}")]`)
    await networkToSelect.click();
  }
}
