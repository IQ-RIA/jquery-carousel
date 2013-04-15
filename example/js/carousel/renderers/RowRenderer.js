CJ.Carousel.Renderer.RowRenderer = Ext.extend(CJ.Carousel.Renderer.AbstractRenderer, {
	constructor  : function(config) {
		CJ.Carousel.Renderer.RowRenderer.superclass.constructor.call(this, config);
		Ext.apply(this, config.renderers.row || {});

		this.itemRenderer = this.createItemRenderer();
		this.children = [this.itemRenderer];
	},

	/*
	 * @returns {ItemRenderer}
	 */
	createItemRenderer : function(){
		return new CJ.Carousel.Renderer.ItemRenderer({
			rowRenderer  : this,
			renderers    : this.renderers,
			pageRenderer : this.pageRenderer,
			carousel     : this.carousel
		});
	},

	/*
	 * sets totalRowsPerPage by calculating it with colsCount and received pageData
	 * @returns {undefined}
	 */
	setRowsPerPage : function() {
		this.totalRowsPerPage = Math.ceil(this.pageRenderer.getPageData().length / this.pageRenderer.getColsCount());
	},

	/*
	 * @see Component#createMarkup
	 */
	createMarkup : function() {
		this.setRowsPerPage();
		var html = '';
		var colsCount = this.pageRenderer.getColsCount();
		
		for(var i=0;i<this.totalRowsPerPage;i++){
			var currentRowClassName = 's36-carousel-row' + this.getCurrentRowClassName(i) +' '+this.carousel.settings.theme;
			var startOffset = i * colsCount;
			
			html += '<div class="s36-carousel-row '+currentRowClassName+' '+this.carousel.settings.theme+'"></div>';
			html += '<div class="s36-carousel-row-clear-fix'+this.getCurrentRowClassName(i)+' '+this.carousel.settings.theme+'"></div>'; //just add clear : both div
		}
		
		this.parentEl.children().remove();
		this.el = $(html).appendTo(this.parentEl);
		
		return this.el;
	},

	/*
	 * @param {Number} rowNum
	 * @returns {String} css-class name
	 */
	getCurrentRowClassName : function(rowNum) {
		var cls = '';

		if(rowNum == 0) { //first row
			cls = '-first';
		}
		
		if(rowNum == this.totalRowsPerPage-1){
			cls = '-last';
		}
		
		return cls;
	}
});