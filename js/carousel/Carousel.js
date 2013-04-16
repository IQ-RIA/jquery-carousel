; CJ.ns('CJ');

CJ.Carousel = {
	Navigation : {},
	Animation  : {},
	Renderer   : {}
}

/*
 * @namespace CJ.Carousel
 * @class Carousel
 *
 * This is the analog for jQuery-carousel, but more powerfull
 * Features
 * 1. if we are requrested 100 page, it creates only one page,
 * instead of jCarousel, that creates 99-pages.
 * 2. Can use different types of animation via inheritance
 * 3. Can use different types of navigators via inheritance
 * 4. Can use different types of stores via defining required store (ajax, window.name etc)
 */
CJ.Carousel.Carousel = CJ.extend(CJ.Component, {
	/*
	 * @constructor
	 * @param {Object} config
	 * @param {Number} config.currentPageNum The default page that
	 * should be requrested and rendered by default
	 * @returns {Carousel}
	 */
	constructor : function(config){
		config = config || {};
		this.currentPageNum = config.currentPageNum || 0;
		
		CJ.apply(this, config);
		this.init();
	},
	/*
	 * function performs initialization for carousel
	 * @param {Object} config
	 * @param {Number} config.defaultPageSize defines how much items should be loaded by default
	 * @returns {undefined}
	 */
	init : function(config) {
		this.renderers = this.renderers || {}
		this.pageSize = this.settings.defaultPageSize || 30;

		this.animator = this.animator || CJ.Carousel.Animation.SlideAnimator;
		this.navigator = this.navigator || CJ.Carousel.Navigation.ButtonNavigator;

		
		this.store = this.createStore();
		this.pageRenderer = this.createPageRenderer();
		this.animator = this.createAnimator();
		this.navigator = this.createNavigator();
		
		this.store.setPageLoadCallback({
			success : {
				fn    : this.onPageLoaded,
				scope : this
			},
			failure: {
				fn: function(){},
				scope: this
			}
		});
		
		// to reRender and set up valid height and width
		this.isPageSizeChanged = true;
	},
	/*
	 * @returns {CJ.Carousel.Feedbackstore}
	 */ 
	createStore : function() {
		var config = {
			pageSize : this.pageSize,
			carousel : this
		};

		if(this.store instanceof CJ.Carousel.Store) {
			return CJ.apply(this.store, config);
		} else {
			return new CJ.Carousel.Store(CJ.apply(config, this.store));
		}
	},
	/*
	 * @returns {CJ.Carousel.Animation.SlideAnimator}
	 */ 
	createAnimator : function() {
		return new this.animator({
			carousel     : this,
			settings     : this.settings,
			afterAnimate : {
				fn    : this.onAfterAnimate,
				scope : this
			},
			beforeAnimate : {
				fn    : this.onBeforeAnimate,
				scope : this
			}
		});
	},
	/*
	 * @returns {CJ.Carousel.Renderer.PageRenderer}
	 */ 
	createPageRenderer : function() {
		return this.pageRender || new CJ.Carousel.Renderer.PageRenderer({
			carousel : this,
			renderers: this.renderers,
			settings : this.settings
		});
	},
	/*
	 * @returns {CJ.Carousel.Renderer.ButtonNavigator}
	 */ 
	createNavigator : function() {
		return new this.navigator({
			carousel : this,
			settings : this.settings
		});
	},
	/*
	 * function fires after page was loaded
	 * @returns {undefined}
	 */ 
	onPageLoaded : function(data) {
		if(!this.rendered) {
			this.render();
		}

		this.pageRenderer.reConfigure({
			pageData : data,
			cols     : this.settings.cols
		});
		
		this.pageRenderer.render(this.el);
		this.navigator && this.navigator.setValidCls && this.navigator.setValidCls();
	},
	/*
	 * function can contains additional logic,
	 * fires after animator finished his work
	 */
	onAfterAnimate : function() {
		
	},
	/*
	 * function fires when error occured to getting response,
	 * while page was requested
	 * @param {Object} response The server-response
	 * @returns {undefined}
	 */
	onPageLoadError : function(response) {
		if(typeof console != 'undefined') {
			console.log(response);
		}
	},
	/*
	 * @see Component#createMarkup
	 */
	createMarkup : function() {
		this.el = $(
			'<div class="cj-carousel-root-' + this.settings.cols + '-cols' + 'this.settings.theme">' +
				'<div class="cj-carousel-root-wrapper ' + this.settings.theme + '">' +
					'<ul class="cj-carousel-root ' + this.settings.theme + '"></ul>' +
				'</div>' +
		   '</div>'
		)

		this.el.appendTo(this.parentEl);
		return this.el;
	},
	/*
	 * @see Component#attachJS
	 */
	attachJS : function() {
		this.attachNavigation();
	},
	/*
	 * function calculates and sets up valid width for carousel
	 * @returns {undefined}
	 */
	setCarouselWidth : function() {
		var pageWidth = parseInt(this.pageRenderer.el.css('width')),
			pageHeight = this.pageRenderer.el.height();
		
		$('.cj-carousel-root-wrapper', this.parentEl).css({
			height : pageHeight
		});
	},
	/*
	 * attach navigator if existing
	 * @returns {undefined}
	 */
	attachNavigation : function() {
		this.navigator && this.navigator.render();
	},
	/*
	 * getter for Carousel.currentPageNum
	 * @returns {Number}
	 */
	getCurrentPageNum : function() {
		return this.currentPageNum;
	},
	/*
	 * fires when page changed via prev or next buttons
	 * @param {Number} pageNum The page number that must be requested
	 * @returns {undefined}
	 */
	movePage : function(pageNum) {
		this.setPage(pageNum);
		
		if(this.parent && this.parent.pagination) {
			this.parent.pagination.setPage(this.getCurrentPageNum());
			return ;
		}
		
		this.getStore().getPage(this.getCurrentPageNum());
	},
	/*
	 * simple setter for Carousel.currentPageNum
	 * @param {Number} newCurrentPageNum
	 * @returns {undefined}
	 */
	setPage : function(newCurrentPageNum) {
		if(newCurrentPageNum < 0){
			return ;
		}
		
		if(newCurrentPageNum >= this.store.getTotalSize()) {
			return ;
		}

		this.oldCurrentPageNum = this.currentPageNum;
		this.currentPageNum = newCurrentPageNum;
	},
	/*
	 * @returns {Object} Carousel.el
	 */
	getPlaceHolder : function(){
		return this.el;
	},
	/*
	 * fires when page changed via pagination-plugin,
	 * updates currentPage and request page via Carousel.store
	 * @param {Number} newPageNum
	 * @returns {undefined}
	 */
	changePageNum : function(newPageNum) {
        this.setPage(newPageNum -1);
		this.store.getPage(this.getCurrentPageNum());
	},
	/*
	 * @returns {Number} Carousel.store current pageSize
	 */
	getPageSize : function() {
		if(this.parent && this.parent.pageSizeChanger && this.parent.pageSizeChanger.getCurrentPageSize){
            return this.parent.pageSizeChanger.getCurrentPageSize();
        }
        
        return this.store.pageSize;
	},
	/*
	 * @param {Object} lastPageEl
	 * updates Carousel.lastPageEl with new value
	 * NOTE::lastPageEl is current page that is displaying now
	 * @returns {undefined}
	 */
	setLastPage : function(lastPageEl) {
		this.lastPageEl = lastPageEl;
	},
	/*
	 * @returns {Object} Carousel.lastPageEl
	 */
	getLastPage : function(){
		return this.lastPageEl;
	},
	/*
	 * @returns {undefined}
	 */
	resetCarousel : function(){
		this.store.clear();
		$('.cj-carousel-root', this.parentEl).css({left:0});
	},

	getList: function() {
		return $('.cj-carousel-root', this.el);
	},

	/*
	 * @returns {undefined}
	 */
	onBeforeAnimate : function() {
		if(this.isPageSizeChanged) {
			this.isPageSizeChanged = false;
			this.setCarouselWidth();
		}
	},
	/*
	 * @returns {Object} Carousel.store
	 */
	getStore : function(){
		return this.store;
	},

	getPage: function(currentPageNum) {
		var list = $('.cj-carousel-root li', this.parentEl),
			el;

		list.each(function(index) {
			if(currentPageNum == $(this).data("pageNum")) {
				el = $(this);
				return false;
			}
		});

		return el;
	}
});