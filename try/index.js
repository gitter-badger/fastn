var fastn = require('./fastn');

var app = fastn('div',
    require('./header')(),
    require('./codeView')(),
    require('./outputView')(),
    require('./forkBanner')()
);

window.onload = function(){

    app.render();

    document.body.appendChild(app.element);
};