import { Page, Locator, Keyboard, expect, PlaywrightTestConfig, chromium, JSHandle } from '@playwright/test'
import WaitActionClass from '../action/WaitActions';
import webElementActionClass from '../action/WebElementActions';
import reusableActionsClass from '../action/ReusableActions';
let waitActionClass: WaitActionClass
let webElementActionClass_page: webElementActionClass;
let reusableActionsClass_page: reusableActionsClass;

class exceptions_class_Page {

  page: Page;
  exceptionFix_btn: Locator;
  exceptionFixedSuccess_msg: Locator;


  constructor(page: Page) {
    this.page = page;
    waitActionClass = new WaitActionClass(page);
    webElementActionClass_page = new webElementActionClass(page);
    reusableActionsClass_page = new reusableActionsClass(page);
    this.exceptionFix_btn = page.locator("(//button[contains(text(),'Fix')])[1]")
    this.exceptionFixedSuccess_msg = page.locator("//div[contains(text(),'Exception Fixed Succesfully!')]")

  }


  /**
    * Fixes exceptions for a given Purchase Order (PO) number and verifies the success message.
    * @param PO_Numbers - The Purchase Order number to be fixed.
    */

  async fixExceptionsAndVerifyOnGlobleSearch(PO_Numbers: string) {
    await webElementActionClass_page.Click(reusableActionsClass_page.fixExceptions_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleExceptions)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.inputExceptionsPO_inbox)
    await webElementActionClass_page.send_Keys(reusableActionsClass_page.inputExceptionsPO_inbox, PO_Numbers)
    await webElementActionClass_page.Click(this.exceptionFix_btn)
    await waitActionClass.waitForElementVisible(this.exceptionFixedSuccess_msg)
    await this.page.waitForTimeout(3000);
    console.log("Fix The Exceptions With PO:" + PO_Numbers)
    //await reusableActionsClass_page.deleteExceptions()

  }


}

export default exceptions_class_Page