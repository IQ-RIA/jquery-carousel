CJ.Carousel.Renderer.PageRenderer = CJ.extend(CJ.Carousel.Renderer.AbstractRenderer, {
	constructor : function(config) {
		CJ.Carousel.Renderer.PageRenderer.superclass.constructor.call(this, config);
		CJ.apply(this, config.renderers.page || {});
		
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
		return $('.cj-carousel-page', this.parentEl).size() != 0;
	},
	/*
	 * @returns {HTMLElement|boolean}
	 */
	getPageIfExists : function() {
		var list = $('.cj-carousel-page', this.parentEl);
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
		CJ.apply(this, config)
	},
	getPageData : function() {
		return this.pageData;
	},
	getColsCount : function() {
		return this.cols || 1;
	},
	getContextEl : function() {
		var currentPageNum = this.carousel.getCurrentPageNum(),
			list = $('.cj-carousel-page', this.parentEl),
			position,
			contextElement = false;

		list.each(function(idx){
			var li = $(this),
				liPageNum = li.data('pageNum')-0;

			if(liPageNum > currentPageNum) {
				contextElement = li;
				position = "Before";
				return false;
			}
		});
		
		list.reverse().each(function(idx){
			var li = $(this),
				liPageNum = li.data('pageNum')-0;

			if(currentPageNum > liPageNum) {
				contextElement = li;
				position = "After";
				return false;
			} 
		});
			
		
		return {
			el: contextElement,
			position: position
		};
	},
	createPage : function(){
		return $('<li class="cj-carousel-page '+this.settings.theme+'"></li>');
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
			var lastPage = this.carousel.getLastPage();

			this.el = this.createPage();
			this.el["insert" + contextEl.position](contextEl.el).data('pageNum', this.carousel.getCurrentPageNum());
			this.renderChildren(this.el);
			
			if(this.carousel.getCurrentPageNum() < lastPage.data("pageNum")) {
				var list = this.carousel.getList();
				list.css({left: parseInt(list.css("left")) - this.el.width() })
			}

			this.carousel.animator.runWithExistingItem(lastPage, this.el);
			this.carousel.setLastPage(this.el);
			
			return this.el;
		};
		
		this.el = this.createPage();
		this.el.prependTo($('.cj-carousel-root', this.parentEl)).data('pageNum', this.carousel.getCurrentPageNum());
		this.renderChildren(this.el);
		this.carousel.setLastPage(this.el);
		this.carousel.animator.runWithNewItem(this.carousel.getLastPage(), this.el);
		
		return this.el;
	}
});