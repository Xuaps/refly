var MarkdownViewer = {

    reset: function() {
        $('#result').html('');
    },

    show: function(reference) {
        if (!reference.uri) {
            return;
        }
        $('#result').html(markdown.toHTML(reference.content));
    }

};
