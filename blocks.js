blocked = {
    forEach: function (array, timeout, options) {
        var time,
            i = 0;

        (function block() {
            while (true) {
                if (i === array.length) {
                    if (options.afterBlock) options.afterBlock(array[i], i);
                    if (options.after) options.after();
                    return;
                }
                if (! time) time = +new Date();
                
                options.every(array[i], i);

                i++;
                if (+new Date() - time < timeout) {
                } else {
                    if (options.afterBlock) options.afterBlock(array[i], i);
                    time = null;
                    stack = 0;
                    setTimeout(block, 1);
                    break;
                }
            }
        }());
    }
};

