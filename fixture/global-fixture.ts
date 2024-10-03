
// // test-fixture.ts
// import fs from 'fs';
// import path from 'path';
// import { test as baseTest} from '@playwright/test';
// import ReusableActions from '../action/ReusableActions';

// type TestResult = {
//   name: string;
//   status: string;
//   executionTime: number;
//   expected?: any; // Expected value (for failed tests)
//   actual?: any;   // Actual value (for failed tests)

// };

// type MyFixtures = {
//   reusableActionsClass_page: ReusableActions;
  
// };

// // Path to the results file
// const resultsFilePath = path.join(__dirname, 'test-results.json');

// // Extend Playwright's test object to add global beforeEach
// const test = baseTest.extend<MyFixtures>({
//   reusableActionsClass_page: async ({ page }, use) => {
//     const reusableActions = new ReusableActions(page);
   
//     // Define your global beforeEach logic here
//     await reusableActions.userLogin();
//     await reusableActions.deleteRule();
//     await reusableActions.deleteUploaded_PO();
//     await reusableActions.deleteExceptions();

//     // Pass the reusableActions object to all tests
//     await use(reusableActions);
//   },
// });

// // Function to extract expected and actual values from error messages
// function extractExpectedActual(message: string): { expected: string; actual: string } {
//   const expectedMatch = message.match(/Expected\s+"([^"]+)"\s+but\s+got\s+"([^"]+)"/);
//   return {
//     expected: expectedMatch ? expectedMatch[1].trim() : 'N/A',
//     actual: expectedMatch ? expectedMatch[2].trim() : 'N/A',
//   };
// }

// // Save test result to a JSON file after each test
// test.afterEach(async ({}, testInfo) => {
//   let expected = 'N/A';
//   let actual = 'N/A';


//   // If the test failed, capture the expected and actual results
//   if (testInfo.status === 'failed') {
//     const error = testInfo.errors[0]; // Get the first error (if any)
//     if (error?.message) {
//       const { expected: exp, actual: act } = extractExpectedActual(error.message);
//       expected = exp;
//       actual = act;
//     }
//   }

//   const testResult: TestResult = {
//     name: testInfo.title,
//     status: testInfo.status ?? 'unknown',
//     executionTime: testInfo.duration,
//     expected,
//     actual,

//   };

//   // Read existing results from JSON file
//   let currentResults: TestResult[] = [];
//   try {
//     if (fs.existsSync(resultsFilePath)) {
//       const data = fs.readFileSync(resultsFilePath, 'utf8');
//       currentResults = JSON.parse(data);
//     }
//   } catch (err) {
//     console.error('Error reading results file:', err);
//   }


//   // Add the new result
//   currentResults.push(testResult);

//   // Write updated results to the JSON file
//   try {
//     fs.writeFileSync(resultsFilePath, JSON.stringify(currentResults, null, 2), { encoding: 'utf8' });
//   } catch (err) {
//     console.error('Error writing results file:', err);
//   }




// });

// // Print results after all tests
// //test.afterAll(async () => {
// //   console.log(`\n===========================================================================================================================================================`);
// //   console.log(`| Testcase Name                                                | Result   | Expected                                                    | Actual                |`);
// //   console.log(`===========================================================================================================================================================`);

// //   // Read final results from JSON file
// //   let allTestResults: TestResult[] = [];
// //   try {
// //     const data = fs.readFileSync(resultsFilePath, 'utf8');
// //     allTestResults = JSON.parse(data);
// //   } catch (err) {
// //     console.error('Error reading final results file:', err);
// //   }

// //   allTestResults.forEach((result) => {
// //     if (result.status === 'passed') {
// //       console.log(`| ${result.name.padEnd(60)} | ${result.status.padEnd(9)}  | N/A                                                          | N/A                   |`);
// //     } else if (result.status === 'skipped') {
// //       console.log(`| ${result.name.padEnd(60)} | ${result.status.padEnd(9)}  | N/A                                                          | N/A                   |`);
// //     } else {
// //       console.log(`| ${result.name.padEnd(60)} | ${result.status.padEnd(8)} | ${result.expected.padEnd(56)} | ${result.actual.padEnd(20)} |`);
// //     }
// //   });

// //   console.log(`===========================================================================================================================================================`);
// // });

// export { test};







import fs from 'fs';
import path from 'path';
import { test as baseTest } from '@playwright/test';
import ReusableActions from '../action/ReusableActions';

type TestResult = {
  name: string;
  status: string;
  executionTime: number;
  expected?: any;
  actual?: any;
};

type MyFixtures = {
  reusableActionsClass_page: ReusableActions;
};

const resultsFilePath = path.join(__dirname, 'test-results.json');

const test = baseTest.extend<MyFixtures>({
  reusableActionsClass_page: async ({ page }, use) => {
    const reusableActions = new ReusableActions(page);
    await reusableActions.userLogin();
    await reusableActions.deleteRule();
    await reusableActions.deleteUploaded_PO();
    await reusableActions.deleteExceptions();
    await use(reusableActions);
  },
});

// Function to extract expected and actual values from error messages
function extractExpectedActual(message: string): { expected: string; actual: string } {
  const expectedMatch = message.match(/Expected\s+"([^"]+)"\s+but\s+got\s+"([^"]+)"/);
  return {
    expected: expectedMatch ? expectedMatch[1].trim() : 'N/A',
    actual: expectedMatch ? expectedMatch[2].trim() : 'N/A',
  };
}

// Helper function to read and write results file asynchronously
async function readResults(): Promise<TestResult[]> {
  try {
    const data = await fs.promises.readFile(resultsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []; // File does not exist, return empty array
    } else {
      console.error('Error reading results file:', err);
      return [];
    }
  }
}

async function writeResults(results: TestResult[]): Promise<void> {
  try {
    await fs.promises.writeFile(resultsFilePath, JSON.stringify(results, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing results file:', err);
  }
}

// Save test result after each test
test.afterEach(async ({}, testInfo) => {
  let expected = 'N/A';
  let actual = 'N/A';

  if (testInfo.status === 'failed') {
    const error = testInfo.errors[0];
    if (error?.message) {
      const { expected: exp, actual: act } = extractExpectedActual(error.message);
      expected = exp;
      actual = act;
    }
  }

  const testResult: TestResult = {
    name: testInfo.title,
    status: testInfo.status ?? 'unknown',
    executionTime: testInfo.duration,
    expected,
    actual,
  };

  // Read existing results, append the new result, and write them back
  const currentResults = await readResults();
  currentResults.push(testResult);
  await writeResults(currentResults);
});

// Print results after all tests
// test.afterAll(async () => {
//   const allTestResults = await readResults();

//   console.log(`\n===========================================================================================================================================================`);
//   console.log(`| Testcase Name                                                | Result   | Expected                                                    | Actual                |`);
//   console.log(`===========================================================================================================================================================`);

//   allTestResults.forEach((result) => {
//     if (result.status === 'passed') {
//       console.log(`| ${result.name.padEnd(60)} | ${result.status.padEnd(9)}  | N/A                                                          | N/A                   |`);
//     } else if (result.status === 'skipped') {
//       console.log(`| ${result.name.padEnd(60)} | ${result.status.padEnd(9)}  | N/A                                                          | N/A                   |`);
//     } else {
//       console.log(`| ${result.name.padEnd(60)} | ${result.status.padEnd(8)} | ${result.expected.padEnd(56)} | ${result.actual.padEnd(20)} |`);
//     }
//   });

//   console.log(`===========================================================================================================================================================`);
// });

export { test };


