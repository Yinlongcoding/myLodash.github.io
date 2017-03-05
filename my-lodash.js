var WuYinLong = {
    chunk: function(array, n) {

        var l = Math.ceil(array.length / n)

        var result = new Array(l);

        for (var i = 0; i < l; i++) {
            result[i] = []
        }

        for (var i = 0; i < array.length; i++) {
            result[parseInt(i / n)][i % n] = array[i]
        }

        return result
    },
    compact: function(array) {

        var Newarray = []

        for (i = 0; i < array.length; i++) {

            if (!!array[i] == false) {
                continue //结束单次循环
            } else {

                Newarray.push(array[i])

            }

        }
        return Newarray
    },
    concat: function() {
        var newArr = []

        for (var i = 0; i < arguments.length; i++) {

            if (arguments[i][0] == undefined) {
                newArr.push(arguments[i])
            } else {

                for (var j = 0; j < arguments[i].length; j++) {
                    newArr.push(arguments[i][j])
                }
            }
        }
        return newArr
    },
    difference: function(array, other) {
        var newArr = []

        for (var i = 0; i < array.length; i++) {
            if (array[i] != other[i]) {
                newArr.push(array[i])
            }
        }
        return newArr
    },
    drop: function(array, n) {
        var newArr = array

        if (n == undefined) {
            n = 1
        }

        newArr.splice(0, n)

        return newArr
    },
    dropRight: function(array, n) {
        var len = array.length

        if (n == undefined) {
            n = 1
        }

        for (var i = 0; i < n; i++) {
            array.pop()
        }

        return array
    },
    map: function(array, fn) {
        var result = []

        for (i = 0; i < array.length; i++) {
            result.push(fn(array[i], i, array))
        }

        return result
    },
    filter: function(array, fn) {
        var newArr = []

        for (var i = 0; i < array.length; i++) {

            if (fn(array[i], i, array)) {
                newArr.push(array[i])
            }
        }
        return newArr
    },
    reduce: function(collection, reducer, initial) {
        var start = 0
        if (initial == undefined) {
            initial = collection[0]
            start = 1
        }

        var result = initial

        for (var i = start; i < collection.length; i++) {
            result = reducer(result, collection[i])
        }

        return result
    },
    partition: function(array, fn) {
        var result = [
            [],
            []
        ]

        for (var i = 0; i < array.length; i++) {
            if (fn(array[i], i, array)) {
                result[0].push(array[i])
            } else {
                result[1].push(array[i])
            }
        }

        return result
    },
    every: function(array, fn) {
        for (var i = 0; i < array.length; i++) {

            if (!fn(array[i], i, array)) {
                return false
            }
        }
        return true
    },
    fill: function(array, value, star, end) {
        for (var i = 0; i < array.length; i++) {

            if ((star == undefined) && (end == undefined)) {
                array[i] = value

            } else {
                array[star] = value
                array[end - 1] = value
            }
        }
        return array
    },
    flatten: function(array) {
        var result = []

        for (var i = 0; i < array.length; i++) {
            result = result.concat(array[i])
        }
        return result
    },
    flattenDeep: function(array, n) {
        var result = new Array()

        for (var i = 0; i < array.length; i++) {
            if (!(Array.isArray(array[i]))) {
                result.push(array[i])
            } else {
                for (var j = 0; j < array[i].length; j++) {
                    result.push(array[i][j])
                }
            }
        }
        for (var k = 0; k < result.length; k++) {
            if (!(Array.isArray(result[k]))) {
                continue
            } else {
                return this.flattenDeep(result)
            }
        }
        return result
    },
    fromPairs: function(pairs) {
        var reslut = {}

        for (var i = 0; i < pairs.length; i++) {
            reslut[pairs[i][0]] = pairs[i][1]
        }
        return reslut
    },
    head: function(array) {
        return array[0]
    },
    join: function(array, sparator) {
        var result = ""
        for (var i = 0; i < array.length - 1; i++) {
            result += array[i] + sparator
        }
        return result + array[array.length - 1]
    },
    last: function(array) {
        return array[array.length - 1]
    },
    nth: function(array, n) {
        if (n < 0) {
            n = array.length + n
        }
        return array[n]
    },
    /**
     * [indexOf 给定下标值寻找数组内元素并输出下标]
     * @param  {[Array]} array  [目标数组]
     * @param  {[string]} value [寻找元素]
     * @param  {[Index]} n      [索引起始]
     * @return {[Index]}        [description]
     */
    indexOf: function(array, value, n) {
        var index

        if (n == undefined) {
            n = 0
        }
        for (var i = n; i < array.length; i++) {
            if (array[i] == value) {
                index = i
                break
            } else {
                index = -1
            }
        }
        return index
    },
    /**
     * [lastIndexOf 倒序查找字符并输出下标]
     * @param  {[Array]} array [目标数组]
     * @param  {[Number]} value  [索引值]
     * @param  {[index]} n     [起始下标]
     * @return {[index]}       [索引值下标/false输出-1]
     */
    lastIndexOf: function(array, value, n) {
        var index

        if (n == undefined) {
            n = array.length - 1
        }

        for (var i = n; i > 0; i--) {
            if (array[i] == value) {
                index = i
                break
            } else {
                index = -1
            }
        }
        return index
    },
    initial: function(array) {
        var reslut = []
        for (var i = 0; i < array.length - 1; i++) {
            reslut.push(array[i])
        }
        return reslut
    },
    forOwn: function(obj, iterator) {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                console.log(key)
            }
        }
    },
    pull: function(array, value) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 1; j < arguments.length; j++) {
                if (array[i] == arguments[j]) {
                    array.splice(i, 1)
                    i = 0
                    break
                }
            }
        }
        return array
    },
    // 过滤对象中的值
    pullAll: function(array, value) {
        for (var i = 0; i < value.length; i++) {
            for (var j = 0; j < array.length; j++) {
                if (value[i] == array[j]) {
                    array.splice(j, 1)
                }
            }
        }
        return array
    },
    //倒叙数组
    reverse: function(array) {
        var result = []
        for (var i = 0; i < array.length; i++) {
            result.unshift(array[i])
        }
        return result
    },
    // 二进制索引
    sortedIndex: function(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] >= value) {
                return i
            }
        }
    },
    sortedIndexOf: function(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return i
            }
        }
    },
    sortedLastIndex: function(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (value >= array[i] && value < array[i + 1]) {
                return i + 1
            }
        }
    },
    sortedLastIndexOf: function(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (value >= array[i] && value < array[i + 1]) {
                return i
            }
        }
    },
    sortedUniq: function(array) {
        var result = []
        for (var i = 0; i < array.length; i++) {
            if (!(array[i] == array[i + 1])) {
                result.push(array[i])
            }
        }
        return result
    },
    /**
     * [tail 获取除了第一个元素之外的所有元素]
     * @param  {[Array]} array [目标数组]
     * @return {[Array]}       [结果数组]
     */
    tail: function(array) {
        array.shift()
        return array
    },
    /**
     * [take 从开始获取到 n 个元素]
     * @param  {[Array]} array [目标数组]
     * @return {[Array]}       [输出数组]
     */
    take: function(array, n) {
        var result = new Array()
        if (n == undefined) {
            n = 1
        }
        if (n > array.length) {
            n = array.length
        }
        for (var i = 0; i < n; i++) {
            result.push(array[i])
        }
        return result
    },
    /**
     * [takeRight 从后往前获取 n 个元素]
     * @param  {[Array]} array [目标数组]
     * @param  {[Number]} n    [输出元素个数]
     * @return {[Array]}       [输出结果]
     */
    takeRight: function(array, n) {
        if (n == undefined) {
            n = 1
        }
        if (n == 0) {
            return []
        }
        if (n > array.length) {
            return array
        }
        return array.slice(array.length - n)
    },
    /**
     * [union Arrays的并集]
     * @param  {[Array]} array [目标数组]
     * @return {[Array]}       [并集数组]
     */
    union: function(array) {
        var result = []
        for (var i = 0; i < arguments.length; i++) {
            for (var j = 0; j < arguments[i].length; j++) {
                if (result.indexOf(arguments[i][j]) == -1) {
                    result.push(arguments[i][j])
                }
            }
        }
        return result
    },
    /**
     * [uniq 去除相同项并按照下标排序]
     * @param  {[Array]} array [目标数组]
     * @return {[Array]}       [输出数组]
     * 两个循环遍历数组的前后作项对比，类似冒泡排序
     * 每次遍历结束时两个指针要指向同一个元素
     */
    uniq: function(array) {
        for (var i = 0; i < array.length; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (array[i] == array[j]) {
                    array.splice(j, 1)
                    j = i
                }
            }
        }
        return array
    },
    /**
     * [unzip 数组元素重新分类存放在不同的数组]
     * @return {[Array]} [输出数组]
     * 得到输出数组位多少个
     * 交互替换元素
     */
    unzip: function() {
        var len = arguments[0][0].length
        var newArray = new Array(len)

        for (var i = 0; i < newArray.length; i++) {
            newArray[i] = []
        }
        for (var j = 0; j < len; j++) {
            newArray[j][0] = arguments[0][0][j]
            newArray[j][1] = arguments[0][1][j]
        }
        return newArray
    },
    /**
     * [without 去除数组中指定元素并输出剩余数组]
     * @param  {[Array]} array [目标数组]
     * @return {[Array]}       [输出数组]
     * 指定元素可以有多个
     * arguments包含着目标数组,所以遍历时可以从index 1开始
     */
    without: function(array) {
        var len = array.length
        var lenValue = arguments.length
        for (var i = 1; i < lenValue; i++) {
            for (var j = 0; j < len; j++) {
                if (arguments[i] == array[j]) {
                    array.splice(j, 1)
                    i = 0
                }
            }
        }
        return array
    },
    /**
     * [zip 分组函数,包含每个数组的第1,2...项]
     * @return {[Array]} [输出数组]
     * 目标数组会有多个,提前确定生成的数组的length
     * 元素的相互交换
     */
    zip: function() {
        var result = [
            [],
            []
        ]
        for (var i = 0; i < arguments.length; i++) {
            result[0][i] = arguments[i][0]
            result[1][i] = arguments[i][1]
        }
        return result
    },
}
