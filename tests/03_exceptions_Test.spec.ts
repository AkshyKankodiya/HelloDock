import { test } from '../fixture/global-fixture';
import { allure } from 'allure-playwright';
import exceptions_class_Page from '../pages/exceptions_Page';
import fileName from '../test-data/JSON/file_Path.json'
import folderName from '../test-data/JSON/folder_Name.json'
import po_no from '../test-data/JSON/po_numbers_test.json'


test.describe.serial('HelloDock', () => {
    let Exceptions_class_Page: exceptions_class_Page
    let rule_02 = '"2"000000';


    test.beforeEach(async ({ page }) => {

        Exceptions_class_Page = new exceptions_class_Page(page);

    });


    test('Testcase_001Exceptions_Fix_Global_Search', async ({ reusableActionsClass_page }) => {

        await allure.step("Step_001_Create_Rule", async () => {
            await reusableActionsClass_page.createRule(rule_02, folderName.forth_Folder);

        });
        await allure.step("Step_002_Upload_BOLs", async () => {
            await reusableActionsClass_page.multipleUpload_BOLs(fileName.Test_PO5);

        });
        await allure.step("Step_003_Fix_Exceptions", async () => {
            await Exceptions_class_Page.fixExceptionsAndVerifyOnGlobleSearch(po_no.New_PO);
        });
        await allure.step("Step_004_Global_Search_Keyword", async () => {
            await reusableActionsClass_page.globalSearch(po_no.New_PO);
        });

    });



})

