import { test } from '../fixture/global-fixture';
import { allure } from 'allure-playwright';
import fileName from '../test-data/JSON/file_Path.json'
import po_no from '../test-data/JSON/po_numbers_test.json'
import folderName from '../test-data/JSON/folder_Name.json'
import focus_mode_class_Page from '../pages/Focus_Mode_Page';




test.describe.serial('HelloDock', () => {
    let rule_02 = '"2"000000';
    let Focus_mode_class_Page: focus_mode_class_Page

    test.beforeEach(async ({ page }) => {
        Focus_mode_class_Page = new focus_mode_class_Page(page);

    });

    


    test('Testcase_02_Deletes_Upload_exception', async ({ reusableActionsClass_page }) => {

        await allure.step("Step_001_Create_Rule", async () => {
            await reusableActionsClass_page.createRule(rule_02, folderName.forth_Folder);

        });
        await allure.step("Step_002_Upload_BOLs", async () => {
            await reusableActionsClass_page.multipleUpload_BOLs(fileName.INVALID_TEST_PO1, fileName.INVALID_TEST_PO2);
        });

        await allure.step("Step_003_Focus Mode_Delete_Exceptions_And_Verify_Global_search", async () => {
            await Focus_mode_class_Page.delete_Exceptions_On_FocusMode();
        });

    });

})

