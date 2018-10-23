var width = window.screen.width;
var fixedW = 375;
var scale = width / fixedW;
var meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=' + fixedW + ',user-scalable=no,initial-scale=' + scale + ',minimum-scale=' + scale);
    document.head.appendChild(meta);
    

