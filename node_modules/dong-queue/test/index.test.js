'use strict'

/*globals describe,it,beforeEach,afterEach*/

var expect = require('expect.js')
var Queue = require('../index.js')

describe('run', function() {

  var queue
  var i
  var a

  beforeEach(function() {
    queue = new Queue()
    i = 0
    a = {}
  })

  it('with callback', function() {
    queue.use(function(next) {
      i += 1
      next()
    })

    queue.run(function() {
      expect(i).to.be(1)

      i += 2
    })

    expect(i).to.be(3)
  })

  it('without callback', function() {
    queue.use(function(next) {
      i += 1
      next()
    })

    queue.run()

    expect(i).to.be(1)
  })

  it('with params', function() {
    queue.use(function(a, next) {
      a.index = i += 1
      next()
    })

    queue.run(a)

    expect(a.index).to.be(1)
  })

  it('does not go through', function() {
    queue.use(function(next) {
      i += 1
      next()
    })

    queue.use(function(/*next*/) {
      i += 2
      // next()
    })

    queue.use(function(next) {
      // this would not be executed
      i += 4
      next()
    })

    queue.run(function() {
      // this would not be executed
      expect().fail('this would not be executed')
    })

    expect(i).to.be(3)
  })

  afterEach(function() {
    queue = null
  })

})

describe('any', function() {

  var queue

  beforeEach(function() {
    queue = new Queue()
  })

  it('with async', function(done) {
    var i = 0

    queue.use(function(next) {
      setTimeout(function() {
        i += 1
        next()
      }, 10)
    })

    queue.use(function(next) {
      setTimeout(function() {
        i += 2
        next()
      }, 10)
    })

    queue.any(function() {
      expect(i).to.be(1)
      done()
    })
  })

  it('with async, later first', function(done) {
    var i = 0

    queue.use(function(next) {
      setTimeout(function() {
        i += 1
        next()
      }, 30)
    })

    queue.use(function(next) {
      setTimeout(function() {
        i += 2
        next()
      }, 10)
    })

    setTimeout(function() {
      expect(i).to.be(2)
    }, 20)

    queue.any(function() {
      expect(i).to.be(2)
      done()
    })
  })

  it('without callback', function(done) {
    var i = 0

    queue.use(function(next) {
      setTimeout(function() {
        i += 1
        next()
      }, 10)
    })

    queue.use(function(next) {
      setTimeout(function() {
        i += 2
        next()
      }, 30)
    })

    queue.any()

    setTimeout(function() {
      expect(i).to.be(1)
    }, 20)

    setTimeout(function() {
      expect(i).to.be(3)
      done()
    }, 40)
  })

  afterEach(function() {
    queue = null
  })

})

describe('all', function() {

  var queue

  beforeEach(function() {
    queue = new Queue()
  })

  it('with async', function(done) {
    var i = 0

    queue.use(function(next) {
      setTimeout(function() {
        i += 1
        next()
      }, 10)
    })

    queue.use(function(next) {
      setTimeout(function() {
        i += 2
        next()
      }, 10)
    })

    queue.all(function() {
      expect(i).to.be(3)
      done()
    })
  })

  it('with async, later first', function(done) {
    var i = 0

    queue.use(function(next) {
      setTimeout(function() {
        i += 1
        next()
      }, 30)
    })

    queue.use(function(next) {
      setTimeout(function() {
        i += 2
        next()
      }, 10)
    })

    setTimeout(function() {
      expect(i).to.be(2)
    }, 20)

    queue.all(function() {
      expect(i).to.be(3)
      done()
    })
  })

  it('without callback', function(done) {
    var i = 0

    queue.use(function(next) {
      setTimeout(function() {
        i += 1
        next()
      }, 10)
    })

    queue.use(function(next) {
      setTimeout(function() {
        i += 2
        next()
      }, 30)
    })

    queue.all()

    setTimeout(function() {
      expect(i).to.be(1)
    }, 20)

    setTimeout(function() {
      expect(i).to.be(3)
      done()
    }, 40)
  })

  afterEach(function() {
    queue = null
  })

})
