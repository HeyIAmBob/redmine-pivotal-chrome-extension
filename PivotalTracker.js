PivotalTracker = function(token) {
    this.token = token;
}

PivotalTracker.prototype.searchStory= function( project_id, search ) {
    var apiToken = this.token;
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState==4){
                if (request.status == 200) {
                    var fetchResult = JSON.parse(request.response);
                    resolve(fetchResult);
                }
                else {
                    alert(request.status);
                    reject(Error(request.statusText));
                }
            }
        };
        request.onerror = function() {
            reject(Error("Something went wrong ... "));
        };
        request.open("GET","https://www.pivotaltracker.com/services/v5/projects/" + project_id + "/search?query=" + search + "+AND+includedone%3Atrue", true);
        request.setRequestHeader("X-TrackerToken", apiToken);
        request.send();
    });
    
};