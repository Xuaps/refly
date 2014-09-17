var TreeView = {

    reset: function() {
        $('#tree-view').html('');
    },

	show: function(){
		$('#tree-view').append('<ul id="roottreeview"></ul>');
		ulist = $('#roottreeview');
		this.appendbranch(ulist,Docset.instances);
	},


	toggle: function(container, collection){
		if(container.children().length==0){
			TreeView.appendbranch(container, collection);
		}else{
			container.toggle();
		}
	},

	markselected: function(item){
		$(".treeviewitem").toggleClass( "current", false);
		$("#A" + jqSelector(item.uri)).toggleClass( "current",true);

	},

	appendbranch: function(container, collection){
		container.html('');
		jade.render(container[0], 'tree-view', { collection: collection });
		$.each(collection, function(key,item){
			$('#A'+jqSelector(item.uri)).click(function(e){
				e.preventDefault();
				var url = RemoveBaseUrl(e.currentTarget.href);
				var id = url.replace('%20',' ').replace('/','');
				if(item.children.length>0){
					TreeView.toggle($('#UL' + jqSelector(item.uri)),item.children);
				}else{
					TreeView.markselected(item);
					var reference = Reference.create({ uri: item.uri });
					reference.refresh('content');
					reference.get('content', function(content) {
						MarkdownViewer.show(content);
						$(document).trigger("LocationChange",[item.uri, item.reference]);
					});
				}
						});
		});
	}

};
