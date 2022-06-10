import { test, expect } from '@playwright/test';
import { AltyCMD } from '../lib/page-objects/alty-cmd';

import { waitForText, emailCreate, navigate, typeText, getText } from '../lib/helpers/helpers';
import { alty_cmd_stage } from '../lib/helpers/credentials';
import { groups, notifications } from '../lib/helpers/text-helpers';
import { CUSTOM_ALERT } from '../lib/selectors/base';
import { Login } from '../lib/page-objects/authentication';

const email = emailCreate();

test.describe('Checking all functions on the CMD dashboard', () => {
  let auth;
  let dashboard;

  // User registration for use in tests below
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    auth = new Login(page);
    dashboard = new AltyCMD(page);
    await navigate(alty_cmd_stage.URL, page);
    await auth.registration(email, alty_cmd_stage.PASSWORD);
    await auth.confirmation(email, 0);
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    auth = new Login(page);
    dashboard = new AltyCMD(page);
    await navigate(alty_cmd_stage.URL, page);
    await auth.login(email, alty_cmd_stage.PASSWORD);
  });

  test('Check the ability to add WhatsApp group to the community ', async ({}) => {
    await dashboard.addGroupToCMD(groups.WHATS_APP.link);
    await dashboard.checkThatTheGroupWasAdded('ahaha-Test-alty', expect);
  });

  test('Check the ability to add Telegram group to the community ', async ({}) => {
    await dashboard.addGroupToCMD(groups.TELEGRAM.link);
    await dashboard.checkThatTheGroupWasAdded('Cherkasy_Job', expect);
  });
});
