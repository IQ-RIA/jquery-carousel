CJ.Carousel.Renderer.PageRenderer = Ext.extend(CJ.Carousel.Renderer.AbstractRenderer, {
	constructor : function(config) {
		CJ.Carousel.Renderer.PageRenderer.superclass.constructor.call(this, config);
		this.rowRenderer = this.createRowRenderer();
		this.children = [this.rowRenderer];
	},
	createRowRenderer : function() {
		return new CJ.Carousel.Renderer.RowRenderer({
			pageRenderer : this,
			carousel     : this.carousel
		});
	},
	isAnyPageExists : function(){
		return $('.s36-carousel-page', this.parentEl).size() != 0;
	},
	/*
	 * @returns {HTMLElement|boolean}
	 */
	getPageIfExists : function() {
		var list = $('.s36-carousel-page', this.parentEl);
		var findedElement = false;
		
		if(list.size() > 0) {
			var currentPageNum = this.carousel.getCurrentPageNum();
			
			list.each(function(idx){
				var li = $(this);
				if(li.data('pageNum') == currentPageNum){
					findedElement = li;
					return false;
				}
			});
		}
		
		return findedElement;
	},
	reConfigure : function(config) {
		Ext.apply(this, config)
	},
	getPageData : function() {
		return this.pageData;
	},
	getColsCount : function() {
		return this.cols || 1;
	},
	getContextEl : function() {
		var currentPageNum = this.carousel.getCurrentPageNum();
		
		var list = $('.s36-carousel-page', this.parentEl);
		var contextElement = false;
			
		list.reverse().each(function(idx){
			var li = $(this);
			if(currentPageNum > li.data('pageNum')){
				contextElement = li;
				return false;
			}
		});
		
		return contextElement;
	},
	createPage : function(){
		return $('<li class="s36-carousel-page '+this.settings.theme+'"></li>');
	}
});