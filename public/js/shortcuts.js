/* Ejemplos de uso
    Mousetrap.bind('esc', function() { console.log('escape'); }, 'keyup');
    Mousetrap.bind(['command+k', 'ctrl+k'], function() {
        console.log('command k or control k');
        return false;
    });

    Mousetrap.bind('command+f', function(e) {
        document.getElementById("txtreference").focus();
        document.getElementById("txtreference").select();
        return false;
    }); 
*/

    Mousetrap.bind('?', function(e) {
        window.location.href = "/help.html";
        return false;
    }); 
    Mousetrap.bind('up', function(e) {
        console.log('up');
        return false;
    }); 
    Mousetrap.bind('down', function(e) {
//        $('.docset-icon').toggleClass('focus');
        return false;
    }); 
    Mousetrap.bind('right', function(e) {
        console.log('right');
        return false;
    }); 
    Mousetrap.bind('left', function(e) {
        console.log('left');
        return false;
    }); 
    Mousetrap.bind('ctrl+up', function(e) {
        $(".result").scrollTop(0);
        console.log('ctrl+up');
        return false;
    }); 
    Mousetrap.bind('ctrl+down', function(e) {
        $(".result").scrollTop($(".result")[0].scrollHeight);
        console.log('ctrl+down');
        return false;
    }); 
    Mousetrap.bind('ctrl+right', function(e) {
        window.history.forward();
        console.log('ctrl+right');
        return false;
    }); 
    Mousetrap.bind('ctrl+left', function(e) {
        window.history.back();
        console.log('ctrl+left');
        return false;
    }); 
    Mousetrap.bind('alt+up', function(e) {
        $('.result').scrollTop($('.result').scrollTop() - 20);
        console.log('alt+up');
        return false;
    }); 
    Mousetrap.bind('alt+down', function(e) {
        $('.result').scrollTop($('.result').scrollTop() + 20);
        console.log('alt+down');
        return false;
    }); 
    Mousetrap.bind('alt+right', function(e) {
        $(".result").scrollTop($('.result').scrollTop() + $(".result")[0].offsetHeight);
        console.log('alt+right');
        return false;
    }); 
    Mousetrap.bind('alt+left', function(e) {
        $(".result").scrollTop($('.result').scrollTop() - $(".result")[0].offsetHeight);
        console.log('alt+left');
        return false;
    }); 
    Mousetrap.bind('shift+right', function(e) {
        step = $(".menu li a:focus").parent('.menu li').index() + 1;
        $(".menu li").eq(step % $(".menu li").length).find('a').focus();
        return false;
    }); 
    Mousetrap.bind('shift+left', function(e) {
        step = $(".menu li a:focus").parent('.menu li').index() - 1;
        $(".menu li").eq(step % $(".menu li").length).find('a').focus();
        return false;
    }); 
    Mousetrap.bind('enter', function(e) {
        console.log('enter');
    }); 
    Mousetrap.bind('alt+enter', function(e) {
        UE.Popin.show();
        return false;
    }); 
    Mousetrap.bind('ctrl+enter', function(e) {
        console.log('ctrl+enter');
        return false;
    }); 
    Mousetrap.bind('escape', function(e) {
        console.log('escape');
        return false;
    }); 
    Mousetrap.bind('tab', function(e) {
        return false;
    }); 
    Mousetrap.bind('shift+tab', function(e) {
        console.log('shift+tab');
        return false;
    }); 
    Mousetrap.bind('space', function(e) {
        console.log('space');
        return false;
    }); 
    Mousetrap.bind('ctrl+space', function(e) {
        console.log('ctrl+space');
        return false;
    }); 
    Mousetrap.bind('pageup', function(e) {
        console.log('pageup');
        return false;
    }); 
    Mousetrap.bind('pagedown', function(e) {
        console.log('pagedown');
        return false;
    }); 
    Mousetrap.bind('home', function(e) {
        console.log('home');
        return false;
    }); 
    Mousetrap.bind('end', function(e) {
        console.log('end');
        return false;
    }); 
