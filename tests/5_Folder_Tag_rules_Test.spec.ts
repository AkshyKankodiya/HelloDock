import { test } from '../fixture/global-fixture';
import { allure } from 'allure-playwright';
import fileName from '../test-data/JSON/file_Path.json'
import folderName from '../test-data/JSON/folder_Name.json'
import po_no from '../test-data/JSON/po_numbers_test.json'
import focus_mode_class_Page from '../pages/Focus_Mode_Page';
import rules_tags_class_Page from '../pages/Rules_and_Tags_Page';

test.describe.serial('HelloDock', () => {

    let rule_05 = '"2"000000';
    let rule_06 = '“KEHE”0000000000';
    let Focus_mode_class_Page: focus_mode_class_Page
    let Rules_tags_class_Page: rules_tags_class_Page

    test.beforeEach(async ({ page }) => {
        Focus_mode_class_Page = new focus_mode_class_Page(page);
        Rules_tags_class_Page = new rules_tags_class_Page(page)

    });



    test('Testcase_01_PO_Folder_and_Tags', async ({ reusableActionsClass_page }) => {


        await allure.step("Step_001_Create_Rules", async () => {
            await reusableActionsClass_page.createRule(rule_05, folderName.first_Folder);
            await reusableActionsClass_page.createRule(rule_05, folderName.second_Folder);
            await reusableActionsClass_page.createRule(rule_05, folderName.third_Folder);
            await reusableActionsClass_page.createRule(rule_06, folderName.forth_Folder);

        });

        await allure.step("Step_002_File_Management,Add Tags and Verify On File ", async () => {
            await Rules_tags_class_Page.file_Management_Create_tags(folderName.second_Folder, folderName.TAG_1);
            await Rules_tags_class_Page.file_Management_Create_tags(folderName.third_Folder, folderName.TAG_2);
        });

        await allure.step("Step_003_Upload_BOLs", async () => {
            await reusableActionsClass_page.multipleUpload_BOLs(fileName.File_Tags_Test_PO);
        });

        await allure.step("Step_004_File_Management,Verify created Rule TAG And Folder ", async () => {
            await Rules_tags_class_Page.file_Management_Folder_file_count_Without_Tag(folderName.first_Folder, po_no.PO_Page_1, '2');
            await Rules_tags_class_Page.file_Management_Folder_file_count_Without_Tag(folderName.first_Folder, po_no.PO_Page_3, '2');
            await Rules_tags_class_Page.file_Management_Folder_file_count_With_Tag(folderName.second_Folder, po_no.PO_Page_3, '1');
            await Rules_tags_class_Page.file_count_With_Tag(folderName.third_Folder, folderName.TAG_2, '0');
            await Rules_tags_class_Page.file_Management_Folder_file_count_Without_Tag(folderName.forth_Folder, po_no.PO_Page_2, '1');

        });


    });



})

