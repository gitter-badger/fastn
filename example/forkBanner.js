var fastn = require('./fastn');

module.exports = function(){    
    return fastn('div', {class: 'github-fork-ribbon-wrapper right'},
        fastn('div', {class: 'github-fork-ribbon'},
            fastn('a', {href: 'https://github.com/korynunn/fastn'}, 'Fork me')
        )
    );
};