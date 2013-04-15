<html>
	<head>
		<!--css-->
		<link rel='stylesheet' href='css/carousel.css' />
		
		<!--js-->
		<script type='text/javascript' src='js/jquery.js'></script>
		
		<script type='text/javascript' src='js/carousel/main.js'></script>
		<script type='text/javascript' src='js/carousel/Component.js'></script>
		<script type='text/javascript' src='js/carousel/Carousel.js'></script>
		<script type='text/javascript' src='js/carousel/Store.js'></script>

		<!--renderers-->
		<script type='text/javascript' src='js/carousel/renderers/AbstractRenderer.js'></script>
		<script type='text/javascript' src='js/carousel/renderers/PageRenderer.js'></script>
		<script type='text/javascript' src='js/carousel/renderers/RowRenderer.js'></script>
		<script type='text/javascript' src='js/carousel/renderers/ItemRenderer.js'></script>
		<!--/renderers-->
		
		<!--navigation-->
		<script type='text/javascript' src='js/carousel/navigation/AbstractNavigator.js'></script>
		<script type='text/javascript' src='js/carousel/navigation/button/AbstractButton.js'></script>
		<script type='text/javascript' src='js/carousel/navigation/button/PrevButtonNavigator.js'></script>
		<script type='text/javascript' src='js/carousel/navigation/button/NextButtonNavigator.js'></script>
		<script type='text/javascript' src='js/carousel/navigation/button/ButtonNavigator.js'></script>
		<!--/navigation-->
		
		<!--animators-->
		<script type='text/javascript' src='js/carousel/animators/BaseAnimator.js'></script>
		<script type='text/javascript' src='js/carousel/animators/FadeAnimator.js'></script>
		<script type='text/javascript' src='js/carousel/animators/SlideAnimator.js'></script>
		<!--/animators-->
		
		<script type="text/javascript">
			$(function() {
				var carousel = new CJ.Carousel.Carousel({
					autoRender: true,
					placeHolder: '#carousel',
					settings: {
						cols:  3, 
						theme: "cj-default"
					},
					store: {
						loadPage: function(pageNumber) {
							$.ajax({
								url      : 'server.php',
								context  : this,
								type     : "GET",
								data     : 'page='+pageNumber,
								dataType : 'json',
								success  : $.proxy(this.pageLoaded, this)
							});
						}
					},
					createMarkup: function() {
						this.el = $(
							'<div class="s36-carousel-root-' + this.cols + '-cols ' + this.settings.theme + '">'+
								'<div class="s36-carousel-root-wrapper ' + this.settings.theme + '">'+
									'<ul class="s36-carousel-root ' + this.settings.theme + '"></ul>'+
								'</div>'+
						   '</div>'
						);

						this.el.appendTo(this.parentEl);
						return this.el;
					},
					renderers: {
						item: {
							createItem : function(item) {
								return [
									'<div class="s36-row-item-rating s36-row-item-title-' + this.carousel.settings.theme+'">' + item.title + '</div>',
						            '<div class="s36-row-item-rating s36-row-item-description-'+this.carousel.settings.theme+'">' + item.description + '</div>'
					            ].join('');
							}
						}
					}
				});

				$('#goToPageBtn').click(function(){
					carousel.movePage($('#pageNum').val()-0);
				});
			});
		</script>
	</head>
	<body class="s36-block">
		<div id="carousel"></div>
		<input type='text' name='pageNum' id="pageNum"/>
		<input type='button' value="go to page" name='goToPageBtn' id="goToPageBtn" />
	</body>
</html>