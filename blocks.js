var blocks = {
    /**
     * arguments
     * ---------
     * array: data to iterate
     * options: object
     *   block: milliseconds to block for. Required
     *   each: function to run for each array item. arguments (object, i). Required
     *   afterBlock: function to run after every block of `timeout` arguments (object, i)
     *   after: function, callback to run when done
     */
    forEach: function (array, options) {
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

