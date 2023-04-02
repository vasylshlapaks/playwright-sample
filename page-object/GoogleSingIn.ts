import { BrowserContext, Locator, Page, expect } from '@playwright/test';
import { WebPage } from './WebPage';

export class GoogleSingIn extends WebPage {
  readonly emailField: Locator;
  readonly nextButton: Locator;
  readonly passwordField: Locator;
  readonly nextButtonOnPasswordStep: Locator;
  readonly confirmEmailForRecoveryButton: Locator;
  readonly submitRecoveryEmailButton: Locator;
  readonly approveGmailAccessButton: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.emailField = page.locator('[type="email"]');
    this.passwordField = page.locator('[type="password"]');

    // google sign in modal is different for headless and non-headless mode
    this.nextButton = page.locator('#identifierNext');
    this.nextButtonOnPasswordStep = page.locator('#passwordNext');
    this.confirmEmailForRecoveryButton = page.locator('[data-challengeindex="2"]');
    this.submitRecoveryEmailButton = page.locator('[type="button"]').nth(0);
    this.approveGmailAccessButton = page.locator('#submit_approve_access');
  }

  async enterEmail(email: string) {
    await this.emailField.clear();
    await this.emailField.type(email);
  }

  async enterPassword(password: string) {
    await this.passwordField.clear();
    await this.passwordField.type(password);
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  async clickNextButtonOnPasswordStep() {
    await this.nextButtonOnPasswordStep.click();
  }

  async loginToGoogleAccount(email: string, password = 'default') {
    await this.enterEmail(email);
    await this.clickNextButton();
    await this.enterPassword(password);
    await this.clickNextButtonOnPasswordStep();
  }

  async approveAccountIfVerificationNeeded(recoveryEmail: string) {
    await expect(this.nextButtonOnPasswordStep).not.toBeVisible();
    await this.page.waitForLoadState();

    if (await this.confirmEmailForRecoveryButton.isVisible()) {
      await this.confirmEmailForRecoveryButton.click();
      await this.enterEmail(recoveryEmail);
      await this.submitRecoveryEmailButton.click();
    }
  }

  async selectAccount(email: string) {
    await this.page.waitForLoadState();
    const accountRow = await this.page.locator(`[data-identifier="${email}"]`);
    await accountRow.click();
  }
}
