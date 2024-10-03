import { Page, Locator, Keyboard, expect, PlaywrightTestConfig, chromium, JSHandle } from '@playwright/test'
import WaitActionClass from './WaitActions';
let waitActionClass: WaitActionClass
class WebElementActionClass {

  page: Page;


  constructor(page: Page) {
    this.page = page;
    waitActionClass = new WaitActionClass(page);

  }

  /**
    * Clicks on the specified element after ensuring it is visible.
    * @param element - Locator of the element to click.
    */

  async Click(element: Locator) {
    await waitActionClass.waitForElementVisible(element);
    await element.click();
  }
  /**
   * Forcefully clicks on the specified element, bypassing any visibility checks.
   * Useful for clicking elements that might be obscured or not fully visible.
   * @param element - Locator of the element to force-click.
   */

  async Force_Click(element: Locator) {
    await waitActionClass.waitForElementVisible(element);
    await element.click({ force: true });
  }

  /**
    * Fills the specified text locator with the provided text after ensuring it is visible.
    * @param textLocator - Locator of the input field to fill.
    * @param text - The text to enter into the input field.
    */

  async send_Keys(textLocator: Locator, text: string) {
    await waitActionClass.waitForElementVisible(textLocator);
    await textLocator.fill(text);

  }

}

export default WebElementActionClass