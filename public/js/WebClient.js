var SUBMIT = 'input[type="submit"]';
var REFERENCE = 'input[name="reference"]';
var URI = 'input[name="uri"]';

$(function() {
    Breadcrumb.reset();
    TreeView.reset();
    ResultList.reset();
    MarkdownViewer.reset();

    $(SUBMIT).click(function() {
        $.ajax({
            url: '/api/search?reference=' + $(REFERENCE).val(),
            method: 'get'
        }).done(function(results) {
            ResultList.reset();
            results.forEach(function(result) {
                ResultList.add(result);
            });
        });
    });

    $.ajax({
        url: '/api/get/' + $(URI).val(),
        method: 'get'
    }).done(function(result) {
        MarkdownViewer.show(result);
    });
});

