function coinPrice() {
  
  //SYSTEM VARIABLES DEFINATIONS
  var sh1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Özet");     //REPLACE inside of "" with your Dashboard Page Name! or simply create a page by that name.
  var apiKey = sh1.getRange(14, 3).getValue() || 'YOUR API KEY HERE'; //PLACE YOUR API KEY on the C14 Cell of your defined Coin Price Data Page. first number is rows secon is columns.
  const sh2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CMC_API")   //REPLACE inside of "" with your Coin Price Data Page Name! or simply create a page by that name.
  //////////////////////////////

  const coinMarketCapAPICall = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?aux=cmc_rank',
    qs: {
      start: '1',
      limit: '250',
      convert: 'USDT',
    },
    headers: { 'X-CMC_PRO_API_KEY': apiKey }, // Change the Number on the left to your API key!
    json: true,
    gzip: true,
  }

  //Notification Start for refresh process.
  sh1.getRange('A1').clear({contentsOnly: true, skipFilteredRows: true})
  .setValue('REFRESHING NOW...').setBackground('#ff0000').setFontColor('#ffff00');
  //////////////////////////////

  // Get the coins you follow from your spreadsheet
  let myCoinSymbols = []
  let myCoins = ""
  const getValues = sh2.getDataRange().getValues()
  for (let i = 0; i < getValues.length; i++) {
    // 0 = Column A in the spreadsheet. You can change this to the column where you enter your ticker symbols.
    const coinSymbol = getValues[i][0]
    if (coinSymbol) {
      if (myCoins != "") {
        myCoins += ","
      }
      myCoins += coinSymbol
      myCoinSymbols.push(coinSymbol)
    }
  }

  const coinMarketCapUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?convert=USDT&symbol=${myCoins}`
  const result = UrlFetchApp.fetch(coinMarketCapUrl, coinMarketCapAPICall)
  const txt = result.getContentText()
  const d = JSON.parse(txt)
  for (let i = 0; i < myCoinSymbols.length; i++) {
    const ticker = myCoinSymbols[i]
    const row = i + 2
    sh2.getRange(row, 2).setValue(d.data[ticker].id)
    sh2.getRange(row, 3).setValue(d.data[ticker].name)
    sh2.getRange(row, 4).setValue(d.data[ticker].circulating_supply)
    sh2.getRange(row, 5).setValue(d.data[ticker].total_supply)
    sh2.getRange(row, 6).setValue(d.data[ticker].quote.USDT.price)
    sh2.getRange(row, 7).setValue(d.data[ticker].quote.USDT.volume_24h)
    sh2.getRange(row, 8).setValue(d.data[ticker].quote.USDT.percent_change_1h)
    sh2.getRange(row, 9).setValue(d.data[ticker].quote.USDT.percent_change_24h)
    sh2.getRange(row, 10).setValue(d.data[ticker].quote.USDT.percent_change_7d)
    sh2.getRange(row, 11).setValue(d.data[ticker].quote.USDT.percent_change_30d)
    sh2.getRange(row, 12).setValue(d.data[ticker].quote.USDT.percent_change_60d)
    sh2.getRange(row, 13).setValue(d.data[ticker].quote.USDT.percent_change_90d)
    sh2.getRange(row, 14).setValue(d.data[ticker].quote.USDT.market_cap)
    sh2.getRange(row, 15).setValue(d.data[ticker].last_updated)
  }

  //This is a function that will pull gold-try and usdt-try price data from internet using importxml and show it on the Z6 and Z5 cells of "Özet" page.
  sh1.getRange('Z1').clear({contentsOnly: true, skipFilteredRows: true}).setValue('https://tr.investing.com/crypto/tether/usdt-try');
  sh1.getRange('Z2').clear({contentsOnly: true, skipFilteredRows: true}).setValue('/html/body/div/div/div/div/div[2]/main/div/div[1]/div[2]/div[1]/span');
  sh1.getRange('Z3').clear({contentsOnly: true, skipFilteredRows: true}).setFormula('=IMPORTXML(Z1;Z2)');
  sh1.getRange('A1').clear({contentsOnly: true, skipFilteredRows: true}).setBackground('#ffe599').setFontColor('#000000').setValue(new Date()).setNumberFormat('dd.MM.yyyy HH:mm:ss');
}
