function process(settings)
{
	if (!settings.projectId)
		throw chrome.i18n.getMessage("ProjectIdRequired");

	if (!settings.apiToken)
		throw chrome.i18n.getMessage("APITokenrequired");



	var p = new PivotalTracker( items.apiToken );
	console.log(p);
	p.searchStory(settings.projectId, '5666').then(function(response){
		//alert(response);
	}).catch(function(error){

	});
}

chrome.storage.sync.get(null, function(settings) {
	try{
		process(settings);
	}catch(error){
		RedmineUI.displayError(error);
	}
	
});


