/*
 *  Uses the Spreadsheet API to make GET requests to Gemini to grab the prices of crypto coins,
 *  then outputs it to the spreadsheet. Also, has a Menu where the user can easily refresh the prices.
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  ui.createMenu('Crypto Prices')
      .addItem('Update Prices', 'postCryptoPrice')
      .addToUi();
}

function getCryptoPrice(range) {

  var url = 'https://api.gemini.com/v1/pricefeed';

  var options = {
    "method": "get"
  }

  var response = JSON.parse(UrlFetchApp.fetch(url,options));

  var getCryptoName = SpreadsheetApp.getActiveSpreadsheet().getRange(range).getValues();
  var outputCryptoName = getCryptoName + "USD";
  // Logger.log(outputCryptoName);

  outputCryptoPrice = response.find(response => response.pair == outputCryptoName )
  // Logger.log(outputCryptoPrice);

  finalResult = outputCryptoPrice.price;
  // Logger.log(finalResult);

  return finalResult;
}

function postCryptoPrice() {

var values = [
  [
    getCryptoPrice("'Sheet 1'!C5") // BTC
  ],
  [
    getCryptoPrice("'Sheet 1'!C6") // ETH
  ],
  [
    getCryptoPrice("'Sheet 1'!C7") // FIL
  ]
];

SpreadsheetApp.getActive().getRange("'Sheet 1'!F5:F7").setValues(values);
}
