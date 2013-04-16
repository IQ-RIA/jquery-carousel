/*
 * @namespace CJ.Carousel.Animation
 * @class FadeAnimator
 *
 * contains logic to show new page with fade-animation effect
 */
CJ.Carousel.Animation.FadeAnimator = CJ.extend(CJ.Carousel.Animation.BaseAnimator, {
	/*
	 * @see CJ.Carousel.Animation.BaseAnimator#afterRun
	 */
	afterRun : function() {
		if(this.beforeAnimate) {
			this.beforeAnimate.fn.call(this.beforeAnimate.scope);
		}
		
		this.listParent.fadeOut(1000, $.proxy(function(){
			this.listParent.animate({
				left : '+=' + this.offset
			}, 1, $.proxy(function() {
				this.listParent.fadeIn(1000);
				if(this.afterAnimate){
					this.afterAnimate.fn.call(this.afterAnimate.scope);
				}
			},this));
		}, this));
		
	}
});