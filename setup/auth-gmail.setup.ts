import { test as setup } from '@playwright/test';
import * as fs from 'fs';
import { GMAIL_EMAILS, GMAIL_USER } from '../helpers/data/userData';
import { GoogleSingIn } from '../page-object/GoogleSingIn';

const googleLoginUrl = 'https://accounts.google.com/';

setup('authenticate as gmail user', async ({ browser }) => {
  for (const email of GMAIL_EMAILS) {
    const filePath = `setup/${email}.json`;

    if (!fs.existsSync(filePath)) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const googleLoginPage = new GoogleSingIn(page);

      await page.goto(googleLoginUrl);
      await googleLoginPage.loginToGoogleAccount(email, GMAIL_USER.PASSWORD);
      await googleLoginPage.approveAccountIfVerificationNeeded(GMAIL_USER.RECOVERY_EMAIL);
      await page.waitForTimeout(5000);
      await page.context().storageState({ path: filePath });
      console.log(await page.context().cookies());
      await context.close();
    }
  }
});
