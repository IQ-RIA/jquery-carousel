<html>
	<head>
		<!--css-->
		<link rel='stylesheet' href='css/carousel.css' />
		<!--js-->
		<!--jquery-->
		<script type='text/javascript' src='js/jquery/jquery.min.js'></script>
		<script type="text/javascript">
			/*
	 		* teach jQuery reverse method for jquery-list
	 		*/
			$.fn.reverse = [].reverse;
		</script>
		<!--namespaces-->
		<script type='text/javascript' src='js/utils.js'></script>
		<script type='text/javascript' src='js/ns.js'></script>
		<!--/namespaces-->
		<script type="text/javascript" src="js/Component.js"></script>
		<script type='text/javascript' src='js/Store.js'></script>
		<!--renders-->
		<script type='text/javascript' src='js/renderers/AbstractRenderer.js'></script>
		<script type='text/javascript' src='js/renderers/PageRenderer.js'></script>
		<script type='text/javascript' src='js/renderers/RowRenderer.js'></script>
		<script type='text/javascript' src='js/renderers/ItemRenderer.js'></script>
		<!--/renders-->
		
		<!--navigation-->
		<script type='text/javascript' src='js/navigation/AbstractNavigator.js'></script>
		<script type='text/javascript' src='js/navigation/button/AbstractButton.js'></script>
		<script type='text/javascript' src='js/navigation/button/PrevButtonNavigator.js'></script>
		<script type='text/javascript' src='js/navigation/button/NextButtonNavigator.js'></script>
		<script type='text/javascript' src='js/navigation/button/ButtonNavigator.js'></script>
		<!--/navigation-->
		
		<!--animators-->
		<script type='text/javascript' src='js/animators/BaseAnimator.js'></script>
		<script type='text/javascript' src='js/animators/FadeAnimator.js'></script>
		<script type='text/javascript' src='js/animators/SlideAnimator.js'></script>
		<!--/animators-->
		
		<script type='text/javascript' src='js/Carousel.js'></script>

		<script type="text/javascript">
			// namespace is defined in this case to make easy change it
			CJ.ns("CJ.UI");

			CJ.UI.Carousel = {
				Navigation : {},
				Animation  : {},
				Renderer   : {}
			}

			/*
			 * @namespace CJ.UI.Carousel.Renderer
			 * @class ItemRenderer
			 *
			 * class controls forming simple feedback-item
			 */
			CJ.UI.Carousel.Renderer.ItemRenderer = CJ.extend(CJ.Carousel.Renderer.ItemRenderer, {
				/*
				 * @see Component#createMarkup
				 */
				createMarkup : function() {
					var pageData = this.pageRenderer.getPageData();
					var itemsPerRow = this.pageRenderer.getColsCount();
					var me = this;
					
					$('.cj-carousel-row', this.parentEl.parent()).each(function(idx){
						var html = '';
						
						for(var i=0; i<itemsPerRow; i++) {
							var item = pageData[i];
							
							if('undefined' != typeof item){
								html += '<div class="cj-carousel-row-item '+me.carousel.settings.theme+'">'+me.createItem(item)+'</div>';
							}
						}
						
						pageData = pageData.slice(itemsPerRow, pageData.length);
						$(this).html(html);
					});
				},
				/*
				 * performs forming item to display in carousel-page
				 * @param {Object} item Set of fields with feedback-information
				 * @returns {String} HTML-fragment
				 */
				createItem : function(item) {
					var html = '';

		            if(item.title){
		                html += '<div class="cj-row-item-rating cj-row-item-title-'+this.carousel.settings.theme+'">' + item.title + '</div>';
		            }

		            if(item.description){
		                html += '<div class="cj-row-item-rating cj-row-item-description-'+this.carousel.settings.theme+'">' + item.description + '</div>';
		            }
		            
		            return html;
				}
			});

			/*
			 * @namespace CJ.UI.Carousel.Renderer
			 * @class PageRenderer
			 *
			 * class forms carousel-page
			 */
			CJ.UI.Carousel.Renderer.PageRenderer = CJ.extend(CJ.Carousel.Renderer.PageRenderer, {
				/*
				 * @returns {RowRenderer}
				 */
				createRowRenderer : function(){
					return new CJ.UI.Carousel.Renderer.RowRenderer({
						pageRenderer : this,
						carousel     : this.carousel
					});
				},
				/*
				 * @see Component#createMarkup
				 */
				createMarkup : function() {
					this.rootList = $('li', this.parentEl);
					var page = this.getPageIfExists();
					
					if(!!page) { //page was finded
						this.el = page;
						this.renderChildren(this.el); //make the page-rereneder
						this.carousel.animator.runWithExistingItem(this.carousel.getLastPage(), page);
						this.carousel.setLastPage(page);
						
						return this.el;
					}
					
					if(this.isAnyPageExists()) {
						var contextEl = this.getContextEl(); //find element after witch we should insert new item
						
						this.el = this.createPage();
						this.el.insertAfter(contextEl).data('pageNum', this.carousel.getCurrentPageNum());
						this.renderChildren(this.el);
						this.carousel.animator.runWithNewItem(this.carousel.getLastPage(), this.el);
						this.carousel.setLastPage(this.el);
						
						return this.el;
					};
					
					this.el = this.createPage();
					this.el.prependTo($('.cj-carousel-root', this.parentEl)).data('pageNum', this.carousel.getCurrentPageNum());
					this.renderChildren(this.el);
					this.carousel.setLastPage(this.el);
					this.carousel.animator.runWithNewItem(this.carousel.getLastPage(), this.el);
					
					return this.el;
				}
			});

			/*
			 * @namespace CJ.UI.Carousel.Renderer
			 * @class RowRenderer
			 *
			 * controls formatting new carousel-page 
			 */
			CJ.UI.Carousel.Renderer.RowRenderer = CJ.extend(CJ.Carousel.Renderer.RowRenderer, {
				/*
				 * @returns {ItemRenderer}
				 */
				createItemRenderer : function(){
					return new CJ.UI.Carousel.Renderer.ItemRenderer({
						rowRenderer  : this,
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
						var currentRowClassName = 'cj-carousel-row' + this.getCurrentRowClassName(i) +' '+this.carousel.settings.theme;
						var startOffset = i * colsCount;
						
						html += '<div class="cj-carousel-row '+currentRowClassName+' '+this.carousel.settings.theme+'"></div>';
						html += '<div class="cj-carousel-row-clear-fix'+this.getCurrentRowClassName(i)+' '+this.carousel.settings.theme+'"></div>'; //just add clear : both div
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

		</script>
		<!--<script type='text/javascript' src='js/CarouselBuilder.js'></script>-->
		<script type="text/javascript">

			CJ.UI.Carousel.Carousel = CJ.extend(CJ.Carousel.Carousel, {
				/*
				 * @see Component#createMarkup
				 */
				createMarkup : function() {
					this.el = $('<div class="cj-carousel-root-'+this.cols+'-cols '+this.settings.theme+'">'+
									'<div class="cj-carousel-root-wrapper '+this.settings.theme+'">'+
										'<ul class="cj-carousel-root '+this.settings.theme+'"></ul>'+
									'</div>'+
							   '</div>');
					this.el.appendTo(this.parentEl);
					return this.el;
				},
				/*
				 * @see Carousel#createReader
				 */
				createReader : function(){
					return new CJ.Carousel.Store({
						blockId  : this.blockId,
						pageSize : this.pageSize,
						carousel : this
					});
				},
				/*
				 * @see Carousel#createAnimator
				 */
				createAnimator : function() {
					return new this.animator({
						carousel     : this,
						settings     : this.settings,
						afterAnimate : {
							fn    : this.onAfterAnimate,
							scope : this
						},
						beforeAnimate : {
							fn    : this.onBeforeAnimate,
							scope : this
						}
					});
				},
				/*
				 * @see Carousel#createPageRenderer
				 */
				createPageRenderer : function() {
					return new this.renderer({
						carousel : this,
						cols     : 1,
						settings : this.settings
					});
				}
			});

			$(function() {
				var CC = new CJ.UI.Carousel.Carousel({
					settings    : {cols : 3, theme: "Razer-Dark"},
					store       : CJ.Carousel.Store,
					animator    : CJ.Carousel.Animation.SlideAnimator,
					navigator   : CJ.Carousel.Navigation.ButtonNavigator,
					renderer    : CJ.UI.Carousel.Renderer.PageRenderer,
					placeHolder : $('#carousel')
				});

				CC.render();
				$('#goToPageBtn').click(function(){
					CC.movePage($('#pageNum').val()-0);
				});
			});
		</script>
	</head>
	<body class="cj-block">
		<div id="carousel"></div>
		<input type='text' name='pageNum' id="pageNum"/>
		<input type='button' value="go to page" name='goToPageBtn' id="goToPageBtn" />
	</body>
</html>