RemoveBaseUrl = function(url) {
	/*
	 * Replace base URL in given string, if it exists, and return the result.
	 *
	 * e.g. "http://localhost:8000/api/v1/blah/" becomes "/api/v1/blah/"
	 *      "/api/v1/blah/" stays "/api/v1/blah/"
	 */
	var baseUrlPattern = /^https?:\/\/[a-z\:0-9.]+/;
	var result = "";
 
	var match = baseUrlPattern.exec(url);
	if (match != null) {
	    result = match[0];
	}
 
	if (result.length > 0) {
	    url = url.replace(result, "");
	}
 
	return url;
}

GetQueryParam = function(param){
	var vars = [], hash;
    var q = document.URL.split('?')[1];
    if(q != undefined){
        q = q.split('&');
        for(var i = 0; i < q.length; i++){
            hash = q[i].split('=');
            vars[hash[0]] = hash[1];
        }
		return vars[param];
	}

}

function jqSelector(str)

{

	return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[ \]\(\)/ /=>\|])/g, '-').replace(/\r?\n/g, "_");;

}
