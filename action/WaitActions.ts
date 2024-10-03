import { Page, Locator, Keyboard, expect, PlaywrightTestConfig, JSHandle, errors } from '@playwright/test'
class WaitActionClass {

    page: Page;


    constructor(page: Page) {

        this.page = page;

    }

    /**
     * Waits for the specified element to become visible within a timeout of 30 seconds.
     * Logs an error message if the element does not become visible in time.
     * @param element - Locator of the element to wait for.
     */

    async waitForElementVisible(element: Locator) {
        try {
            await element.waitFor({ state: 'visible', timeout: 30000 }); // Wait for 10 seconds
           //await element.waitFor({ timeout: 30000 });
            // Element is visible, proceed with your actions
        } catch (error) {
            console.error(`Error waiting for element to be visible: ${error.message}`);
            //throw new error; // Rethrow the error after logging
            throw error; 
        }
    }

    /**
    * Waits indefinitely until the specified element becomes visible.
    * @param element - Locator of the element to wait for.
    */

    async WaitUntilElementVisible(element: Locator) {
        try {
            await element.waitFor({ state: 'visible' ,timeout:600000}); // Wait for 10 seconds
            //await element.waitFor({ timeout: 30000 });
            // Element is visible, proceed with your actions
        } catch (error) {
            console.error(`Error waiting for element to be visible: ${error.message}`);
           // throw new error; // Rethrow the error after logging
           throw error; 
        }
    }

    /**
    * Waits for the specified element to disappear (hidden state).
    * Logs a message when the element disappears, or an error if it fails.
    * @param element - Locator of the element to wait for.
    */

    async WaitUntilElementToDisappear_hidden(element: Locator) {
        try {
            await element.waitFor({ state: 'hidden' });
            await element.waitFor({ timeout: 30000 });
            console.log('Element disappeared');
        } catch (error) {
            console.error('Error waiting for element to disappear:', error);
            //throw new error
            throw error; 
        }
    }

    /**
    * Waits until the specified element disappears (hidden and detached from the DOM).
    * This method has a 5-minute timeout (300,000 ms) and logs a message when the element is fully detached.
    * @param element - Locator of the element to wait for.
    */

    async WaitUntilElementToDisappear(element: Locator) {
        try {
            // Wait until the element is detached from the DOM, with a maximum wait of 5 minutes (300,000 ms)
           await element.waitFor({ state: 'hidden', timeout: 300000 });
          // await element.waitFor({ timeout: 30000 });
            await element.waitFor({ state: 'detached', timeout: 300000 });

            console.log('Element completely disappeared (detached from the DOM)');
        } catch (error) {
            console.error('Error waiting for element to disappear:', error);
            throw error;  // Re-throwing to fail the test if needed
            //throw new error
        }
    }

}


export default WaitActionClass