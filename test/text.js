var test = require('tape'),
    Enti = require('enti'),
    createFastn = require('./createFastn');

test('value text', function(t){

    t.plan(1);

    var fastn = createFastn();

    var text = fastn('text', {text: 'foo'});

    text.render();

    document.body.appendChild(text.element);

    t.equal(document.body.textContent, 'foo');

    text.element.remove();
    text.destroy();


});

test('bound text', function(t){

    t.plan(1);

    var fastn = createFastn();

    var text = fastn('text', {text: fastn.binding('value')});

    text.attach({
        value: 'foo'
    });
    text.render();

    document.body.appendChild(text.element);

    t.equal(document.body.textContent, 'foo');

    text.element.remove();
    text.destroy();


});

test('bound text changing', function(t){

    t.plan(2);

    var fastn = createFastn();

    var text = fastn('text', {text: fastn.binding('value')}),
        model = new Enti({
            value: 'foo'
        });

    text.attach(model);
    text.render();

    document.body.appendChild(text.element);

    t.equal(document.body.textContent, 'foo');

    model.set('value', 'bar');

    t.equal(document.body.textContent, 'bar');

    text.element.remove();
    text.destroy();

});

test('auto binding text', function(t){

    t.plan(2);

    var fastn = createFastn();

    var parent = fastn('span', fastn.binding('value')),
        model = new Enti({
            value: 'foo'
        });

    parent.attach(model);
    parent.render();

    document.body.appendChild(parent.element);

    t.equal(document.body.textContent, 'foo');

    model.set('value', 'bar');

    t.equal(document.body.textContent, 'bar');

    parent.element.remove();
    parent.destroy();

});