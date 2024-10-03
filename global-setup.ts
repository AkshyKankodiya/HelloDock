// global-setup.ts
import fs from 'fs';
import path from 'path';

async function globalSetup() {
  console.log('Global setup started');


  const resultsFilePath = './fixture/test-results.json';

  try {
    fs.writeFileSync(resultsFilePath, JSON.stringify([]), { encoding: 'utf8' });
    //console.log('JSON data cleared before tests');
  } catch (error) {
    console.error('Error clearing JSON data:', error);
  }

  //console.log('Global setup completed');
}

export default globalSetup;
