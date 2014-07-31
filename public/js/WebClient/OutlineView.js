var OutlineView = {

    reset: function() {
        $('#outline-view').html('<h2>Outline View</h2><pre>Loading...</pre>');
    },

    show: function(reference) {
        OutlineView.reset();
        var content = '';
        var symbols = {};
        reference.parent.objects().forEach(function(object) {
            if (!symbols[object.type]) {
                symbols[object.type] = [];
            }
            symbols[object.type].push(object);
        });
        for (var i in symbols) {
            content += '<h3> ' + i + '</h3>';
            symbols[i].forEach(function(object) {
                var cssClass = (reference.uri == object.uri) ? 'current' : '';
                content += ' * <a href="' + object.uri + '" class="' + cssClass + '">' + object.reference + '</a>\n';
            });
        }
        $('#outline-view pre').html(content);
    }

};
