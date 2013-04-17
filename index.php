<html>
    <head>
        <!--css-->
        <link rel='stylesheet' type="text/css" href='css/carousel.css' />
        <link rel="stylesheet" type="text/css" href="css/site.css" />
        <link rel="stylesheet" type="text/css" href="zurb/css/foundation.min.css" />
        <link rel="stylesheet" type="text/css" href="highlight.js/styles/ascetic.css" />

        <script type="text/javascript" src="zurb/js/vendor/jquery.js"></script>
        <script type="text/javascript" src="zurb/js/foundation.min.js"></script>

        <script type="text/javascript" src="highlight.js/highlight.pack.js"></script>
        <script type="text/javascript">hljs.initHighlightingOnLoad();</script>
        
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
                var carousel1 = new CJ.Carousel.Carousel({
                    placeholder: '#carousel1',
                    autoLoad: true,
                    // Store's configuration
                    store: {
                        // method loadPage defines how data should be loaded
                        // from the server
                        // calling of "pageLoaded"-method is REQUIRED
                        loadPage: function(pageNumber) {
                            $.ajax({
                                url: '/server.php',
                                type: "GET",
                                context: this,
                                data: 'page='+pageNumber,
                                dataType: 'json',
                                success: $.proxy(this.pageLoaded, this)
                            });
                        }
                    },
                    renderers: {
                        // ItemRenderer's configuration
                        item: {
                            // method createItem defines, 
                            // how items should be displayed
                            createItem : function(item) {
                                return [
                                    '<div class="text-center">' +
                                        '<img src="http://dummyimage.com/140x150/ffffff/a1a1a1.png"><br/>' +
                                        '<span>' + item.title + ' # '+ item.itemId + '</span>' +
                                    '</div>'
                                ]
                            }
                        }
                    }
                });

                $('.example1').click(function(e){
                    e.preventDefault();
                    carousel1.showPage($('#example1').val()-0);
                });

                var carousel2 = new CJ.Carousel.Carousel({
                    placeholder: '#carousel2',
                    autoLoad: true,
                    // Store's configuration
                    store: {
                        // method loadPage defines how data should be loaded
                        // from the server
                        // calling of "pageLoaded"-method is REQUIRED
                        loadPage: function(pageNumber) {
                            $.ajax({
                                url: '/server.php',
                                type: "GET",
                                context: this,
                                data: 'pageSize=12&page='+pageNumber,
                                dataType: 'json',
                                success: $.proxy(this.pageLoaded, this)
                            });
                        }
                    },
                    renderers: {
                        // ItemRenderer's configuration
                        item: {
                            // method createItem defines, 
                            // how items should be displayed
                            createItem : function(item) {
                                return [
                                    '<div class="text-center">' +
                                        '<img src="http://dummyimage.com/140x150/ffffff/a1a1a1.png"><br/>' +
                                        '<span>' + item.title + ' # '+ item.itemId + '</span>' +
                                    '</div>'
                                ]
                            }
                        }
                    }
                });

                $('.example2').click(function(e){
                    e.preventDefault();
                    carousel2.showPage($('#example2').val()-0);
                });

                var data = (function(count, pageSize) {
                    var result = {
                        count: count * pageSize
                    };

                    for(var i=0;i<count;i++) {
                        var item = result["page" + i] = [];

                        for(var j=0; j<pageSize; j++) {
                            item.push({
                                title: "title",
                                itemId: (i * pageSize) + j
                            });
                        }
                    }

                    return result;
                })(50, 4);

                var carousel3 = new CJ.Carousel.Carousel({
                    placeholder: "#carousel3",
                    autoLoad: true,
                    // Store's configuration
                    store: {
                        // method loadPage defines how data should be loaded
                        // from the server
                        // calling of "pageLoaded"-method is REQUIRED
                        loadPage: function(pageNumber) {
                            this.pageLoaded({
                                pageNum: pageNumber,
                                pageSize: 4,
                                total: data.count,
                                items: data["page" + pageNumber] || []
                            });
                        }
                    },
                    renderers: {
                        // ItemRenderer's configuration
                        item: {
                            // method createItem defines, 
                            // how items should be displayed
                            createItem : function(item) {
                                return [
                                    '<div class="text-center">' +
                                        '<img src="http://dummyimage.com/140x150/ffffff/a1a1a1.png"><br/>' +
                                        '<span>' + item.title + ' # '+ item.itemId + '</span>' +
                                    '</div>'
                                ]
                            }
                        }
                    }
                });

                $('.example3').click(function(e){
                    e.preventDefault();
                    carousel3.showPage($('#example3').val()-0);
                });
            });
        </script>

        <script type="text/javascript">
            $(function() {
                $(document).foundation();
            });
        </script>
    </head>

    <body>
        <div class="top-bar">
            <div class="name">
                <h1><a>IQ RIA jQuery Carousel</a></h1>
            </div>
        </div>

        <div class="row">
            <div class="large-12 columns">
                <div class="section-container tabs" data-section="tabs">
                    <section>
                        <p class="title" data-section-title>
                            <a href="#">Example 1</a>
                        </p>
                        <div class="content" data-section-content>
                            <h3>Example 1 (Remote Data)</h3>

                            <p class="subheader">
                                Basic example: Simple 1-row and 4-column carousel, which communicates with server via Ajax.<br/>
                            </p>

                            <div class="row">
                                <div class="large-12 columns">
                                    <div class="row">
                                        <div id="carousel1" data-rows="1" data-cols="4" data-theme="cj-default"></div>
                                    </div>

                                    <div class="row">
                                        <div class="large-4 columns right">
                                            <div class="row collapse">
                                                <div class="small-8 columns">
                                                    <input type="text" id="example1" placeholder="Page number">
                                                </div>

                                                <div class="small-3 columns">
                                                    <a href="#" class="button prefix example1">Go</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="large-12 columns">
                                    
                                    <h3>HTML</h3>
                                    <pre class="code-example">
                                        <code class="">
&lt;div id=&quot;carousel1&quot; 
    data-rows=&quot;1&quot; 
    data-cols=&quot;4&quot; 
    data-theme=&quot;cj-default&quot;&gt;
&lt;/div&gt;
                                        </code>
                                    </pre>
                                    <h3>CSS</h3>
                                    <pre class="code-example">
                                        <code class="css">
#carousel1 .cj-carousel-root-wrapper.cj-default {
    width: 720px;
    height: 200px;
}
                                        </code>
                                    </pre>
                                    <h3>JS</h3>
                                    <pre class="code-example">
                                        <code>
$(function() {
    var carousel = new CJ.Carousel.Carousel({
        autoLoad: true,
        placeholder: '#carousel1',
        // Store's configuration
        store: {
            // method loadPage defines how data should be loaded
            // from the server
            // calling of "pageLoaded"-method is REQUIRED
            loadPage: function(pageNumber) {
                $.ajax({
                    url: '/server.php',
                    type: "GET",
                    context: this,
                    data: 'page='+pageNumber,
                    dataType: 'json',
                    success: $.proxy(this.pageLoaded, this)
                });
            }
        },
        renderers: {
            // ItemRenderer's configuration
            item: {
                // method createItem defines, 
                // how items should be displayed
                createItem : function(item) {
                    return [
                        '&lt;div class=&quot;text-center&quot;&gt;' +
                            '&lt;img src=&quot;http://dummyimage.com/140x150/ffffff/a1a1a1.png&quot;&gt;&lt;br/&gt;' +
                            '&lt;span&gt;' + item.title + ' # '+ item.itemId + '&lt;/span&gt;' +
                        '&lt;/div&gt;'
                    ]
                }
            }
        }
    });

    $('.example2').click(function(e){
        e.preventDefault();
        carousel.showPage($('#example2').val()-0);
    });
});
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <p class="title" data-section-title>
                            <a href="#">Example 2</a>
                        </p>
                        <div class="content" data-section-content>
                            <h3>Example 2 (Remote Data)</h3>

                            <p class="subheader">
                                Basic example: Simple 3-row and 4-column carousel, which communicates with server via Ajax.<br/>
                            </p>

                            <div class="row">
                                <div class="large-12 columns">
                                    <div class="row">
                                        <div id="carousel2" data-rows="3" data-cols="4" data-theme="cj-default"></div>
                                    </div>

                                    <div class="row">
                                        <div class="large-4 columns right">
                                            <div class="row collapse">
                                                <div class="small-8 columns">
                                                    <input type="text" id="example2" placeholder="Page number">
                                                </div>

                                                <div class="small-3 columns">
                                                    <a href="#" class="button prefix example2">Go</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="large-12 columns">
                                    
                                    <h3>HTML</h3>
                                    <pre class="code-example">
                                        <code class="">
&lt;div id=&quot;carousel2&quot; 
    data-rows=&quot;3&quot; 
    data-cols=&quot;4&quot; 
    data-theme=&quot;cj-default&quot;&gt;
&lt;/div&gt;
                                        </code>
                                    </pre>
                                    <h3>CSS</h3>
                                    <pre class="code-example">
                                        <code class="css">
#carousel2 .cj-carousel-root-wrapper.cj-default {
    width: 720px;
    height: 700px;
}
                                        </code>
                                    </pre>
                                    <h3>JS</h3>
                                    <pre class="code-example">
                                        <code>
$(function() {
    var carousel = new CJ.Carousel.Carousel({
        autoLoad: true,
        placeholder: '#carousel2',
        // Store's configuration
        store: {
            // method loadPage defines how data should be loaded
            // from the server
            // calling of "pageLoaded"-method is REQUIRED
            loadPage: function(pageNumber) {
                $.ajax({
                    url: '/server.php',
                    type: "GET",
                    context: this,
                    data: 'pageSize=12&page='+pageNumber,
                    dataType: 'json',
                    success: $.proxy(this.pageLoaded, this)
                });
            }
        },
        renderers: {
            // ItemRenderer's configuration
            item: {
                // method createItem defines, 
                // how items should be displayed
                createItem : function(item) {
                    return [
                        '&lt;div class=&quot;text-center&quot;&gt;' +
                            '&lt;img src=&quot;http://dummyimage.com/140x150/ffffff/a1a1a1.png&quot;&gt;&lt;br/&gt;' +
                            '&lt;span&gt;' + item.title + ' # '+ item.itemId + '&lt;/span&gt;' +
                        '&lt;/div&gt;'
                    ]
                }
            }
        }
    });

    $('.example1').click(function(e){
        e.preventDefault();
        carousel.showPage($('#example2').val()-0);
    });
});
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </section>

                                        <section>
                        <p class="title" data-section-title>
                            <a href="#">Example 3</a>
                        </p>
                        <div class="content" data-section-content>
                            <h3>Example 3 (Local Data)</h3>

                            <p class="subheader">
                                Basic example: Simple 1-row and 4-column carousel, which shows data from memory<br/>
                            </p>

                            <div class="row">
                                <div class="large-12 columns">
                                    <div class="row">
                                        <div id="carousel3" data-rows="1" data-cols="4" data-theme="cj-default"></div>
                                    </div>

                                    <div class="row">
                                        <div class="large-4 columns right">
                                            <div class="row collapse">
                                                <div class="small-8 columns">
                                                    <input type="text" id="example3" placeholder="Page number">
                                                </div>

                                                <div class="small-3 columns">
                                                    <a href="#" class="button prefix example3">Go</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="large-12 columns">
                                    
                                    <h3>HTML</h3>
                                    <pre class="code-example">
                                        <code class="">
&lt;div id=&quot;carousel3&quot; 
    data-rows=&quot;1&quot; 
    data-cols=&quot;4&quot; 
    data-theme=&quot;cj-default&quot;&gt;
&lt;/div&gt;
                                        </code>
                                    </pre>
                                    <h3>CSS</h3>
                                    <pre class="code-example">
                                        <code class="css">
#carousel3 .cj-carousel-root-wrapper.cj-default {
    width: 720px;
    height: 200px;
}
                                        </code>
                                    </pre>
                                    <h3>JS</h3>
                                    <pre class="code-example">
                                        <code>
$(function() {
    // generates data
    var data = (function(count, pageSize) {
        var result = {
            count: count * pageSize
        };

        for(var i=0; i&lt;count;i++) {
            var item = result[&quot;page&quot; + i] = [];

            for(var j=0; j&lt;pageSize; j++) {
                item.push({
                    title: &quot;title&quot;,
                    itemId: (i * pageSize) + j
                });
            }
        }

        return result;
    })(50, 4);

    var carousel3 = new CJ.Carousel.Carousel({
        placeholder: &quot;#carousel3&quot;,
        autoLoad: true,
        // Store's configuration
        store: {
            // method loadPage defines how data should be loaded
            // from the server
            // calling of &quot;pageLoaded&quot;-method is REQUIRED
            loadPage: function(pageNumber) {
                this.pageLoaded({
                    pageNum: pageNumber,
                    pageSize: 4,
                    total: data.count,
                    items: data[&quot;page&quot; + pageNumber] || []
                });
            }
        },
        renderers: {
            // ItemRenderer's configuration
            item: {
                // method createItem defines, 
                // how items should be displayed
                createItem : function(item) {
                    return [
                        '&lt;div class=&quot;text-center&quot;&gt;' +
                            '&lt;img src=&quot;http://dummyimage.com/140x150/ffffff/a1a1a1.png&quot;&gt;&lt;br/&gt;' +
                            '&lt;span&gt;' + item.title + ' # '+ item.itemId + '&lt;/span&gt;' +
                        '&lt;/div&gt;'
                    ]
                }
            }
        }
    });

    $('.example3').click(function(e){
        e.preventDefault();
        carousel2.showPage($('#example3').val()-0);
    });
});
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <p class="title" data-section-title>
                            <a href="#">Example 1</a>
                        </p>
                        <div class="content" data-section-content>
                            <h3>Example 1 (Remote Data)</h3>

                            <p class="subheader">
                                Basic example: Simple 1-row and 4-column carousel, which communicates with server via Ajax.<br/>
                            </p>

                            <div class="row">
                                <div class="large-12 columns">
                                    <div class="row">
                                        <div id="carousel1" data-rows="1" data-cols="4" data-theme="cj-default"></div>
                                    </div>

                                    <div class="row">
                                        <div class="large-4 columns right">
                                            <div class="row collapse">
                                                <div class="small-8 columns">
                                                    <input type="text" id="example1" placeholder="Page number">
                                                </div>

                                                <div class="small-3 columns">
                                                    <a href="#" class="button prefix example1">Go</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="large-12 columns">
                                    
                                    <h3>HTML</h3>
                                    <pre class="code-example">
                                        <code class="">
&lt;div id=&quot;carousel1&quot; 
    data-rows=&quot;1&quot; 
    data-cols=&quot;4&quot; 
    data-theme=&quot;cj-default&quot;&gt;
&lt;/div&gt;
                                        </code>
                                    </pre>
                                    <h3>CSS</h3>
                                    <pre class="code-example">
                                        <code class="css">
.cj-carousel-root-wrapper.cj-default {
    position : relative;
    overflow : hidden;
    width    : 720px;
    height   : 200px;
}
                                        </code>
                                    </pre>
                                    <h3>JS</h3>
                                    <pre class="code-example">
                                        <code>
$(function() {
    var carousel = new CJ.Carousel.Carousel({
        autoLoad: true,
        placeholder: '#carousel1',
        // Store's configuration
        store: {
            // method loadPage defines how data should be loaded
            // from the server
            // calling of "pageLoaded"-method is REQUIRED
            loadPage: function(pageNumber) {
                $.ajax({
                    url: '/server.php',
                    type: "GET",
                    context: this,
                    data: 'page='+pageNumber,
                    dataType: 'json',
                    success: $.proxy(this.pageLoaded, this)
                });
            }
        },
        renderers: {
            // ItemRenderer's configuration
            item: {
                // method createItem defines, 
                // how items should be displayed
                createItem : function(item) {
                    return [
                        '&lt;div class=&quot;text-center&quot;&gt;' +
                            '&lt;img src=&quot;http://dummyimage.com/140x150/ffffff/a1a1a1.png&quot;&gt;&lt;br/&gt;' +
                            '&lt;span&gt;' + item.title + ' # '+ item.itemId + '&lt;/span&gt;' +
                        '&lt;/div&gt;'
                    ]
                }
            }
        }
    });

    $('.example1').click(function(e){
        e.preventDefault();
        carousel.showPage($('#example1').val()-0);
    });
});
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </body>
</html>