CJ.Carousel.Renderer.ItemRenderer = CJ.extend(CJ.Carousel.Renderer.AbstractRenderer, {
	constructor: function(config) {
		CJ.Carousel.Renderer.ItemRenderer.superclass.constructor.call(this, config);
		CJ.apply(this, config.renderers.item || {});
	},

	createMarkup : function() {
		var pageData = this.pageRenderer.getPageData(),
			itemsPerRow = this.pageRenderer.getColsCount(),
			me = this;
		
		$(".cj-carousel-row", this.parentEl.parent()).each(function(idx){
			var html = '';
			
			for(var i=0; i<itemsPerRow; i++) {
				var item = pageData[i];
				
				if('undefined' != typeof item){
					html += '<div class="cj-carousel-row-item ' + me.carousel.settings.theme+'">' + me.createItem(item) + '</div>';
				}
			}
			
			pageData = pageData.slice(itemsPerRow, pageData.length);
			$(this).html(html);
		});
	},

	/**
	 *
	 * @param {Object} item Feedback item passed from server
	 */
	createItem : function(item) {
		throw "ItemRenderer::createItem should be implemented in sub-class";
	}
});