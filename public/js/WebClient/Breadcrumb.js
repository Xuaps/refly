var Breadcrumb = {

    reset: function() {
        $('#breadcrumb').css('display', 'none');
    },

    show: function(data) {
        var parts = [];
        data.forEach(function(item) {
            var cssClass = item.current ? 'current' : '';
            parts.push('<a href="' + item.uri + '" class="' + cssClass + '">' + item.text + '</a>');
        });
        $('#breadcrumb').css('display', 'block');
        $('#breadcrumb').html(
            parts.join(' &gt; ')
        );
    }

};
