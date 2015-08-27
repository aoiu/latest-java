/**
 * @module Queue
 * @author crossjs <liwenfu@crossjs.com>
 */

'use strict';

var slice = Array.prototype.slice

var Queue = function() {
  this.stack = []
}

Queue.exec = function(fn, args) {
  fn.apply(null, args)
}

Queue.prototype.use = function(fn) {
  this.stack = this.stack.concat(fn)

  return this
}

Queue.prototype.run = function() {
  var stack = this.stack
  var i = 0

  var args = slice.call(arguments)
  var cb

  if (args.length && typeof args[args.length - 1] === 'function') {
    cb = args.pop()
  }

  (function done() {
    var fn = stack[i++]

    if (fn) {
      Queue.exec(fn, args.concat(done))
    } else if (cb) {
      cb.apply(null, args)
    }
  })()
}

Queue.prototype.any = function() {
  var stack = this.stack

  var args = slice.call(arguments)
  var cb

  if (args.length && typeof args[args.length - 1] === 'function') {
    cb = args.pop()
  }

  var ok
  var done = function() {
    if (ok) {
      return
    }

    ok = true

    if (cb) {
      cb.apply(null, args)
    }
  }

  stack.forEach(function(fn) {
    Queue.exec(fn, args.concat(done))
  })
}

Queue.prototype.all = function() {
  var stack = this.stack

  var args = slice.call(arguments)
  var cb

  if (args.length && typeof args[args.length - 1] === 'function') {
    cb = args.pop()
  }

  var i = 0
  var n = stack.length
  var done = function() {
    if (++i !== n) {
      return
    }

    if (cb) {
      cb.apply(null, args)
    }
  }

  stack.forEach(function(fn) {
    Queue.exec(fn, args.concat(done))
  })
}

module.exports = Queue
