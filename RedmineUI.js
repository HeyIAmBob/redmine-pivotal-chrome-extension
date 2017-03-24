RedmineUI = function()
{

}

RedmineUI.isDetailPage = function(document) {
	return document.querySelector('div.issue');
};

RedmineUI.createPivotalTag = function(document, id) {
	var el = document.createElement('span');
	el.setAttribute('data-rm-id', id);
	el.style.fontSize = "9px";
	el.style.padding = "3px 5px";
	return el;
};
RedmineUI.getPivotalTagInformation = function(status)
{
	var info = {};


	switch(status)
	{
		case 'finished' :
		info.background = "#203e64";
		info.color = "White";
		info.text = "Finished";
		break;

		case 'delivered' :
		info.background = "#f39300";
		info.color = "White";
		info.text = "Delivered";
		break;

		case 'accepted':
		info.background = "#629200";
		info.color = "White";
		info.text = "Accepted";
		break;
		
		case 'unscheduled':
		info.background = "#e4eff7";
		info.color = "Gray";
		info.text = "Unscheduled";
		break;
		
		case 'started' :
		info.background = "#e0e2e5";
		info.color = "Gray";
		info.text = "Started";
		break;
		
		case 'unstarted':
		info.background = "#e0e2e5";
		info.color = "Gray";
		info.text = "Unstarted";
		break;
		default:
		info.background = "default";
		info.color = "default";
		info.text = "✓";
	}

	return info;
}

RedmineUI.displayError = function(document, id) {
	alert("Error : " + error);
};