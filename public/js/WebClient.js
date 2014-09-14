var SUBMIT = '#btnsearch';
var RESULTITEM = 'a[class=resultlistitem]';
var TREEVIEWITEM = 'a[class=treeviewitem]';
var REFERENCE = '#txtreference';
var URI = '#uri';
var VIEW = 'LANDINGVIEW';
var RESULT = '';
var E;

$(function() {
	reference = Reference();
	docset = Docset();
	Docset.init();
	var q = GetQueryParam('q');

	$(document).on("LocationChange", function(e, url, text){
		if(url==text){
			HistoryControl.Push('/?q=' + url, 'Searching "' + text + '"');
		}else{
			HistoryControl.Push( url, text);
		}

	});


	if($(URI).val()!=undefined && $(URI).val()!='' && $(URI).val()!='undefined'){
		ContentView.show($(URI).val());
		var reference = Reference.create({ uri: $(URI).val() });
		reference.get('content', function(content) {
			MarkdownViewer.reset();
		    MarkdownViewer.show(content);
		});
		
		OutlineView.reset();
		OutlineView.show(reference);
	}else{
		ContentView.reset();
	}

	// If detects the param 'q' automatic search is triggered (to put it in an object)
	
	if(q!=undefined){
		$(REFERENCE).val(q);
		LiveSearch.search();
	}

});
