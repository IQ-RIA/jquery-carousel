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
