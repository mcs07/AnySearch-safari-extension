engines = {
	google: {title: 'Google', url: 'https://www.google.com/search?q=@@@'},
	yahoo: {title: 'Yahoo!', url: 'https://search.yahoo.com/search?p=@@@'},
	bing: {title: 'Bing', url: 'https://www.bing.com/search?q=@@@'},
	duckduckgo: {title: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=@@@'},
	quadrazid: {title: 'quadrazid', url: 'https://www.quadrazid.com/#q=@@@'},
	baidu: {title: 'Baidu', url: 'http://www.baidu.com/s?wd=@@@'},
	ask: {title: 'Ask', url: 'http://ask.com/web?q=@@@'},
	dogpile: {title: 'Dogpile', url: 'http://www.dogpile.com/search/web?q=@@@'},
	wikipedia: {title: 'Wikipedia', url: 'https://en.wikipedia.org/w/index.php?search=@@@'},
	amazon: {title: 'Amazon', url: 'http://www.amazon.com/s/ref=nb_sb_noss?field-keywords=@@@&amp;url=search-alias%3Daps&amp;tag=moxt-20'},
	facebook: {title: 'Facebook', url: 'https://www.facebook.com/search.php?q=@@@'},
	googleimages: {title: 'Google Images', url: 'https://www.google.com/images?q=@@@'},
	googlemaps: {title: 'Google Maps', url: 'https://maps.google.com/maps?q=@@@'},
	imdb: {title: 'IMDb', url: 'http://www.imdb.com/find?s=all&amp;q=@@@'},
	reddit: {title: 'Reddit', url: 'http://www.reddit.com/search?q=@@@'},
	youtube: {title: 'YouTube', url: 'https://www.youtube.com/results?search_query=@@@'},
	startpage: {title: 'Startpage', url: 'https://startpage.com/do/search?q=@@@'},
	aol: {title: 'Aol', url: 'http://search.aol.com/aol/search?q=@@@'},
	disable: {title: 'Disable Search', url: 'disable'},
	custom: {title: 'Custom', url: 'custom'}
}


safari.application.addEventListener('beforeSearch', function(e) {
	e.preventDefault();
	var url = engines[safari.extension.settings.engine].url;
	if (url == 'disable') {
		url = 'http://' + e.query;
	} else {
		if (url == 'custom') {
			url = safari.extension.settings.customEngine;
		}
		url = url.replace('@@@', encodeURIComponent(e.query).replace(/%20/g,'+'));
	}
	e.target.url = url;
}, false);


safari.application.addEventListener('menu', function(e) {
	var menu = e.target;
	if (menu.menuItems.length == 1) {
		menu.removeMenuItem(0);
		menu.appendMenuItem('anysearch', 'AnySearch');
		menu.appendSeparator();
		for (var engine in engines) {
		    if (engines.hasOwnProperty(engine)) {
		        menu.appendMenuItem(engine, engines[engine].title);
		    }
		}
	}
	var activeEngine = safari.extension.settings.engine;
	menu.menuItems[0].disabled = true;
	for (var i = 0; i < menu.menuItems.length; i++) {
		var menuItem = menu.menuItems[i];
		if (menuItem.identifier === activeEngine) {
			menuItem.checkedState = 1;
		} else {
			menuItem.checkedState = 0;
		}
	}

}, false);


safari.application.addEventListener("command", function(e) {
	safari.extension.settings.engine = e.command;
}, false);
