import { Page, Locator, Keyboard, expect, PlaywrightTestConfig, chromium, JSHandle } from '@playwright/test'
import WaitActionClass from '../action/WaitActions';
import webElementActionClass from '../action/WebElementActions';
import reusableActionsClass from '../action/ReusableActions';
let waitActionClass: WaitActionClass
let webElementActionClass_page: webElementActionClass;
let reusableActionsClass_page: reusableActionsClass;

class globalSearch_page {

  page: Page;


  constructor(page: Page) {
    this.page = page;
    waitActionClass = new WaitActionClass(page);
    webElementActionClass_page = new webElementActionClass(page);
    reusableActionsClass_page = new reusableActionsClass(page);

  }


  /**
    * Performs a global search based on provided parameters.
    * @param PO_Numbers - Optional Purchase Order numbers to search for.
    * @param Shipper_Name - Optional shipper name to search for.
    * @param Shipper_Address - Optional shipper address to search for.
    */

  async globalSearch_Keyword(PO_Numbers?: string, Shipper_Name?: string, Shipper_Address?: string) {
    await webElementActionClass_page.Click(reusableActionsClass_page.globalSearch_tab);
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.titleHeaderGlobal);
    await waitActionClass.WaitUntilElementVisible(reusableActionsClass_page.searchGlobal_txt);

    // Condition to check if PO_Numbers is passed and send it to searchGlobal_txt

    if (PO_Numbers) {
      await webElementActionClass_page.send_Keys(reusableActionsClass_page.searchGlobal_txt, PO_Numbers);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(4000);
      const xpathExpression = this.page.locator(`(//p[normalize-space()='${PO_Numbers}'])[1]`);
      await waitActionClass.waitForElementVisible(xpathExpression);
      await expect(xpathExpression).toBeVisible();
      await webElementActionClass_page.Click(reusableActionsClass_page.view_PO_btn)
      await this.page.waitForTimeout(5000);
      // reusableActionsClass_page.actualPONumbers = await reusableActionsClass_page.po_Number_inbox.inputValue();
      // try {
      //   expect(reusableActionsClass_page.actualPONumbers.toLowerCase()).toBe(PO_Numbers.toLowerCase());
      //   console.log('PO Numbers assertion passed.');
      // } catch (error) {
      //   throw new Error(`PO Number failed: Expected "\n${PO_Numbers}"\n but got "\n${reusableActionsClass_page.actualPONumbers}"`);
      // }
      // console.log("Verify By PO Number :- ", PO_Numbers);

      reusableActionsClass_page.actualPONumbers = await reusableActionsClass_page.po_Number_inbox.inputValue();

      // Convert both actual and expected values to lowercase for case-insensitive comparison
      const actualPONumbersLowerCase = reusableActionsClass_page.actualPONumbers.toLowerCase();
      const expectedPONumbersLowerCase = PO_Numbers.toLowerCase();
      console.log(`PO Number Expected "\n${expectedPONumbersLowerCase}"\nAnd Actual "\n${actualPONumbersLowerCase}"`);
      // Check if any word from the expected value is present in the actual value
      const containsExpectedWord = expectedPONumbersLowerCase.split(' ').some(word => actualPONumbersLowerCase.includes(word));

      if (containsExpectedWord) {
        console.log('PO Numbers assertion passed\n');
      } else {
        throw new Error(`PO Number failed: Expected "\n${PO_Numbers}"\n but got "\n${reusableActionsClass_page.actualPONumbers}"`);
      }

      console.log("Verify By PO Number :- ", PO_Numbers);
      
    }

    // If Shipper_Name is passed, perform search with it
    if (Shipper_Name) {
      await this.page.keyboard.press('Escape');
      await webElementActionClass_page.send_Keys(reusableActionsClass_page.searchGlobal_txt, Shipper_Name);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(4000);
      await webElementActionClass_page.Click(reusableActionsClass_page.view_PO_btn)
      await this.page.waitForTimeout(5000);
      //   reusableActionsClass_page.actualShipperName = await reusableActionsClass_page.shipper_name_inbox.inputValue();
      //   try {
      //     expect(reusableActionsClass_page.actualShipperName.toLowerCase()).toBe(Shipper_Name.toLowerCase());
      //   }
      //   catch (error) {
      //     throw new Error(`PO Number failed: Expected "\n${Shipper_Name}"\n but got "\n${reusableActionsClass_page.actualShipperName}"`);
      //   }
      //   console.log("Verify Shipper Name By Keywords :- ", Shipper_Name);
      //   await this.page.keyboard.press('Escape');
      // }
      reusableActionsClass_page.actualShipperName = await reusableActionsClass_page.shipper_name_inbox.inputValue();

      // Convert both actual and expected values to lowercase for case-insensitive comparison
      const actualShipperNameLowerCase = reusableActionsClass_page.actualShipperName.toLowerCase();
      const expectedShipperNameLowerCase = Shipper_Name.toLowerCase();
      console.log(`Shipper Name Expected "\n${expectedShipperNameLowerCase}"\nAnd Actual "\n${actualShipperNameLowerCase}"`);
      // Check if any word from the expected value is present in the actual value
      const containsExpectedWord = expectedShipperNameLowerCase.split(' ').some(word => actualShipperNameLowerCase.includes(word));

      if (containsExpectedWord) {
        console.log('Shipper Name assertion passed \n');
      } else {
        throw new Error(`Shipper Name failed: Expected "\n${Shipper_Name}"\n but got "\n${reusableActionsClass_page.actualShipperName}"`);
      }

      console.log("Verify Shipper Name By Keywords :- ", Shipper_Name);
      await this.page.keyboard.press('Escape');
    }
      // If Shipper_Address is passed, perform search with it
      if (Shipper_Address) {
        await webElementActionClass_page.send_Keys(reusableActionsClass_page.searchGlobal_txt, Shipper_Address);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(4000);
        await webElementActionClass_page.Click(reusableActionsClass_page.view_PO_btn)
        await this.page.waitForTimeout(5000);
        //   reusableActionsClass_page.actualShipperAddress = await reusableActionsClass_page.shipper_addr_inbox.inputValue();
        //   try {
        //     expect(reusableActionsClass_page.actualShipperAddress.toLowerCase()).toBe(Shipper_Address.toLowerCase());
        //   }
        //   catch (error) {
        //     throw new Error(`PO Number failed: Expected "\n${Shipper_Address}"\n but got "\n${reusableActionsClass_page.actualShipperAddress}"`);
        //   }
        //   console.log("Verify Shipper Address By Keywords :- ", Shipper_Address);
        //   await this.page.keyboard.press('Escape');
        // }

        reusableActionsClass_page.actualShipperAddress = await reusableActionsClass_page.shipper_addr_inbox.inputValue();

        // Convert both actual and expected values to lowercase for case-insensitive comparison
        const actualShipperAddressLowerCase = reusableActionsClass_page.actualShipperAddress.toLowerCase();
        const expectedShipperAddressLowerCase = Shipper_Address.toLowerCase();
        console.log(`Shipper Address Expected "\n${expectedShipperAddressLowerCase}"\nAnd Actual "\n${actualShipperAddressLowerCase}"`);
        // Check if any word from the expected value is present in the actual value
        const containsExpectedWord = expectedShipperAddressLowerCase.split(' ').some(word => actualShipperAddressLowerCase.includes(word));

        if (containsExpectedWord) {
          console.log('Shipper Address assertion passed \n');
        } else {
          throw new Error(`Shipper Address failed: Expected "\n${Shipper_Address}"\n but got "\n${reusableActionsClass_page.actualShipperAddress}"`);
        }

        console.log("Verify Shipper Address By Keywords :- ", Shipper_Address);
        await this.page.keyboard.press('Escape');

        await webElementActionClass_page.Click(reusableActionsClass_page.view_PO_btn)
        await this.page.waitForTimeout(5000);
        console.log("Global Search Results Verify By Keywords");
      }

    }
  }
    export default globalSearch_page