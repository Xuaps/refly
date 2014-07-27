var BREADCRUMB = '#breadcrumb';

var Breadcrumb = {

    reset: function() {
        $(BREADCRUMB).css('display', 'none');
    },

    show: function(data) {
        var items = [];
        data.forEach(function(item) {
            items.push('<a href="' + item.uri + '"' + (item.current ? ' class="current"' : '') + '>' + item.text + '</a>');
        });
        $(BREADCRUMB).html(items.join(' &gt; '));
        $(BREADCRUMB).css('display', 'block');
    }

};
