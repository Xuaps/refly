function SSLRedirect(){};

SSLRedirect.prototype.https_redirect = function(){
	return function(req, res, next) {
	    if (req.get('x-forwarded-proto') != "https") {
	        res.set('x-forwarded-proto', 'https');
	        res.redirect('https://' + req.headers.host + req.path);
	    } else {
	        return next(); 
	    }
	}
};

module.exports = SSLRedirect;

