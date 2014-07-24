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
            '</td><td><a href="/' + result.docset + '/' + result.type + '/'
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
        $('#breadcrumb').html(
            '<a href="">' + result.docset + '</a> &gt; '
            + '<a href="">' + result.type + '</a> &gt; '
            + '<a href="">' + result.reference + '</a>'
        );
        $('#result').html(markdown.toHTML(result.content));
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
            url: '/api/search?reference=' + reference,
            method: 'get'
        }).done(function(results) {
            ResultList.reset();
            results.forEach(function(result) {
                ResultList.add(result);
            });
        });
    });

    var uri = $('input[name="uri"]').val();
    if (uri != 'undefined') {
        $.ajax({
            url: '/api/get/' + uri,
            method: 'get'
        }).done(function(result) {
            Result.show(result);
        });
    }
});

