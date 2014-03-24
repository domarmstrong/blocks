blocks
======

Break down large blocking loops into smaller chunks for responsivness

``` javascript
// Create a large array of numbers
var data =[];
for (var number = 0; number < 50000; number++) {
    data.push(number);
}

var container = document.getElementById("container");
var fragment = document.createDocumentFragment();

// Start a console timer
console.time('total');

blocks.forEach(data, {
    block: 50, // How long am i allowed to block for in ms.
    
    each: function (item, i) { // Run blocking code for each iteration of the loop until 
        var div = document.createElement('div');
        div.className = 'block';
        div.textContent = item;
        fragment.appendChild(div);
    },
    
    afterBlock: function (item, i) { // After 50 ms has passed run this function
        // item, i, will be the same values as passed into the last iteration of each
        console.log('block', i);
        container.appendChild(fragment);
    },
    
    after: function () { // Once the loop has finished run this
        console.timeEnd('total');
    }
});
```
