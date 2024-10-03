import { Page, Locator, Keyboard, expect, PlaywrightTestConfig, chromium, JSHandle } from '@playwright/test'
import WaitActionClass from '../action/WaitActions';
import webElementActionClass from '../action/WebElementActions';
import reusableActionsClass from '../action/ReusableActions';
let waitActionClass: WaitActionClass
let webElementActionClass_page: webElementActionClass;
let reusableActionsClass_page: reusableActionsClass;

class focus_mode_class_Page {

  page: Page;
  exceptionFix_btn: Locator;
  exceptionFixedSuccess_msg: Locator;
  focus_Mode_btn: Locator;
  fix_PO_input: Locator;
  focus_Fix_PO_btn: Locator;
  focus_fix_PO_input: Locator;
  delete_on_focus_Mode_btn: Locator;


  constructor(page: Page) {
    this.page = page;
    waitActionClass = new WaitActionClass(page);
    webElementActionClass_page = new webElementActionClass(page);
    reusableActionsClass_page = new reusableActionsClass(page);
    this.exceptionFix_btn = page.locator("(//button[contains(text(),'Fix')])[1]")
    this.exceptionFixedSuccess_msg = page.locator("//div[contains(text(),'Exception Fixed Succesfully!')]")
    this.focus_Mode_btn = page.locator("//span[contains(text(),'Focus Mode')]")
    this.focus_fix_PO_input
    this.focus_Fix_PO_btn
    this.delete_on_focus_Mode_btn = page.locator("(//button[contains(text(),'Next')]//following::button)[1]")
  }

  /**
     * Fixes exceptions for provided Purchase Order (PO) numbers in Focus Mode.
     * @param PO_Numbers - The PO numbers to fix exceptions for.
     */

  async fixExceptions_On_FocusMode(...PO_Numbers: string[]) {
    await webElementActionClass_page.Click(reusableActionsClass_page.fixExceptions_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleExceptions)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.inputExceptionsPO_inbox)
    await webElementActionClass_page.Click(this.focus_Mode_btn)
    for (const PO_Number of PO_Numbers) {
      await this.page.waitForTimeout(2000);
      // Send keys for the current PO number
      this.focus_fix_PO_input = await this.page.getByRole('textbox', { name: 'Enter PO Number' })
      await webElementActionClass_page.send_Keys(this.focus_fix_PO_input, PO_Number);
      this.focus_Fix_PO_btn = await this.page.getByRole('button', { name: 'Fix Enter' })
      await webElementActionClass_page.Click(this.focus_Fix_PO_btn);
      // Perform focus mode action (assuming it's a Click action)
      await this.page.waitForTimeout(4000);
      console.log(`Fixed exceptions with PO: ${PO_Number}`);
    }
    await this.page.reload();
    await this.page.waitForTimeout(3000);
    expect(reusableActionsClass_page.inputExceptionsPO_inbox).toBeHidden();
    console.log(`Verify ON ExceptionsTab No Exceptions`);

  }

  /**
     * Searches globally for the provided PO numbers to verify their existence.
     * @param PO_Numbers - The PO numbers to search for.
     */

  async focusFixedglobalSearch(...PO_Numbers: string[]) {
    await webElementActionClass_page.Click(reusableActionsClass_page.globalSearch_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleHeaderGlobal)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.searchGlobal_txt)
    for (const PO_Number of PO_Numbers) {
      // Send keys for the current PO number
      await webElementActionClass_page.send_Keys(reusableActionsClass_page.searchGlobal_txt, PO_Number)
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(5000);
      const xpathExpression = this.page.locator(`(//p[normalize-space()='${PO_Number}'])[1]`);
      await waitActionClass.waitForElementVisible(xpathExpression)
      await expect(xpathExpression).toBeVisible();
      console.log("Verify PO Number with Rule:- ", PO_Number)
      console.log("Global Search Results")
    }
  }

  /**
    * Deletes specified exceptions from the global search.
    * @param PO_Numbers - The PO numbers of the exceptions to delete.
    */

  async delete_Exceptions(...PO_Numbers: string[]) {
    await webElementActionClass_page.Click(reusableActionsClass_page.globalSearch_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleHeaderGlobal)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.searchGlobal_txt)
    for (const PO_Number of PO_Numbers) {
      // Send keys for the current PO number
      await webElementActionClass_page.send_Keys(reusableActionsClass_page.searchGlobal_txt, PO_Number)
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(4000);
      const xpathExpression = this.page.locator(`(//p[normalize-space()='${PO_Number}'])[1]`);
      await waitActionClass.waitForElementVisible(xpathExpression)
      await expect(xpathExpression).toBeVisible();
      await webElementActionClass_page.Click(reusableActionsClass_page.Exceptions_first_Elment)
      await webElementActionClass_page.Click(reusableActionsClass_page.popUp_delete_PO)
      //await waitActionClass.WaitUntilElementToDisappear(this.exceptionDeleted_msg);
      await this.page.reload();
      await this.page.waitForTimeout(4000);
      await expect(xpathExpression).toBeHidden();
      console.log("Delete PO Number :- ", PO_Number)
    }
    await this.page.reload();
    await this.page.waitForTimeout(4000);
    await expect(reusableActionsClass_page.Exceptions_first_Elment).toBeHidden();
    console.log("NO PO on Global Search Tab")
  }

  /**
    * Deletes all exceptions in Focus Mode.
    */

  async delete_Exceptions_On_FocusMode() {
    await webElementActionClass_page.Click(reusableActionsClass_page.fixExceptions_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleExceptions)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.inputExceptionsPO_inbox)
    await webElementActionClass_page.Click(this.focus_Mode_btn)

    while (true) {

      if (await this.delete_on_focus_Mode_btn.isVisible()) {

        await webElementActionClass_page.Click(this.delete_on_focus_Mode_btn);
        await webElementActionClass_page.Click(reusableActionsClass_page.popUp_delete_exceptions);
        await this.page.waitForTimeout(4000);
      }
      else {
        // Break the loop when the element is disabled
        console.log('All Exceptions Deleted From Focus Mode');
        break;
      }

    }
    await this.page.reload();
    await this.page.waitForTimeout(4000);
    expect(reusableActionsClass_page.inputExceptionsPO_inbox).toBeHidden();
    console.log(`Verify ON ExceptionsTab No Exceptions`);
    await webElementActionClass_page.Click(reusableActionsClass_page.globalSearch_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleHeaderGlobal)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.searchGlobal_txt)
    await expect(reusableActionsClass_page.Exceptions_first_Elment).toBeHidden();
    console.log("NO PO on Global Search Tab")

  }



}
export default focus_mode_class_Page