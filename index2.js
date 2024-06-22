const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.compass.com/listing/25439-parklane-drive-hayward-ca-94544/1572807009604608657/');

  const propertyHistory = await page.evaluate(() => {
    const rows = document.querySelectorAll('#propertyHistory table tbody tr');
    let history = [];

    rows.forEach(row => {
      const date = row.querySelector('th').innerText.trim();
      const eventSource = row.querySelectorAll('td')[0].innerText.trim();
      const price = row.querySelectorAll('td')[1].innerText.trim();
      history.push({ date, eventSource, price });
    });

    return history;
  });

  console.log(propertyHistory);

  await browser.close();
})();
