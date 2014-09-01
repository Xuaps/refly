var SUBMIT = '#btnsearch';
var RESULTITEM = 'a[class=resultlistitem]';
var TREEVIEWITEM = 'a[class=treeviewitem]';
var REFERENCE = '#txtreference';
var URI = '#uri';

$(function() {
	TreeView.reset();
	OutlineView.reset();
	ResultList.reset();
	MarkdownViewer.reset();
	reference = Reference();


    $(SUBMIT).click(function() {
        $.ajax({
            url: '/api/search?reference=' + $(REFERENCE).val(),
            method: 'get'
        }).done(function(results) {
            ResultList.show(results);
        });
    });

	if($(URI).val()!='undefined' && $(URI).val()!=''){
		var reference = Reference.create({ uri: $(URI).val() });
		reference.get('content', function(content) {
		    MarkdownViewer.show(content);
		});
		reference.get('root', function(root) {
		    TreeView.show(root, reference);
		});
		OutlineView.show(reference);
	}


});
