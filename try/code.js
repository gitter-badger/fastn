var fastn = require('./fastn'),
    cpjax = require('cpjax'),
    defaultCode,
    hash = window.location.hash,
    codeModel = {
        code: ''
    },
    result = fastn.binding('result').attach(codeModel),
    errors = fastn.binding('errors').attach(codeModel),
    code = fastn.binding('code').attach(codeModel)
    .on('change', function(code){
        try{
            var resultComponent = new Function('fastn', code)(fastn);
            result(resultComponent);
            errors(null);
        }catch(error){
            errors(error);
        }

        var stringifiedCode = JSON.stringify(code);

        localStorage.setItem('fastnTryCode', stringifiedCode);
        window.location.hash = '#' + btoa(stringifiedCode);
    });

var storedCode;

function loadFromHash(){
    try{
        var hashSource = JSON.parse(atob(window.location.hash.slice(1)));
        if(hashSource !== code()){
            code(hashSource);
        }
    }catch(e){}
}

window.addEventListener('hashchange', loadFromHash);
loadFromHash();

try{
    storedCode = JSON.parse(localStorage.getItem('fastnTryCode'));
}catch(e){}

code(storedCode || '');

cpjax('./demo.js', function(error, data){
    if(error){
        errors(error);
        return;
    }
    if(!storedCode){
        code(data);
    }
    defaultCode = data;
});

module.exports = {
    codeModel: codeModel,
    code: code,
    result: result,
    errors: errors,
    reset: function(){
        code(defaultCode);
    }
};