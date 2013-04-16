CJ.Carousel.Renderer.AbstractRenderer = CJ.extend(CJ.Component,{
	constructor : function(config){
		config = config || {};
		CJ.apply(this, config);
	},
	createMarkup : function(){
		throw "AbstractRenderer::createMarkup must be implemented in sub-class";
	}
});