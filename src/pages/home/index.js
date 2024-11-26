let list = require('./scenelist.json').list;


window.onload = function () {
    console.log('================');
    console.log('=              =');
    console.log('================');
    list.forEach(getElement);
};

function getElement(str) {
    let template = `<a href="/scene.html?${str}">${str}</a><br>`;
    document.body.innerHTML += template;
}