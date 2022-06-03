// hello.ts
import { test as base } from '@playwright/test';
import { Browser } from 'playwright';
import { Login } from '../page-objects/authentication';
import { AltyCMD } from '../page-objects/alty-cmd';

export const test = base.extend<{
  auth: Login;
  cmd: AltyCMD;
  page2: Browser;
}>({
  auth: async ({ page }, use) => {
    const login = new Login(page);
    await use(login);
  },
  cmd: async ({ page }, use) => {
    const cmd = new AltyCMD(page);
    await use(cmd);
  },

  page2: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page2 = await context.newPage();
    await use(page2);
  },
});
