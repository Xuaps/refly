var SUBMIT = '#btnsearch';
var RESULTITEM = 'a[class=resultlistitem]';
var TREEVIEWITEM = 'a[class=treeviewitem]';
var REFERENCE = '#txtreference';
var URI = '#uri';

$(function() {
	reference = Reference();


    $(SUBMIT).click(function() {
        $.ajax({
            url: '/api/search?reference=' + $(REFERENCE).val(),
            method: 'get'
        }).done(function(results) {
			jade.render($('#content')[0],'contentview', { uri: $(URI).val() });
			ResultList.reset();
			ResultList.show(results);
        });
    });

	if($(URI).val()!=undefined && $(URI).val()!='' && $(URI).val()!='undefined'){
		jade.render($('#content')[0],'contentview', { uri: $(URI).val() });
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
	}


});
