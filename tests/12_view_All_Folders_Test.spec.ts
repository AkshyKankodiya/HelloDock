import { test } from '../fixture/global-fixture';
import { allure } from 'allure-playwright';
import fileName from '../test-data/JSON/file_Path.json'
import folderName from '../test-data/JSON/folder_Name.json'
import po_no from '../test-data/JSON/po_numbers_test.json'
import file_management_system_page from '../pages/File_Management_System_Page'


test.describe.serial('HelloDock', () => {
    let File_management_system_page: file_management_system_page;
    let rule_04 = '"2"00000"5"';
    let rule_05 = '"2"00000"0"';

    test.beforeEach(async ({ page }) => {
        File_management_system_page = new file_management_system_page(page);

    });

    test('Testcase_01View_All_Folders_Keyword', async ({ reusableActionsClass_page }) => {

        await allure.step("Step_001_Create_Multiple_Rules", async () => {

            await reusableActionsClass_page.createRule(rule_05, folderName.first_Folder);
            await reusableActionsClass_page.createRule(rule_04, folderName.forth_Folder);
        });

        await allure.step("Step_002_Upload_BOLs", async () => {
            await reusableActionsClass_page.multipleUpload_BOLs(fileName.Test_PO6);
        });

        await allure.step("Step_003_File_Management,Verify created Rule And Folder ", async () => {
            await reusableActionsClass_page.file_Management_Folder_Search(folderName.first_Folder, po_no.PO1.PO_Number);
        }); await reusableActionsClass_page.file_Management_Folder_Search(folderName.forth_Folder, po_no.PO3.PO_Number);

        await allure.step("Step_004_File_Management,Verify_Files_Using_Keywords ", async () => {
            await File_management_system_page.file_Management_Verify_Search_keywords(po_no.PO1.Shipper_Name, po_no.PO1.PO_Number);
            await File_management_system_page.file_Management_Verify_Search_keywords(po_no.PO3.Shipper_Name, po_no.PO3.PO_Number);
        });


    });
})





