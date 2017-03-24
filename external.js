
function createPivotalFlag( id ){
	var el = document.createElement('span');
	el.setAttribute('data-rm-id', id);
	el.style.fontSize = "9px";
	el.style.padding = "3px 5px";
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

			if (response.stories.stories[0].current_state == 'finished'){
				element.style.background = "#203e64";
				element.style.color = "White";
				element.innerHTML = "Finished";
			}
			else if (response.stories.stories[0].current_state == 'delivered'){
				element.style.background = "#f39300";
				element.style.color = "White";
				element.innerHTML = "Delivered";
			}
			else if (response.stories.stories[0].current_state == 'accepted'){
				element.style.background = "#629200";
				element.style.color = "White";
				element.innerHTML = "Accepted";
			}
			else if (response.stories.stories[0].current_state == 'unscheduled'){
				element.style.background = "#e4eff7";
				element.style.color = "Gray";
				element.innerHTML = "Unscheduled";
			}
			else if (response.stories.stories[0].current_state == 'started'){
				element.style.background = "#e0e2e5";
				element.style.color = "Gray";
				element.innerHTML = "Started";
			}
			else if (response.stories.stories[0].current_state == 'unstarted'){
				element.style.background = "#e0e2e5";
				element.style.color = "Gray";
				element.innerHTML = "Unstarted";
			}
			else
				element.innerHTML = "✓";

		}
		else{
			element.innerHTML = "";
		}
	}
	else{
		element.innerHTML = "Err";
	}
	
}


function parsePage(){

	var detail = document.querySelector('div.issue');
	//check if we are in list or detail mode
	if(detail){
		// displaying detail mode
		processingDetail();
	}
	else{
		var t = document.getElementsByClassName('issue');
		//displaying list mode
		for (var i = t.length - 1; i >= 0; i--) {
			processingLine(t[i]);
		}
	}	
}

function processingDetail()
{
	var title = document.querySelector("h2");
	//console.log(title);
	var id = title.innerHTML.split("#")[1];

	var el = document.createElement('span');
	el.setAttribute('data-rm-id', id);
	el.style.fontSize = "12px";
	el.style.padding = "3px 5px";
	el.style.margin = "0px 0px 0px 10px";
	title.appendChild(el);
	callAPI(el, parseAPI);
	
}

function processingLine(l)
{
	var id = l.querySelector('.id').querySelector('a').innerHTML;
	var c = l.querySelector('.checkbox');
	var e = createPivotalFlag( id );
	c.appendChild(e);
}

parsePage();
