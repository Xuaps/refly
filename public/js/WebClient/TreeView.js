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
		$.each(collection, function(key,item){
			E = item;
			container.append('<li><img src="/img/type-' + item.type + '.png" title="' + item.type + '" class="ry-type-source" /><a id="A' + jqSelector(item.uri) + '" href="' + ((item.uri[0] == '/') ? item.uri : '/' + item.uri) +'" class="treeviewitem">' + ((item.reference != '') ? item.reference : '(Titulo Vacio') + '</a><ul id="UL' + jqSelector(item.uri) + '"></ul></li>');
			$('#A'+jqSelector(item.uri)).click(function(e){
							e.preventDefault();
							var url = RemoveBaseUrl(e.currentTarget.href);
							var id = url.replace('%20',' ').replace('/','');
							
							if(item.schema=='docset'){
								TreeView.toggle($('#UL' + jqSelector(item.uri)),item.children);
							}else if(item.schema=='type'){
								arrurl = url.split(':');
								strdocset = arrurl[0].substr(1);
								strtype = arrurl[1];
								item.fill(strdocset,strtype,function(){
									TreeView.toggle($('#UL' + jqSelector(item.uri)),item.children);
								});								
							}else if(item.schema=='reference'){
								TreeView.markselected(item);
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
