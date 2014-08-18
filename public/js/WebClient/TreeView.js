var TreeView = {

    reset: function() {
        jade.render($('#tree-view')[0], 'tree-view-loading');
    },

    show: function(node, current) {
        TreeView.reset();
        node.get('children', function(children) {
            node.get('root', function(root) {
                jade.render(
                    $('#tree-view')[0],
                    'tree-view',
                    { root: root, current_uri: current.uri }
                );
            });
        });
    }

};
