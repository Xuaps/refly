var MarkdownViewer = {

    reset: function() {
        $('#result').html('');
    },

    show: function(reference) {
        if (!reference.uri) {
            return;
        }
        var parent_uri = reference.uri.split('/').slice(0, -1).join('/');
        var theParent = { uri: parent_uri };
        $.ajax({
            url: '/api/children' + parent_uri,
            method: 'get'
        }).done(function(siblings) {
            $.ajax({
                url: '/api/children' + reference.uri,
                method: 'get'
            }).done(function(children) {
                if (siblings.length > 0) {
                    theParent.children = siblings;
                } else {
                    theParent.children = [ reference ];
                }
                theParent.children.forEach(function(node) {
                    if (node.uri == reference.uri) {
                        node.children = children;
                    }
                });
                TreeView.show(theParent, reference.uri);
            });
        });
        $('#result').html(markdown.toHTML(reference.content));
    }

};
