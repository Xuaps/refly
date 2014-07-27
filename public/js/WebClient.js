var SUBMIT = 'input[type="submit"]';
var REFERENCE = 'input[name="reference"]';
var URI = 'input[name="uri"]';

$(function() {
    TreeView.reset();
    ResultList.reset();
    MarkdownViewer.reset();

    $(SUBMIT).click(function() {
        $.ajax({
            url: '/api/search?reference=' + $(REFERENCE).val(),
            method: 'get'
        }).done(function(results) {
            ResultList.show(results);
        });
    });

    $.ajax({
        url: '/api/get/' + $(URI).val(),
        method: 'get'
    }).done(function(result) {
        MarkdownViewer.show(result);
    });
});

