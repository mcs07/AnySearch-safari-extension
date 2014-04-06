# AnySearch Safari Extension

Use a custom search engine in the Safari address bar, or disable searches completely.

[Download here](http://www.macosxtips.co.uk/extensions/#anysearch)

## What's this then?

As of Safari 6, the separate address bar and Google Search field have been combined into a single "omnibar" that can take both web addresses and searches. In the Safari Preferences, you can set one of three different search engines: Google, Yahoo! and Bing.

This extension allows you to set any search engine you want. In the extension settings, there is a long list of popular search engines to choose from, or you can specify your own custom address.

Alternatively, you can disable the search functionality completely, turning the omnibar back into a simple address bar.

## Specifying a custom search engine

If the search engine you want to use is not in the list, you can specify a custom one using the text field in the settings. To find the url you need to put here, go to your chosen search engine and search for `@@@`. Then just copy and paste the address of the search results. It should look something like this:

    http://www.google.com/search?q=@@@
	
## More advanced search functions

The extension [KeySearch](http://www.macosxtips.co.uk/keysearch) offers this same functionality and more. In particular, you can also:

- Specify keywords to target a specifc search engine. e.g. `wiki apple` to search Wikipedia for `apple`.

- Set up quick shortcuts. e.g. set `yt` to always take you to `youtube.com`.

- Use a semi-transparent "HUD" over the current webpage activated by a keyboard shortcut.

- Set up keyboard shortcuts for different search engines.

[Read more and download](http://www.macosxtips.co.uk/keysearch)

## The technical details

In Safari 5, there was no way for extensions to modify the behaviour of the separate search box. However there was a `beforeNavigate` event that allowed extensions to modify the behaviour of the address bar.

As of Safari 6, in addition to the `beforeNavigate` event, there is a `beforeSearch` event. One of these events will be called when the user enters some text into the address bar and presses return: `beforeNavigate` if they enter a URL, `beforeSearch` if they enter anything else.

AnySearch listens on the `beforeSearch` event. It first cancels the default behaviour, then checks your settings for which search engine you want. Then it puts your query into the specified search engine, and displays the results. Here's the relevant code:

	function handleBeforeSearch(e) {
		e.preventDefault();
		var url = ext.settings.engine;
		if (url == 'disable') {
			url = 'http://' + e.query + '.com'
		} else {
			if (url == 'custom') {
				var url = ext.settings.customEngine;
			}
			url = url.replace('@@@', encodeURIComponent(e.query).replace(/%20/g,'+'));
		}	
		e.target.url = url;
	}
