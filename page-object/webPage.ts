import {BrowserContext, expect, Locator, Page} from '@playwright/test';
import config from "../playwright.config";

export class WebPage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly loader: Locator;

  constructor(page: Page, context?: BrowserContext) {
    this.page = page;
    this.context = context;
    this.loader = page.locator('[img[alt="Loading..."]')
  }

  async click(locator: Locator) {
    await this.page.waitForLoadState();
    await locator.click();
  }

  async reloadPage() {
    await this.page.reload({waitUntil: 'load'});
  }

  async uploadFile(buttonToOpenUpload: Locator, filePath: string) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      await buttonToOpenUpload.click()
    ]);
    await fileChooser.setFiles(filePath);
  }

  async assertElementScreenshotMatchToSnapshot(element: Locator, snapshotName: string) {
    await this.page.waitForTimeout(2000);
    expect(await element.screenshot()).toMatchSnapshot(snapshotName);
  }

  async openNewPage(click: void) {
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      click
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async openNewPopUp(click: void) {
    const [newPopUp] = await Promise.all([
      this.page.waitForEvent('popup'),
      click
    ]);
    await newPopUp.waitForLoadState();
    return newPopUp;
  }

  async waitForOpenPagesNumber(expectedNumber: number) {
    let intervalId;
    return await new Promise((resolve, reject) => {
      intervalId = setInterval(() => {
        if (this.context.pages().length == expectedNumber) {
          clearInterval(intervalId);
          return resolve(true);
        }
      }, 200);

      setTimeout(() => {
        clearInterval(intervalId);
        return reject(new Error(`Opened pages number doesn't match to expected - ${expectedNumber}`));
      }, config.expect.timeout);
    })
  }

  async checkThatDataFromClipboardIsEqualTo(data: string) {
    await expect(await this.page.evaluate(() => navigator.clipboard.readText())).toEqual(data);
  }
}
