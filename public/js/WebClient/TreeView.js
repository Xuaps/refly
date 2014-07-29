var TreeView = {

    reset: function() {
        $('#tree-view').html('<h2>Tree View</h2>');
    },

    _isFirstLevel: function(indent) {
        return indent == '';
    },

    _printItem: function(text, indent, item, current) {
        var cssClass = (current == item.uri) ? 'current' : '';
        if (TreeView._isFirstLevel(indent)) {
            return text + indent + ' +- ' + item.name + '\n';
        }
        return text + indent + ' +- <a href="' + item.uri + '" class="' + cssClass + '">' + item.name + '</a>\n';
    },

    _printNode: function(text, indent, node, current) {
        var name = node.uri.split('/').slice(-1)[0].replace(/%20/g, ' ');
        text = TreeView._printItem(text, indent, { name: name, uri: node.uri }, current);
        if (node.children) {
            node.children.forEach(function(child) {
                text = TreeView._printNode(text, indent + '    ', child, current);
            });
        }
        return text;
    },

    show: function(reference) {
        TreeView._show(reference.parent, reference.uri);
    },

    _show: function(node, current) {
        TreeView.reset();
        var content = $('#tree-view').html() + '<pre>';
        var indent = '';
        var parents = node.uri.substring(1).split('/').slice(0, -1);
        var url = '';
        parents.forEach(function(text) {
            url += '/' + text;
            content = TreeView._printItem(content, indent, { name: text.replace(/%20/g, ' '), uri: url }, current);
            indent += '    ';
        });
        content = TreeView._printNode(content, indent, node, current);
        content += '</pre>';
        $('#tree-view').html(content);
    }

};
