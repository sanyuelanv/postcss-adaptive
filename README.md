## 来源
基于[songsiqi/postcss-adaptive](https://github.com/songsiqi/postcss-adaptive) 写的一个把```rpx```转换成```rem```的插件。基本用法和其一致。

## 功能
1. 该插件使用是为了简化原来插件使用注释的方法去做转化。因此如果改成：如果遇到 ```rpx``` 则换算成 ```rem``` 单位。如果遇到 ```px``` 则不换算。
2. 配置方面，仅仅留下 ```baseDpr``` ，```remUnit``` 和 ```remPrecision```