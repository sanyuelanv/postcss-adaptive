var fs = require('fs')
var chai = require('chai')
var postcss = require('postcss')
var expect = chai.expect
var adaptive = require('../')

function readFile (filepath) {
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath, { encoding: 'utf-8' }) || ''
  }
  return ''
}

// describe('integration', function () {

//   it('normal', function () {
//     var fixture = readFile('test/fixture.css')
//     var expected = readFile('test/expected.css')
//     var output = postcss().use(adaptive()).process(fixture).css
//     expect(output).is.a.string
//     expect(output).eql(expected)
//   })

//   it('auto rem', function () {
//     var fixture = readFile('test/fixture-autorem.css')
//     var expected = readFile('test/expected.css')
//     var output = postcss().use(adaptive({ autoRem: true })).process(fixture).css
//     expect(output).is.a.string
//     expect(output).eql(expected)
//   })
// })

describe('config', function () {

  it('rem unit', function () {
    var fixture = '.a { height: 64rpx; width: 64px; }'
    var expected = '.a {\n  height: 1rem;\n }'
    var output = postcss().use(adaptive({ remUnit: 64 })).process(fixture).css
    console.log(output)
    // expect(output).is.a.string
    // expect(output).eql(expected)
  })

  // it('base dpr', function () {
  //   var fixture = '.a { height: 75px; }'
  //   var expected = '.a {\n  height: 25rpx;\n}'
  //   var output = postcss().use(adaptive({ baseDpr: 3 })).process(fixture).css
  //   expect(output).is.a.string
  //   expect(output).eql(expected)
  // })

  // it('rem precision', function () {
  //   var fixture = '.a { height: 65rpx; }'
  //   var expected = '.a {\n  height: 0.86666667rpx;\n}'
  //   var output = postcss().use(adaptive({ remPrecision: 8 })).process(fixture).css
  //   expect(output).is.a.string
  //   expect(output).eql(expected)
  // })
})
