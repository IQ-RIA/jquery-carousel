CJ.Carousel.Renderer.ItemRenderer = Ext.extend(CJ.Carousel.Renderer.AbstractRenderer, {
	constructor: function(config) {
		CJ.Carousel.Renderer.ItemRenderer.superclass.constructor.call(this, config);
		Ext.apply(this, config.renderers.item || {});
	},

	createMarkup : function() {
		var pageData = this.pageRenderer.getPageData(),
			itemsPerRow = this.pageRenderer.getColsCount(),
			me = this;
		
		$(".s36-carousel-row", this.parentEl.parent()).each(function(idx){
			var html = '';
			
			for(var i=0; i<itemsPerRow; i++) {
				var item = pageData[i];
				
				if('undefined' != typeof item){
					html += '<div class="s36-carousel-row-item ' + me.carousel.settings.theme+'">' + me.createItem(item) + '</div>';
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