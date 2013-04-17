/*
 * @namespace CJ.Carousel.Navigation.PrevButtonNavigator
 * @class PrevButtonNavigator
 * 
 * controls actions connected with requesting next page
 */
CJ.Carousel.Navigation.PrevButtonNavigator = CJ.extend(CJ.Carousel.Navigation.AbstractButton, {
	/*
	 * performs initialization for required varialbed like default css-class, and inactive css-class
	 * @see CJ.Carousel.Navigation.BaseButtonNavigator#constructor
	 */
	constructor : function(config) {
		CJ.Carousel.Navigation.PrevButtonNavigator.superclass.constructor.call(this, config);
		
		this.cls ='cj-carousel-navigation-prev-btn';
		this.inactiveCls = 'cj-carousel-inactive-prev-button';
	},
	/*
	 * @see Component#createMarkup
	 */
	createMarkup : function() {
		return '<div class="'+this.cls+' '+this.inactiveCls+'">'+this.text+'</div>';
	},
	/*
	 * fires when user clicks on button
	 * it simply loads previous page into carousel
	 * @param {Event} e
	 * @returns {undefined}
	 */
	onButtonClick : function(e) {
		if($(e.target).attr('class').indexOf(this.inactiveCls) != -1){
			return false;
		}
		
		return this.carousel.showPage(this.carousel.getCurrentPageNum()-1);
	},
	/*
	 * applies valid css-class, active or inactive
	 * @returns {undefined}
	 */
	setValidCls : function(){
		var btn = $('.'+this.cls, this.carousel.getRootEl());
		
		if(this.carousel.getCurrentPageNum() == 0){
			btn.addClass(this.inactiveCls);
		} else {
			btn.removeClass(this.inactiveCls);
		}
	}
});
