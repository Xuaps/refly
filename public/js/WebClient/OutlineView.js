var OutlineView = {

    reset: function() {
        jade.render($('#outline-view')[0], 'outline-view-loading');
    },

    show: function(reference) {
        OutlineView.reset();
        var symbols = {};
        reference.parent.objects().forEach(function(object) {
            if (!symbols[object.type]) {
                symbols[object.type] = [];
            }
            symbols[object.type].push(object);
        });
        jade.render($('#outline-view')[0], 'outline-view', { symbols: symbols, current_uri: reference.uri });
    }

};
