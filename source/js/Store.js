/*
 * this is the simple class
 * that helps me to make ajax calls to receive data dynammicly
 */

CJ.Carousel.Store = function(config){
	this.pages = {};
}

CJ.Carousel.Store.prototype = {
	getPage : function(pageNum) {
		var pageNum = pageNum || 0;
		// get new portion of date
		if('undefined' == typeof this.pages[pageNum]){
			// request new data
			$.ajax({
				url      : 'server.php',
				context  : this,
				type     : "POST",
				data     : 'page='+pageNum,
				dataType : 'json',
				success  : $.proxy(this.pageLoaded, this)
			});
		} else this.callSuccessCb(pageNum);
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
				fn    : config.failure.fn,
				scope : config.failure.scope
			}
		}
	},
	getTotalSize : function(){
		return this.totalSize || 100;
	},
	pageLoaded : function(data) {
		this.pages[data.pageNum] = data.items;
		this.totalSize = data.total;
		this.callSuccessCb(data.pageNum);
	},
	size: function() {return 40;},
	getPageSize: function() {
		return 10;
	}
}