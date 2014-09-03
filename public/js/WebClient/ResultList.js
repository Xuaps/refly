var ResultList = {

    reset: function() {
        $('#results').html('');
    },

    show: function(results) {
        jade.render($('#results')[0], 'search-results', { results: results });
// EVENTS FROM #Resultlist
		$(RESULTITEM).click(function(e){
			e.preventDefault();
			var url = RemoveBaseUrl(e.currentTarget.href);
			var reference = Reference.create({ uri: url });
			reference.refresh('content');
			reference.get('content', function(content) {
				MarkdownViewer.show(content);
				reference.get('root', function(root) {
					TreeView.show(root, reference);
					OutlineView.show(reference);
				});
			});
		});

    },
};
