var ResultList = {

    reset: function() {
        $('#results').html('<tr><th>Docset</th><th>Reference</th><th>Type</th></tr>');
    },

    add: function(result) {
        $('#results').append(
            '<tr><td>' + result.docset +
            '</td><td>' + result.reference +
            '</td><td>' + result.type +
            '</td><td><a href="">Show</a></td></tr>'
        );
        return $('#results tr:last-child');
    }

};

var Result = {

    reset: function() {
        $('#result').html('');
    },

    show: function(result) {
        $('#result').html(result.content);
    }

};

$(function() {
    var BASE_URL = '';
    var SUBMIT = 'input[type="submit"]';
    var REFERENCE = 'input[name="reference"]';

    ResultList.reset();
    Result.reset();

    $(SUBMIT).click(function() {
        var reference = $(REFERENCE).val();
        $.ajax({
            url: BASE_URL + '/search?reference=' + reference,
            method: 'get'
        }).done(function(results) {
            ResultList.reset();
            results.forEach(function(result) {
                var newRow = ResultList.add(result);
                newRow.find('a').click(function(e) {
                    e.preventDefault();
                    $.ajax({
                        url: BASE_URL + '/get/' + result.docset + '/' + result.type + '/' + result.reference,
                        method: 'get'
                    }).done(function(result) {
                        Result.show(result);
                    });
                });
            });
        });
    });
});

