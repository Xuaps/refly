var md =  require('html-md');

var Reference = function Reference(docset,name, type, content, uri){
	this.reference = name;
	this.docset = docset;
	this.uri=uri;
	this.type=type;

	this.parent = this._resolveParentUrl(uri);	
	this.content = content===undefined?undefined:md(content);
};

Reference.prototype={
	_resolveParentUrl: function(child_url){
		var parent_url='';
		if(child_url.split('/').length>3){
			parent_url = child_url.substring(0,child_url.lastIndexOf('/'));
		}

		return parent_url;
	},

	isEqual: function(obj){

		return obj instanceof Reference
			&& obj.reference === this.reference
			&& obj.docset === this.docset
			&& obj.parent === this.parent;
	}
};

module.exports = Reference;
