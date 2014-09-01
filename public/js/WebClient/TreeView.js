var TreeView = {

    reset: function() {
        jade.render($('#tree-view')[0], 'tree-view-loading');
    },

    show: function(node, current) {
        TreeView.reset();
        node.get('objects').each(function(children) {
            jade.render(
                $('#tree-view')[0],
                'tree-view',
                { root: node, current_uri: current.uri }
            );
			$(TREEVIEWITEM).click(function(e){
				e.preventDefault();
				var url = RemoveBaseUrl(e.currentTarget.href);
				var reference = Reference.create({ uri: url });
				reference.refresh('content');
				reference.get('content', function(content) {
					MarkdownViewer.show(content);
					reference.get('root', function(root) {
						TreeView.show(root, reference);
					});
				});
			});
        });
    }

};
