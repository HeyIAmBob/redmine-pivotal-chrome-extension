function PivotalTracker(token) {
    this.token = token;
}

PivotalTracker.prototype.searchStory= function( project_id, search ) {
    return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if (request.status == 200) {
                    resolve(request.response);
                }
                else {
                    reject(Error(request.statusText));
                }
            };
            request.onerror = function() {
                reject(Error("Something went wrong ... "));
            };
            request.open("GET","https://www.pivotaltracker.com/services/v5/projects/" + project_id + "/search?query=" + search + "+AND+includedone%3Atrue", true);
			request.setRequestHeader("X-TrackerToken", this.token);
            request.send();
        });
    }
};
