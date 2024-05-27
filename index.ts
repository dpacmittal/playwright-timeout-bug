import {chromium} from '@playwright/test';


async function main() {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.route('**', async route=>{
        //return route.continue();
        const response = await route.fetch();
        return await route.fulfill({
            response
        });
    });

    await page.setContent(`
      <html>
          <body>
              <img src="https://lppool.catalogsites.net/lf?source=url%5Bfile:/MasterSite/CD61/Email/_template_2021/bedding_snob_logo.png%5D&sink=format%5Bpng%5D,quality%5B96%5D" />
          </body>
      </html>`);

      await page.unroute('**');

      async function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      await sleep(50000);
    await browser.close();
}

main();
