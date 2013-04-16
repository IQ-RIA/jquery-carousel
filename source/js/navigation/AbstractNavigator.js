/*
 * @namespace CJ.Carousel.Navigation.AbstractNavigator
 * defines common constructor, to avoid code-duplication
 */
CJ.Carousel.Navigation.AbstractNavigator = CJ.extend(function(){}, {
	/*
	 * @constructor
	 * @param {Object|undefined} config 
	 */
	constructor : function(config) {
		CJ.apply(this, config);
	}
});