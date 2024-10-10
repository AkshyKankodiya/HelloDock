import { test } from '../fixture/global-fixture';
import { allure } from 'allure-playwright';
import fileName from '../test-data/JSON/file_Path.json'
import folderName from '../test-data/JSON/folder_Name.json'
import po_no from '../test-data/JSON/po_numbers_test.json'



test.describe.serial('HelloDock', () => {

    let rule_02 = '"2"000000';


    test('Testcase_001Multiple_Document_Multi-PO upload ', async ({ reusableActionsClass_page }) => {

        await allure.step("Step_001_Create_Rule", async () => {
            await reusableActionsClass_page.createRule(rule_02, folderName.forth_Folder);
        });

        await allure.step("Step_002_Upload_BOLs", async () => {
            await reusableActionsClass_page.multipleUpload_BOLs(fileName.Test_PO5, fileName.Test_PO6);
        });

        await allure.step("Step_003_Fix_Exceptions", async () => {
            await reusableActionsClass_page.fixExceptions();
        });

        await allure.step("Step_004_Global_Search_And_Verify_Extracted_Data_File_1", async () => {

            await reusableActionsClass_page.globalSearch(po_no.PO2.PO_Number);
            await reusableActionsClass_page.verifyPONumbers(po_no.PO2.PO_Number);
            await reusableActionsClass_page.verifyShipperName(po_no.PO2.Shipper_Name);
            await reusableActionsClass_page.verifyShipperAddress(po_no.PO2.Shipper_Address);
            await reusableActionsClass_page.verifyDestinationAddress(po_no.PO2.Destination_Address);
            //await reusableActionsClass_page.verifyShipmentDate(po_no.PO2.Shipment_Date);
            await reusableActionsClass_page.verifyCarrierName(po_no.PO2.Carrier_Name)
            await reusableActionsClass_page.verifySignOnApproval(po_no.PO2.Sign_On_Approval)
            //await reusableActionsClass_page.verifyShipmentWeight(po_no.PO2.Shipment_Weight);

        });

        await allure.step("Step_005_Global_Search_And_Verify_Extracted_Data_file_2", async () => {
            await reusableActionsClass_page.globalSearch(po_no.PO3.PO_Number);
            await reusableActionsClass_page.verifyPONumbers(po_no.PO3.PO_Number);
            await reusableActionsClass_page.verifyShipperName(po_no.PO3.Shipper_Name);
            await reusableActionsClass_page.verifyShipperAddress(po_no.PO3.Shipper_Address);
            await reusableActionsClass_page.verifyDestinationAddress(po_no.PO3.Destination_Address);
            //await reusableActionsClass_page.verifyShipmentDate(po_no.PO3.Shipment_Date);
            await reusableActionsClass_page.verifyCarrierName(po_no.PO3.Carrier_Name)
            await reusableActionsClass_page.verifySignOnApproval(po_no.PO3.Sign_On_Approval)
            //await reusableActionsClass_page.verifyShipmentWeight(po_no.PO3.Shipment_Weight);

        });

    });





})

