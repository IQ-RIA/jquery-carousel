/*
 * @namespace CJ.Carousel.Navigation
 * @class AbstractButton
 *
 * contains common logic of any control-button for carousel
 *
 */
CJ.Carousel.Navigation.AbstractButton = Ext.extend(function(){}, {
	/*
	 * @constructor
	 * @param {Object} config
	 * @param {String|undefined} config.text The button-label
	 * @returns {CJ.Carousel.Navigation.AbstractButton}
	 */
	constructor : function(config) {
		config = config || {text : ''};
		Ext.apply(this, config);
	},
	/*
	 * function fires after navigation will be rendered
	 * here I've attached my event-listeners
	 * @returns {undefined}
	 */
	afterRender : function() {
		$('.'+this.cls).css({
			float : 'left'
		}).click($.proxy(this.onButtonClick, this));
	}
});