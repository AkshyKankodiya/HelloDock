import path from "path";
import fs from 'fs';

// global-teardown.ts
async function globalTeardown() {
  console.log('Global teardown started');

 // const resultsFilePath1 = path.join(__dirname, 'test-results.json');
 const resultsFilePath1 = './fixture/test-results.json';
//  // const fileInput = this.page.locator("//input[@type='file']");

//   // Delete old results file if it exists
//   if (fs.existsSync(resultsFilePath1)) {
//     fs.unlinkSync(resultsFilePath1);
//     console.log('Old test results file deleted.');
//   }

console.log(`\n===========================================================================================================================================================`);
  console.log(`| Testcase Name                                      | Result   | Expected                                                    | Actual                |`);
  console.log(`===========================================================================================================================================================`);

  // Read final results from JSON file
  let allTestResults ;
  try {
    const data = fs.readFileSync(resultsFilePath1, 'utf8');
    allTestResults = JSON.parse(data);
  } catch (err) {
    console.error('Error reading final results file:', err);
  }

  allTestResults.forEach((result) => {
    if (result.status === 'passed') {
      console.log(`| ${result.name.padEnd(50)} | ${result.status.padEnd(9)}  | N/A                                                          | N/A                   |`);
    } else if (result.status === 'skipped') {
      console.log(`| ${result.name.padEnd(50)} | ${result.status.padEnd(9)}  | N/A                                                          | N/A                   |`);
    } else {
      console.log(`| ${result.name.padEnd(50)} | ${result.status.padEnd(8)} | ${result.expected.padEnd(56)} | ${result.actual.padEnd(20)} |`);
    }
  });

  console.log(`===========================================================================================================================================================`);

  // Perform any necessary cleanup actions here, such as closing resources or services
 // console.log('Global teardown finished');
}

export default globalTeardown;
