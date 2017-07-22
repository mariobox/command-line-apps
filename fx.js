// Currency List:
// AUD
// BGN
// BRL
// CAD
// CHF
// CNY
// CZK
// DKK
// GBP
// HKD
// HRK
// HUF
// IDR
// ILS
// INR
// JPY
// KRW
// MXN
// MYR
// NOK
// NZD
// PHP
// PLN
// RON
// RUB
// SEK
// SGD
// THB
// TRY
// USD
// ZAR


const http = require('http');

function printFx(fxSym) {
  // make the get request
  const request = http.get(`http://api.fixer.io/latest?base=${fxSym}`, response => {
    if (response.statusCode === 200) {
      var body = "";
      response.on('data', data => {
        body += data.toString();
      });

      response.on('end', () => {
        try {
          const currencies = JSON.parse(body);
          if (currencies.base.length > 0) {
            const exch = 1 / currencies.rates.USD;
            const message = `One ${fxSym} is equal to ${currencies.rates.USD} US Dollars
One USD is equal to ${exch} ${fxSym}`;
            console.log(message);
          } else { console.log(`Symbol ${fxSym} does not exist. Try another one.`) };

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

const fxSym = process.argv.slice(2);
fxSym.forEach(printFx);





