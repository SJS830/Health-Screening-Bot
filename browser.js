const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const contentHtml = fs.readFileSync(path.resolve(__dirname, './ahs.html')).toString();

let browser;
let page;

(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();

  await page.setViewport({
    width: 400,
    height: 800,
  });

  await page.setContent(contentHtml);
})();

module.exports.screenshot = async function render(name) {
  let date = new Date();
  let dayofweek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'][date.getMonth()];
  let dayofmonth = date.getDate();
  let year = date.getFullYear();
  let time = `${(date.getHours() % 12) ? (date.getHours() % 12) : 12}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()} ${(date.getHours() >= 12) ? 'PM' : 'AM'}`
  let dateString = `${dayofweek}, ${month} ${dayofmonth}, ${year} ${time}`

  await page.evaluate(([name, dateString]) => {
     document.getElementById("autohealthscreening_name").innerText = name;
     document.getElementById("autohealthscreening_datetime").innerText = dateString;
  }, [name, dateString]);

  return page.screenshot({ path: "./screenshot.png" })
}
