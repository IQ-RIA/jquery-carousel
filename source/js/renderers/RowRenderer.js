CJ.Carousel.Renderer.RowRenderer = CJ.extend(CJ.Carousel.Renderer.AbstractRenderer, {
	constructor  : function(config) {
		CJ.Carousel.Renderer.RowRenderer.superclass.constructor.call(this, config);
		this.itemRenderer = this.createItemRenderer();
		this.children = [this.itemRenderer];
	},
	createItemRenderer : function(){
		throw "RowRenderer::createItemRenderer must be implemented in sub-class";
	},
	setRowsPerPage : function() {
		this.totalRowsPerPage = Math.ceil(this.pageRenderer.getPageData().length / this.pageRenderer.getColsCount());
	},
	createMarkup : function() {
		this.setRowsPerPage();
		var html = '';
		var colsCount = this.pageRenderer.getColsCount();
		
		for(var i=0;i<this.totalRowsPerPage;i++){
			var currentRowClassName = 'cj-carousel-row' + this.getCurrentRowClassName(i) +' '+this.carousel.settings.theme;
			var startOffset = i * colsCount;
			
			html += '<div class="cj-carousel-row '+currentRowClassName+' '+this.carousel.settings.theme+'"></div>';
			html += '<div class="cj-carousel-row-clear-fix'+this.getCurrentRowClassName(i)+' '+this.carousel.settings.theme+'"></div>'; //just add clear : both div
		}
		
		this.parentEl.children().remove();
		this.el = $(html).appendTo(this.parentEl);
		
		return this.el;
	},
	getCurrentRowClassName : function(rowNum){
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