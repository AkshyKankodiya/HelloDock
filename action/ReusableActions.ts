import { Page, Locator, Keyboard, expect, PlaywrightTestConfig, chromium } from '@playwright/test'
import userData from '../test-data/JSON/login_data.json'
import ProduserData from '../test-data/JSON/prod_login_data.json'

import po_no from '../test-data/JSON/po_numbers_test.json'
import WebElementActionClass from './WebElementActions';
import WaitActionClass from './WaitActions';
import fileName from '../test-data/JSON/file_Path.json'

// Declare the class variables (Objects) (Wait and Web Element Actions)
let waitActionClass: WaitActionClass
let webElementActionClass_page: WebElementActionClass;


class reusableActionsClass {
  // Various locators used throughout the class
  page: Page;
  username_inbox: Locator;
  continue_btn: Locator;
  password_inbox: Locator;
  signIn_btn: Locator;
  dashboard_elm: Locator;
  accountAndSettings_link: Locator;
  functionalSettings_tab: Locator;
  deleteRuleSuccess_msg: Locator;
  saveRule_btn: Locator;
  ruleTextboxes: Locator;
  saveRuleSuccess_msg: Locator;
  uploadBOLs_tab: Locator;
  extract_btn: Locator;
  filesProcessedSuccess_msg: Locator;
  processedWaiting_msg: Locator;
  titleHeader: Locator;
  globleSearch_tab: Locator;
  globalSearch_tab: Locator;
  titleHeaderUpload: Locator;
  titleHeaderGlobal: Locator;
  searchGlobal_txt: Locator;
  fixExceptions_tab: Locator;
  titleExceptions: Locator;
  inputExceptionsPO_inbox: Locator;
  first_Elment: Locator;
  Exceptions_first_Elment: Locator;
  popUp_delete_exceptions: Locator;
  exceptionDeleted_msg: Locator;
  get_PO_Number_1: Locator;
  file_tab: Locator;
  titleFile: Locator;
  view_PO_btn: Locator;
  po_Number_inbox: Locator;
  shipper_name_inbox: Locator;
  shipper_addr_inbox: Locator;
  destination_addr_inbox: Locator;
  shipment_date_inbox: Locator;
  shipment_wgt_inbox: Locator;
  carrier_name_inbox: Locator;
  sign_on_approval_inbox: Locator;
  popUp_delete_PO: Locator;
  actualPONumbers: string;
  actualShipperName: string;
  actualShipperAddress: string;
  actualDestinationAddress: string;
  actualShipmentDate: string;
  actualShipmentWeight: string;
  actualCarrierName: string;
  actualSignOnApproval: string;
  BOL_loading_elm: Locator;
  files_tab: Locator;
  titleFile_Management: Locator;
  add_Tags_btn: Locator;
  remove_Tags_btn: Locator;
  add_Tag_icon: Locator;
  tag_input: Locator;
  save_tag_Btn: Locator;
  close_tag_Btn: Locator;
  actualTAg: string;
  actual_File_Count: string;
  warehouse_drp: Locator;
  warehouse_QA_Btn: Locator;
  file_view_PO_btn: Locator;
  fixExceptions_tab_prod: any;



  constructor(page: Page) {
    // Initializes class variables and dependencies (Wait and Web Element Actions)

    this.page = page;
    webElementActionClass_page = new WebElementActionClass(page);
    waitActionClass = new WaitActionClass(page);

    // Locator initialization for login and other elements on the page

    this.username_inbox = page.locator("//input[@id='username']")
    this.password_inbox = page.locator("//input[@id='password']")
    this.signIn_btn = page.locator("//a[contains(text(),'Sign In')]")
    this.continue_btn = page.locator("//button[@name='action' and @type='submit']")
    this.dashboard_elm = page.locator("//h1[contains(text(),'File Management')]")
    this.accountAndSettings_link = page.locator("//a[contains(text(),'Account & Settings')]")
    this.functionalSettings_tab = page.locator("//span[contains(text(),'Functional Settings')]")
    this.deleteRuleSuccess_msg = page.locator("//div[contains(text(),'Successfully deleted PO rule.')]")
    this.saveRuleSuccess_msg = page.locator("//div[contains(text(),'Successfully saved PO rules')]")
    this.saveRule_btn = page.locator("//button[contains(text(),'Save Rules')]")
    this.uploadBOLs_tab = page.locator("//div[contains(text(),'Upload BOL')]")
    this.extract_btn = page.locator("//span[contains(text(),'Upload & Extract PO')]")
    this.filesProcessedSuccess_msg = page.locator("//div[contains(text(),'All files processed!')]")
    this.processedWaiting_msg = page.locator("//span[contains(text(),'are being processed...')]")
    this.titleHeaderUpload = page.locator("//h1[contains(text(),'Upload BOL')]")
    this.globalSearch_tab = page.locator("//div[contains(text(),'Global Search')]")
    this.titleHeaderGlobal = page.locator("//h1[contains(text(),'Global Search')]")
    this.searchGlobal_txt = page.locator("//input[@id='poNumber']")
    this.fixExceptions_tab_prod = page.locator("//div[contains(text(),'Fix Exceptions')]")
    this.fixExceptions_tab = page.locator("//div[contains(text(),'Fix File Exceptions')]")
    this.titleExceptions = page.locator("//h1[contains(text(),'Exceptions')]")
    this.inputExceptionsPO_inbox = page.locator("(//input[@placeholder='Enter PO Number'])[1]")
    this.first_Elment = page.locator("(//button[contains(@id,'headlessui-combobox-button-')]//following::button[contains(@class,'ring-inset')])[1]")
    this.Exceptions_first_Elment = page.locator("(//a[@target='_blank']//following-sibling::button[contains(@class,'ring-inset ring-gray')])[1]")
    this.popUp_delete_exceptions = page.locator("//span[text()='Delete']")
    this.exceptionDeleted_msg = page.locator("//div[contains(text(),'Exception Deleted Successfully!')]")
    this.get_PO_Number_1 = page.locator("//tbody/tr[1]/td[3]/form[1]/div[1]/p[1]")
    this.file_tab = page.locator("//div[contains(text(),'View All Folders')]")
    this.titleFile = page.locator("//h1[contains(text(),'File Management')]")
    this.view_PO_btn = page.locator("(//span[contains(text(),'View / Edit')])[1]")
    this.file_view_PO_btn = page.locator("(//span[contains(text(),'View / Edit')])[2]")
    this.po_Number_inbox = page.locator("//input[@id='po-number']")
    this.shipper_name_inbox = page.locator("//input[@id='shipper-name']")
    this.shipper_addr_inbox = page.locator("//input[@id='shipper-addr']")
    this.destination_addr_inbox = page.locator("//input[@name='destinationAddr']")
    this.shipment_date_inbox = page.locator("//input[@id='shipment-date']")
    this.shipment_wgt_inbox = page.locator("//input[@id='shipment-wgt']")
    this.carrier_name_inbox = page.locator("//input[@id='carrier-name']")
    this.sign_on_approval_inbox = page.locator("//input[@id='sign-on-approval']")
    this.popUp_delete_PO = page.locator("//button[text()='Delete']")
    this.BOL_loading_elm = page.locator("//div[@role='status']")
    this.add_Tags_btn = page.locator("//button[contains(text(),'Edit / Add Tags')]")
    this.remove_Tags_btn = page.locator("(//span[contains(text(),'Remove')]//parent::button)[1]//span[2]")
    this.add_Tag_icon = page.locator("//span[contains(text(),'Add New Tag')]//parent::div")
    this.tag_input = page.locator("//input[@id='tag']")
    this.save_tag_Btn = page.locator("//button[contains(text(),'Save Tags')]")
    this.close_tag_Btn = page.locator("//button[contains(text(),'Close')]")
    this.warehouse_drp = page.locator("//img[@alt='Warehouse']//parent::div//button")
    this.warehouse_QA_Btn = page.locator("//div[@class='flex items-center justify-between']//span[contains(text(),'QA')]")


  }

  /**
     * Logs the user into the application.
     * Navigates to the homepage, inputs username and password, and logs the user in.
     * Verifies that the login was successful by checking the presence of the dashboard element.
     */

  // async userLogin() {

  //   await this.page.goto('/')
  //   await webElementActionClass_page.Click(this.signIn_btn)
  //   await webElementActionClass_page.send_Keys(this.username_inbox, userData.Login_Email)
  //   await webElementActionClass_page.Click(this.continue_btn)
  //   await webElementActionClass_page.send_Keys(this.password_inbox, userData.Login_Password)
  //   await webElementActionClass_page.Click(this.continue_btn)
  //   await waitActionClass.WaitUntilElementVisible(this.dashboard_elm)
  //   expect(this.dashboard_elm).toBeVisible();
  //   console.log("User Login Succsessfully")

  //   const isLiveUrl = this.page.url();
  //   if(isLiveUrl.startsWith('https://app.hellodock.com')){
  //   await webElementActionClass_page.Click(this.warehouse_drp)
  //   await webElementActionClass_page.Click(this.warehouse_QA_Btn)
  //   console.log("User Login Succsessfully On Live ")
  //   }


  async userLogin() {

    await this.page.goto('/')
    const isLiveUrl = this.page.url();
    if (isLiveUrl.startsWith('https://app.hellodock.com')) {
      await webElementActionClass_page.Click(this.signIn_btn)
      await webElementActionClass_page.send_Keys(this.username_inbox, ProduserData.Login_Email_prod)
      await webElementActionClass_page.Click(this.continue_btn)
      await webElementActionClass_page.send_Keys(this.password_inbox, ProduserData.Login_Password_prod)
      await webElementActionClass_page.Click(this.continue_btn)
      await waitActionClass.WaitUntilElementVisible(this.dashboard_elm)
      expect(this.dashboard_elm).toBeVisible();
      await webElementActionClass_page.Click(this.warehouse_drp)
      await webElementActionClass_page.Click(this.warehouse_QA_Btn)
      console.log("User Login Succsessfully On Live Env:",isLiveUrl)
    }
    if (isLiveUrl.startsWith('https://dev.hellodock.com/')){
        await webElementActionClass_page.Click(this.signIn_btn)
        await webElementActionClass_page.send_Keys(this.username_inbox, userData.Login_Email)
        await webElementActionClass_page.Click(this.continue_btn)
        await webElementActionClass_page.send_Keys(this.password_inbox, userData.Login_Password)
        await webElementActionClass_page.Click(this.continue_btn)
        await waitActionClass.WaitUntilElementVisible(this.dashboard_elm)
        expect(this.dashboard_elm).toBeVisible();
        console.log("User Login Succsessfully On Dev Env:",isLiveUrl)
    }

    if (isLiveUrl.startsWith('https://qa.hellodock.com/')) {
      await webElementActionClass_page.Click(this.signIn_btn)
      await webElementActionClass_page.send_Keys(this.username_inbox, ProduserData.Login_Email_prod)
      await webElementActionClass_page.Click(this.continue_btn)
      await webElementActionClass_page.send_Keys(this.password_inbox, ProduserData.Login_Password_prod)
      await webElementActionClass_page.Click(this.continue_btn)
      await waitActionClass.WaitUntilElementVisible(this.dashboard_elm)
      expect(this.dashboard_elm).toBeVisible();
      console.log("User Login Succsessfully On QA Env :",isLiveUrl)
    }



  }

  /**
  * Creates a new rule for Purchase Orders (POs).
  * Searches for available rule textboxes and folder inputs, then fills in the provided rule and folder name.
  * Saves the rule and verifies success through a confirmation message.
  * @param rule - The rule to be applied (string).
  * @param folder_name - Folder name associated with the rule (string).
  */

  async createRule(rule: string, folder_name: string) {
    await webElementActionClass_page.Click(this.accountAndSettings_link)
    await webElementActionClass_page.Click(this.functionalSettings_tab)
    await waitActionClass.waitForElementVisible(this.saveRule_btn)
    await this.page.waitForTimeout(2000);
    let elements = await this.page.locator('//p/strong[text()="POs"]//following::input[contains(@placeholder,"000")]').all();

    for (let i = 0; i < elements.length; i++) {
      const isdisabled = await elements[i].evaluate(el => (el as HTMLButtonElement).disabled);
      if (!isdisabled) {
        // console.log('Button is enabled', isdisabled);
        await webElementActionClass_page.send_Keys(elements[i], rule)
        break;

      }
      //console.log('Button is disabled',isdisabled);

    }
    console.log('Rule Format is Added ');
    let elements2 = await this.page.locator("//input[@placeholder='Search for a folder']").all();


    for (let i = 0; i < elements2.length; i++) {
      const isdisabled = await elements2[i].evaluate(el => (el as HTMLButtonElement).disabled);
      if (!isdisabled) {
        // console.log('Button is enabled', isdisabled);
        await webElementActionClass_page.send_Keys(elements2[i], folder_name)
        await this.page.keyboard.press('Enter');
        await webElementActionClass_page.Click(this.saveRule_btn);
        await waitActionClass.waitForElementVisible(this.saveRuleSuccess_msg)
        // await waitActionClass.WaitUntilElementToDisappear(this.saveRuleSuccess_msg)
        break;

      }
      //console.log('Button is disabled',isdisabled);
    }
    await this.page.waitForTimeout(4000);
    console.log('Rule Is Created With Folder:', folder_name, 'And Rule is :', rule);
  }

  /**
  * Deletes all created rules by iterating through enabled delete buttons.
  * Loops through available rules and deletes them until all are removed.
  */

  async deleteRule() {
    await webElementActionClass_page.Click(this.accountAndSettings_link)
    await webElementActionClass_page.Click(this.functionalSettings_tab)
    await waitActionClass.waitForElementVisible(this.saveRule_btn)
    await this.page.waitForTimeout(2000);
    // Infinite loop, breaks when the element is disabled
    while (true) {

      const isdisabled = await this.first_Elment.evaluate(el => (el as HTMLButtonElement).disabled);
      if (!isdisabled) {
        await webElementActionClass_page.Click(this.first_Elment)
        await waitActionClass.WaitUntilElementVisible(this.deleteRuleSuccess_msg)
        //await waitActionClass.WaitUntilElementToDisappear(this.deleteRuleSuccess_msg)
        await this.page.waitForTimeout(8000);
      } else {
        // Break the loop when the element is disabled
        console.log('All Rules Deleted');
        break;
      }

      // Optionally, add a delay to avoid too many fast interactions
      await this.page.waitForTimeout(1000); // 1 second delay   
    }

  }

  /**
   * Deletes all exceptions from the "Fix Exceptions" tab.
   * Iterates through exceptions and deletes them one by one.
   */

  async deleteExceptions() {
    // const isLiveUrl = this.page.url();
    // if (isLiveUrl.startsWith('https://app.hellodock.com')) {
    //   await webElementActionClass_page.Click(this.fixExceptions_tab_prod)
    // } else {
      await webElementActionClass_page.Click(this.fixExceptions_tab)
    // }

    await waitActionClass.WaitUntilElementVisible(this.titleExceptions)
    //await waitActionClass.WaitUntilElementVisible(this.inputExceptionsPO_inbox)
    await this.page.waitForTimeout(2000);
    const listDeleteElements = await this.page.locator("(//a[@target='_blank']//following-sibling::button[contains(@class,'ring-inset ring-gray')])").count();
    console.log('Total Exceptions  :', listDeleteElements)

    while (true) {

      if (await this.Exceptions_first_Elment.isVisible()) {
        await webElementActionClass_page.Click(this.Exceptions_first_Elment)
        await webElementActionClass_page.Click(this.popUp_delete_exceptions)
        //await waitActionClass.WaitUntilElementVisible(this.exceptionDeleted_msg)
        //await waitActionClass.WaitUntilElementToDisappear(this.exceptionDeleted_msg)
        await this.page.waitForTimeout(4000);
      }
      else {
        console.log('All Exceptions Deleted');
        break;
      }
      await this.page.waitForTimeout(1000); // 1 second delay
    }
  }

  /**
  * Uploads Bill of Lading (BOL) files.
  * Uploads the given file, waits for processing, and verifies success through a message.
  * @param fileName - Name of the file to upload (string).
  */

  async upload_BOLs(fileName: string) {
    await this.page.waitForTimeout(5000);
    await webElementActionClass_page.Click(this.uploadBOLs_tab)
    await waitActionClass.WaitUntilElementVisible(this.titleHeaderUpload)
    const filePath = './test-data/PDF/' + fileName;
    const fileInput = this.page.locator("//input[@type='file']");
    // Use setInputFiles to upload the file
    await fileInput.setInputFiles(filePath)
    await waitActionClass.WaitUntilElementVisible(this.extract_btn)
    await webElementActionClass_page.Click(this.extract_btn)
    await this.page.waitForTimeout(20000);
    // await waitActionClass.WaitUntilElementVisible(this.filesProcessedSuccess_msg)
    // await waitActionClass.WaitUntilElementVisible(this.filesProcessedSuccess_msg)
    // await waitActionClass.WaitUntilElementVisible(this.processedWaiting_msg)
    await waitActionClass.WaitUntilElementVisible(this.filesProcessedSuccess_msg)
    await expect(this.filesProcessedSuccess_msg).toBeVisible();
    console.log("File Uploaded OK")

  }

  /**
 * Uploads multiple Bill of Lading (BOL) files and verifies their successful extraction.
 * @param filenames - Array of filenames (strings) to be uploaded from the './test-data/PDF/' directory.
 */

  async multipleUpload_BOLs(...filenames: string[]) {
    await this.page.waitForTimeout(5000);
    await webElementActionClass_page.Click(this.uploadBOLs_tab)
    await waitActionClass.WaitUntilElementVisible(this.titleHeaderUpload)
    const filePaths = filenames.map(fileName => './test-data/PDF/' + fileName);
    await this.page.waitForTimeout(5000);
    // Use setInputFiles to upload the file
    const fileInput = this.page.locator('//input[@type="file"]');
    await fileInput.setInputFiles(filePaths);

    // Wait for the extract button to become visible
    await waitActionClass.WaitUntilElementVisible(this.extract_btn)

    // Click on the extract button
    await webElementActionClass_page.Click(this.extract_btn)
    await this.page.waitForTimeout(8000);
    await waitActionClass.WaitUntilElementVisible(this.BOL_loading_elm)
    await waitActionClass.WaitUntilElementToDisappear(this.BOL_loading_elm)
    // Verify success message visibility
    await this.page.waitForTimeout(1000);
    await expect(this.BOL_loading_elm).toBeHidden();

    console.log(`Files Uploaded Successfully`);
  }


  /**
   * Searches globally for a Purchase Order (PO) by entering the PO number in the global search.
   * @param PO_Numbers - Purchase Order number(s) to search for (string).
   */

  async globalSearch(PO_Numbers: string) {
    await webElementActionClass_page.Click(this.globalSearch_tab)
    await waitActionClass.WaitUntilElementVisible(this.titleHeaderGlobal)
    await waitActionClass.WaitUntilElementVisible(this.searchGlobal_txt)
    await webElementActionClass_page.send_Keys(this.searchGlobal_txt, PO_Numbers)
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
    const xpathExpression = this.page.locator(`(//p[normalize-space()='${PO_Numbers}'])[1]`);
    await waitActionClass.waitForElementVisible(xpathExpression)
    await expect(xpathExpression).toBeVisible();
    console.log("Verify PO Number :- ", PO_Numbers)
    console.log("Global Search Results")
    await webElementActionClass_page.Click(this.view_PO_btn)
    await this.page.waitForTimeout(5000);

  }

  /**
 * Navigates to the "Fix Exceptions" tab and verifies visibility of the elements.
 * Deletes all listed exceptions by invoking the deleteExceptions method.
 */

  async fixExceptions() {
    // const isLiveUrl = this.page.url();
    // if (isLiveUrl.startsWith('https://app.hellodock.com')) {
    //   await webElementActionClass_page.Click(this.fixExceptions_tab_prod)
    // } else {
       await webElementActionClass_page.Click(this.fixExceptions_tab)
    // }
    await waitActionClass.WaitUntilElementVisible(this.titleExceptions)
    await waitActionClass.WaitUntilElementVisible(this.inputExceptionsPO_inbox)
    await expect(this.inputExceptionsPO_inbox).toBeVisible();
    console.log("Verify On Exceptions Tab ")
    await this.page.waitForTimeout(3000);
    await this.deleteExceptions()

  }

  /**
  * Retrieves the PO number from a specific folder and returns it as a string.
  * @param folder - The folder name to retrieve the PO number from.
  * @returns The PO number as a string.
  */

  async get_PO_NumberAndStore(folder: string): Promise<string> {
    // Get the text content of the element
    await webElementActionClass_page.Click(this.file_tab)
    await waitActionClass.WaitUntilElementVisible(this.titleFile)
    const xpathExpression = this.page.locator(`//a[normalize-space()='${folder}']`);
    await webElementActionClass_page.Click(xpathExpression)
    await waitActionClass.waitForElementVisible(this.get_PO_Number_1)
    const elementText = await this.page.locator('//tbody/tr[1]/td[3]/form[1]/div[1]/p[1]').textContent() || '';
    console.log(`Stored Text: ${elementText}`);
    return elementText;
  }

  /**
   * Deletes all uploaded POs by clicking the delete button for each entry.
   * Continues until no more entries are left to delete.
   */

  async deleteUploaded_PO() {
    await webElementActionClass_page.Click(this.globalSearch_tab)
    await waitActionClass.WaitUntilElementVisible(this.titleHeaderGlobal)
    await waitActionClass.WaitUntilElementVisible(this.searchGlobal_txt)
    await this.page.waitForTimeout(2000);
    const listDeleteElements = await this.page.locator("(//a[@target='_blank']//following-sibling::button[contains(@class,'ring-inset ring-gray')])").count();
    console.log('Total Uploaded PO:', listDeleteElements)

    // Infinite loop, breaks when the element is disabled
    while (true) {

      if (await this.Exceptions_first_Elment.isVisible()) {
        await webElementActionClass_page.Click(this.Exceptions_first_Elment)
        await webElementActionClass_page.Click(this.popUp_delete_PO)
        // await waitActionClass.WaitUntilElementVisible(this.exceptionDeleted_msg)
        // await waitActionClass.WaitUntilElementToDisappear(this.exceptionDeleted_msg);
        await this.page.waitForTimeout(4000);
      }
      else {
        // Break the loop when the element is disabled
        console.log('All Uploaded PO Are Deleted');
        break;
      }

      // Optionally, add a delay to avoid too many fast interactions
      await this.page.waitForTimeout(1000); // 1 second delay
    }
  }

  /**
  * Verifies the provided PO number against the expected value.
  * Throws an error if the values do not match.
  * @param expectedPONumbers - Expected PO number to verify.
  */

  // async verifyPONumbers(expectedPONumbers: string) {
  //   this.actualPONumbers = await this.po_Number_inbox.inputValue();
  //   try {
  //     expect(this.actualPONumbers.toLowerCase()).toBe(expectedPONumbers.toLowerCase());
  //     console.log('PO Numbers assertion passed.');
  //   } catch (error) {
  //     throw new Error(`PO Number failed: Expected "\n${expectedPONumbers}"\n but got "\n${this.actualPONumbers}"`);
  //   }
  // }

  async verifyPONumbers(expectedPONumbers: string) {
    this.actualPONumbers = await this.po_Number_inbox.inputValue();
  
    // Convert both actual and expected values to lowercase for case-insensitive comparison
    const actualPONumbersLowerCase = this.actualPONumbers.toLowerCase();
    const expectedPONumbersLowerCase = expectedPONumbers.toLowerCase();
    console.log(`PO Number Expected "\n${expectedPONumbersLowerCase}"\nAnd Actual "\n${actualPONumbersLowerCase}"`);
    // Check if any word from the expected value is present in the actual value
    const containsExpectedWord = expectedPONumbersLowerCase.split(' ').some(word => actualPONumbersLowerCase.includes(word));
  
    if (containsExpectedWord) {
      console.log('PO Numbers assertion passed\n');
    } else {
      throw new Error(`PO Number failed: Expected "\n${expectedPONumbers}"\n but got "\n${this.actualPONumbers}"`);
    }
  }

  /**
  * Verifies the provided Shipper name against the expected value.
  * Throws an error if the values do not match.
  * @param expectedShipperName - Expected Shipper name to verify.
  */

  // async verifyShipperName(expectedShipperName: string) {
  //   this.actualShipperName = await this.shipper_name_inbox.inputValue();
  //   try {
  //     expect(this.actualShipperName.toLowerCase()).toBe(expectedShipperName.toLowerCase());
  //     console.log('Shipper Name assertion passed.');
  //   } catch (error) {
  //     throw new Error(`Shipper Name failed: Expected "\n${expectedShipperName}"\n but got "\n${this.actualShipperName}"`);
  //   }
  // }

  async verifyShipperName(expectedShipperName: string) {
  this.actualShipperName = await this.shipper_name_inbox.inputValue();

  // Convert both actual and expected values to lowercase for case-insensitive comparison
  const actualShipperNameLowerCase = this.actualShipperName.toLowerCase();
  const expectedShipperNameLowerCase = expectedShipperName.toLowerCase();
  console.log(`Shipper Name Expected "\n${expectedShipperNameLowerCase}"\nAnd Actual "\n${actualShipperNameLowerCase}"`);
  // Check if any word from the expected value is present in the actual value
  const containsExpectedWord = expectedShipperNameLowerCase.split(' ').some(word => actualShipperNameLowerCase.includes(word));

  if (containsExpectedWord) {
    console.log('Shipper Name assertion passed \n');
  } else {
    throw new Error(`Shipper Name failed: Expected "\n${expectedShipperName}"\n but got "\n${this.actualShipperName}"`);
  }
}

  /**
  * Verifies the provided Shipper address against the expected value.
  * Throws an error if the values do not match.
  * @param expectedShipperAddress - Expected Shipper address to verify.
  */

  // async verifyShipperAddress(expectedShipperAddress: string) {
  //   this.actualShipperAddress = await this.shipper_addr_inbox.inputValue();
  //   try {
  //     expect(this.actualShipperAddress.toLowerCase()).toBe(expectedShipperAddress.toLowerCase());
  //     console.log('Shipper Address assertion passed.');
  //   } catch (error) {
  //     throw new Error(`Shipper Address failed: Expected "\n${expectedShipperAddress}"\n but got "\n${this.actualShipperAddress}"`);
  //   }
  // }


  async verifyShipperAddress(expectedShipperAddress: string) {
    this.actualShipperAddress = await this.shipper_addr_inbox.inputValue();
  
    // Convert both actual and expected values to lowercase for case-insensitive comparison
    const actualShipperAddressLowerCase = this.actualShipperAddress.toLowerCase();
    const expectedShipperAddressLowerCase = expectedShipperAddress.toLowerCase();
    console.log(`Shipper Address Expected "\n${expectedShipperAddressLowerCase}"\nAnd Actual "\n${actualShipperAddressLowerCase}"`);
    // Check if any word from the expected value is present in the actual value
    const containsExpectedWord = expectedShipperAddressLowerCase.split(' ').some(word => actualShipperAddressLowerCase.includes(word));
  
    if (containsExpectedWord) {
      console.log('Shipper Address assertion passed\n');
    } else {
      throw new Error(`Shipper Address failed: Expected "\n${expectedShipperAddress}"\n but got "\n${this.actualShipperAddress}"`);
    }
  }

  /**
  * Verifies the provided destination address against the expected value.
  * Throws an error if the values do not match.
  * @param expectedDestinationAddress - Expected destination address to verify.
  */

  // async verifyDestinationAddress(expectedDestinationAddress: string) {
  //   this.actualDestinationAddress = await this.destination_addr_inbox.inputValue();
  //   try {
  //     expect(this.actualDestinationAddress.toLowerCase()).toBe(expectedDestinationAddress.toLowerCase());
  //     console.log('Destination Address assertion passed.');
  //   } catch (error) {
  //     throw new Error(`Destination Address failed: Expected "\n${expectedDestinationAddress}"\n but got "\n${this.actualDestinationAddress}"`);
  //   }
  // }

  async verifyDestinationAddress(expectedDestinationAddress: string) {
    this.actualDestinationAddress = await this.destination_addr_inbox.inputValue();
  
    // Convert both actual and expected values to lowercase for case-insensitive comparison
    const actualDestinationAddressLowerCase = this.actualDestinationAddress.toLowerCase();
    const expectedDestinationAddressLowerCase = expectedDestinationAddress.toLowerCase();
    console.log(`Destination Address Expected "\n${expectedDestinationAddressLowerCase}"\nAnd Actual "\n${actualDestinationAddressLowerCase}"`);
    // Check if any word from the expected value is present in the actual value
    const containsExpectedWord = expectedDestinationAddressLowerCase.split(' ').some(word => actualDestinationAddressLowerCase.includes(word));
  
    if (containsExpectedWord) {
      console.log('Destination Address assertion passed\n');
    } else {
      throw new Error(`Destination Address failed: Expected "\n${expectedDestinationAddress}"\n but got "\n${this.actualDestinationAddress}"`);
    }
  }

  /**
 * Verifies the provided shipment date against the expected value.
 * Throws an error if the values do not match.
 * @param expectedShipmentDate - Expected shipment date to verify.
 */

  // async verifyShipmentDate(expectedShipmentDate: string) {
  //   this.actualShipmentDate = await this.shipment_date_inbox.inputValue();
  //   try {
  //     expect(this.actualShipmentDate.toLowerCase()).toBe(expectedShipmentDate.toLowerCase());
  //     console.log('Shipment Date assertion passed.');
  //   } catch (error) {
  //     throw new Error(`Shipment Date failed: Expected "\n${expectedShipmentDate}"\n but got "\n${this.actualShipmentDate}"`);
  //   }
  // }

  async verifyShipmentDate(expectedShipmentDate: string) {
    const actualShipmentDate = await this.shipment_date_inbox.inputValue();

    // Remove leading zeros from both actual and expected values
    const cleanedActualShipmentDate = actualShipmentDate.replace(/^0+/, '');
    const cleanedExpectedShipmentDate = expectedShipmentDate.replace(/^0+/, '');

    // Convert both actual and expected values to lowercase for case-insensitive comparison
    const actualShipmentDateLowerCase = cleanedActualShipmentDate.toLowerCase();
    const expectedShipmentDateLowerCase = cleanedExpectedShipmentDate.toLowerCase();

    console.log(`Shipment Date Expected "\n${expectedShipmentDateLowerCase}"\nAnd Actual "\n${actualShipmentDateLowerCase}"`);

    // Check if any word from the expected value is present in the actual value
    const containsExpectedWord = expectedShipmentDateLowerCase.split(' ').some(word => actualShipmentDateLowerCase.includes(word));

    if (containsExpectedWord) {
        console.log('Shipment Date assertion passed\n');
    } else {
        throw new Error(`Shipment Date failed: Expected "\n${expectedShipmentDateLowerCase}"\n but got "\n${actualShipmentDateLowerCase}"`);
    }
}

  /**
  * Verifies the provided shipment weight against the expected value.
  * Throws an error if the values do not match.
  * @param expectedShipmentWeight - Expected shipment weight to verify.
  */

  // async verifyShipmentWeight(expectedShipmentWeight: string) {
  //   this.actualShipmentWeight = await this.shipment_wgt_inbox.inputValue();
  //   try {
  //     expect(this.actualShipmentWeight.toLowerCase()).toBe(expectedShipmentWeight.toLowerCase());
  //     console.log('Shipment Weight assertion passed.');
  //   } catch (error) {
  //     throw new Error(`Shipment Weight failed: Expected "\n${expectedShipmentWeight}"\n but got "\n${this.actualShipmentWeight}"`);
  //   }
  //   await this.page.keyboard.press('Escape');
  // }

  async verifyShipmentWeight(expectedShipmentWeight: string) {
    this.actualShipmentWeight = await this.shipment_wgt_inbox.inputValue();
  
    // Convert expected weight to a number (assuming numeric weight format)
    const expectedWeightNumber = parseFloat(expectedShipmentWeight);
  
    // Extract actual weight as a number (assuming numeric format)
    const actualWeightNumber = parseFloat(this.actualShipmentWeight);
  
    // Check if actual weight is within a reasonable tolerance of the expected weight
    const tolerance = 0.1; // Adjust tolerance as needed (e.g., 0.5 for larger weights)
    //console.log(`Shipment Weight Expected "\n${expectedWeightNumber}"\nAnd Actual "\n${actualWeightNumber}"`);
    console.log(`Shipment Weight Expected "\n${expectedShipmentWeight}"\nAnd Actual "\n${this.actualShipmentWeight}"`);
    const isWithinTolerance = Math.abs(actualWeightNumber - expectedWeightNumber) <= tolerance;
  
    if (isWithinTolerance) {
      console.log('Shipment Weight assertion passed\n');
    } else {
      throw new Error(`Shipment Weight failed: Expected within ${tolerance} of "\n${expectedShipmentWeight}"\n but got "\n${this.actualShipmentWeight}"`);
    }
  
    await this.page.keyboard.press('Escape');
  }

  /**
   * Verifies the provided carrier name against the expected value.
   * Throws an error if the values do not match.
   * @param expectedCarrierName - Expected carrier name to verify.
   */

  // async verifyCarrierName(expectedCarrierName: string) {
  //   this.actualCarrierName = await this.carrier_name_inbox.inputValue();
  //   try {
  //     expect(this.actualCarrierName.toLowerCase()).toBe(expectedCarrierName.toLowerCase());
  //     console.log('Carrier Name assertion passed.');
  //   } catch (error) {
  //     throw new Error(`Carrier Name failed: Expected "\n${expectedCarrierName}"\n but got "\n${this.actualCarrierName}"`);
  //   }
  // }

  async verifyCarrierName(expectedCarrierName: string) {
    this.actualCarrierName = await this.carrier_name_inbox.inputValue();
  
    // Convert both actual and expected values to lowercase for case-insensitive comparison
    const actualCarrierNameLowerCase = this.actualCarrierName.toLowerCase();
    const expectedCarrierNameLowerCase = expectedCarrierName.toLowerCase();
    console.log(`Carrier Name Expected "\n${expectedCarrierNameLowerCase}"\nAnd Actual "\n${actualCarrierNameLowerCase}"`);
    // Check if any word from the expected value is present in the actual value
    const containsExpectedWord = expectedCarrierNameLowerCase.split(' ').some(word => actualCarrierNameLowerCase.includes(word));
  
    if (containsExpectedWord) {
      console.log('Carrier Name assertion passed\n');
    } else {
      throw new Error(`Carrier Name failed: Expected "\n${expectedCarrierName}"\n but got "\n${this.actualCarrierName}"`);
    }
  }

  /**
  * Verifies the provided Sign-On approval details.
  * Throws an error if the values do not match.
  * @param expectedSignOnApproval - Expected Sign-On approval details to verify.
  */

  // async verifySignOnApproval(expectedSignOnApproval: string) {
  //   this.actualSignOnApproval = await this.sign_on_approval_inbox.inputValue();
  //   try {
  //     expect(this.actualSignOnApproval.toLowerCase()).toBe(expectedSignOnApproval.toLowerCase());
  //     console.log('Sign-On Approval assertion passed.');
  //   } catch (error) {
  //     throw new Error(`Sign On Approval failed: Expected "\n${expectedSignOnApproval}"\n but got "\n${this.actualSignOnApproval}"`);
  //   }

  // }

  async verifySignOnApproval(expectedSignOnApproval: string) {
    this.actualSignOnApproval = await this.sign_on_approval_inbox.inputValue();
  
    // Convert both actual and expected values to lowercase for case-insensitive comparison
    const actualSignOnApprovalLowerCase = this.actualSignOnApproval.toLowerCase();
    const expectedSignOnApprovalLowerCase = expectedSignOnApproval.toLowerCase();
    console.log(`Sign-On Approval Expected "\n${expectedSignOnApprovalLowerCase}"\nAnd Actual "\n${actualSignOnApprovalLowerCase}"`);
    // Check if any word from the expected value is present in the actual value
    const containsExpectedWord = expectedSignOnApprovalLowerCase.split(' ').some(word => actualSignOnApprovalLowerCase.includes(word));
  
    if (containsExpectedWord) {
      console.log('Sign-On Approval assertion passed\n');
    } else {
      throw new Error(`Sign-On Approval failed: Expected "\n${expectedSignOnApproval}"\n but got "\n${this.actualSignOnApproval}"`);
    }
    await this.page.keyboard.press('Escape');
  }


  /**
 * Searches for a folder in the file management system and verifies the presence of a PO number.
 * @param folder_Name - Name of the folder to search.
 * @param PO_Numbers - The PO number to search for.
 */

  async file_Management_Folder_Search(folder_Name: string, PO_Numbers: string) {
    await webElementActionClass_page.Click(this.file_tab)
    await waitActionClass.WaitUntilElementVisible(this.titleFile)
    const xpathExpression = this.page.locator(`(//a[normalize-space()="${folder_Name}"])[1]`);
    await waitActionClass.waitForElementVisible(xpathExpression)
    await expect(xpathExpression).toBeVisible();
    await webElementActionClass_page.Click(xpathExpression)

    await webElementActionClass_page.send_Keys(this.searchGlobal_txt, PO_Numbers)
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
    const xpathExpression1 = this.page.locator(`(//p[normalize-space()='${PO_Numbers}'])[1]`);
    await waitActionClass.waitForElementVisible(xpathExpression1)
    await expect(xpathExpression).toBeVisible();

    console.log("Verify Created Rule And File Management  :- ", folder_Name)
    console.log("Verify PO Number On File Management :- ", PO_Numbers)
    console.log("File Management")
    await webElementActionClass_page.Click(this.file_view_PO_btn)
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(5000);


  }




} export default reusableActionsClass

export const waitForPageLoad = async (page: Page) => {

  await page.waitForLoadState('domcontentloaded');
};

export const generateUniqueTimestamp = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const
    hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');


  return `Test_Automation_${year}${month}${day}_${hours}${minutes}`;
};


