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

var TreeView = {

    reset: function() {
        $('#tree-view').html('<h2>Tree View</h2>');
    },

    _printItem: function(text, indent, item, current) {
        var cssClass = (current == item.uri) ? 'current' : '';
        return text + indent + ' +- <a href="' + item.uri + '" class="' + cssClass + '">' + item.name + '</a>\n';
    },

    _printNode: function(text, indent, node, current) {
        var name = node.uri.split('/').slice(-1);
        text = TreeView._printItem(text, indent, { name: name, uri: node.uri }, current);
        if (node.children) {
            node.children.forEach(function(child) {
                text = TreeView._printNode(text, indent + '    ', child, current);
            });
        }
        return text;
    },

    show: function(node, current) {
        TreeView.reset();
        var content = $('#tree-view').html() + '<pre>';
        var indent = '';
        var parents = node.uri.substring(1).split('/').slice(0, -1);
        var url = '';
        parents.forEach(function(text) {
            url += '/' + text;
            content = TreeView._printItem(content, indent, { name: text, uri: url }, current);
            indent += '    ';
        });
        content = TreeView._printNode(content, indent, node, current);
        content += '</pre>';
        $('#tree-view').html(content);
    }

};

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

var Result = {

    reset: function() {
        $('#result').html('');
    },

    show: function(reference) {
        var parents = [];
        var url = '';
        reference.uri.substring(1).split('/').forEach(function(part) {
            url += '/' + part;
            parents.push({
                uri: url,
                text: part,
                current: false
            });
        });
        parents[parents.length - 1].current = true;
        Breadcrumb.show(parents);

        var parent_uri = reference.uri.split('/').slice(0, -1).join('/');
        $.ajax({
            url: '/api/get' + parent_uri,
            method: 'get'
        }).done(function(theParent) {
            $.ajax({
                url: '/api/children' + parent_uri,
                method: 'get'
            }).done(function(siblings) {
                $.ajax({
                    url: '/api/children' + reference.uri,
                    method: 'get'
                }).done(function(children) {
                    theParent.children = siblings;
                    theParent.children.forEach(function(node) {
                        if (node.uri == reference.uri) {
                            node.children = children;
                        }
                    });
                    TreeView.show(theParent, reference.uri);
                });
            });
        });
        $('#result').html(markdown.toHTML(reference.content));
    }

};

$(function() {
    var SUBMIT = 'input[type="submit"]';
    var REFERENCE = 'input[name="reference"]';

    Breadcrumb.reset();
    TreeView.reset();
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

