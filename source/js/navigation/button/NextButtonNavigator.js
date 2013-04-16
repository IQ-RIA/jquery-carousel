/*
 * @namespace CJ.Carousel.Navigation.NextButtonNavigator
 * @class NextButtonNavigator
 * 
 * controls actions connected with requesting next page
 */
CJ.Carousel.Navigation.NextButtonNavigator = CJ.extend(CJ.Carousel.Navigation.AbstractButton, {
	/*
	 * performs initialization for required varialbed like default css-class, and inactive css-class
	 * @see CJ.Carousel.Navigation.BaseButtonNavigator#constructor
	 */
	constructor : function(config) {
		CJ.Carousel.Navigation.NextButtonNavigator.superclass.constructor.call(this, config);
		// css-classes
		this.cls = 'cj-carousel-navigation-next-btn';
		this.inactiveCls = 'cj-carousel-inactive-next-button';
	},
	/*
	 * @see Component#createMarkup
	 */
	createMarkup : function() {
		return '<div class="'+this.cls+'">'+this.text+'</div>';
	},
	/*
	 * fires when user clicks on button
	 * it simply loads new page into carousel
	 * @returns {undefined}
	 */
	onButtonClick : function(e) {
		if($(e.target).attr('class').indexOf(this.inactiveCls) != -1){
			return false;
		}
		
		return this.carousel.movePage(this.carousel.getCurrentPageNum() + 1);
	},
	/*
	 * applies valid css-class, active or inactive
	 * @returns {undefined}
	 */
	setValidCls : function(){
		var btn = $('.'+this.cls, this.carousel.el);
		var pagesLength = Math.ceil(this.carousel.getReader().size()/this.carousel.getReader().getPageSize());
		
		if(this.carousel.getCurrentPageNum() == pagesLength-1){
			btn.addClass(this.inactiveCls);
		} else {
			btn.removeClass(this.inactiveCls);
		}
	}
});