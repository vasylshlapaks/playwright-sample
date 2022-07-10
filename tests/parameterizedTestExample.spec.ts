import { expect } from '@playwright/test';
import { test } from '../fixtures/metamaskFixture';


test.describe('Check that the fields are required', () => {
  const users = [
    { name: 'test', lastName: 'last'},
    { name: 'new', lastName: 'last new'}
  ];
  const invalidEmails = [' ', 'asdads@msadf'];

  for (const user of users) {
    test(`Check the ability to pass KYC with "${user.name} ${user.lastName}" name`, async ({ page, kycScreen, context }) => {
      await kycScreen.passKycAsIndividualButton.click();
      await kycScreen.nameField.fill(user.name);
      await kycScreen.lastNameField.fill(user.lastName);
    });
  }

  for (const email of invalidEmails) {
    test(`Check the ability to pass KYC with "${email}" email`, async ({ page, kycScreen, context }) => {
      await kycScreen.passKycAsIndividualButton.click();
      await kycScreen.emailAddressField.fill(email);
      await kycScreen.submitFormButton.click();

      await expect(kycScreen.invalidEmailError).toBeVisible();
    });
  }
});
