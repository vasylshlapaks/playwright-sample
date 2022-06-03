# playwright-test-frame

#### Installation

Clone the repository

Open the _playwright-test-frame_ folder in the IDE

In the terminal enter the _yarn_ command to install all dependencies

You need to set global variables:

ALTY_CMD_URL

ALTY_CMD_LOGIN

ALTY_CMD_PASSWORD

ALTY_CMD_RESTORE

Run all tests with _yarn test_ command

#### About the tests run

Tests can be run on single or multiple browsers and with flags to generate screenshot on test failures and record the video when test retry.

Each test gets a new isolated page to run the test

#### Project configuration

_playwright.config.ts_

it is the most important file where you can to set all configuration for your project such as the :

- Browsers
- Timeouts
- retry
- Screenshots options
- Video recording options and much more

Also, you can set configuration for each description separately

#### Run all tests across Chromium, Firefox and WebKit

npx playwright test

#### Run tests on a single browser

npx playwright test --browser=chromium

#### Run a single test file

npx playwright test tests/todo-page.spec.ts

#### Run all tests in headed mode

npx playwright test --headed

#### Save screenshots on failure in test-results directory

##### Record videos

npx playwright test --video

#### Retry test failures

npx playwright test --retries 3

#### See all options

npx playwright test --help

#### Configure NPM scripts

Save the run command as an NPM script.

{
"scripts": {
"test": "npx playwright test --{some para}"
}
}
