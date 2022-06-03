import { test, expect } from '@playwright/test';

import { stackoverflow } from '../lib/helpers/text-helpers';
import { alty_cmd_stage } from '../lib/helpers/credentials';
import { navigate } from '../lib/helpers/helpers';

test.describe('Set up route on the entire browser context.', () => {
  test.beforeEach(async ({ context }) => {
    // Block any css requests for each test in this file.
    await context.route(/.css/, route => route.abort());
  });

  test('loads page without css', async ({ page }) => {
    await navigate(stackoverflow.LINK, page);
    //Check that the css styles are disabled
    const fontSize = await page.$eval('div', el => window.getComputedStyle(el).fontSize);
    expect(fontSize === '16px').toBeTruthy();
    // ... test goes here
  });
});

test.describe('Set up route on the entire browser context.', () => {
  test.beforeEach(async ({ context }) => {
    await context.route('**/api/login', route =>
      route.fulfill({
        status: 200,
        body: 'accept',
      }),
    );
  });

  test('loads page without css', async ({ page }) => {
    await navigate(alty_cmd_stage.URL, page);
  });
});
