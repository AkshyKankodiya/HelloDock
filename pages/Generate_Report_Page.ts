import { Page, Locator, Keyboard, expect, PlaywrightTestConfig, chromium, JSHandle, BrowserContext } from '@playwright/test'
import WaitActionClass from '../action/WaitActions';
import webElementActionClass from '../action/WebElementActions';
import reusableActionsClass from '../action/ReusableActions';
import * as fs from 'fs';
import * as path from 'path';
let waitActionClass: WaitActionClass
let webElementActionClass_page: webElementActionClass;
let reusableActionsClass_page: reusableActionsClass;


class generate_Report_class_Page {

  page: Page;
  actual_File_Count: string;
  actual_Tag: string;
  generate_Packet_tab: Locator;
  generate_Packet_Title: Locator;
  generate_Packet_btn: Locator;
  generate_Packet_success_msg: Locator;
  generate_Packet_PO_input: Locator;
  generate_Report_msg: Locator;



  constructor(page: Page) {
    this.page = page;
    waitActionClass = new WaitActionClass(page);
    webElementActionClass_page = new webElementActionClass(page);
    reusableActionsClass_page = new reusableActionsClass(page);
    this.generate_Packet_tab = page.locator("//div[contains(text(),'Generate BOL Packet')]")
    this.generate_Packet_Title = page.locator("//h1[contains(text(),'Generate BOL Packet')]")
    this.generate_Packet_btn = page.locator("//button[contains(text(),'Generate BOL Packet')]")
    this.generate_Packet_success_msg = page.locator("//div[contains(text(),'Successfully Generated Report!')]")
    this.generate_Packet_PO_input = page.locator("//div[@class='mt-2']//textarea")
    this.generate_Report_msg = page.locator("//h2[contains(text(),'Success! Your report will download automatically.')]")
  }

  /**
    * Uploads CSV files and triggers the report generation.
    * @param filenames - Names of the CSV files to upload.
    */

  async CSV_Upload_BOLs(...filenames: string[]) {
    await this.page.waitForTimeout(5000);
    await webElementActionClass_page.Click(this.generate_Packet_tab)
    await waitActionClass.WaitUntilElementVisible(this.generate_Packet_Title)
    const filePaths = filenames.map(fileName => './test-data/CSV/' + fileName);
    // Use setInputFiles to upload the file
    const fileInput = this.page.locator('//input[@type="file"]');
    await fileInput.setInputFiles(filePaths);
    await this.page.waitForTimeout(1000);
    // Wait for the extract button to become visible
    await waitActionClass.WaitUntilElementVisible(this.generate_Packet_btn)
    const downloadFolderPath = './download-report';
    await this.clearDownloadFolder(downloadFolderPath)
    await this.downloadAndSaveFile(downloadFolderPath);
    // Click on the extract button
    await webElementActionClass_page.Click(this.generate_Packet_btn)
    await this.page.waitForTimeout(1000);
    await waitActionClass.WaitUntilElementVisible(this.generate_Packet_success_msg)
    //expect(this.generate_Packet_success_msg).toBeVisible();
    await waitActionClass.WaitUntilElementVisible(this.generate_Report_msg)
    expect(this.generate_Report_msg).toBeVisible();
    console.log(`CSV File Uploaded Successfully`);
    console.log('Report downloaded automatically')
  }

  /**
     * Generates a report based on a comma-delimited box of POs.
     * @param filenames - POs of the POs Number to include in the report.
     */

  async comma_Delimited_Box_Report(...filenames: string[]) {

    await this.page.waitForTimeout(5000);
    await webElementActionClass_page.Click(this.generate_Packet_tab)
    await waitActionClass.WaitUntilElementVisible(this.generate_Packet_Title)
    await this.page.waitForTimeout(2000);
    const combinedPOs = filenames.join('\n');
    await webElementActionClass_page.send_Keys(this.generate_Packet_PO_input, combinedPOs)
    // Wait for the extract button to become visible
    await waitActionClass.WaitUntilElementVisible(this.generate_Packet_btn)
    const downloadFolderPath = './download-report';
    await this.downloadAndSaveFile(downloadFolderPath);
    // Click on the extract button
    await webElementActionClass_page.Click(this.generate_Packet_btn)
    await this.page.waitForTimeout(1000);
    await waitActionClass.WaitUntilElementVisible(this.generate_Packet_success_msg)
    //expect(this.generate_Packet_success_msg).toBeVisible();
    await waitActionClass.WaitUntilElementVisible(this.generate_Report_msg)
    expect(this.generate_Report_msg).toBeVisible();
    console.log('Comma Delimited Box Report downloaded automatically')
  }

  /**
    * Handles the download of files and saves them to a specified folder.
    * @param downloadFolderPath - Path to the folder where downloads will be saved.
    */

  async downloadAndSaveFile(downloadFolderPath: string) {
    // Ensure the folder exists
    if (!fs.existsSync(downloadFolderPath)) {
      fs.mkdirSync(downloadFolderPath, { recursive: true });
    }

    // Listen for the download event
    this.page.on('download', async (download) => {
      try {
        // Wait for the download to complete
        // Generate a unique name using timestamp and random string
        const uniqueName = generateUniqueTimestamp();
        const uniqueFileName = `${uniqueName}`;
        const destinationPath = path.join(downloadFolderPath, uniqueFileName);

        // Save the downloaded file to the new location
        await download.saveAs(destinationPath);

        // Verify if the file exists
        if (fs.existsSync(destinationPath)) {
          console.log('Report Generated SuccessfullyAnd File Save In download-report Folder')
          console.log(`File downloaded and saved as ${uniqueFileName}`);
        } else {
          console.error('File was not saved successfully.');
        }

      } catch (error) {
        console.error('Download failed:', error);
      }
    });
  }

  /**
    * Clears the contents of the download folder.
    * @param downloadFolderPath - Path to the folder to clear.
    */

  async clearDownloadFolder(downloadFolderPath: string) {
    if (fs.existsSync(downloadFolderPath)) {
      const files = fs.readdirSync(downloadFolderPath);

      files.forEach((file) => {
        const filePath = path.join(downloadFolderPath, file);
        if (fs.lstatSync(filePath).isFile()) {
          fs.unlinkSync(filePath); // Delete the file
        }
      });

      console.log('Download folder cleared.');
    }
  }

}
export default generate_Report_class_Page

/**
 * Generates a unique timestamp for naming files.
 * @returns {string} - Unique file name.
 */

export const generateUniqueTimestamp = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const
    hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return `Generated_Report_${day}_${month}_${year}__${hours}_${minutes}.pdf`;
};