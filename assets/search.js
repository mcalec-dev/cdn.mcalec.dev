var form = document.createElement('form');
var input = document.createElement('input');

input.name = 'filter';
input.id = 'search';
input.placeholder = 'Type here to search this directory';

form.appendChild(input);

document.querySelector('h1').after(form);

var listItems = [].slice.call(document.querySelectorAll('#list tbody tr'));

input.addEventListener('keyup', function () {
    var i,
    e = "(^|.*[^\\pL])" + this.value.trim().split(/\s+/).join("([^\\pL]|[^\\pL].*[^\\pL])") + ".*$",
    n = RegExp(e, "i");
    listItems.forEach(function(item) {
        item.removeAttribute('hidden');
    });
    listItems.filter(function(item) {
        i = item.querySelector('td').textContent.replace(/\s+/g, " ");
        return !n.test(i);
    }).forEach(function(item) {
  	    item.hidden = true;
    });
});
