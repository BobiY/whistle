var request = require('request');
// console.log(1111)
// request('http://hangzhoudev.nicezhuanye.com/management/index.html?UserID=20256341&token=4015572ea407e0b77c61d35dac72362e&loginTypeID=7#/regionManage/areaReport', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

function getData() {
    request('http://hangzhoudev.nicezhuanye.com/management/index.html?UserID=20256341&token=4015572ea407e0b77c61d35dac72362e&loginTypeID=7#/regionManage/areaReport', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        if ( true ) {
            console.log(111)
            setTimeout(getData, 500)
        }
    });
}

// getData()
// var webdriver = require('selenium-webdriver');
//     By = webdriver.By,
//     until = webdriver.until;

// var driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();

// driver.get('https://www.baidu.com');
// driver.findElement(By.id('kw')).sendKeys('webdriver');
// driver.findElement(By.id('su')).click();
// driver.wait(until.titleIs('webdriver_百度搜索'), 1000);
var webdriver = require('selenium-webdriver');
const By = webdriver.By;
(async () => {
  const aa = await new webdriver.Builder()
  .forBrowser('chrome')
  .build();
  // console.log(aa)
  const bb = await aa.get("https://www.baidu.com/")
  console.log(bb)
} )()
// var driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();
// driver.get('http://hangzhoudev.nicezhuanye.com/management/index.html?UserID=20256341&token=4015572ea407e0b77c61d35dac72362e&loginTypeID=7#/regionManage/areaReport').then( res => {console.log(res)} ).catch(err => { console.log(err) });
// // console.log(driver)
// driver.findElement(By.id('center-btn')).then( res => {console.log(res)} ).catch(err => { console.log(err);console.log(111) });
// driver.quit();