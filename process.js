function process(settings)
{
	// We need to check first if we have all the required informations
	if (!settings.projectId)
		throw chrome.i18n.getMessage("ProjectIdRequired");

	if (!settings.apiToken)
		throw chrome.i18n.getMessage("APITokenrequired");

	//We determine now if we are ine list or detail mode
	var detail = RedmineUI.isDetailPage(document);

	if (detail) {
		processDetailPage(settings);
	}
	else{
		processListPage(settings);
	}

}

function processDetailPage(settings)
{
	var title = document.querySelector("h2");
	var id = title.innerHTML.split("#")[1];
	var _doc = document;

	var el = RedmineUI.createPivotalTag(document, id);
	el.style.fontSize = "12px";
	el.style.padding = "3px 5px";
	el.style.margin = "0px 0px 0px 10px";

	var p = new PivotalTracker( settings.apiToken );
	
	p.searchStory(settings.projectId, id).then(function(response){
		updatePivotalTag(response, el, title);
	}).catch(function(error){
		alert("ERROR : " + error);
	});
}

function processListPage(settings)
{
	var t = document.getElementsByClassName('issue');
	//displaying list mode
	for (var i = t.length - 1; i >= 0; i--) {
		processingLine(settings, t[i]);
	}
}

function processingLine(settings, l)
{
	var id = l.querySelector('.id').querySelector('a').innerHTML;
	var c = l.querySelector('.checkbox');
	var el = RedmineUI.createPivotalTag(document, id);
	var p = new PivotalTracker( settings.apiToken );
	
	p.searchStory(settings.projectId, id).then(function(response){
		updatePivotalTag(response, el, c);
	}).catch(function(error){
		alert("ERROR : " + error);
	});;
}

function updatePivotalTag(response, element, container)
{
	if (response) {
		if (response.stories.total_hits > 0) {

			var info = RedmineUI.getPivotalTagInformation(response.stories.stories[0].current_state);

			element.style.background = info.background;
			element.style.color = info.color;
			element.innerHTML = info.text;

			container.appendChild(element);
		}
	}
}

chrome.storage.sync.get(null, function(settings) {
	try{
		process(settings);
	}catch(error){
		RedmineUI.displayError(error);
	}
});


