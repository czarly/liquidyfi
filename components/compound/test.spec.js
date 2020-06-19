const { accountLiqudityByGraphData } = require('./AccountLiquidityGraph');
const _ = require('lodash');

const data = {
    "data": {
      "account": {
        "id": "0x482fd6c368036a50297043ebd96a7169963618b9",
        "countLiquidated": 1,
        "countLiquidator": 0,
        "hasBorrowed": true,
        "health": "0.99090324917982165016",
        "totalBorrowValueInEth": "0.08332984778219271195469482388347190319",
        "totalCollateralValueInEth": "0.08257181692103471335611303410229195513658596",
        "tokens": [
          {
            "id": "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5-0x482fd6c368036a50297043ebd96a7169963618b9",
            "symbol": "cETH",
            "accrualBlockNumber": 10185934,
            "enteredMarket": true,
            "cTokenBalance": "0",
            "totalUnderlyingSupplied": "0",
            "totalUnderlyingRedeemed": "0",
            "accountBorrowIndex": "1.027399780382088527",
            "totalUnderlyingBorrowed": "0.02",
            "totalUnderlyingRepaid": "0.020003184708503546",
            "storedBorrowBalance": "0",
            "market": {
              "underlyingPriceUSD": "0",
              "borrowIndex": "1.02849855196042618",
              "symbol": "cETH",
              "collateralFactor": "0.75",
              "exchangeRate": "0.020012156242675616",
              "underlyingPrice": "0"
            }
          },
          {
            "id": "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643-0x482fd6c368036a50297043ebd96a7169963618b9",
            "symbol": "cDAI",
            "accrualBlockNumber": 10185972,
            "enteredMarket": true,
            "cTokenBalance": "0",
            "totalUnderlyingSupplied": "0",
            "totalUnderlyingRedeemed": "0",
            "accountBorrowIndex": "1.027353715786883588",
            "totalUnderlyingBorrowed": "33.05",
            "totalUnderlyingRepaid": "14.08523401925428745",
            "storedBorrowBalance": "18.967257293648086206",
            "market": {
              "underlyingPriceUSD": "1.011702432044983735",
              "borrowIndex": "1.028064067752619662",
              "symbol": "cDAI",
              "collateralFactor": "0.75",
              "exchangeRate": "0.020478626284002739",
              "underlyingPrice": "0.004390316893744831"
            }
          },
          {
            "id": "0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407-0x482fd6c368036a50297043ebd96a7169963618b9",
            "symbol": "cZRX",
            "accrualBlockNumber": 10163281,
            "enteredMarket": true,
            "cTokenBalance": "4732.91695515",
            "totalUnderlyingSupplied": "141.199999999861267041",
            "totalUnderlyingRedeemed": "46.084443107456013574",
            "accountBorrowIndex": "0",
            "totalUnderlyingBorrowed": "0",
            "totalUnderlyingRepaid": "0",
            "storedBorrowBalance": "0",
            "market": {
              "underlyingPriceUSD": "0.33331268638356196",
              "borrowIndex": "1.053281396298783875",
              "symbol": "cZRX",
              "collateralFactor": "0.6",
              "exchangeRate": "0.020102810908000434",
              "underlyingPrice": "0.001446421666666666"
            }
          }
        ]
      }
    }
  }
   

let accounts = data.data.account;

let filtered = _.filter(accounts.tokens, (token) => {
    token.cTokenBalance = parseFloat(token.cTokenBalance);
    return parseFloat(token.storedBorrowBalance) !== 0.0
});



console.log(filtered);

// accounts.tokens.map( (account) => {
//     console.log(account);
//     console.log('------------');
// })

