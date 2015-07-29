var blocks = {
  /**
   * @param array {Array} data to iterate
   * @param timeout {Number} milliseconds allowed to block for. Required
   * @param each {Function} run for each array item. arguments (item, i). Required
   * @param onBlock {Function} (Optional) run every time a block of `timeout` is reached (item, i)
   *
   * @returns {Promise,<Undefined>}
   */
  forEach (array, timeout, each, onBlock) {
    return this.map(array, timeout, each, onBlock).then(() => undefined);
  },

  /**
   * @param array {Array} data to iterate
   * @param timeout {Number} milliseconds allowed to block for. Required
   * @param each {Function} run for each array item. arguments (item, i). Required
   * @param onBlock {Function} (Optional) run every time a block of `timeout` is reached (item, i)
   *
   * @returns {Promise,<Array>} returns a new array
   */
  map (array, timeout, each, onBlock) {
    let mapped = []; // Mapped output
    let blockStart; // {Number} milliseconds from epoch
    let i = 0; // {Number} iteration counter

    if (typeof timeout !== 'number') {
      throw new Error('argument "timeout" must be a number');
    }
    if (typeof each !== 'function') {
      throw new Error('argument "each" must be a function');
    }

    return new Promise((resolve, reject) => {
      // Run for every item in the array
      function onLoop() {
        if (! blockStart) blockStart = +new Date();
        mapped.push( each(array[i], i) );
        i++;
      }

      // Run once the timeout for a block has run out
      function onChunk() {
        if (onBlock) onBlock(array[i], i);
        blockStart = null;
        setTimeout(run, 0);
      }

      // Run once the iterations are all complete
      function onEnd() {
        if (onBlock) onBlock(array[i], i);
        return resolve(mapped);
      }

      function run() {
        while (true) {
          try {
            var isEnd = i === array.length;
            if (isEnd) return onEnd();

            onLoop();

            var isBlockEnd = (+new Date() - blockStart) > timeout;
            if (isBlockEnd) return onChunk();
          } catch (err) {
            reject(err);
          }
        }
      }
      run();
    });
  }
};

if (typeof module === 'undefined') {
  window.blocks = blocks;
} else {
  module.exports = blocks;
}
