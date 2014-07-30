function Reference(path) {

    this.uri = path;

    this.parent = { uri: this.uri.split('/').slice(0, -1).join('/') };

    this.load = function(callback) {
        var that = this;

        $.ajax({
            url: '/api/get' + this.uri,
            method: 'get'
        }).done(function(data) {
            that.content = data.content;

            $.ajax({
                url: '/api/children' + that.parent.uri,
                method: 'get'
            }).done(function(siblings) {
                $.ajax({
                    url: '/api/children' + that.uri,
                    method: 'get'
                }).done(function(children) {
                    that.parent.children = (siblings.length > 0) ? siblings : [ data ];
                    that.parent.children.forEach(function(node) {
                        if (node.uri == that.uri) {
                            node.children = children;
                        }
                    });
                    callback();
                });
            });
        });
    };


    return this;
}
