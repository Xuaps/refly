var SUBMIT = '#btnsearch';
var RESULTITEM = 'a[class=resultlistitem]';
var TREEVIEWITEM = 'a[class=treeviewitem]';
var REFERENCE = '#txtreference';
var URI = '#uri';
var VIEW = 'LANDINGVIEW';
var RESULT = '';

$(function() {
	reference = Reference();


	if($(URI).val()!=undefined && $(URI).val()!='' && $(URI).val()!='undefined'){
		ContentView.show($(URI).val());
		var reference = Reference.create({ uri: $(URI).val() });
		reference.get('content', function(content) {
			MarkdownViewer.reset();
		    MarkdownViewer.show(content);
		});
		reference.get('root', function(root) {
			TreeView.reset();
		    TreeView.show(root, reference);
		});
		OutlineView.reset();
		OutlineView.show(reference);
	}else{
		ContentView.reset();
	}


});
