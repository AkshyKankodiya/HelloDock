import { Page, Locator, Keyboard, expect, PlaywrightTestConfig, chromium, JSHandle } from '@playwright/test'
import WaitActionClass from '../action/WaitActions';
import webElementActionClass from '../action/WebElementActions';
import reusableActionsClass from '../action/ReusableActions';
let waitActionClass: WaitActionClass
let webElementActionClass_page: webElementActionClass;
let reusableActionsClass_page: reusableActionsClass;

class rules_tags_class_Page {

  page: Page;
  actual_File_Count: string;
  actual_Tag: string;


  constructor(page: Page) {
    this.page = page;
    waitActionClass = new WaitActionClass(page);
    webElementActionClass_page = new webElementActionClass(page);
    reusableActionsClass_page = new reusableActionsClass(page);

  }

  /**
 * Verifies the file count in a specified folder when no tags are applied.
 * @param folder_Name - The name of the folder to check.
 * @param PO_Numbers - The PO number to search for.
 * @param Expected_File_count - The expected number of files in the folder.
 */

  async file_Management_Folder_file_count_Without_Tag(folder_Name: string, PO_Numbers: string, Expected_File_count: string) {
    await webElementActionClass_page.Click(reusableActionsClass_page.file_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleFile)
    const xpathExpression = this.page.locator(`(//a[normalize-space()="${folder_Name}"])[1]`);
    await waitActionClass.waitForElementVisible(xpathExpression)
    await expect(xpathExpression).toBeVisible();
    await this.page.reload();
    await this.page.waitForTimeout(5000);
    const xpathExpressionFileCount = this.page.locator(`//a[normalize-space()="${folder_Name}"]//following::span[2]`);
    this.actual_File_Count = await xpathExpressionFileCount.innerText();
    //expect(this.actual_File_Count).toBe(Expected_File_count);
    this.verifyFileCount(Expected_File_count,this.actual_File_Count)
    await webElementActionClass_page.Click(xpathExpression)
    await webElementActionClass_page.send_Keys(reusableActionsClass_page.searchGlobal_txt, PO_Numbers)
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
    const xpathExpression1 = this.page.locator(`(//p[normalize-space()='${PO_Numbers}'])[1]`);
    await waitActionClass.waitForElementVisible(xpathExpression1)
    await expect(xpathExpression).toBeVisible();
    console.log("Verify Created Rule And File Management  :- ", folder_Name)
    console.log("Verify the file count Added  :- ", Expected_File_count)
    console.log("Verify PO Number On File Management :- ", PO_Numbers)
    console.log("File Management")
    await webElementActionClass_page.Click(reusableActionsClass_page.view_PO_btn)
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(5000);
  }

  /**
  * Verifies the file count in a specified folder when tags are applied.
  * @param folder_Name - The name of the folder to check.
  * @param PO_Numbers - The PO number to search for.
  * @param Expected_File_count - The expected number of files in the folder.
  */

  async file_Management_Folder_file_count_With_Tag(folder_Name: string, PO_Numbers: string, Expected_File_count: string) {
    await webElementActionClass_page.Click(reusableActionsClass_page.file_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleFile)
    const xpathExpression = this.page.locator(`(//a[normalize-space()="${folder_Name}"])[1]`);
    await waitActionClass.waitForElementVisible(xpathExpression)
    await expect(xpathExpression).toBeVisible();
    await this.page.reload();
    await this.page.waitForTimeout(5000);
    const xpathExpressionFileCount = this.page.locator(`//a[normalize-space()="${folder_Name}"]//following::span[3]`);
    this.actual_File_Count = await xpathExpressionFileCount.innerText();
   // expect(this.actual_File_Count).toBe(Expected_File_count);
    this.verifyFileCount(Expected_File_count,this.actual_File_Count)
    await webElementActionClass_page.Click(xpathExpression)
    await webElementActionClass_page.send_Keys(reusableActionsClass_page.searchGlobal_txt, PO_Numbers)
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
    const xpathExpression1 = this.page.locator(`(//p[normalize-space()='${PO_Numbers}'])[1]`);
    await waitActionClass.waitForElementVisible(xpathExpression1)
    await expect(xpathExpression).toBeVisible();
    console.log("Verify Created Rule And File Management  :- ", folder_Name)
    console.log("Verify the file count Added  :- ", Expected_File_count)
    console.log("Verify PO Number On File Management :- ", PO_Numbers)
    console.log("File Management")
    await webElementActionClass_page.Click(reusableActionsClass_page.view_PO_btn)
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(5000);
  }

  /**
 * This method manages the creation and verification of tags for a specified folder in a file management system.
 *
 * @param {string} folder_Name - The name of the folder where the tag will be created.
 * @param {string} Tag - The tag to be added to the specified folder.
 */

  async file_Management_Create_tags(folder_Name: string, Tag: string) {
    await webElementActionClass_page.Click(reusableActionsClass_page.file_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleFile)
    const xpathExpression = this.page.locator(`(//a[normalize-space()="${folder_Name}"])[1]`);
    await waitActionClass.waitForElementVisible(xpathExpression)
    await expect(xpathExpression).toBeVisible();
    const xpathExpression_addtag = this.page.locator(`(//a[normalize-space()="${folder_Name}"]//following::div[2])[1]`);
    await webElementActionClass_page.Click(xpathExpression_addtag)
    await webElementActionClass_page.Click(reusableActionsClass_page.add_Tags_btn)
    await this.page.waitForTimeout(5000);

    while (true) {
      await this.page.waitForTimeout(3000);
      if (await reusableActionsClass_page.remove_Tags_btn.isVisible()) {
        await webElementActionClass_page.Click(reusableActionsClass_page.remove_Tags_btn)
        await this.page.waitForTimeout(3000);
      }
      else {
        // Break the loop when the element is disabled
        console.log('All Tags are Deleted');
        break;
      }
    }
    await webElementActionClass_page.Click(reusableActionsClass_page.add_Tag_icon)
    await webElementActionClass_page.send_Keys(reusableActionsClass_page.tag_input, Tag)
    await webElementActionClass_page.Click(reusableActionsClass_page.save_tag_Btn)
    await webElementActionClass_page.Click(reusableActionsClass_page.close_tag_Btn)
    await this.page.reload();
    await this.page.waitForTimeout(5000);
    const xpathExpression_addtag1 = this.page.locator(`//a[normalize-space()="${folder_Name}"]//following::span[2]`);
    await waitActionClass.waitForElementVisible(xpathExpression_addtag1)
    await expect(xpathExpression_addtag1).toBeVisible();
    this.actual_Tag = await xpathExpression_addtag1.innerText();
    //expect(this.actual_Tag).toBe(Tag);
    this.verifyTag(Tag,this.actual_Tag)
    console.log('TAG is Verified On Filemenegements Tag :-', Tag);
    await this.page.reload();


  }

  /**
 * This method verifies the count of files associated with a specified folder and checks if a specific tag is present.
 *
 * @param {string} folder_Name - The name of the folder whose file count is to be verified.
 * @param {string} Tag - The tag that should be associated with the specified folder.
 * @param {string} Expected_File_count - The expected number of files that should be associated with the folder.
 */

  async file_count_With_Tag(folder_Name: string, Tag: string, Expected_File_count: string) {
    await webElementActionClass_page.Click(reusableActionsClass_page.file_tab)
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleFile)
    const xpathExpression = this.page.locator(`(//a[normalize-space()="${folder_Name}"])[1]`);
    await waitActionClass.waitForElementVisible(xpathExpression)
    await expect(xpathExpression).toBeVisible();
    await this.page.reload();
    await this.page.waitForTimeout(5000);
    const xpathExpressionFileCount = this.page.locator(`//a[normalize-space()="${folder_Name}"]//following::span[3]`);
    this.actual_File_Count = await xpathExpressionFileCount.innerText();
    //expect(this.actual_File_Count).toBe(Expected_File_count);
    this.verifyFileCount(Expected_File_count,this.actual_File_Count)
    const xpathExpression_addtag1 = this.page.locator(`//a[normalize-space()="${folder_Name}"]//following::span[2]`);
    await waitActionClass.waitForElementVisible(xpathExpression_addtag1)
    await expect(xpathExpression_addtag1).toBeVisible();
    this.actual_Tag = await xpathExpression_addtag1.innerText();
    //expect(this.actual_Tag).toBe(Tag);
    this.verifyTag(Tag,this.actual_Tag)
    console.log("Verify Created Rule And File Management  :- ", folder_Name)
    console.log('TAG is Verified On Filemenegements Tag :-', Tag);
    console.log("Verify the file count Added  :- ", Expected_File_count)

  }

  async verifyFileCount(expected: string,Actual: string) {
    //this.actualPONumbers = await this.po_Number_inbox.inputValue();
    try {
      expect(Actual).toBe(expected);
      console.log('File Count assertion passed.');
    } catch (error) {
      throw new Error(`File Count failed: Expected "\n${expected}"\n but got "\n${Actual}"`);
    }
  }
  async verifyTag(expected: string,Actual: string) {
    //this.actualPONumbers = await this.po_Number_inbox.inputValue();
    try {
      expect(Actual).toBe(expected);
      console.log('TAG is Verified :-', Actual);
    } catch (error) {
      throw new Error(`TAG Verification failed: Expected "\n${expected}"\n but got "\n${Actual}"`);
    }
  }

}
export default rules_tags_class_Page