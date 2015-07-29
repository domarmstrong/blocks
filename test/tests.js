"use strict";

/**
 * Author: Dom Armstrong, Date: 29/07/15
 */

import blocks from '..';
import { assert } from 'chai';

/**
 * Block for n milliseconds
 * @param ms {Number} milliseconds
 */
function wait(ms) {
  let start = +new Date();
  while ((+new Date() - start) < ms) { /* noop */ }
}

describe('wait', () => {
  // Cant guarantee exact timing..
  it('blocks for approximately 10 ms', () => {
    let start = +new Date();
    wait(10);
    let now = +new Date();
    let time = now - start;

    assert.isBelow(time, 12);
    assert.isAbove(time, 8);
  });
});

describe('blocks.forEach', () => {
  it('returns a promise', () => {
    let promise = blocks.forEach([], 1, (item, i) => {});
    assert.instanceOf(promise, Promise);
  });

  it('splits the task into blocks of x ms', () => {
    let data = new Array(100).fill(null);
    let it = new Array(100).fill((i) => {
      console.log(i);
      return i;
    });
    let chunks = 0;
    let items = 0;

    return blocks.forEach(data, 10, (item, i) => {
      wait(1);
      items++;
    }, () => {
      chunks++;
    }).then(() => {
      assert.equal(data.length, items);
      assert.isAbove(chunks, 9);
      assert.isBelow(chunks, 12);
    });
  });

  it('runs afterBlock even if work is only 1 block', () => {
    let data = [null];
    let chunks = 0;
    let items = 0;

    return blocks.forEach(data, 100, (item, i) => {
      wait(1);
      items++;
    }, () => {
      chunks++;
    }).then(() => {
      assert.equal(data.length, items);
      assert.equal(chunks, 1);
    });
  })
});

describe('blocks.map', () => {
  it('returns a new mapped array', () => {
    return blocks.map([1,2,3], 0, (num, i) => num + i)
      .then(arr => assert.deepEqual([1,3,5], arr));
  });
});
