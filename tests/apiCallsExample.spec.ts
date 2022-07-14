import { test, expect } from '@playwright/test';
import {addUser, getUsersList} from "../helpers/api/helpers";

test.describe('GET and POST requests example', () => {
  test('Test ability to get request', async ({}) => {
    const emailOfUser = 'george.edwards@reqres.in';
    const usersList = await getUsersList();

    await expect(usersList).toContain(emailOfUser);
  });

  test.skip('Test ability to post request', async ({}) => {
    const user = {
      name: 'test',
      job: 'qa'
    };
    const newUser = await addUser(user);

    await expect(newUser).toContain(user.name);
    await expect(newUser).toContain(user.job);
  });
});
