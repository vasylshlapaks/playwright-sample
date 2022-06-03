import { expect } from '@playwright/test';
import { test } from '../lib/fixtures/objects-as-default-fixture-to-test';

import { getText, navigate } from '../lib/helpers/helpers';

import { ERROR } from '../lib/selectors/base';

import { alty_cmd_stage } from '../lib/helpers/credentials';

test.describe('Check that the fields are required', () => {
  test.beforeEach(async ({ page }) => {
    await navigate(alty_cmd_stage.URL, page);
  });
  test.afterEach(async ({ page }) => {
    const errorText = await getText(ERROR, page);
    expect(errorText).toContain('This field is required.');
  });

  const creds = [
    { title: 'empty password field', login: 'aasdasda@asd.com', password: '' },
    { title: 'empty login field', login: '', password: 'qwe123qweQWE' },
    { title: 'empty fields', login: '', password: '' },
  ];

  for (const foo of creds) {
    test(`Check the ability login with ${foo.title}`, async ({ auth }) => {
      await auth.login(foo.login, foo.password);
    });
  }
});
