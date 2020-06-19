// Calculate Account Liqudity by Grap Data 
const BigNumber = require('bignumber.js');

const bignum = (value) => new BigNumber(value); // just shorten bignum initialisation


const tokenInEth = (market) => {
	return new BigNumber(market.collateralFactor)
				.times(market.exchangeRate)
					.times(market.underlyingPrice);
}


const borrowBalanceUnderlying = (cToken) => {
	let accountBorrowIndex = bignum(cToken.accountBorrowIndex);
	if (accountBorrowIndex.eq(new BigNumber('0'))) return bignum('0');

	let result = bignum(cToken.storedBorrowBalance).times(cToken.market.borrowIndex).dividedBy(cToken.accountBorrowIndex);

	if(result.isNaN()) {
		console.log('--- SOMETHING WRONG WITH CToken ---- ')
		console.log( cToken );
	}
	return result;
}

const accountLiqudityByGraphData = (account) => {
	// Fix Compound Graph Bug with underlying price ETH 
	account.tokens.map((token) => {
		if (token.symbol === "cETH") token.market.underlyingPrice = "1";
	});

	//console.log(account.tokens);
	// account.tokens.map( (token) => {
	// 	console.log(token.market.symbol, ' : ',  token.market.underlyingPrice, 'collateralFactor : ',  token.market.collateralFactor,  'exchangeRate : ', token.market.exchangeRate);
	// 	console.log('Tokens To ETh : ', tokenInEth(token.market).toNumber());
	// 	console.log( '-------------------------' )
	// });

	const totalCollateralValueInEth = account.tokens.reduce((result, token) => {
		return new BigNumber(result).plus(tokenInEth(token.market).times(token.cTokenBalance));
	}, 0);

	const totalBorrowValueInEth = account.tokens.reduce((result, token) => {
		return new BigNumber(result).plus(bignum(token.market.underlyingPrice).times(borrowBalanceUnderlying(token)))
	}, 0);

	let health = bignum('0');

	// To Do : Remove this check 
	//if (account.hasBorrowed) {
		if (!totalBorrowValueInEth.eq(0)) {
			health = totalCollateralValueInEth.dividedBy(totalBorrowValueInEth)
		}
	//}

	// console.log(' Account :  ', account.id);
	// console.log(' SumCollaterall : ', totalCollateralValueInEth.toNumber()  );
	// console.log(' SumBorrowd : ', totalBorrowValueInEth.toNumber()  );
	// console.log(' health :  ', health.toNumber());
	// console.log('---------------------------------------------')

	let g_liquidity = totalCollateralValueInEth.isGreaterThan(totalBorrowValueInEth) ? totalCollateralValueInEth.minus(totalBorrowValueInEth) : bignum('0');
	let g_shortfall = totalCollateralValueInEth.isGreaterThan(totalBorrowValueInEth) ? bignum('0') : totalBorrowValueInEth.minus(totalCollateralValueInEth);

	return {
		g_liquidity: g_liquidity.toNumber(),
		g_shortfall: g_shortfall.toNumber(),
		health: health.toNumber()
	}
}

// claculateAccountLiquidity(accountData);
module.exports = {
	accountLiqudityByGraphData
}