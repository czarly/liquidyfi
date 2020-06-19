const graphql = require('graphql.js');
const graph = graphql('https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2');
const { legos }  = require("@studydefi/money-legos");
const { DBClass } = require('../../helpers/index');
const Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_HTTP));
const  Queue = require('bull');
let liquidityCallQuee = new Queue('liquiditycallquee');

const { accountLiqudityByGraphData } = require('./AccountLiquidityGraph');
 
const Comptroller_INSTANCE = new web3.eth.Contract(legos.compound.comptroller.abi, legos.compound.comptroller.address);

/**
 * Redis Quee 
 * To Do move concurrency to .env file
 */
 
liquidityCallQuee.process(concurrency = 100 ,  async (job, done) => {
    let accountLiquidity = await Comptroller_INSTANCE.methods.getAccountLiquidity(job.data.account.id).call();
    done(null, { accountAddress : job.data.account.id, accountLiquidity : accountLiquidity, account : job.data.account  } );
});

liquidityCallQuee.on('completed', async (job, result) => {

    let { accountAddress, accountLiquidity, account } = result;
    let { "0" : errorcode, "1" : liquidity , "2" : shortfall  } = accountLiquidity;
    let { g_liquidity, g_shortfall, health } = accountLiqudityByGraphData(account);
    
    console.log(`g_liquidity: ${g_liquidity}, g_shortfall : ${g_shortfall} , health : ${health}`);
    
    // Just save accounts with negative liquidity:     
    // To Do: Pass this account to Liquidation Function ...     
    if( shortfall !== '0' ) {
        let query = `   insert into underwater_accounts 
                            (blocknumber, account, liquidity, shortfall, g_liquidity, g_shortfall, health,created_at)
                                values ($1,$2,$3,$4,$5,$6,$7,$8);`

        await (await DBClass.init()).dbQuery(query, [0, accountAddress, liquidity, shortfall, g_liquidity, g_shortfall, health , new Date()]);
    }
});


/**
 * Call Graph Node get only {hasBorrowed} accounts 
 * 
 * @param {*} pageSize 
 * @param {*} skip 
 */

const queryAccounts = async ( pageSize, skip ) => {
    const query = graph(`{
        accounts(first: ${pageSize}, skip : ${skip}, where : { hasBorrowed : true } ) {
            id
            hasBorrowed,
            tokens {
                id
                symbol
                #transactionHashes
                #transactionTimes
                accrualBlockNumber
                enteredMarket
                cTokenBalance
                totalUnderlyingSupplied
                totalUnderlyingRedeemed
                accountBorrowIndex
                totalUnderlyingBorrowed
                totalUnderlyingRepaid
                storedBorrowBalance,
                market {
				  underlyingPriceUSD,
				  borrowIndex,
                  symbol,
                  collateralFactor,
                  exchangeRate,
                  underlyingPrice
                }
              }
        }
    }`);
    const res = await query();
    return res;
}


const getAccountsLiquidityAndSaveToDb = async () => {

    let pageSize = 10;
    let skip = 0;
    let accountsLength = 1; // 
    let page = 0;

    // loop whie accounts is not 0; 
    //while (page !== 1) {
    while (accountsLength !== 0) {
        let res = await queryAccounts(pageSize, skip);
        console.log(res.accounts.length);
        accountsLength = res.accounts.length;
        skip = pageSize * page;
        getAccountsLiquidityBatch(res.accounts); // call quee function 
        page += 1;
    }
}


/**
 * Pass accounts array to redis quee 
 * @param {*} accounts 
 */
const getAccountsLiquidityBatch =  async (accounts) => {
    accounts.map( (account) => {
        liquidityCallQuee.add({ account });  // ad accounts into quee   
    });
}

module.exports = {
    getAccountsLiquidityAndSaveToDb
}

  
