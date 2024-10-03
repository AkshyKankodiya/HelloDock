import { test } from '../fixture/global-fixture';
import { allure } from 'allure-playwright';
import globalSearch_page from '../pages/Global_Search_Page'
import fileName from '../test-data/JSON/file_Path.json'
import folderName from '../test-data/JSON/folder_Name.json'
import po_no from '../test-data/JSON/po_numbers_test.json'




test.describe.serial('HelloDock', () => {
    let GlobalSearch_page: globalSearch_page;
    let rule_02 = '"2"000000';
    test.beforeEach(async ({ page }) => {
        GlobalSearch_page = new globalSearch_page(page);

    });

    test('Testcase_01Global_Search_Keyword', async ({ reusableActionsClass_page }) => {

        await allure.step("Step_001_Create_Rule", async () => {
            await reusableActionsClass_page.createRule(rule_02, folderName.forth_Folder);

        });
        await allure.step("Step_002_Upload_BOLs", async () => {
            await reusableActionsClass_page.multipleUpload_BOLs(fileName.Test_PO6);

        });

        await allure.step("Step_003_Global_Search_Keyword", async () => {
            await GlobalSearch_page.globalSearch_Keyword(po_no.PO1.PO_Number, po_no.PO1.Shipper_Name)

        });
    });


})

