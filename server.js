var express = require('express');
const fetch = require('node-fetch');
var app = express();
let basicUrl = 'https://api.privatbank.ua/p24api/exchange_rates?json&date='
let today = new Date();
let dates = []
let i = 0
while (i < 7) {
  dates.push((today.getDate() - i) + '.' + (today.getMonth() + 1) + '.' + today.getFullYear())
  i++
}
app.listen(3000, () => {
  return Promise.all(dates.map(d => fetch(basicUrl + d))).then(responses =>
    // cannot use res.json() instead of res.text() because of error while parsing response
    Promise.all(responses.map(res => res.text()))
  ).then(text => {
    console.log(JSON.stringify(text))
  })
});
