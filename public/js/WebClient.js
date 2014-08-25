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

    var reference = Reference.create({ uri: $(URI).val() });
    reference.get('content', function(content) {
        MarkdownViewer.show(content);
    });
    reference.get('root', function(root) {
        TreeView.show(root, reference);
    });
    OutlineView.show(reference);

});

