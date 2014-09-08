var HistoryControl = {

    Push: function(url, title) {
		History.pushState(Math.random(), title, url);
    },

    Change: function() {

    },
};
