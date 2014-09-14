var ResultList = {

    reset: function() {
        $('#results').html('');

    },

    show: function(results) {
        jade.render($('#results')[0], 'search-results', { results: results });
// EVENTS FROM #Resultlist
		$(RESULTITEM).click(function(e){
			e.preventDefault();
			E = e.currentTarget;
			var url = RemoveBaseUrl(e.currentTarget.href);
			var reference = Reference.create({ uri: url });
			$(document).trigger("LocationChange",[url, e.currentTarget.text]);
			reference.refresh('content');
			reference.get('content', function(content) {
				MarkdownViewer.show(content);
				reference.get('root', function(root) {
					//TreeView.show(root, reference);
					//OutlineView.show(reference);
				});
			});
		});

    },
	noresult: function(){
		$('#results').html('Results not found!');

	}
};
