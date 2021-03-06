/*
 * @namespace CJ.Carousel.Navigation
 * @class AbstractButton
 *
 * contains common logic of any control-button for carousel
 *
 */
CJ.Carousel.Navigation.AbstractButton = CJ.extend(function(){}, {

	/*
	 * @constructor
	 * @param {Object} config
	 * @param {String|undefined} config.text The button-label
	 * @returns {CJ.Carousel.Navigation.AbstractButton}
	 */
	constructor : function(config) {
		config = config || {text : ''};
		CJ.apply(this, config);
	},
	/*
	 * function fires after navigation will be rendered
	 * here I've attached my event-listeners
	 * @returns {undefined}
	 */
	afterRender : function() {
		$('.'+this.cls, this.carousel.getRootEl()).css({
			"float" : 'left'
		}).click($.proxy(this.onButtonClick, this));
	}
});