## 来源
基于[songsiqi/postcss-adaptive](https://github.com/songsiqi/postcss-adaptive) 写的一个把```rpx```转换成```rem```的插件。基本用法和其一致。

## 功能
1. 该插件使用是为了简化原来插件使用注释的方法去做转化。因此如果改成：如果遇到 ```rpx``` 则换算成 ```rem``` 单位。如果遇到 ```px``` 则不换算。
2. 配置方面，仅仅留下 ```baseDpr``` ，```remUnit``` 和 ```remPrecision```

## 效果
```css
.selector {
  height: 32px;
  width: 75rpx;
}
/* 默认配置下转换之后 */
.selector {
  height: 32px;
  width: 1rem;
}
```

## 使用
```
  npm i --save-dev postcss-adaptive-rpx
```

```javascript
var postcss = require('postcss');
var adaptive = require('postcss-adaptive');
var originCssText = '...';
var newCssText = postcss().use(adaptive({ remUnit: 75 })).process(originCssText).css;
```

#### Gulp

```javascript
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var adaptive = require('postcss-adaptive');

gulp.task('default', function () {
  var processors = [adaptive({ remUnit: 75 })];
  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});
```

#### Webpack

```javascript
var adaptive = require('postcss-adaptive');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function () {
    return [adaptive({ remUnit: 75 })];
  }
}
```

#### Grunt

```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
          adaptive({ remUnit: 75 })
        ]
      },
      dist: {
        src: 'src/*.css',
        dest: 'build'
      }
    }
  });
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('default', ['postcss']);
}
```

## API

`adaptive(config)`

Config: 

* `remUnit`: number, rem unit value (default: 75)
* `baseDpr`: number, base device pixel ratio (default: 2)
* `remPrecision`: number, rem value precision (default: 6)