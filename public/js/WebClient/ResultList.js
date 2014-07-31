var ResultList = {

    reset: function() {
        $('#results').html('');
    },

    show: function(results) {
        jade.render($('#results')[0], 'search-results', { results: results });
    }

};
