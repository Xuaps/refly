var RESULTS = '#results';

var ResultList = {

    reset: function() {
        $(RESULTS).html('');
    },

    show: function(results) {
        $(RESULTS).html('<tr><th>Docset</th><th>Reference</th><th>Type</th></tr>');
        results.forEach(function(result) {
            $(RESULTS).append(
                '<tr><td>' + result.docset +
                '</td><td>' + result.reference +
                '</td><td>' + result.type +
                '</td><td><a href="' + result.uri + '">Show</a></td></tr>'
            );
        });
    },

};
