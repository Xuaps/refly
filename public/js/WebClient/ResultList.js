var ResultList = {

    reset: function() {
        $('#results').html('');
    },

    add: function(result) {
        if ($('#results').html() == '') {
            $('#results').html('<tr><th>Docset</th><th>Reference</th><th>Type</th></tr>');
        }
        $('#results').append(
            '<tr><td>' + result.docset +
            '</td><td>' + result.reference +
            '</td><td>' + result.type +
            '</td><td><a href="' + result.uri + '">Show</a></td></tr>'
        );
        return $('#results tr:last-child');
    }

};
