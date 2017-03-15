
function createPivotalFlag( id ){
	var el = document.createElement('span');
	el.setAttribute('data-rm-id', id);
	
	searchTicketInPivotal(el);
	return el;
}

function searchTicketInPivotal( element ){
	callAPI(element, parseAPI);
}

function callAPI(element, callback){

	if (element)
	{
		// new cross origin XML request
		chrome.storage.sync.get(null, function(items) {
			console.log(items);
			if (!items.projectId)
				callback(false, element);

			if (!items.apiToken)
				callback(false, element);

			var xmlhttp=new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if (xmlhttp.readyState==4){
					if(xmlhttp.status==200){
						fetchResult = JSON.parse(xmlhttp.responseText);
						callback(fetchResult, element);
					} else {
						callback(false, element);
					}
				}
			}

			var apiId = items.apiToken;
			var projectId = items.projectId;
			var search = element.getAttribute('data-rm-id');

			if (apiId && projectId) {
				xmlhttp.open("GET","https://www.pivotaltracker.com/services/v5/projects/" + projectId + "/search?query=" + search + "+AND+includedone%3Atrue", true);
				xmlhttp.setRequestHeader("X-TrackerToken", apiId);
				xmlhttp.send();
			}
			else {
				alert("Can't connect to Pivotal Tracker. Missing ProjetId or Token.");
			}

		});

	} 
	else {
		callback(false, element);
	}
}

function parseAPI(response, element)
{
	if (response) {
		if (response.stories.total_hits > 0) {
			if (response.stories.stories[0].current_state == 'finished' || response.stories.stories[0].current_state == 'accepted') {
				element.style.background = "Green";
				element.style.color = "White";
			}
			element.innerHTML = "✓";
		}
		else{
			element.innerHTML = "✗";
		}
	}
	else{
		element.innerHTML = "Err";
	}
	
}


function loadTable(){

	var t = document.getElementsByClassName('issue');
	for (var i = t.length - 1; i >= 0; i--) {
		var id = t[i].querySelector('.id').querySelector('a').innerHTML;
		var c = t[i].querySelector('.checkbox');

		var e = createPivotalFlag( id );

		c.appendChild(e);

	}

}

loadTable();
