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
            i = 0,
            timeout = options.block,
            each = options.each,
            afterBlock = options.afterBlock,
            after = options.after;

        if (! timeout || !each) throw new Error('timout and each are required options');

        (function block() {
            while (true) {
                if (i === array.length) {
                    if (afterBlock) afterBlock(array[i], i);
                    if (after) after();
                    return;
                }
                if (! time) time = +new Date();

                each(array[i], i);

                i++;
                if (+new Date() - time < timeout) {
                } else {
                    if (afterBlock) afterBlock(array[i], i);
                    time = null;
                    stack = 0;
                    setTimeout(block, 1);
                    break;
                }
            }
        }());
    }
};

try {
    module.exports = blocks;
} catch (error) {
    window.blocks = blocks;
}

