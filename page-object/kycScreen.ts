import {WebPage} from "./webPage";
import {Locator, Page, BrowserContext, expect} from '@playwright/test';

export class KycScreen extends WebPage {
  readonly passKycAsIndividualButton: Locator;
  readonly nameField: Locator;
  readonly lastNameField: Locator;
  readonly emailAddressField: Locator;
  readonly submitFormButton: Locator;
  readonly invalidEmailError: Locator;

  invalidEmailErrorText = 'Invalid email';

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.passKycAsIndividualButton = page.locator('[href="#/kyc/individual"]');
    this.nameField = page.locator('(//input)[1]');
    this.lastNameField = page.locator('(//input)[2]');
    this.emailAddressField = page.locator('(//input)[9]');
    this.submitFormButton = page.locator('button[type="submit"]');
    this.invalidEmailError = page.locator(`text="${this.invalidEmailErrorText}"`)
  }

  async clickPassKycAsIndividualButton() {
    await this.passKycAsIndividualButton.click();
  }

  async enterFirstName(firstName: string) {
    await this.nameField.fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastNameField.fill(lastName);
  }

  async enterEmail(email: string) {
    await this.emailAddressField.fill(email);
  }

  async clickSubmitFormButton() {
    await this.submitFormButton.click()
  }
}
