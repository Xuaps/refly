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

var Breadcrumb = {

    reset: function() {
        $('#breadcrumb').css('display', 'none');
    },

    show: function(data) {
        var parts = [];
        data.forEach(function(item) {
            parts.push('<a href="' + item.url + '">' + item.text + '</a>');
        });
        $('#breadcrumb').css('display', 'block');
        $('#breadcrumb').html(
            parts.join(' &gt; ')
        );
    }

};

var Result = {

    reset: function() {
        $('#result').html('');
    },

    show: function(result) {
        var parts = [];
        var url = '';
        result.uri.split('/').forEach(function(part) {
            url += '/' + part;
            parts.push({
                url: url,
                text: part
            });
        });
        Breadcrumb.show(parts);
        $('#result').html(markdown.toHTML(result.content));
    }

};

$(function() {
    var SUBMIT = 'input[type="submit"]';
    var REFERENCE = 'input[name="reference"]';

    Breadcrumb.reset();
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

