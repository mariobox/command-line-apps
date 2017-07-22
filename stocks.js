const https = require('https');

// Get yesterday's date
var today = new Date();
var dd = today.getDate() - 1;
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
today = yyyy + mm + dd;


// Create function to print stock prices in command line

function printStocks(symbol) {
// make the get request
const request = https.get(`https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=${symbol}&date=${today}&api_key=yourapikeygoeshere`, response => {
  if (response.statusCode === 200) {
    var body = "";
    response.on('data', data => {
      body += data.toString();
    });

    response.on('end', () => {
      try {
        const stockPrice = JSON.parse(body);
        if (stockPrice.datatable.data.length > 0) {
          const message = `${symbol} stock price closed at ${stockPrice.datatable.data[0][5]}`;
          console.log(message);
        } else { console.log(`Symbol ${symbol} does not exist. Try another one.`) };

      }

      catch (error) {
        console.error(error.message);
      }
    });

  } else {
    console.log(`There has been a ${response.statusCode} error.`);
  }

});
}

// Get stock symbols from command line (space separated) and print stock quotes
const symbol = process.argv.slice(2);
symbol.forEach(printStocks);







