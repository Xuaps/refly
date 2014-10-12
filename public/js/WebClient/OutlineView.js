var OutlineView = {

    reset: function() {
        jade.render($('#outline-view')[0], 'outline-view-loading');
    },


    show: function(reference) {
        OutlineView.reset();
        var symbols = {};
		reference.get('parent', function(parent) {
			parent.get_children(function(children){
				children[parent.uri]=Reference.create(
				{uri: parent.uri, reference: parent.reference, type:parent.type});
				$.each(children, function(key,item){
		            if (!symbols[item.type]) {
		                symbols[item.type] = [];
		            }
					symbols[item.type].push(item);
				});
				jade.render($('#outline-view')[0],'outline-view',
				{ symbols: symbols, current_uri: reference.uri });
				$('#outline-view > div').accordion();
				OutlineView.initevents(children);
			});
		});
    },

	initevents: function(children){
				$.each(children, function(key,item){
					$('#OLA'+jqSelector(item.uri)).click(function(e){
						e.preventDefault();
						var reference = Reference.create({ uri: item.uri });
						reference.refresh('content');
						reference.get('content', function(content) {
							MarkdownViewer.show(content);
							$(document).trigger("LocationChange",[item.uri, item.reference]);
							OutlineView.reset();
							OutlineView.show(item);
						});

					});
				});
	}
>>>>>>> integrating_framework

};
