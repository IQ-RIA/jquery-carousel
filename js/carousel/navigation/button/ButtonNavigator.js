/*
 * @namespace CJ.Carousel.Navigation
 * @class ButtonNavigator
 *
 * controller for button navigation
 */
CJ.Carousel.Navigation.ButtonNavigator = CJ.extend(CJ.Carousel.Navigation.AbstractNavigator,{

	constructor: function(config) {
		config = config || {}
		CJ.Carousel.Navigation.ButtonNavigator.superclass.constructor.apply(this, arguments);

		this.prevButton = new (config.prevNavigatorCls || CJ.Carousel.Navigation.PrevButtonNavigator);
		this.nextButton = new (config.nextNavigatorCls || CJ.Carousel.Navigation.NextButtonNavigator);
	},
	
	/*
	 * function attaches buttons
	 * @returns {undefined}
	 */
	render : function() {
		var placeHolder = this.carousel.getPlaceHolder();
		
		placeHolder.prepend(this.prevButton.createMarkup());
		placeHolder.append(this.nextButton.createMarkup());
		
		this.prevButton.carousel = this.carousel;
		this.nextButton.carousel = this.carousel;
		
		this.afterRender();
	},
	/*
	 * fires after ButtonNavigator#afterRender
	 * @returns {undefined}
	 */
	afterRender : function() {
		this.prevButton.afterRender();
		this.nextButton.afterRender();
		// attach float:left to the carousel
		$('.'+this.prevButton.cls).next().css({"float":'left'});
		
		this.setValidCls();
	},
	/*
	 * called to set up default css-classes for buttons 
	 * @returns {undefined}
	 */
	setValidCls : function(){
		this.prevButton.setValidCls();
		this.nextButton.setValidCls();
	}
});