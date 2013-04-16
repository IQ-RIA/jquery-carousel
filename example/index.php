<html>
	<head>
		<!--css-->
		<link rel='stylesheet' href='css/carousel.css' />
		
		<!--js-->
		
		
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
				CoolStore = CJ.extend(CJ.Carousel.Store, {
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
				})

				Carousel = CJ.extend(CJ.Carousel.Carousel, {
					store: new CoolStore(),
					createMarkup: function() {
						this.el = $(
							'<div class="cj-carousel-root-' + this.settings.cols + '-cols ' + this.settings.theme + '">'+
								'<div class="cj-carousel-root-wrapper ' + this.settings.theme + '">'+
									'<ul class="cj-carousel-root ' + this.settings.theme + '"></ul>'+
								'</div>'+
						   '</div>'
						);

						this.el.appendTo(this.parentEl);
						return this.el;
					}
				});

				carousel = new Carousel({
					placeHolder: '#carousel',
					settings: {
						rows: 1,
						cols: 3,
						theme: "cj-default"
					},
					renderers: {
						item: {
							createItem : function(item) {
								return "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAFJklEQVR4Xu3Y2yvlfRTH8eUUVw53SFKOkTtcCBF/NlLK6coQRZJQzhIXcn76fsvT2I9n7DWmNXt/ev9qmvbspfVbn/Wa/ftuFdfX12/GRQJFJlABmCKToiwnABgguBIAjCsuigGDAVcCgHHFRTFgMOBKADCuuCgGDAZcCQDGFRfFgMGAKwHAuOKiGDAYcCUAGFdcFAMGA64EAOOKi2LAYMCVAGBccVEMGAy4EgCMKy6KAYMBVwKAccVFMWAw4EoAMK64KAYMBlwJAMYVF8WAwYArAcC44qIYMBhwJQAYV1wUAwYDrgQA44qLYsBgwJUAYFxxUQwYDLgSAIwrLooBgwFXAoBxxUUxYDDgSgAwrrgoBgwGXAkAxhUXxYDBgCsBwLjiohgwGHAlABhXXBQDBgOuBADjiotiwGDAlQBgXHFRDBgMuBIAjCsuigGDAVcCgHHFRTFgMOBKADCuuCgGDAZcCQDGFRfFgMGAKwHAuOKiGDAYcCUAGFdcFAMGA64EAOOKi2LAYMCVQFmDOTk5sa2trTzwzMzMfwbf39+39Ofn919fX21nZ8fOzs7s7e3Nmpubrbe31yorK78MLrrflzf0FwrKFszl5aXd39/n5X8G5uXlxZaWluzx8THDeAd1cHBge3t7NjAwkH8ugevp6bH29vZfxh/d7y9YKKpl2YI5PDzMS56dnf0UzPHxsV1dXdnFxcWH91dXV+3u7s4mJiYypMXFRauvr7fh4WFbXl7O/zY6Omrv4Orq6vJ7R0dHf7TfyMhIUQsqtaKyBfMe5Gdg0tLT8ru7u+3Hjx8fwCwsLNjz87NNT09nHPPz81ZVVWVTU1P5MbW5uWmDg4N2c3OTkQwNDVljY+O/e/uT/UoNQzH3Iwnm/Pw8P6rGxsZsbm7uA5jChafXFRUVGVC60ifQ09OTPTw8WEtLi/X393/I8TMw3+lXzJJKqUYSzNramjU1NeVPmMIFf/YJU11dbZOTk3kvafkbGxsZUQJXW1v7JZjv9CslDMXciySYdySFAYyPj+dH1O3t7YczTENDQz6npCs9ktK5Jz2uOjs7raOj40sw3+lXzJJKqUYSzM8BF37CpMPy7u5u/paUUGxvb1tfX5+1tbVZ+ia0vr5uXV1d+dCbvlElSOlQ/Ksz0+/2KyUIxd5L2YL5v//Vhb+PKQSTkKTzzenpac6otbU1P7oSkJWVFaupqbH0DSbVpfNM+ju9To+yz67f7ZceeeV4lS2Ycgxb4Z4Bo7DFwBkAExi2QivAKGwxcAbABIat0AowClsMnAEwgWErtAKMwhYDZwBMYNgKrQCjsMXAGQATGLZCK8AobDFwBsAEhq3QCjAKWwycATCBYSu0AozCFgNnAExg2AqtAKOwxcAZABMYtkIrwChsMXAGwASGrdAKMApbDJwBMIFhK7QCjMIWA2cATGDYCq0Ao7DFwBkAExi2QivAKGwxcAbABIat0AowClsMnAEwgWErtAKMwhYDZwBMYNgKrQCjsMXAGQATGLZCK8AobDFwBsAEhq3QCjAKWwycATCBYSu0AozCFgNnAExg2AqtAKOwxcAZABMYtkIrwChsMXAGwASGrdAKMApbDJwBMIFhK7QCjMIWA2cATGDYCq0Ao7DFwBkAExi2QivAKGwxcAbABIat0AowClsMnAEwgWErtAKMwhYDZwBMYNgKrQCjsMXAGQATGLZCK8AobDFwBsAEhq3QCjAKWwycATCBYSu0AozCFgNnAExg2AqtAKOwxcAZ/gED0OOmRzH/qQAAAABJRU5ErkJggg==' /><br/><span>" + item.title + "</span>"
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
	<body class="main" style="text-align: center; margin-top:20px;">
		<div id="carousel"></div>
		Page Number: <input type='text' name='pageNum' id="pageNum"/>
		<input type='button' value="go to page" name='goToPageBtn' id="goToPageBtn" />
	</body>
</html>