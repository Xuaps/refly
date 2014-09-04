var LiveSearch = {


	reset: function(){



	},




	bind: function(FIELD){
		$(FIELD).keyup(function() {
			if($(FIELD).val()!=''){
				LiveSearch.validate(FIELD,false);
				$.ajax({
				    url: '/api/search?reference=' + $(REFERENCE).val(),
				    method: 'get'
				}).done(function(results) {
					if(VIEW == 'LANDINGVIEW'){
						ContentView.show($(URI).val());
					}
					if(results.length==0){
						LiveSearch.validate(FIELD,true);
					}
					//ResultList.reset();
					ResultList.show(results);
				});
			}else{
				this.reset();
			}
		});
	},


	validate: function(FIELD,addOrRemove){
		$(FIELD).toggleClass( 'noresult', addOrRemove );
	}

};
