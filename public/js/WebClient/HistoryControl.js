var HistoryControl = {

    Push: function(url, text) {
		History.pushState(Math.random(), text, url);
    }

};
