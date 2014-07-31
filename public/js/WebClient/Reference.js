function Reference(options) {

    if (!options.uri) {
        return null;
    }

    this.load = false;
    this.children = [];

    for (var i in options) {
        this[i] = options[i];
    }

    this.onLoadData = this.onLoadData || function() {};
    this.onLoadChildren = this.onLoadChildren || function() {};

    this.parent = new Reference({ uri: this.uri.split('/').slice(0, -1).join('/') });

    this._setChildren = function(children, callback) {
        var that = this;

        var completed = 0;
        var total = children.length;

        if (total == 0) {
            callback();
        }

        for (var i  in children) {
            (function(i) {
                that.children[i] = new Reference({ uri: children[i].uri });
                $.ajax({
                    url: '/api/children' + children[i].uri,
                    method: 'get'
                }).done(function(descendants) {
                    that.children[i]._setChildren(descendants, function() {
                        completed++;
                        if (completed == total) {
                            callback();
                        }
                    });
                });
            })(i);
        }
    },

    this.objects = function() {
        var objects = [];
        this.children.forEach(function(child) {
            child.objects().forEach(function(obj) {
                objects.push(obj);
            });
            objects.push({
                uri: child.uri,
                docset: child.docset,
                type: child.type,
                reference: child.reference
            });
        });
        return objects;
    },

    this._load = function() {
        var that = this;

        $.ajax({
            url: '/api/get' + this.uri,
            method: 'get'
        }).done(function(data) {
            that.content = data.content;
            that.onLoadData(that);

            $.ajax({
                url: '/api/children' + that.parent.uri,
                method: 'get'
            }).done(function(siblings) {
                $.ajax({
                    url: '/api/children' + that.uri,
                    method: 'get'
                }).done(function(children) {
                    that.parent.children = [];
                    if (siblings.length > 0) {
                        siblings.forEach(function(sibling) {
                            that.parent.children.push(new Reference(sibling));
                        });
                    } else {
                        that.parent.children.push(new Reference(data));
                    }
                    that.parent.children.forEach(function(node) {
                        if (node.uri == that.uri) {
                            node.children = [];
                            children.forEach(function(child) {
                                node.children.push(new Reference(child));
                            });
                        }
                    });
                    that._setChildren(children, function() { that.onLoadChildren(that) });
                });
            });
        });
    };

    if (this.load) {
        this._load();
    }

    return this;
}
