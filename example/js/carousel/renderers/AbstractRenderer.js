CJ.Carousel.Renderer.AbstractRenderer = Ext.extend(CJ.Component,{
	constructor : function(config){
		config = config || {};
		Ext.apply(this, config);
	},
	
	createMarkup : function(){
		throw "AbstractRenderer::createMarkup must be implemented in sub-class";
	}
});