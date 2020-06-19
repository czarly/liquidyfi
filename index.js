console.log('START');
require('dotenv').config();

const {  getAccountsLiquidityAndSaveToDb } = require('./components/compound/index');


( async () => {
    await getAccountsLiquidityAndSaveToDb();
})();

