import { test } from '../lib/fixtures/objects-as-default-fixture-to-test';
import { expect } from '@playwright/test';

import { emailCreate, navigate, typeText, getText } from '../lib/helpers/helpers';
import { alty_cmd_stage } from '../lib/helpers/credentials';
import { groups, notifications } from '../lib/helpers/text-helpers';
import { Login } from '../lib/page-objects/authentication';

const email = emailCreate();

test.describe('Checking all functions on the CMD dashboard', () => {
  let auth;
  // User registration for use in tests below
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    auth = new Login(page);
    await navigate(alty_cmd_stage.URL, page);
    await auth.registration(email, alty_cmd_stage.PASSWORD);
    await auth.confirmation(email, 0);
    await page.close();
  });

  test.beforeEach(async ({ page, login }) => {
    await navigate(alty_cmd_stage.URL, page);
    await login.login(email, alty_cmd_stage.PASSWORD);
  });

  test('Check the ability to add WhatsApp group to the community ', async ({ cmd }) => {
    await cmd.addGroupToCMD(groups.WHATS_APP.link);
    await cmd.checkThatTheGroupWasAdded('ahaha-Test-alty', expect);
  });

  test('Check the ability to add Telegram group to the community ', async ({ cmd }) => {
    await cmd.addGroupToCMD(groups.TELEGRAM.link);
    await cmd.checkThatTheGroupWasAdded('Cherkasy_Job', expect);
  });
});
