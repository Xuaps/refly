var TreeView = {

    reset: function() {
        $('#tree-view').html('');
    },

    init: function() {
		this.reset();
		$('#tree-view').append('<ul id="roottreeview"></ul>');
		ulist = $('#roottreeview');
		this.appendbranch(ulist,Docset.instances);
    },


	unfold: function(container,docset){
		if(container.children().length==0){
			TreeView.appendbranch(container,Docset.instances[docset].types);
		}else{
			container.toggle();
		}
		
	},

	appendbranch: function(container, collection){
		container.html('');
		$.each(collection, function(key,item){
			container.append('<li><a id="A' + jqSelector(item.uri) + '" href="/'+ item.uri +'" class="treeviewitem">' + item.reference + '</a><ul id="UL' + jqSelector(item.uri) + '"></ul></li>');
			$('#A'+jqSelector(item.uri)).click(function(e){
							e.preventDefault();
							E = e.currentTarget;
							var url = RemoveBaseUrl(e.currentTarget.href);
							var reference = Reference.create({ uri: url });
							var uri = url.replace('%20',' ').replace('/','');
							TreeView.unfold($('#UL' + jqSelector(item.uri)),uri);
							/*reference.refresh('content');
							reference.get('content', function(content) {
								MarkdownViewer.show(content);
								reference.get('root', function(root) {
									//TreeView.show(root, reference);
									//OutlineView.show(reference);
								});
							});*/
						});			
		});
	}

};
