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


	toggle: function(container, collection){
		if(container.children().length==0){
			TreeView.appendbranch(container, collection);
		}else{
			container.toggle();
		}
	},

	appendbranch: function(container, collection){
		container.html('');
		$.each(collection, function(key,item){
			container.append('<li><a id="A' + jqSelector(item.uri) + '" href="' + item.uri +'" class="treeviewitem">' + item.reference + '</a><ul id="UL' + jqSelector(item.uri) + '"></ul></li>');
			$('#A'+jqSelector(item.uri)).click(function(e){
							e.preventDefault();
							var url = RemoveBaseUrl(e.currentTarget.href);
							var id = url.replace('%20',' ').replace('/','');
							
							if(item.schema=='docset'){
								TreeView.toggle($('#UL' + jqSelector(item.uri)),item.children);
							}else if(item.schema=='type'){
								E = item;
								arrurl = url.split(':');
								strdocset = arrurl[0].substr(1);
								strtype = arrurl[1];
								item.fill(strdocset,strtype,function(){
									TreeView.toggle($('#UL' + jqSelector(item.uri)),item.children);
								});								
							}else if(item.schema=='reference'){
								var reference = Reference.create({ uri: item.uri });
								reference.refresh('content');
								reference.get('content', function(content) {
									MarkdownViewer.show(content);
								});
								item.get_children(function(){
									TreeView.toggle($('#UL' + jqSelector(item.uri)),item.children);
								});

							}							
						});
		});
	}

};
