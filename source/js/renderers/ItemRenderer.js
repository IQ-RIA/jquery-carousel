CJ.Carousel.Renderer.ItemRenderer = CJ.extend(CJ.Carousel.Renderer.AbstractRenderer, {
	createMarkup : function() {
		throw "ItemRenderer::createMarkup should be implemented in sub-class";
	},
	/**
	 *
	 * @param {Object} item Feedback item passed from server
	 */
	createItem : function(item) {
		throw "ItemRenderer::createItem should be implemented in sub-class";
	}
});