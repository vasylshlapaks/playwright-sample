import {WebPage} from "./webPage";
import { Locator, Page } from '@playwright/test';

export class ConnectWalletPage extends WebPage {
  readonly connectWalletButton: Locator;

  constructor(page: Page) {
    super(page);
    this.connectWalletButton = page.locator('button:text("Connect Wallet")');
  }

  async login(email: string, password: string) {
  }
}
