import { test } from '../fixture/global-fixture';
import { allure } from 'allure-playwright';
import fileName from '../test-data/JSON/file_Path.json'
import folderName from '../test-data/JSON/folder_Name.json'
import generate_Report_class_Page from '../pages/Generate_Report_Page';
import po_no from '../test-data/JSON/po_numbers_test.json'

test.describe.serial('HelloDock', () => {

    let rule_02 = '"2"000000';
    let Generate_report_class_Page: generate_Report_class_Page

    test.beforeEach(async ({ page }) => {
        Generate_report_class_Page = new generate_Report_class_Page(page);

    });

    test('Testcase_01_Genrate_Report_CSV ', async ({ reusableActionsClass_page }) => {

        await allure.step("Step_001_Create_Rule", async () => {
            await reusableActionsClass_page.createRule(rule_02, folderName.forth_Folder);
        });

        await allure.step("Step_002_Upload_BOLs", async () => {
            await reusableActionsClass_page.multipleUpload_BOLs(fileName.Test_PO5, fileName.Test_PO6);
        });
        await allure.step("Step_003_Upload_CSV_Genrate_Report", async () => {
            await Generate_report_class_Page.CSV_Upload_BOLs(fileName.CSV_Test);
        });

    })

})