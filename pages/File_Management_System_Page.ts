import { Page, Locator, Keyboard, expect, PlaywrightTestConfig, chromium, JSHandle } from '@playwright/test'
import WaitActionClass from '../action/WaitActions';
import webElementActionClass from '../action/WebElementActions';
import reusableActionsClass from '../action/ReusableActions';
let waitActionClass: WaitActionClass
let webElementActionClass_page: webElementActionClass;
let reusableActionsClass_page: reusableActionsClass;

class file_management_system_page {

  page: Page;


  constructor(page: Page) {
    this.page = page;
    waitActionClass = new WaitActionClass(page);
    webElementActionClass_page = new webElementActionClass(page);
    reusableActionsClass_page = new reusableActionsClass(page);

  }


  /**
    * Searches for files using given keywords and verifies the associated Purchase Order (PO) number.
    * @param Keywords - The search keywords to use for finding files.
    * @param PO_Numbers - The expected Purchase Order number to verify after the search.
    */

  async file_Management_Verify_Search_keywords(Keywords: string, PO_Numbers: string) {
    await webElementActionClass_page.Click(reusableActionsClass_page.file_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleFile)
    await webElementActionClass_page.send_Keys(reusableActionsClass_page.searchGlobal_txt, Keywords)
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
    const xpathExpression1 = this.page.locator(`(//p[normalize-space()='${PO_Numbers}'])[1]`);
    await waitActionClass.waitForElementVisible(xpathExpression1)
    await expect(xpathExpression1).toBeVisible();
    await webElementActionClass_page.Click(reusableActionsClass_page.file_view_PO_btn)
    await this.page.waitForTimeout(2000);
    await reusableActionsClass_page.verifyPONumbers(PO_Numbers);
    await reusableActionsClass_page.verifyShipperName(Keywords);
    console.log("Verify File Using Keyword   :- ", Keywords)
    console.log("Verify PO Number On File Management :- ", PO_Numbers)
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(5000);
  }
}
export default file_management_system_page