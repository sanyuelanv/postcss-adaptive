var fs = require('fs')
var chai = require('chai')
var postcss = require('postcss')
var expect = chai.expect
var adaptive = require('../')

describe('config', function () {
  // rpx 转换
  it('rem unit', function () {
    var fixture = '.a { height: 64rpx; }'
    var expected = '.a {\n  height: 1rem;\n}'
    var output = postcss().use(adaptive({ remUnit: 64 })).process(fixture).css
    expect(output).is.a.string
    expect(output).eql(expected)
  })
  // px 不转换
  it('base dpr', function () {
    var fixture = '.a { height: 75px; }'
    var expected = '.a {\n  height: 75px;\n}'
    var output = postcss().use(adaptive({ baseDpr: 3 })).process(fixture).css
    expect(output).is.a.string
    expect(output).eql(expected)
  })
  // rpx 转换 精确度
  it('rem precision', function () {
    var fixture = '.a { height: 65rpx; }'
    var expected = '.a {\n  height: 0.86666667rem;\n}'
    var output = postcss().use(adaptive({ remPrecision: 8 })).process(fixture).css
    expect(output).is.a.string
    expect(output).eql(expected)
  })
})
