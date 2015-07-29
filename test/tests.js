"use strict";

/**
 * Author: Dom Armstrong, Date: 29/07/15
 */

import blocks from '../blocks';
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

    assert.isBelow(time, 11);
    assert.isAbove(time, 9);
  });
});

describe('blocks.forEach', () => {
  it('splits the task into blocks of x ms', done => {
    let data = new Array(100).fill(null);
    let chunks = 0;
    let items = 0;
    blocks.forEach(data, {
      block: 10,
      each (item, i) {
        wait(1);
        items++;
      },
      afterBlock () {
        chunks++;
      },
      after () {
        assert.equal(data.length, items);
        assert.isAbove(chunks, 10);
        assert.isBelow(chunks, 12);
        done();
      }
    });
  });

  it('runs afterBlock even if work is only 1 block', done => {
    let data = [null];
    let chunks = 0;
    let items = 0;
    blocks.forEach(data, {
      block: 100,
      each (item, i) {
        wait(1);
        items++;
      },
      afterBlock () {
        chunks++;
      },
      after () {
        assert.equal(data.length, items);
        assert.equal(chunks, 1);
        done();
      }
    });
  })
});
