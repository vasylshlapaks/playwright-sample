import { test, expect } from '@playwright/test';
import { navigate } from '../lib/helpers/helpers';
import { alty_cmd_stage } from '../lib/helpers/credentials';


test.describe('Checking all functions on the CMD dashboard', () => {
  // User registration for use in tests below

  test.beforeEach(async ({ page }) => {
    await page.addInitScript({ path: './lib/helpers/addScriptToTest.js' });
  });

  test('Check that the script was added to page', async ({ page, context }) => {
    await navigate(alty_cmd_stage.URL, page);
    expect(context.pages().length).toBe(2);
  });
});
