Is this just yet another jQuery Carousel?
=============

>No, this component is more then just jQuery Carousel. Each jQuery carousel has troubles when we try to show hundreds of items, or when we simply need to show user the items in carousel starting from 50 page from 120.


Usage
-----

#### Example 1 (Simply Way)
	carousel = new Carousel
		placeHolder: "#carousel"
		settings:
			rows: 1
			cols: 3
			theme: "cj-default"
		store:
			loadPage: (pageNumber) ->
				$.ajax
					type: "GET"
					url: "server.php"
					dataType: "json"
					data: "page=#{pageNumber}"
					success: $.proxy(@pageLoaded, @)
					context: @
		renderers:
			item:
				createItem : (item) -> "<span>#{item.title}</span>"


	# start carousel
	carousel.movePage 0

#### Example 2 (Inheritance or Hard Way)
	CoolStore = CJ.extend CJ.Carousel.Store,
		loadPage: (pageNumber) ->
			$.ajax
				type: "GET"
				url: "server.php"
				dataType: 'json'
				data: "page=#{pageNumber}"
				success: $.proxy(@pageLoaded, @)
				context: @

	Carousel = CJ.extend CJ.Carousel.Carousel,
		placeHolder: '#carousel'
		settings:
			rows: 1
			cols: 3
			theme: "cj-default"
		store: new CoolStore
		renderers:
			item:
				createItem : (item) -> "<span>#{item.title}</span>"

	carousel = new Carousel()

	# start carousel
	carousel.movePage 0