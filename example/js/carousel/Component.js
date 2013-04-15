; Ext.ns("CJ");

/*
 * @namespace CJ
 * @class CJ.Component
 *
 * This class contains the base logic,
 * for creating application-component (rendering, js-listeners and etc)
 */
/*
 * @constructor
 * @param {Object} config set of base configuration options
 * @returns {CJ.Component}
 */
CJ.Component = function(config) {
	if(typeof config == 'undefined'){
		config = {}
	}
	
	this.children = [];
	this.renderOrder = 'c2p';
	this.xtype = config.xtype || 'component';
	
	this.initComponent(config);
}

CJ.Component.prototype = {
	/*
	 * peforms component-post initialization
	 * @returns {undefined}
	 */
	initComponent : function() {
		
	},
	/*
	 * attaches listeners, for dom-elements,
	 * this function fires after component was rendered
	 */
	attachJS : function() {
		
	},
	/*
	 * appends markup into required placein dom
	 * @returns {void}
	 */
	createMarkup : function() {
		
	},
	/*
	 * fires before render function was called
	 * @returns {boolean} true to continue render, false overwise
	 */
	beforeRender : function() {
		return true;
	},
	/*
	 * function performs rendering the component including
	 * children-components
	 * @returns {this.afterRender-result}
	 */
	render : function(el) {
		if(!this.beforeRender()){
			return false;
		}
		
		el = el || 'body';
		this.parentEl = $(el);
		this.ct = this.createMarkup();
		if (this.renderOrder == 'c2p') {
			this.renderChildren();
			this.attachJS();
		}
		else {
			this.attachJS();
			this.renderChildren();
		}
		
		return this.afterRender();
	},
	/*
	 * @returns {undefined}
	 */
	afterRender : function(){
		
	},
	/*
	 * performs rendering all children-components
	 * using the same way as this component was rendered
	 * @returns {undefined}
	 */
	renderChildren:function(parentEl) {
		if(typeof parentEl != 'undefined'){
			this.ct = parentEl;
		}
		
		if (typeof this.children == 'undefined') return;
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].render(this.ct);
		}
	},
	/*
	 * simply adds new child to this.children
	 * @returns {undefined}
	 */
	addChild : function(item){
		this.children.push(item);
	},
	/*
	 * function finds the component which is an instance if parentComponent
	 * 
	 * @param parentComponent full-class-name(including namespaces),
	 * 						  which you want to find.
	 * @returns {Object|false} if component was finded, false overwise
	 */
	getOwnerCmp : function(parentComponent){
		var parentCmp = this.parent;
		
		while(parentCmp){
			if(parentCmp instanceof parentComponent){
				return parentCmp;
			}
			
			parentCmp = parentCmp.parent;
		}
		
		return false;
	}
};