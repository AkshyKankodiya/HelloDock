import { test } from '../fixture/global-fixture';
import { allure } from 'allure-playwright';
import fileName from '../test-data/JSON/file_Path.json'
import folderName from '../test-data/JSON/folder_Name.json'
import po_no from '../test-data/JSON/po_numbers_test.json'
import focus_mode_class_Page from '../pages/Focus_Mode_Page';
import rules_tags_class_Page from '../pages/Rules_and_Tags_Page';

test.describe.serial('HelloDock', () => {

    let rule_01 = '"2"00000"1"';
    let rule_02 = '"2"00000"4"';
    let rule_03 = '"2"00000"9"';
    let rule_04 = '"2"00000"5"';
    let Focus_mode_class_Page: focus_mode_class_Page
    let Rules_tags_class_Page: rules_tags_class_Page

    test.beforeEach(async ({ page }) => {
        Focus_mode_class_Page = new focus_mode_class_Page(page);
        Rules_tags_class_Page = new rules_tags_class_Page(page)

    });


    test('Testcase_01_Rules_And_Tag_Rules ', async ({ reusableActionsClass_page }) => {


        await allure.step("Step_001_Create_Multiple_Rules", async () => {
            await reusableActionsClass_page.createRule(rule_01, folderName.Rule_No_01_Folder);
            await reusableActionsClass_page.createRule(rule_02, folderName.Rule_No_02_Folder);
            await reusableActionsClass_page.createRule(rule_03, folderName.Rule_No_03_Folder);
            await reusableActionsClass_page.createRule(rule_04, folderName.Rule_No_04_Folder);
        });

        await allure.step("Step_002_Upload_BOLs", async () => {
            await reusableActionsClass_page.multipleUpload_BOLs(fileName.Test_PO4);
        });

        await allure.step("Step_003_File_Management,Verify created Rule And Folder ", async () => {
            await reusableActionsClass_page.file_Management_Folder_Search(folderName.Rule_No_01_Folder, po_no.Rule_PO_PO1);
        });

        await allure.step("Step_004_Global_Search_Fixed_PO", async () => {
            await Focus_mode_class_Page.focusFixedglobalSearch(po_no.Rule_PO_PO1, po_no.Rule_PO_PO2, po_no.Rule_PO_PO3, po_no.Rule_PO_PO4);
        });

        await allure.step("Step_005_Fix_Exceptions", async () => {
            await reusableActionsClass_page.fixExceptions();
        });
    });


})

