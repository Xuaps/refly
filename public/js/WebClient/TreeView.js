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
        });
    }

};
