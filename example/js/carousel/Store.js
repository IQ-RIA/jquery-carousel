/*
 * this is the simple class
 * that helps me to make ajax calls to receive data dynammicly
 */

CJ.Carousel.Store = function(config){
	this.pages = {};
	this.pageSize = 10;

	Ext.apply(this, config);
}

CJ.Carousel.Store.prototype = {
	getPage : function(pageNum) {
		var pageNum = pageNum || 0;
		// get new portion of date
		if(!this.pages[pageNum]){
			this.loadPage(0);
		} else {
			this.callSuccessCb(pageNum);
		}
	},

	/**
	 * Loads new portion of data
	 *
	 * @param {Number} pageNum Number of page to load
	 * @returns {undefined}
	 */
	loadPage: function() {
		throw "CJ.Carousel.Store::loadPage must be implemented in sub-class";
	},

	callSuccessCb : function(pageNum) {
		this.callback.success.fn.call(this.callback.success.scope, this.pages[pageNum]);
	},

	setPageLoadCallback : function(config){
		this.callback = {
			success : {
				fn    : config.success.fn,
				scope : config.success.scope
			},
			failure : {
				fn    : config.failure.fn || function(){},
				scope : config.failure.scope || window
			}
		}
	},

	/**
	 * @returns {Number} total items count
	 */
	getTotalSize : function(){
		return this.totalSize || 100;
	},

	pageLoaded : function(data) {
		this.pages[data.pageNum] = data.items;
		this.totalSize = data.total;
		this.callSuccessCb(data.pageNum);
	},

	size: function() {
		return 40;
	},

	/**
	 * @returns {Number} PageSize
	 */
	getPageSize: function() {
		this.pageSize;
	}
}