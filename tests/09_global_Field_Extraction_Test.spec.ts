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


    test('Testcase_02GlobalSearch_Field_Extraction ', async ({ reusableActionsClass_page }) => {

        await allure.step("Step_001_Create_Rule", async () => {
            await reusableActionsClass_page.createRule(rule_02, folderName.forth_Folder);

        });
        await allure.step("Step_002_Upload_BOLs", async () => {
            await reusableActionsClass_page.multipleUpload_BOLs(fileName.Test_PO6);

        });

        await allure.step("Step_003_Global_Search_Keyword", async () => {
            await GlobalSearch_page.globalSearch_Keyword(po_no.PO1.PO_Number)
        });

        await allure.step("Step_004_Step_006_Verify_Extracted_Data_From_Field", async () => {

            await reusableActionsClass_page.verifyPONumbers(po_no.PO1.PO_Number);
            await reusableActionsClass_page.verifyShipperName(po_no.PO1.Shipper_Name);
            await reusableActionsClass_page.verifyShipperAddress(po_no.PO1.Shipper_Address);
            await reusableActionsClass_page.verifyDestinationAddress(po_no.PO1.Destination_Address);
            //await reusableActionsClass_page.verifyShipmentDate(po_no.PO1.Shipment_Date);
            //await reusableActionsClass_page.verifyShipmentWeight(po_no.PO1.Shipment_Weight);
            await reusableActionsClass_page.verifyCarrierName(po_no.PO1.Carrier_Name)
            await reusableActionsClass_page.verifySignOnApproval(po_no.PO1.Sign_On_Approval)
        });

    });

})

