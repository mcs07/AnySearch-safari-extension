safari.application.addEventListener('beforeSearch', handleBeforeSearch, false);

function handleBeforeSearch(e) {
	e.preventDefault();
	var url = safari.extension.settings.engine;
	if (url == 'disable') {
		url = 'http://' + e.query + '.com'
	} else {
		if (url == 'custom') {
			var url = safari.extension.settings.customEngine;
		}
		url = url.replace('@@@', encodeURIComponent(e.query).replace(/%20/g,'+'));
	}
	e.target.url = url;
}
