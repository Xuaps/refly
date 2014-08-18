var MarkdownViewer = {

    reset: function() {
        $('#result').html('');
    },

    show: function(content) {
        if (!content) { return; }
        $('#result').html(markdown.toHTML(content));
    }

};
