// Compound Contracts Helper
const Web3 = require("web3");
const { legos }  = require("@studydefi/money-legos");
const PriceOracleProxyAbi = require('./PriceOracleProxyAbi.json');

let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_HTTP));

const oracle = new web3.eth.Contract(PriceOracleProxyAbi, legos.compound.priceOracle.address);
const Comptroller_INSTANCE = new web3.eth.Contract(legos.compound.comptroller.abi, legos.compound.comptroller.address);

const cBAT = new web3.eth.Contract(legos.compound.cBAT.abi, legos.compound.cBAT.address);
const cDAI = new web3.eth.Contract(legos.compound.cDAI.abi, legos.compound.cDAI.address);
const cEther = new web3.eth.Contract(legos.compound.cEther.abi, legos.compound.cEther.address);
const cREP = new web3.eth.Contract(legos.compound.cREP.abi, legos.compound.cREP.address);
const cSAI = new web3.eth.Contract(legos.compound.cSAI.abi, legos.compound.cSAI.address);
const cUSDC = new web3.eth.Contract(legos.compound.cUSDC.abi, legos.compound.cUSDC.address);
const cWBTC = new web3.eth.Contract(legos.compound.cWBTC.abi, legos.compound.cWBTC.address);
const cZRX = new web3.eth.Contract(legos.compound.cZRX.abi, legos.compound.cZRX.address);

let cTokens = {};

cTokens[legos.compound.cBAT.address.toString()] = { contract :  cBAT, name : "cBAT", "cTokenDecimals" : 8, "underlyingDecimals" : 18 };
cTokens[legos.compound.cDAI.address.toString()] = { contract : cDAI, name : "cDAI", "cTokenDecimals" : 8, "underlyingDecimals" : 18 };
cTokens[legos.compound.cEther.address.toString().toLowerCase()] = { contract : cEther, name : "cEther", "cTokenDecimals" : 8, "underlyingDecimals" : 18 }; // money adderss Uppercase Fix !
cTokens[legos.compound.cREP.address.toString()] = { contract : cREP , name : "cREP", "cTokenDecimals" : 8, "underlyingDecimals" : 18 };
cTokens[legos.compound.cSAI.address.toString()] = { contract : cSAI , name : "cSAI", "cTokenDecimals" : 8, "underlyingDecimals" : 18 };
cTokens[legos.compound.cUSDC.address.toString()] = { contract : cUSDC , name : "cUSDC", "cTokenDecimals" : 8, "underlyingDecimals" : 6 };
cTokens[legos.compound.cWBTC.address.toString()] = { contract : cWBTC , name : "cWBTC", "cTokenDecimals" : 8, "underlyingDecimals" : 8 };
cTokens[legos.compound.cZRX.address.toString()] = { contract : cZRX , name : "cZRX", "cTokenDecimals" : 8, "underlyingDecimals" : 18 };

// init new Oracle 
// let oracle = new web3.eth.Contract( legos.compound.priceOracle.abi , legos.compound.priceOracle.address );

// cTokens = {
//     'address' : { contract : contract , name : name   }
// }

module.exports = {
    cTokens,
    Comptroller_INSTANCE,
    oracle,
    web3
}

