var OutlineView = {

    reset: function() {
        jade.render($('#outline-view')[0], 'outline-view-loading');
    },

    show: function(reference) {
        OutlineView.reset();
        var symbols = {};
		reference.get('parent', function(parent) {
			parent.get_children(function(children){
				children.each(function(item){
		            if (!symbols[item.type]) {
		                symbols[item.type] = [];
		            }
					symbols.push(item);
				});
				jade.render($('#outline-view')[0],'outline-view',{ symbols: symbols, current_uri: reference.uri });
				$('#outline-view > div').accordion();
			});
		});
        //reference.get('root', function(root) {
            /*root.get('objects').each(function(object) {
                if (!symbols[object.type]) {
                    symbols[object.type] = [];
                }
                symbols[object.type].push(object);
                jade.render(
                    $('#outline-view')[0],
                    'outline-view',
                    { symbols: symbols, current_uri: reference.uri }
                );
                $('#outline-view > div').accordion();
            });*/
        //});
    }

};
