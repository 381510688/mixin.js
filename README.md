# mixin.js [![Build Status](https://travis-ci.org/381510688/mixin.js.svg?branch=master)](https://travis-ci.org/381510688/mixin.js)

```
mixin([deep], target, object1, [objectN])
```
用一个或多个其他对象来扩展一个对象，返回被扩展的对象。<br>
如果第一个参数设置为true，则返回一个深层次的副本，递归地复制找到的任何对象。否则的话，副本会与原对象共享结构。未定义的属性将不会被复制，然而从对象的原型继承的属性将会被复制。

## 安装
```
$ npm install mixin.js --save-dev
```

##使用说明
###外链形式
```
<script type="text/javascript" src="mixin.js"></script>

<script>
    var target = {x: {y: 1, z: 3}};
    var source = {x: {y: 2}, z: 2};
    var obj1 = mixin(target, source); // {x: {y: 2}, z: 2}

    var target = {x: {y: 1, z: 3}};
    var source = {x: {y: 2}, z: 2};
    var obj2= mixin(true, target, source); // {x: {y: 2, z: 3}, z: 2}
</script>
```

###Node端
```
var mixin = require('./mixin');

var target = {x: {y: 1, z: 3}};
var source = {x: {y: 2}, z: 2};
var obj1 = mixin(target, source);
// 结果: {x: {y: 2}, z: 2}

var target = {x: {y: 1, z: 3}};
var source = {x: {y: 2}, z: 2};
var obj2= mixin(true, target, source);
// 结果: {x: {y: 2, z: 3}, z: 2}
```

##API
`mixin([deep], target, object1, [objectN])`
- deep: 如果设为true，则递归合并。
- target: 待修改对象。
- object1: 待合并到第一个对象的对象。
- objectN: 待合并到第一个对象的对象。

##License:
MIT