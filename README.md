# Playwright Sample Project

#### Requirements
NodeJS 14+ installed on machine

#### Installation

Clone the repository

Run `npm install` in root folder to install dependencies

Run `npx playwright install` in root folder to install Playwright additional dependencies

#### Configuration
Add `.env` file with secrets for users/wallets to root folder of project

#### Run a single test file

npx playwright test apiCallsExample.spec.ts

#### Run all tests

npx playwright test

#### Project configuration

`playwright.config.ts` allows to configure:

- Browsers
- Timeouts
- Retry
- Screenshots options
- Video recording options and much more
