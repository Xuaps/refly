var ResultList = {

    reset: function() {
        $('#results').html('<tr><th>Docset</th><th>Reference</th><th>Type</th></tr>');
    },

    add: function(result) {
        $('#results').append(
            '<tr><td>' + result.docset +
            '</td><td>' + result.reference +
            '</td><td>' + result.type +
            '</td><td><a href="/show/' + result.docset + '/' + result.type + '/'
                + result.reference + '">Show</a></td></tr>'
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
    var SUBMIT = 'input[type="submit"]';
    var REFERENCE = 'input[name="reference"]';

    ResultList.reset();
    Result.reset();

    $(SUBMIT).click(function() {
        var reference = $(REFERENCE).val();
        $.ajax({
            url: '/search?reference=' + reference,
            method: 'get'
        }).done(function(results) {
            ResultList.reset();
            results.forEach(function(result) {
                ResultList.add(result);
            });
        });
    });

    var docset = $('input[name="docset"]').val();
    var type = $('input[name="type"]').val();
    var reference = $('input[name="ref"]').val();
    if (docset != 'undefined') {
        $.ajax({
            url: '/get/' + docset + '/' + type + '/' + reference,
            method: 'get'
        }).done(function(result) {
            Result.show(result);
        });
    }
});

