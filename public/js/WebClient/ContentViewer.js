var ContentView = {

    reset: function() {
		var _reference = $(REFERENCE).val();
	    jade.render($('#content')[0],'landingpage', { uri: '/' });
		$(REFERENCE).focus();
		$(REFERENCE).val(_reference);
		VIEW = 'LANDINGVIEW';
		this.bind();
    },

    show: function(url) {
		if(url!=undefined && url!='' && url!='undefined'){
			url = $(URI).val();
		}else{
			url = '/';
		}
		var _reference = $(REFERENCE).val();
		jade.render($('#content')[0],'contentview', { uri: url });
		$(REFERENCE).focus();
		$(REFERENCE).val(_reference);
		VIEW = 'CONTENTVIEW';
		this.bind();
    },

	bind: function(){
		LiveSearch.bind(REFERENCE);
		$(SUBMIT).click(function() {
		    $.ajax({
		        url: '/api/search?reference=' + $(REFERENCE).val(),
		        method: 'get'
		    }).done(function(results) {
				ContentView.show($(URI).val());
				LiveSearch.bind();
				ResultList.reset();
				ResultList.show(results);
		    });
		});
	}

};
