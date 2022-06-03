import { expect, test } from '@playwright/test';

import { screenshotMatching, navigate } from '../lib/helpers/helpers';
import { alty_cmd_stage } from '../lib/helpers/credentials';

test('Check Snapshot making', async ({ page }, testInfo) => {
  await navigate(alty_cmd_stage.URL, page);
  await screenshotMatching(testInfo.title, expect, page, 0.7);
});
test('Check Snapshot making second', async ({ page }, testInfo) => {
  await navigate(alty_cmd_stage.URL, page);
  await screenshotMatching(testInfo.title, expect, page, 0.7);
});
