var Docsets = require('../../app/docsets');

module.exports=function(url, docset){
	var docsets=new Docsets();

	docsets.add({
                    reference: 'search',
                    type: 'function',
                    docset: 'node',
                    content: 'blablabla'
                });
}