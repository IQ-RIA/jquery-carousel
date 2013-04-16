/*
 * @namespace CJ.Carousel.Animation
 * @class BaseAnimator
 *
 * contains common logic, required to pefroms any type of
 * animation
 */
CJ.Carousel.Animation.BaseAnimator = CJ.extend(function(){}, {
	/*
	 * @constrctor
	 * @param {Object} config The set of fields that will be applyied to an instance
	 * @returns {BaseAnimator}
	 */
	constructor : function(config) {
		CJ.apply(this, config);
	},
	/*
	 * perfroms pre-initialization
	 * of required variables
	 * @param {HTMLElement} lastPage
	 * @param {HTMLElement} newPage
	 * @returns {Boolean} true, allows to continue the Animation.run, false to prevent
	 */
	beforeRun : function(lastPage, newPage) {
		this.newPage = newPage;
		this.lastPage = lastPage;
		this.list = $('li', this.carousel.el);
		this.listParent = this.list.parent()
		this.lastPageIdx = this.getPageIdx(lastPage);
		this.newPageIdx = this.getPageIdx(newPage);
		this.pageCssWidth = parseInt(newPage.width());
		this.itemsToScrollCount = this.getInnerItems().length - this.lastPageIdx;
		this.offset = this.pageCssWidth * this.itemsToScrollCount;
		
		return true;
	},
	/*
	 * @param {HTMLElement} page
	 * @returns {Number} that index of page in this.list
	 */
	getPageIdx : function(page) {
		return this.list.index(page);
	},
	/*
	 * @returns {Array} the list of items that lines from first-element till newPage index
	 */
	getInnerItems : function() {
		return $('li:lt('+this.newPageIdx+')', this.carousel.el);
	},
	/**
	 * function calles when new item was added to the carousel
	 * @param {HTMLElement} lastPage The current page in carousel
	 * @param {HTMLElement} newPage New formed page
	 *
	 * @returns {undefined}
	 */
	runWithNewItem : function(lastPage, newPage) {
		if(!this.beforeRun(lastPage, newPage)) {
			return false;
		}
		
		if(this.newPageIdx > this.lastPageIdx) {
			// means wants to add item, after currentPage
			// so we should make offset to be negative
			this.offset = -this.offset;
		} else {
			this.offset = Math.abs(this.offset);
			// means user wants to add item before currentPage
			// so, the new item is already inserted before,
			// set the cssLeft-prop to current-pageSize, from this posistion we will move
			var listParentCssLeft = parseInt(this.listParent.css('left'));
			this.listParent.css({
				left : listParentCssLeft == 0 ? 0 : listParentCssLeft - this.pageCssWidth
			});
		}
		
		return this.afterRun();
	},
	/**
	 * function calles when new user clicks to show the existing page
	 * @param {HTMLElement} lastPage The current displaying page
	 * @param {HTMLElement} newPage The page, that should be displayed
	 *
	 * @returns {bool|void}
	 */
	runWithExistingItem : function(lastPage, newPage) {
		if(!this.beforeRun(lastPage, newPage)){
			return false;
		};
		
		if(this.newPageIdx > this.lastPageIdx) {
			// means wants to add item, after currentPage
			// so we should make offset to be negative
			this.offset = -this.offset;
		} else {
			// means user wants to add item before currentPage,
			// so carousel should be moved <<--
			this.offset = Math.abs(this.offset);
		}
		
		return this.afterRun();
	},
	/**
	 * fires after run(no matter what runWithExistingItem or runWithNewItem) was called
	 * @returns {undefined}
	 */
	afterRun : function() {
		this.lastPage.fadeOut($.proxy(function(){
			this.listParent.css({
				left : '+=' + this.offset
			});
			
			this.newPage.fadeIn();
		}, this));
	}
});