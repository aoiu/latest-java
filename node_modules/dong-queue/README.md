# dong-queue

[![NPM version](https://img.shields.io/npm/v/dong-queue.svg?style=flat-square)](https://npmjs.org/package/dong-queue)
[![Build Status](https://img.shields.io/travis/crossjs/dong-queue.svg?style=flat-square
)](https://travis-ci.org/crossjs/dong-queue)

> simple (a)sync queue runner

## Install

```bash
npm install --save dong-queue
```

## Usage

### run

synchronous. run queue member step by step (one invokes by previous one with `next`).

```js
var queue = new Queue()

// use function
queue.use(function([arg1, arg2, ...], next){
  // do some (a)sync job, then
  next()
})

// use functions
queue.use([function([arg1, arg2, ...], next){
  // do some (a)sync job, then
  next()
}, ...])

// dynamically pass arguments to queue members
queue.run([arg1, arg2, ... ], [function callback([arg1, arg2, ... ]) {
  // do some callbacks
}])
```

### any

asynchronous. if any member of the queue is finished, call the callback.

### all

asynchronous. if all members of the queue is finished, call the callback.
