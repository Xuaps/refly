var SUBMIT = 'input[type="submit"]';
var REFERENCE = 'input[name="reference"]';
var URI = 'input[name="uri"]';

$(function() {
    TreeView.reset();
    OutlineView.reset();
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

    var reference = new Reference({
        uri: $(URI).val(),
        load: true,
        onLoadData: function(reference) {
            MarkdownViewer.show(reference);
        },
        onLoadChildren: function(reference) {
            TreeView.show(reference);
            OutlineView.show(reference);
        }
    });

});

