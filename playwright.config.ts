import { PlaywrightTestConfig } from '@playwright/test';
import {timeouts} from './helpers/timeouts'

const config: PlaywrightTestConfig = {
  globalTimeout: timeouts.globalTestsTimeout,
  timeout: timeouts.testTimeout,
  retries: process.env.E2E_CI ? 2 : 0,
  reporter: [['list'], ['html', { outputFolder: 'test-results/report' }], ['junit', { outputFile: 'test-results/xml-results.xml' }] ],
  testDir: './tests',
  globalSetup: './setup/globalSetup.ts',
  outputDir: './test-results',
  workers: 4,
  use: {
    baseURL: process.env.E2E_URL || 'https://app.ixswap.io/',
    browserName: 'chromium',
    viewport: { width: 1600, height: 1200 },
    headless: false,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: timeouts.mediumTimeout,
    navigationTimeout: timeouts.mediumTimeout,
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  expect: {
    timeout: timeouts.mediumTimeout,
    toMatchSnapshot: {
      maxDiffPixels: 30
    }
  },
  snapshotDir: 'testData/snapshots',
};

export default config;
