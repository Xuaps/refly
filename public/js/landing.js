$(function() {
    var thumbsW = $('.docsets-thumbs').innerWidth();
    var containerW = 816;
    var valor = 0;
    var offset = 0;

    $('.docsets-container').mousemove(function(e)
    {
        containerW = $('.docsets-container').innerWidth();
        offset = $('.docsets-container').offset();
        valor = ((thumbsW - containerW)*(((e.pageX-offset.left) / containerW).toFixed(3))).toFixed(1);
        $('.docsets-container').scrollLeft(valor);
    });
});
