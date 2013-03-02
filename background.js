chrome.extension.onMessage.addListener(function(msg, sender, reply) {
	var tab_id = sender.tab.id;
	var redirect_url = msg.redirect;

	chrome.tabs.update(tab_id, {url: redirect_url});
});