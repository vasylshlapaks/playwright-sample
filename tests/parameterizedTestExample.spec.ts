import { expect } from '@playwright/test';
import { test } from '../fixtures/metamaskFixture';


test.describe('Check that the fields are required', () => {
  const users = [
    { name: 'test', lastName: 'last'},
    { name: 'new', lastName: 'last new'}
  ];
  const invalidEmails = [' ', 'asdads@msadf'];

  test.beforeEach(async ({ kycScreen }) => {
    await kycScreen.clickPassKycAsIndividualButton();
  });

  for (const user of users) {
    test(`Check the ability to pass KYC with "${user.name} ${user.lastName}" name`, async ({ kycScreen }) => {
      await kycScreen.enterFirstName(user.name);
      await kycScreen.enterLastName(user.lastName);
    });
  }

  for (const email of invalidEmails) {
    test(`Check the ability to pass KYC with "${email}" email`, async ({ kycScreen }) => {
      await kycScreen.enterEmail(email);
      await kycScreen.clickSubmitFormButton();

      await expect(kycScreen.invalidEmailError).toBeVisible();
    });
  }
});
