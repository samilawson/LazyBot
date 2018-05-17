'use strict'



// Required Modules:
const colors 		= require('colors')
const debug 		= require('debug')('markit-on-demand:main')
const lodash 		= require('lodash')
const Q 			= require('q')
const request		= require('request')
const async			= require('async')







/**
 *  MarkitOnDemand Class
 */
class MarkitOnDemand {



	/**
	 *  Constructor
	 *  @param  {Object} params Params to be set into this instance
	 *  @return {MarkitOnDemand}        MarkitOnDemand instance
	 */
	constructor( params ){

		debug('Instance Created:', params)
		this.params = params

		// Static Params:
		this.BASE_URL = 'http://dev.markitondemand.com/MODApis/Api/v2/'

		console.log('instance created')

		return this

	}



	/**
	 *  Get stock quote for a Symbol
	 *  @param  {String} symbol 	Stock symbol
	 *  @return {Promise}        	Promise
	 */
	getQuote( symbol ){
		const deferred = Q.defer()
		request({
			url: this.quoteUrl( symbol ),
			json: true
		}, ( err, res, body ) => {
			if( err ) return deferred.reject( err )
			if( res.statusCode != 200 ) return deferred.reject( new Error('Status code non 200: '+res.statusCode ) )
			deferred.resolve( body )
		})
		return deferred.promise
	}



	/**
	 *  Lookup a stock symbol via a query string
	 *  @param  {String} query 		Query which to search for symbols on
	 *  @return {Promise}       	Promise
	 */
	lookup( query ){
		const deferred = Q.defer()
		request({
			url: this.lookupUrl( query ),
			json: true
		}, ( err, res, body ) => {
			if( err ) return deferred.reject( err )
			if( res.statusCode != 200 ) return deferred.reject( new Error('Status code non 200: '+res.statusCode ) )
			deferred.resolve( body )
		})
		return deferred.promise
	}



	/**
	 *  Generate the URL for Symbol Lookups
	 *  @param  {String} query 		Search query to lookup symbols by
	 *  @return {String}        	URL to call to find symbol data
	 */
	lookupUrl( query ){
		return `${this.BASE_URL}Lookup/json?input=${query}`
	}



	/**
	 *  Generate the URL for Quote Lookup
	 *  @param  {String} symbol 	Stock symbol
	 *  @return {String}        	URL to get quote data
	 */
	quoteUrl( symbol ){
		return `${this.BASE_URL}Quote/json?symbol=${symbol}`
	}



}



/**
 *  Export
 *  @param  {Object} 	params 	MarkitOnDemand library params
 *  @return {MarkitOnDemand}        New instance of the MarkitOnDemand library
 */
module.exports = new MarkitOnDemand()
