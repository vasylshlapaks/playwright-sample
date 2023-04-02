import { test } from '../fixtures/baseFixture';
import {expect} from "@playwright/test";

test.describe('Checking google login', () => {
  test('Check google state', async ({ page, googleLoginPage }) => {
    await page.goto('https://accounts.google.com/');
    await expect(page.locator('button[aria-haspopup="dialog"] figure img[srcset]')).toBeVisible();
  });
});
