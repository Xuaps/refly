
var valor = 0;

function scrollPosition(destino) {
    valor = destino;
    $('.docsets-container').scrollLeft(valor);
}

$(function() {
    var thumbsW = 0;
    var containerW = 816;
    var offset = 0;

    $('.docsets-container').mousemove(function(e)
    {
        thumbsW = $('.docsets-thumbs').innerWidth();
        containerW = $('.docsets-container').innerWidth();
        offset = $('.docsets-container').offset();
        destino = ((thumbsW - containerW)*(((e.pageX-offset.left) / containerW).toFixed(3))).toFixed(1);
        setInterval(scrollPosition(destino), 500);
    });
});
