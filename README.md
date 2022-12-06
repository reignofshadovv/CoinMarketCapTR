# CoinMarketCapTR
This is another appscript for Google sheets to get coin prices but has other functionality such as pulling usd-try price data from other sources and notifies when script is working.

1. copy contents of cmc-api.gs to your appscript project on the google sheets.
2. rename "Özet" and "CMC_API" to reflect your Google Sheet pages.
    "Özet" is my dashboard page. "CMC_API" is my price data storage page
3. Make sure your price data storage has your preferred Coin "Tickers" on the Column A starting form 2nd Row. Don't populate first A1 on that page.
4. Make sure there is not important values on the cells Z1, Z2, and Z3 on your Dashboard page.
5. Place your api key on cell C14 or where it says 'YOUR API KEY HERE' on the script.
6. Save and press run. 
7. First run it'll ask for premissions allow and you are good to go.
8. You can add triggers or manually run the script.
