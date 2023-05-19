import { chromium,test,expect } from "@playwright/test";



test("MakeMyTrip Flight Search", async () => {
   
   const browser = await chromium.launch({headless:false});
   const context=await browser.newContext();
   const page = await context.newPage();
  
    await page.goto("https://www.makemytrip.com/");
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'Flights', exact: true }).click();
   
     // await page.getByRole('listitem').filter({ hasText: 'Round Trip' }).locator('span').click();
    await page.waitForTimeout(3000);
    await page.getByText('From', { exact: true }).click();
    await page.getByText('Pune, India').click();
    await page.getByText('To', { exact: true }).click();
    await page.getByText('New Delhi, India').click();
    await page.getByRole('gridcell', { name: 'Sun May 21 2023' }).getByText('21').click();


    //wait for search results
    await page.getByText('Search', { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.locator('.commonOverlay > span').click();
     
    // Verify the search locations
    const fromLocation = await page.$eval("div[class='hsw_inputBox width160']",(el) => el.textContent);
    const toLocation = await page.$eval("(//div[@class='hsw_inputBox width160'])[2]",(el) => el.textContent);
    // const expectfrom:string="Pune";
    // const expectTo:string="Delhi";

    console.log(fromLocation);
    console.log(toLocation);
    expect(fromLocation).toContain("FROM");
    expect(toLocation).toContain("TO");
    await browser.close();
  });
  test.setTimeout(120000);








