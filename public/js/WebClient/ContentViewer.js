var ContentView = {

    reset: function() {
        jade.render($('#content')[0],'landingpage', { uri: '/' });
		this.bind(SUBMIT);
    },

    show: function(url) {
		if(url!=undefined && url!='' && url!='undefined'){
			url = $(URI).val();
		}else{
			url = '/';
		}
		jade.render($('#content')[0],'contentview', { uri: url });
		this.bind(SUBMIT);
    },

	bind: function(button){
		$(SUBMIT).click(function() {
		    $.ajax({
		        url: '/api/search?reference=' + $(REFERENCE).val(),
		        method: 'get'
		    }).done(function(results) {
				ContentView.show($(URI).val());
				ResultList.reset();
				ResultList.show(results);
		    });
		});
	}

};
