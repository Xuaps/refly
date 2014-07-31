var TreeView = {

    reset: function() {
        jade.render($('#tree-view')[0], 'tree-view-loading');
    },

    show: function(reference) {
        TreeView._show(reference.parent, reference.uri);
    },

    _show: function(node, current) {
        TreeView.reset();
        jade.render($('#tree-view')[0], 'tree-view', { root: node.root(), current_uri: current });
    }

};
