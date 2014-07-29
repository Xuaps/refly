function Reference(path) {

    this.path = path;

    this.load = function(callback) {
        var that = this;

        $.ajax({
            url: '/api/get/' + this.path,
            method: 'get'
        }).done(function(reference) {
            that.uri = reference.uri;
            that.content = reference.content;

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
                    that.parent = theParent;
                    callback();
                });
            });
        });
    };


    return this;
}
