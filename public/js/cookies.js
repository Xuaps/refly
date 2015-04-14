if (!localStorage.controlcookie){
        document.getElementById('cookie1').style.bottom = '0px';
}
function controlcookies() {
    localStorage.controlcookie = (localStorage.controlcookie || 0);
    localStorage.controlcookie++;
    cookie1.style.display='none';
}
