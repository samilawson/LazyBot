

process.env.NODE_ENV = 'test'


// Required Modules:
const chai 			= require('chai')
const should 		= chai.should()
const expect		= require("chai").expect
const assert 		= require('assert')
const Markit 		= require('../app/index.js')
const nock 			= require('nock')


// http scope:
let scope = null



describe('MarkitOnDemand', function(){


	before(function( cb ){

		scope = nock('http://dev.markitondemand.com')
			.get('/MODApis/Api/v2/Lookup/json?input=Amazon')
			.reply(200, [{
				Symbol: 'AMZN',
				Name: 'Amazon.com Inc',
				Exchange: 'NASDAQ'
			}])
			.get('/MODApis/Api/v2/Quote/json?symbol=AMZN')
			.reply(200, { 
				Status: 'SUCCESS',
				Name: 'Amazon.com Inc',
				symbol: 'AMZN',
				LastPrice: 770.65,
				Change: -0.639999999999986,
				ChangePercent: -0.0829778682467018,
				Timestamp: 'Tue Aug 30 09:55:46 UTC-04:00 2016',
				MSDate: 42612.4137268519,
				MarketCap: 365345128100,
				Volume: 8844,
				ChangeYTD: 675.89,
				ChangePercentYTD: 14.0200328455814,
				High: 771.35,
				Low: 769.57,
				Open: 771
			})

		// nock.disableNetConnect()
		cb()

	})



	after(function( cb ){
		scope.isDone()
		cb()
	})



	it('should return Lookup URL', function( cb ){
		const url = Markit.lookupUrl('Amazon')
		expect(url).to.equal(`${Markit.BASE_URL}Lookup/json?input=Amazon`)
		cb()
	})



	it('should return Quote URL', function( cb ){
		const url = Markit.quoteUrl('AMZN')
		expect(url).to.equal(`${Markit.BASE_URL}Quote/json?symbol=AMZN`)
		cb()
	})



	it('should return Lookup data for AMZN', function( cb ){
		Markit.lookup('Amazon')
			.then(( res ) => {
				expect(res.length).to.equal(1)
				expect(res[0]).to.have.keys('Symbol', 'Name', 'Exchange')
				cb()
			})
			.catch( cb )
	})



	it('should return Quote data for AMZN', function( cb ){
		Markit.getQuote('AMZN')
			.then(( res ) => {
				expect(res).to.contain.keys('Status', 'Name', 'symbol', 'LastPrice', 'High', 'Low', 'Open')
				expect(res.Status).to.equal('SUCCESS')
				expect(res.symbol).to.equal('AMZN')
				cb()
			})
			.catch( cb )
	})



})