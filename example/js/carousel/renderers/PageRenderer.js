CJ.Carousel.Renderer.PageRenderer = Ext.extend(CJ.Carousel.Renderer.AbstractRenderer, {
	constructor : function(config) {
		CJ.Carousel.Renderer.PageRenderer.superclass.constructor.call(this, config);
		Ext.apply(this, config.renderers.page || {});
		
		this.rowRenderer = this.createRowRenderer();
		this.children = [this.rowRenderer];
	},
	createRowRenderer : function() {
		return new CJ.Carousel.Renderer.RowRenderer({
			pageRenderer : this,
			renderers    : this.renderers,
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
	},
	createMarkup : function() {
		this.rootList = $('li', this.parentEl);
		var page = this.getPageIfExists();
		
		if(!!page) { //page was finded
			this.el = page;
			this.renderChildren(this.el); //make the page-rereneder
			this.carousel.animator.runWithExistingItem(this.carousel.getLastPage(), page);
			this.carousel.setLastPage(page);
			
			return this.el;
		}
		
		if(this.isAnyPageExists()) {
			var contextEl = this.getContextEl(); //find element after witch we should insert new item
			
			this.el = this.createPage();
			this.el.insertAfter(contextEl).data('pageNum', this.carousel.getCurrentPageNum());
			this.renderChildren(this.el);
			this.carousel.animator.runWithNewItem(this.carousel.getLastPage(), this.el);
			this.carousel.setLastPage(this.el);
			
			return this.el;
		};
		
		this.el = this.createPage();
		this.el.prependTo($('.s36-carousel-root', this.parentEl)).data('pageNum', this.carousel.getCurrentPageNum());
		this.renderChildren(this.el);
		this.carousel.setLastPage(this.el);
		this.carousel.animator.runWithNewItem(this.carousel.getLastPage(), this.el);
		
		return this.el;
	}
});