var RESULTS = '#results';

var Color = {

    forType: function(type) {
        var colors = {
            C: '#0f0',
            F: '#f00',
            P: '#88f'
        };
        return colors[type] || 'white';
    }

};

var ResultList = {

    reset: function() {
        $(RESULTS).html('');
    },

    show: function(results) {
        $(RESULTS).html('<tr><th></th><th>Docset</th><th>Reference</th></tr>');
        results.forEach(function(result) {
            var type = result.type.substring(0, 1).toUpperCase();
            $(RESULTS).append(
                '<tr><td class="type" style="background-color: ' + Color.forType(type) + '">' + type +
                '</td><td>' + result.docset +
                '</td><td>' + result.reference +
                '</td><td><a href="' + result.uri + '">Show</a></td></tr>'
            );
        });
    },

};
