var Flatten = function  (arr) {
	return arr.reduce(function  (a,b) {
		if (b instanceof Array) {
			return a.concat(Flatten(b));
		}else{
			return a.concat(b);
		}
	},[]);
}


module.exports.Flatten = Flatten
