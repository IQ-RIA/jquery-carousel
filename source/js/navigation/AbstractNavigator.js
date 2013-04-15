/*
 * @namespace CJ.Carousel.Navigation.AbstractNavigator
 * defines common constructor, to avoid code-duplication
 */
CJ.Carousel.Navigation.AbstractNavigator = Ext.extend(function(){}, {
	/*
	 * @constructor
	 * @param {Object|undefined} config 
	 */
	constructor : function(config) {
		Ext.apply(this, config);
	}
});