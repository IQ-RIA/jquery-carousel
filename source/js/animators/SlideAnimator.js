/*
 * @namespace CJ.Carousel.Animation
 * @class FadeAnimator
 *
 * contains logic to show new page with slide-animation effect
 */
CJ.Carousel.Animation.SlideAnimator = CJ.extend(CJ.Carousel.Animation.BaseAnimator,{
	/*
	 * @see CJ.Carousel.Animation.BaseAnimator#afterRun
	 */
	afterRun : function() {
		if(this.beforeAnimate) {
			this.beforeAnimate.fn.call(this.beforeAnimate.scope);
		}
		
		if(this.newPageIdx == 0) {
			this.listParent.animate({
				left : 0
			}, this.animationTime, $.proxy(function(){
				if(this.afterAnimate){
					this.afterAnimate.fn.call(this.afterAnimate.scope);
				}
			}, this));
		} else {
			this.listParent.animate({
				left : '+=' + this.offset
			}, this.animationTime, $.proxy(function(){
				if(this.afterAnimate){
					this.afterAnimate.fn.call(this.afterAnimate.scope);
				}
			}, this));
		}
	}
});