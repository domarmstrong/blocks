blocks
======

Break down large blocking loops into smaller chunks that block for a set amount of time

The reason this was created was due to some large tables being rendered that where blocking the UI.
Blocks allows you to specify an amount of time that you are comfortable blocking for before handing back
to the event loop to allow other processes to run.

``` javascript
// Create a large array of numbers
var data = new Array(50000).fill(0).map((n, i) => i);

var container = document.getElementById("container");
var fragment = document.createDocumentFragment();

// Start a console timer
console.time('total');

blocks.forEach(data, 50, function each(item, i) {
    // Do some slow blocking thing for each item like creating lots of DOM
    var div = document.createElement('div');
    div.className = 'block';
    div.textContent = item;
    fragment.appendChild(div);
}, function onBlock(item, i) {
    // Once the timeout is reached, onBlock is run before handing back to the event loop
    // item, i, will be the same values as passed into the last iteration of each
    container.appendChild(fragment);
}).then(function () {
    // Once all iterations have finished the promise is resolved
    console.timeEnd('total');
});
```
