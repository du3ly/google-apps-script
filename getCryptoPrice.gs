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

var spreadsheetId = "1VffDF-XEwpz6ze4PsEAytGQETyDItJyzyCgjkxQbEsw";

function getCryptoPrice(range) {

  var url = 'https://api.gemini.com/v1/pricefeed';

  var options = {
    "method": "get"
  }

  var response = JSON.parse(UrlFetchApp.fetch(url,options));

  var getCryptoValue = Sheets.Spreadsheets.Values.get(spreadsheetId, range);
  var resultCryptoValue = getCryptoValue.values[0][0] + "USD";
  
  outputCrypto = response.find(response => response.pair == resultCryptoValue )
  // Logger.log(outputCrypto);
  finalResult = outputCrypto.price;
  Logger.log(finalResult);

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
