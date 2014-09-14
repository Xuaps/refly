var LiveSearch = {


	reset: function(){
	},




	bind: function(FIELD){
		$(FIELD).keyup(function() {
			if($(FIELD).val()!=''){
				LiveSearch.validate(FIELD,false);
				LiveSearch.search();
				TreeView.reset();
			}else{
				TreeView.show();
				ResultList.reset();
				LiveSearch.validate(FIELD,false);
			}
		});
	},


	validate: function(field,addOrRemove){
		$(field).toggleClass( 'noresult', addOrRemove );
	},

	search: function(){
		$.ajax({
		    url: '/api/search?reference=' + $(REFERENCE).val(),
		    method: 'get'
		}).done(function(results) {
			if(VIEW == 'LANDINGVIEW'){
				ContentView.show($(URI).val());
			}
			if(results.length==0){
				LiveSearch.reset();
				ResultList.noresult();
				LiveSearch.validate(REFERENCE,true);
			}else{
				$(document).trigger("LocationChange",[$(REFERENCE).val(), $(REFERENCE).val()]);
				ResultList.reset();
				ResultList.show(results);

			}
		});


	}

};
