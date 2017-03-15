# 初步达成 "图灵完全" 实现 Lodash 方法  

### 函数内容： Lodash.js 函数方法
### 文档格式：
```js
    /**
     * [description]
     * @param  {[type]} [description]
     * @return {[type]} [description]
     */
    function (array){
        // do some things
        return array
    }
```
### 关于迭代：
* Lodash.js 函数一共写了两次，1.0版本，单纯使用JavaScript数据类型的方法来实现的，封装过于粗糙

* 2.0版本为重写版本，但仍有一部分没有实现，封装方法较第一次略有改观，待第三次迭代会实现所有方法，封装方法会参考Lodash.js源码方案。

### 关于函数：
* 源码中大部分函数都有其basefn(基础函数)处理数据类型，未来3.0版本将会使用这种方案来写
* isEqual() 函数的仍需重写，深度比较对象仍是一个难题。
* 剩余内容待补充

### 我有话要说
【我需要一份工作！】 