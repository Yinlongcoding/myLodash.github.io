var mylodash = {
    /**
     * 将 array 拆分成多个 size 长度的块把这些块组成一个新数组。如果 array 无法被分割成全部等长的块，那么最后剩余的元素将组成一个块。
     * 参数
     * array (Array): 需要被处理的数组。
     * [size=1] (number): 每个块的长度。
     * 返回值
     * (Array): 返回一个包含拆分块数组的新数组（相当于一个二维数组）。
     * 例子
     * chunk(['a', 'b', 'c', 'd'], 2);
     * => [['a', 'b'], ['c', 'd']]
     * chunk(['a', 'b', 'c', 'd'], 3);
     * => [['a', 'b', 'c'], ['d']]
     **/
    chunk: function(arr, n) {
        var lenR = Math.ceil(arr.length / n)
        var lenA = arr.length
        var result = new Array(lenR)
        for (var i = 0; i < lenR; i++) {
            result[i] = []
        }
        for (var j = 0; j < lenA; j++) {
            result[parseInt(j / n)][j % n] = arr[j]
        }
        return result
    },
    /**
     * 创建一个新数组并包含原数组中所有的非假值元素。例如 false、null、 0、""、undefined 和 NaN 都是“假值”。
     * 参数
     * array (Array): 数组参数。
     * 返回值
     * (Array): 返回过滤假值后的数组。
     * 例子
     * compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     **/
    compact: function(arr) {
        var result = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]) {
                result.push(arr[i])
            }
        }
        return result
    },
    /**
     * Creates an array of unique array values not included in the other provided arrays using SameValueZero for equality comparisons.
     * 参数
     * array (Array): 需要过滤的数组。
     * [values] (...Array): 数组需要排除掉的值。
     * 返回值
     * (Array): 返回过滤后的数组
     * 例子
     * difference([1, 2, 3], [4, 2]);
     * // => [1, 3]
     * difference([1, '2', 3], [4, 2]);
     * // => [1, "2", 3]
     **/
    difference: function(arr) {
        var tmp = []
        var len = arguments.length
        var result = []
        for (var i = 0; i < arr.length; i++) {
            result.push(arr[i])
        }
        for (var i = 1; i < len; i++) {
            tmp.push(arguments[i])
        }
        tmp = this.flattenDeep(tmp)
        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < tmp.length; j++) {
                if (result[i] === tmp[j]) {
                    result.splice(i, 1)
                    j = -1
                }
            }
        }
        return result
    },
    /**
     * 这个方法类似_.difference ，除了它接受一个 iteratee
     * @param  array (Array): 要检查的数组。
     * @param  [values] (...Array): 排除的值。
     * @param  [iteratee=_.identity] (Array|Function|Object|string): iteratee 调用每个元素。
     * @return (Array): 返回一个过滤值后的新数组。
     */
    differenceBy: function(arr, value, iter) {
        var result = []
        var onOff
        if (typeof iter == 'function') {
            for (var i = 0; i < arr.length; i++) {
                onOff = true
                for (var j = 0; j < value.length; j++) {
                    if (iter(value[j]) == iter(arr[i])) {
                        onOff = false
                    }
                }
                if (onOff) {
                    result.push(arr[i])
                }
            }
        }
        if (typeof iter == 'string') {
            for (var i = 0; i < arr.length; i++) {
                onOff = true
                for (var j = 0; j < value.length; j++) {
                    if (arr[i][iter] == value[j][iter]) {
                        onOff = false
                    }
                }
                if (onOff) {
                    result.push(arr[i])
                }
            }
        }
        return result
    },
    /**
     * 这个方法类似_.difference ，除了它接受一个 comparator
     * @param  array (Array): 要检查的数组。
     * @param  [values] (...Array): 排除的值。
     * @param  [comparator] (Function): comparator 调用每个元素。
     * @return (Array): 返回一个过滤值后的新数组。
     */
    differenceWith: function(arr, value, compara) {
        var result = []
        var onOff
        for (var i = 0; i < arr.length; i++) {
            onOff = true
            for (var j = 0; j < value.length; j++) {
                if (compara(arr[i], value[j])) {
                    onOff = false
                }
            }
            if (onOff) {
                result.push(arr[i])
            }
        }
        return result
    },
    /**
     * 将 array 中的前 n 个元素去掉，然后返回剩余的部分。
     * 参数
     * array (Array): 被操作的数组。
     * [n=1] (number): 去掉的元素个数。
     * 返回值
     * (Array): 返回 array 的剩余部分。
     * 例子
     * drop([1, 2, 3]);
     * // => [2, 3] 默认是1开始的
     * drop([1, 2, 3], 2);
     * // => [3]
     * drop([1, 2, 3], 5);
     * // => []
     * drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     **/
    drop: function(arr, del) {
        var result = []
        if (del == undefined) {
            del = 1
        }
        for (var i = del; i < arr.length; i++) {
            result.push(arr[i])
        }
        return result
    },
    /**
     * 将 array 尾部的 n 个元素去除，并返回剩余的部分。
     * 参数
     * array (Array): 需要被处理数组。
     * [n=1] (number): 去掉的元素个数。
     * 返回值
     * (Array): 返回 array 的剩余部分。
     * 例子
     * dropRight([1, 2, 3]);
     * // => [1, 2]
     * dropRight([1, 2, 3], 2);
     * // => [1]
     * dropRight([1, 2, 3], 5);
     * // => []
     * dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     **/
    dropRight: function(arr, del) {
        var result = []
        if (del == undefined) {
            del = 1
        }
        for (var i = 0; i < arr.length - del; i++) {
            result.push(arr[i])
        }
        return result
    },
    /**
     * 获取数组 array的第一个元素
     * 参数
     * array (Array): 需要查询的数组
     * 返回值
     * (*): 返回数组的第一个元素
     * 例子
     * first([1, 2, 3]);
     * // => 1
     * first([]);
     * // => undefined
     **/
    first: function(arr) {
        return arr[0]
        return true
    },
    /**
     * 获取数组 array的第一个元素
     * 参数
     * array (Array): 需要查询的数组
     * 返回值
     * (*): 返回数组的第一个元素
     * 例子
     * first([1, 2, 3]);
     * // => 1
     * first([]);
     * // => undefined
     **/
    head: function(arr) {
        return arr[0]
        return true
    },
    /**
     * 去除数组最后一个元素array.
     * 参数
     * array (Array): 需要查询的数组.
     * 返回值
     * (Array): 返回截取的数组array.
     * 例子
     * initial([1, 2, 3]);
     * // => [1, 2]
     **/
    initial: function(arr) {
        var result = Array.prototype.slice.call(arr)
        result.splice(-1, 1)
        return result
    },
    /**
     * 取出数组的最后一个元素 array.
     * 参数
     * array (Array): 查询的数组
     * 返回值
     * (*): 返回 array的最后一个元素.
     * 例子
     * last([1, 2, 3]);
     * // => 3
     **/
    last: function(arr) {
        return arr[arr.length - 1]
        return true
    },
    /**
     * 获取数组 array第一个元素除外的所有元素.
     * 参数
     * array (Array): 需要查询的数组
     * 返回值
     * (Array): 返回截取的 array.
     * 例子
     * rest([1, 2, 3]);
     * // => [2, 3]
     **/
    /* lodash 最新版本的 rest 功能不一样
     * rest: function(arr){
     *  var result = arr
     *  result.splice(0,1)
     *  return result
     * },
     **/
    /**
     * 可以理解为将嵌套数组的维数减少，flattened（平坦）. 如果 isDeep 值为 true 时，嵌套数组将递归为一维数组, 否则只减少嵌套数组一个级别的维数.
     * 参数
     * array (Array): 需要flattened（减少维数）的嵌套数组
     * [isDeep] (boolean): 是否深递归
     * 返回值
     * (Array): 返回处理后的数组
     * 例子
     * flatten([1, [2, 3, [4]]]);
     * // => [1, 2, 3, [4]]
     * // using `isDeep`
     * flatten([1, [2, 3, [4]]], true);
     * // => [1, 2, 3, 4]
     **/
    flatten: function(arr, isDeep) {
        if (!isDeep) {
            return flat(arr)
        } else {
            return flatDeep(arr)
        }

        function flatDeep(a) {
            var resultDeep = a
            var onOff = true
            for (var i = 0; i < resultDeep.length; i++) {
                if (Array.isArray(resultDeep[i])) {
                    i = 0
                    resultDeep = flat(resultDeep)
                }
            }
            return resultDeep
        }

        function flat(a) {
            var result = []
            var len = a.length
            for (var i = 0; i < len; i++) {
                if (!Array.isArray(a[i])) {
                    result.push(a[i])
                } else {
                    for (var j = 0; j < a[i].length; j++) {
                        result.push(a[i][j])
                    }
                }
            }
            return result
        }
    },
    /**
     * 递归地平坦一个嵌套的数组.相当于_.flatten(array, true)
     * 参数
     * array (Array): 需要
     * 返回值
     * (Array): 返回处理后的数组.
     * 例子
     * flattenDeep([1, [2, 3, [4]]]);
     * // => [1, 2, 3, 4]
     **/
    flattenDeep: function(arr) {
        return flatDeep(arr)

        function flatDeep(a) {
            var resultDeep = a
            var onOff = true
            for (var i = 0; i < resultDeep.length; i++) {
                if (Array.isArray(resultDeep[i])) {
                    i = 0
                    resultDeep = flat(resultDeep)
                }
            }
            return resultDeep
        }

        function flat(a) {
            var result = []
            var len = a.length
            for (var i = 0; i < len; i++) {
                if (!Array.isArray(a[i])) {
                    result.push(a[i])
                } else {
                    for (var j = 0; j < a[i].length; j++) {
                        result.push(a[i][j])
                    }
                }
            }
            return result
        }
    },
    /**
     * 创建一个剔除所有给定值的新数组，剔除值的时候，使用SameValueZero做相等比较.
     * 注意: 不像 _.pull, 这个方法会返回一个新数组。
     * 参数
     * array (Array): 要检查的数组。
     * [values] (...*): 要剔除的值。
     * 返回值
     * (Array): 返回过滤值后的新数组。
     * 例子
     * without([2, 1, 2, 3], 1, 2);
     * // => [3]
     **/
    without: function(arr) {
        var result = arr
        var lenArg = arguments.length
        var lenArr = result.length
        for (var i = 1; i < lenArg; i++) {
            for (var j = 0; j < lenArr; j++) {
                if (arguments[i] === result[j]) {
                    result.splice(j, 1)
                    j = -1
                }
            }
        }
        return result
    },
    /**
     * 创建一个按顺序排列的唯一值的数组。所有给定数组的元素值使用SameValueZero做等值比较。（愚人码头注： arrays（数组）的并集，按顺序返回，返回数组的元素是唯一的）
     * 参数
     * [arrays] (...Array): 要检查的数组。
     * 返回值
     * (Array): 返回一个新的联合数组。
     * 例子
     * union([2], [1, 2]);
     * // => [2, 1]
     **/
    union: function() {
        var tmp = []
        for (var i = 0; i < arguments.length; i++) {
            tmp.push(arguments[i])
        }
        var result = this.flattenDeep(tmp)
        var len = result.length
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (result[i] === result[j]) {
                    result.splice(j, 1)
                }
            }
        }
        return result
    },
    /**
     * 创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用 SameValueZero进行相等性比较。（愚人码头注：可以理解为给定数组的交集）
     * 参数
     * [arrays] (...Array): 待检查的数组。
     * 返回值
     * (Array): 返回一个包含所有传入数组交集元素的新数组。
     * 例子
     * intersection([2, 1], [4, 2], [1, 2]);
     * // => [2]
     **/
    intersection: function() {
        var result = []
        var len0 = arguments[0].length
        var len = arguments.length
        var count = 0
        for (var i = 0; i < len0; i++) {
            count = 0
            for (var j = 1; j < len; j++) {
                for (var k = 0; k < arguments[j].length; k++) {
                    if (arguments[0][i] === arguments[j][k]) {
                        count++
                        break
                    }
                }
            }
            if (count == len - 1) {
                result.push(arguments[0][i])
            }
        }
        return result
    },
    /**
     * 创建一个新数组，将array与任何数组 或 值连接在一起。
     * 参数
     * array (Array): 被连接的数组。
     * [values] (...*): 连接的值。
     * 返回值
     * (Array): 返回连接后的新数组。
     * 例子
     * var array = [1];
     * var other = concat(array, 2, [3], [[4]]);
     * console.log(other);
     * // => [1, 2, 3, [4]]
     * console.log(array);
     * // => [1]
     **/
    concat: function(arr) {
        var result = []
        var tmp = []
        var len = arr.length
        var lenA = arguments.length
        for (var i = 0; i < len; i++) {
            result.push(arr[i])
        }
        for (var i = 1; i < lenA; i++) {
            tmp.push(arguments[i])
        }
        var lenTmp = tmp.length
        tmp = this.flatten(tmp)
        for (var i = 0; i < lenTmp; i++) {
            result.push(tmp[i])
        }
        return result
    },
    /**
     * 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
     * Note: 这个方法会改变 array
     * 参数
     * array (Array): 要填充改变的数组。
     * value (*): 填充给 array 的值。
     * [start=0] (number): 开始位置（默认0）。
     * [end=array.length] (number):结束位置（默认array.length）。
     * 返回值
     * (Array): 返回 array。
     * 例子
     * var array = [1, 2, 3];
     * fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     * fill(Array(3), 2);
     * // => [2, 2, 2]
     * fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     **/
    fill: function(arr, n, start, end) {
        if (!start) {
            start = 0
        }
        if (!end && end !== 0) {
            end = arr.length
        }
        for (var i = start; i < end; i++) {
            arr.splice(i, 1, n)
        }
        return arr
    },
    /**
     * 这个方法返回一个由键值对pairs构成的对象。
     * Note: 这个方法会改变 array
     * 参数
     * pairs (Array): 键值对pairs。
     * 返回值
     * (Object): 返回一个新对象。
     * 例子
     * fromPairs([['fred', 30], ['barney', 40]]);
     * // => { 'fred': 30, 'barney': 40 }
     **/
    fromPairs: function(arr) {
        var result = {}
        var len = arr.length
        for (var i = 0; i < len; i++) {
            result[arr[i][0]] = arr[i][1]
        }
        return result
    },
    /**
     * 移除数组array中所有和给定值相等的元素，使用 SameValueZero 进行全等比较。
     * 注意： 和 _.without 方法不同，这个方法会改变数组。使用 _.remove 从一个数组中移除元素。
     * 参数
     * array (Array): 要修改的数组。
     * [values] (...*): 要删除的值。
     * 返回值
     * (Array): 返回 array.
     * 例子
     * var array = [1, 2, 3, 1, 2, 3];
     * pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     **/
    pull: function(arr) {
        var lenArg = arguments.length
        var lenArr = arr.length
        for (var i = 1; i < lenArg; i++) {
            for (var j = 0; j < lenArr; j++) {
                if (arguments[i] === arr[j]) {
                    arr.splice(j, 1)
                    j = -1
                }
            }
        }
        return arr
    },
    /**
     * 这个方法类似_.pull，区别是这个方法接收一个要移除值的数组。
     * Note: 不同于 _.difference, 这个方法会改变数组 array。
     * 参数
     * array (Array): 要修改的数组。
     * values (Array): 要移除值的数组。
     * 返回值
     * (Array): 返回 array。
     * 例子
     * var array = [1, 2, 3, 1, 2, 3];
     * pullAll(array, [2, 3]);
     * console.log(array);
     * // => [1, 1]
     **/
    pullAll: function(arr, del) {
        var lenDel = del.length
        var lenArr = arr.length
        for (var i = 0; i < lenDel; i++) {
            for (var j = 0; j < lenArr; j++) {
                if (del[i] === arr[j]) {
                    arr.splice(j, 1)
                }
            }
        }
        return arr
    },
    /**
     * 根据索引 indexes，移除array中对应的元素，并返回被移除元素的数组。
     * Note: 和 _.at不同, 这个方法会改变数组 array。
     * 参数
     * array (Array): 要修改的数组。
     * [indexes] (...(number|number[])): 要移除元素的索引。
     * 返回值
     * (Array): 返回移除元素组成的新数组。
     * 例子
     * var array = [5, 10, 15, 20];
     * var evens = _.pullAt(array, 1, 3);
     * console.log(array);
     * // => [5, 15]
     * console.log(evens);
     * // => [10, 20]
     **/
    pullAt: function(arr) {
        var result = []
        var lenArg = arguments.length
        for (var i = lenArg - 1; i >= 1; i--) {
            if (arguments[i] < arr.length) {
                result.push(arr[arguments[i]])
                arr.splice(arguments[i], 1)
            }
        }
        result = result.reverse()
        return result
    },
    /**
     * 反转array，使得第一个元素变为最后一个元素，第二个元素变为倒数第二个元素，依次类推。
     * Note: 这个方法会改变原数组 array，基于 Array#reverse.
     * 参数
     * array (Array): 要修改的数组。
     * 返回值
     * (Array): 返回 array.
     * 例子
     * var array = [1, 2, 3];
     * reverse(array);
     * // => [3, 2, 1]
     * console.log(array);
     * // => [3, 2, 1]
     **/
    reverse: function(arr) {
        var len = arr.length
        var result = []
        for (var i = 0; i < len; i++) {
            result.push(arr.pop())
        }
        for (var i = 0; i < len; i++) {
            arr.push(result[i])
        }
        return arr
    },
    /**
     * 获取除了array数组第一个元素以外的全部元素。
     * 参数
     * array (Array): 要检索的数组。
     * 返回值
     * (Array): 返回 array 数组的切片（除了array数组第一个元素以外的全部元素）。
     * 例子
     * tail([1, 2, 3]);
     * // => [2, 3]
     **/
    tail: function(arr) {
        var result = arr
        result.splice(0, 1)
        return result
    },
    /**
     * 创建一个数组切片，从array数组的起始元素开始提取n个元素。
     * 参数
     * array (Array): 要检索的数组。
     * [n=1] (number): 要提取的元素个数。
     * 返回值
     * (Array): 返回 array 数组的切片（从起始元素开始n个元素）。
     * 例子
     * take([1, 2, 3]);
     * // => [1]
     * take([1, 2, 3], 2);
     * // => [1, 2]
     * take([1, 2, 3], 5);
     * // => [1, 2, 3]
     * take([1, 2, 3], 0);
     * // => []
     **/
    take: function(arr, n) {
        if (!n && n !== 0) {
            n = 1
        }
        var result = []
        var len = arr.length
        n = n > len ? len : n
        for (var i = 0; i < n; i++) {
            result.push(arr[i])
        }
        return result
    },
    /**
     * 创建一个数组切片，从array数组的最后一个元素开始提取n个元素。
     * 参数
     * array (Array): 要检索的数组。
     * [n=1] (number): 要提取的元素个数。
     * 返回值
     * (Array): 返回 array 数组的切片（从结尾元素开始n个元素）。
     * 例子
     * take([1, 2, 3]);
     * // => [3]
     * take([1, 2, 3], 2);
     * // => [2, 3]
     * take([1, 2, 3], 5);
     * // => [1, 2, 3]
     * take([1, 2, 3], 0);
     * // => []
     **/
    takeRight: function(arr, n) {
        if (!n && n !== 0) {
            n = 1
        }
        var result = []
        var len = arr.length
        n = n > len ? len : n
        var start = len - n
        for (var i = start; i < len; i++) {
            result.push(arr[i])
        }
        return result
    },
    /**
     * 创建一个去重后的array数组副本。使用了 SameValueZero 做等值比较。只有第一次出现的元素才会被保留。
     * 参数
     * array (Array): 要检查的数组。
     * 返回值
     * (Array): 返回新的去重后的数组。
     * 例子
     * uniq([2, 1, 2]);
     * // => [2, 1]
     **/
    uniq: function(arr) {
        var result = arr
        var len = arr.length
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len - i; j++) {
                if (arr[i] === arr[j]) {
                    arr.splice(j, 1)
                    j = i
                }
            }
        }
        return result
    },
    /**
     * 这个方法类似于_.zip，除了它接收分组元素的数组，并且创建一个数组，分组元素到打包前的结构。
     * 参数
     * array (Array): 要处理的分组元素数组。
     * 返回值
     * (Array): 返回重组元素的新数组。
     * 例子
     * var zipped = zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     * unzip(zipped);
     * // => [['fred', 'barney'], [30, 40], [true, false]]
     **/
    unzip: function(arr) {
        var result = []
        var len = arr.length
        var lenR = arr[0].length
        for (var i = 0; i < lenR; i++) {
            result[i] = []
        }
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                result[j][i] = arr[i][j]
            }
        }
        return result
    },
    /**
     * 创建一个给定数组唯一值的数组，使用symmetric difference做等值比较。返回值的顺序取决于他们数组的出现顺序。
     * 参数
     * [arrays] (...Array): 要检查的数组。
     * 返回值
     * (Array): 返回过滤值后的新数组。
     * 例子
     * xor([2, 1], [2, 3]);
     * // => [1, 3]
     **/
    xor: function() {

        var result = []
        var len = arguments.length
        for (var i = 0; i < len; i++) {
            result.push(arguments[i])
        }
        result = this.flatten(result)
        len = result.length
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len - i; j++) {
                if (result[i] === result[j]) {
                    result.splice(i, 1)
                    result.splice(j - 1, 1)
                    i = -1
                    break
                }
            }
        }
        return result
    },
    /**
     * 创建一个分组元素的数组，数组的第一个元素包含所有给定数组的第一个元素，数组的第二个元素包含所有给定数组的第二个元素，以此类推。
     * 参数
     * [arrays] (...Array): 要处理的数组。
     * 返回值
     * (Array): 返回分组元素的新数组。
     * 例子
     * zip(['fred', 'barney'], [30, 40], [true, false]);
     * /// => [['fred', 30, true], ['barney', 40, false]]
     **/
    zip: function() {
        var tmp = []
        var result = []
        var len = arguments.length
        for (var i = 0; i < len; i++) {
            tmp.push(arguments[i])
        }
        for (var i = 0; i < tmp[0].length; i++) {
            result[i] = []
        }
        len = tmp.length
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < tmp[i].length; j++) {
                result[j][i] = tmp[i][j]
            }
        }
        return result
    },
    /**
     * 使用 SameValueZero 等值比较，返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。
     * 参数
     * array (Array): 需要查找的数组。
     * value (*): 需要查找的值。
     * [fromIndex=0] (number): 开始查询的位置。
     * 返回值
     * (number): 返回 值value在数组中的索引位置, 没有找到为返回-1。
     * 例子
     * indexOf([1, 2, 1, 2], 2);
     * // => 1
     * // Search from the `fromIndex`.
     * indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     **/
    indexOf: function(arr, n, start) {
        if (!start) {
            start = 0
        }
        var len = arr.length
        var onOff = false
        for (var i = start; i < len; i++) {
            if (arr[i] === n) {
                onOff = true
                break
            }
        }
        if (onOff) {
            return i
        } else {
            return -1
        }
    },
    /**
     * 将 array 中的所有元素转换为由 separator 分隔的字符串。
     * 参数
     * array (Array): 要转换的数组。
     * [separator=','] (string): 分隔元素。
     * [fromIndex=0] (number): 开始查询的位置。
     * 返回值
     * (string): 返回连接字符串。
     * 例子
     * join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     **/
    join: function(arr, n) {
        var result = arr
        result = result.join(n)
        return result
    },
    /**
     * 这个方法类似 _.indexOf ，区别是它是从右到左遍历array的元素。
     * 参数
     * array (Array): 要搜索的数组。
     * value (*): 要搜索的值。
     * [fromIndex=array.length-1] (number): 开始搜索的索引值。
     * 返回值
     * (number): 返回匹配值的索引值，否则返回 -1。
     * 例子
     * lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     * // Search from the `fromIndex`.
     * lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     **/
    lastIndexOf: function(arr, n, start) {
        //
        var len = arr.length
        if (!start) {
            start = 0
        }
        var onOff = false
        for (var i = len - start; i >= 0; i--) {
            if (arr[i] === n) {
                onOff = true
                break
            }
        }
        if (onOff) {
            return i
        } else {
            return -1
        }
    },
    /**
     * 获取数组的索引n处的元素。 如果n为负，则返回从末尾开始的第n个元素。
     * 参数
     * array (Array): The array to query.
     * [n=0] (number): The index of the element to return.
     * 返回值
     * (*): Returns the nth element of array.
     * 例子
     * var array = ['a', 'b', 'c', 'd'];
     * nth(array, 1);
     * // => 'b'
     * nth(array, -2);
     * // => 'c';
     **/
    nth: function(arr, index) {
        if (!index) {
            index = 0
        }
        index = parseInt(index)
        if (index >= 0) {
            return arr[index]
        } else {
            return arr[arr.length + index]
        }
    },
    /**
     * 使用二分检索来决定 value值 应该插入到数组中 尽可能小的索引位置，以保证array的排序。
     * 参数
     * array (Array): 要检查的排序数组。
     * value (*): 要评估的值。
     * 返回值
     * (number): 返回 value值 应该在数组array中插入的索引位置 index。
     * 例子
     * sortedIndex([30, 50], 40);
     * // => 1
     **/
    sortedIndex: function(arr, n) {

        var len = arr.length
        var result = []
        for (var i = 0; i < len; i++) {
            result.push(arr[i])
        }
        var index = parseInt(len / 2)
        for (; n > result[index] && n <= result[index + 1];) {
            if (n <= result[index]) {
                index = parseInt(index / 2)
            }
            if (n > result[index]) {
                index = parseInt((len + index) / 2)
            }
        }
        return index
    },
    /**
     * 转换字符串string为 驼峰写法。
     * 参数
     * [string=''] (string): 要转换的字符串。
     * 返回值
     * (string): 返回驼峰写法的字符串。
     * 例子
     * camelCase('Foo Bar');
     * // => 'fooBar'
     * camelCase('--foo-bar--');
     * // => 'fooBar'
     * camelCase('__FOO_BAR__');
     * // => 'fooBar'
     **/
    camelCase: function(str) {
        var result = str
        var tmp = []
        result = result.toLowerCase()
        if (result.charCodeAt(0) >= 97 && result.charCodeAt(0) <= 122) {
            tmp.push(result.charAt(0))
        }
        for (var i = 1; i < result.length; i++) {
            if (result.charCodeAt(i) >= 97 && result.charCodeAt(i) <= 122) {
                if (result.charCodeAt(i - 1) < 97 || result.charCodeAt(i - 1) > 122) {
                    tmp.push(result.charAt(i).toUpperCase())
                    continue
                }
                tmp.push(result.charAt(i))
            }
        }
        tmp[0] = tmp[0].toLowerCase()
        result = tmp.join("")
        return result
    },
    /**
     * 转换字符串string首字母为大写，剩下为小写。
     * 参数
     * [string=''] (string): 要大写开头的字符串。
     * 返回值
     * (string): 返回大写开头的字符串。
     * 例子
     * capitalize('FRED');
     * // => 'Fred'
     **/
    capitalize: function(str) {
        tmp = []
        result = str.toLowerCase()
        tmp.push(result.charAt(0).toUpperCase())
        tmp.push(result.substring(1))
        result = tmp.join("")
        return result
    },
    /**
     * 转换字符串string中拉丁语-1补充字母 和 拉丁语扩展字母-A 为基本的拉丁字母，并且去除组合变音标记。
     * 参数
     * [string=''] (string): 要处理的字符串。
     * 返回值
     * (string): 返回处理后的字符串。
     * 例子
     * deburr('déjà vu');
     * // => 'deja vu'
     **/
    deburr: function(str) {

        var tmp = str.split("")
        for (var i = 0; i < tmp.length; i++) {
            if (192 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 221) {
                tmp[i] = deburrTrans(tmp[i]).toUpperCase()
            }
            if (224 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 255) {
                tmp[i] = deburrTrans(tmp[i])
            }
        }
        var result = tmp.join("")
        return result

        function deburrTrans(n) {
            var result = n.toLowerCase()
            var codeN = result.charCodeAt(0)
            if ((224 <= codeN && codeN <= 229)) {
                result = "a"
            }
            if ((232 <= codeN && codeN <= 235)) {
                result = "e"
            }
            if ((236 <= codeN && codeN <= 239)) {
                result = "i"
            }
            if ((242 <= codeN && codeN <= 245)) {
                result = "o"
            }
            if ((249 <= codeN && codeN <= 252)) {
                result = "u"
            }
            return result
        }
    },
    /**
     * 检查字符串string是否以给定的target字符串结尾。
     * 参数
     * [string=''] (string): 要检索的字符串。
     * [target] (string): 要检索字符。
     * [position=string.length] (number): 检索的位置。
     * 返回值
     * (boolean): 如果字符串string以target字符串结尾，那么返回 true，否则返回 false。
     * 例子
     * endsWith('abc', 'c');
     * // => true
     * endsWith('abc', 'b');
     * // => false
     * endsWith('abc', 'b', 2);
     * // => true
     **/
    endsWith: function(str, n, index) {
        if (!index && index !== 0) {
            index = 1
        }
        return n === str.charAt(str.length - index) ? true : false
    },
    /**
     * 转换字符串string为 kebab case.
     * 参数
     * [string=''] (string): 要转换的字符串。
     * 返回值
     * (string): 返回转换后的字符串。
     * 例子
     * kebabCase('Foo Bar');
     * // => 'foo-bar'
     * kebabCase('fooBar');
     * // => 'foo-bar'
     * kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     **/
    kebabCase: function(str) {
        var result = str
        var tmp = result.split("")
        var reArr = []
        for (var i = 0; i < tmp.length - 1; i++) {
            if (!((97 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 122) || (65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90)) && !((97 <= tmp[i + 1].charCodeAt(0) && tmp[i + 1].charCodeAt(0) <= 122) || (65 <= tmp[i + 1].charCodeAt(0) && tmp[i + 1].charCodeAt(0) <= 90))) {
                tmp.splice(i, 1)
                i--
            }
        }
        for (var i = 0; i < tmp.length; i++) {
            if (!(97 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 122) && !(65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90)) {
                tmp.splice(i, 1)
                i--
            } else {
                break
            }
        }
        for (var i = 1; i < tmp.length; i++) {
            if ((65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90) && !(65 <= tmp[i - 1].charCodeAt(0) && tmp[i - 1].charCodeAt(0) <= 90)) {
                tmp.splice(i, 0, "-")
                i++
            }
        }
        for (var i = 0; i < tmp.length; i++) {
            if (!((97 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 122) || (65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90) || (tmp[i].charCodeAt(0) === 45))) {
                tmp.splice(i, 1)
            }
        }
        result = tmp.join("").toLowerCase()
        return result
    },
    /**
     * 转换字符串string以空格分开单词，并转换为小写。
     * 参数
     * [string=''] (string): 要转换的字符串。
     * 返回值
     * (string): 返回转换后的字符串。
     * 例子
     * lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     * lowerCase('fooBar');
     * // => 'foo bar'
     * kebabCase('__FOO_BAR__');
     * // => 'foo bar'
     **/
    lowerCase: function(str) {
        var result = str
        var tmp = result.split("")
        var reArr = []
        for (var i = 0; i < tmp.length - 1; i++) {
            if (!((97 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 122) || (65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90)) && !((97 <= tmp[i + 1].charCodeAt(0) && tmp[i + 1].charCodeAt(0) <= 122) || (65 <= tmp[i + 1].charCodeAt(0) && tmp[i + 1].charCodeAt(0) <= 90))) {
                tmp.splice(i, 1)
                i--
            }
        }
        for (var i = 0; i < tmp.length; i++) {
            if (!(97 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 122) && !(65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90)) {
                tmp.splice(i, 1)
                i--
            } else {
                break
            }
        }
        for (var i = 1; i < tmp.length; i++) {
            if ((65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90) && !(65 <= tmp[i - 1].charCodeAt(0) && tmp[i - 1].charCodeAt(0) <= 90)) {
                tmp.splice(i, 0, " ")
                i++
            }
        }
        for (var i = 0; i < tmp.length; i++) {
            if (!((97 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 122) || (65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90) || (tmp[i].charCodeAt(0) === 32))) {
                tmp.splice(i, 1)
            }
        }
        result = tmp.join("").toLowerCase()
        return result
    },
    /**
     * 转换字符串string的首字母为小写。
     * 参数
     * [string=''] (string): 要转换的字符串。
     * 返回值
     * (string): 返回转换后的字符串。
     * 例子
     * lowerFirst('Fred');
     * // => 'fred'
     * lowerFirst('FRED');
     * // => 'fRED'
     **/
    lowerFirst: function(str) {
        var tmp = str.split("")
        tmp.splice(0, 1, str.charAt(0).toLowerCase())
        var result = tmp.join("")
        return result
    },
    /**
     * 如果string字符串长度小于 length 则从左侧和右侧填充字符。 如果没法平均分配，则截断超出的长度。
     * 参数
     * [string=''] (string): 要填充的字符串。
     * [length=0] (number): 填充的长度。
     * [chars=' '] (string): 填充字符。
     * 返回值
     * (string): 返回填充后的字符串。
     * 例子
     * pad('abc', 8);
     * // => '  abc   '
     * pad('abc', 8, '_-');
     * // => '_-abc_-_'
     * pad('abc', 3);
     * // => 'abc'
     **/
    pad: function(str, len, sign) {
        var result = str
        if (!sign && sign !== 0) {
            sign = " "
        }
        var tmp = [result]
        if (result.length < len) {
            for (var i = 0, j = 0; i < len - result.length; i = i + sign.length, j++) {
                if (j % 2 !== 0) {
                    tmp.unshift(sign)
                } else {
                    tmp.push(sign)
                }
            }
            result = tmp.join("").substr(0, len)
            return result

        } else {
            return result
        }
    },
    /**
     * 如果string字符串长度小于 length 则在右侧填充字符。 如果超出length长度则截断超出的部分。
     * 参数
     * [string=''] (string): 要填充的字符串。
     * [length=0] (number): 填充的长度。
     * [chars=' '] (string): 填充字符。
     * 返回值
     * (string): 返回填充后的字符串。
     * 例子
     * padEnd('abc', 6);
     * // => 'abc   '
     * padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     * padEnd('abc', 3);
     * // => 'abc'
     **/
    padEnd: function(str, len, sign) {
        var result = str
        if (!sign && sign !== 0) {
            sign = " "
        }
        var tmp = [result]
        if (result.length < len) {
            for (var i = 0; i < len - result.length; i = i + sign.length) {
                tmp.push(sign)
            }
            result = tmp.join("").substr(0, len)
            return result
        } else {
            return result
        }
    },
    /**
     * 如果string字符串长度小于 length 则在左侧填充字符。 如果超出length长度则截断超出的部分。
     * 参数
     * [string=''] (string): 要填充的字符串。
     * [length=0] (number): 填充的长度。
     * [chars=' '] (string): 填充字符。
     * 返回值
     * (string): 返回填充后的字符串。
     * 例子
     * padStart('abc', 6);
     * // => '   abc'
     * padStart('abc', 6, '_-');
     * // => '_-_abc'
     * padStart('abc', 3);
     * // => 'abc'
     **/
    padStart: function(str, len, sign) {
        var result = str
        if (!sign && sign !== 0) {
            sign = " "
        }
        var tmpS = sign.split("").reverse()
        sign = tmpS.join("")
        var tmp = [result]
        if (result.length < len) {
            for (var i = 0; i < len - result.length; i = i + sign.length) {
                tmp.unshift(sign)
            }
            result = tmp.join("")
            result = result.substring(result.length - len, result.length)
            return result
        } else {
            return result
        }
    },
    /**
     * 重复 N 次给定字符串。
     * 参数
     * [string=''] (string): 要重复的字符串。
     * [n=1] (number): 重复的次数。
     * 返回值
     * (string): 返回重复的字符串。
     * 例子
     * repeat('*', 3);
     * // => '***'
     * repeat('abc', 2);
     * // => 'abcabc'
     * repeat('abc', 0);
     * // => ''
     **/
    repeat: function(str, n) {
        var result = ''
        for (var i = 0; i < n; i++) {
            result = result + str
        }
        return result
    },
    /**
     * 转换字符串string为 snake case..
     * 参数
     * [string=''] (string): 要转换的字符串。
     * 返回值
     * (string): 返回转换后的字符串。
     * 例子
     * snakeCase('Foo Bar');
     * // => 'foo_bar'
     * snakeCase('fooBar');
     * // => 'foo_bar'
     * snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     **/
    snakeCase: function(str) {
        var result = str
        var tmp = result.split("")
        var reArr = []
        for (var i = 0; i < tmp.length - 1; i++) {
            if (!((97 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 122) || (65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90)) && !((97 <= tmp[i + 1].charCodeAt(0) && tmp[i + 1].charCodeAt(0) <= 122) || (65 <= tmp[i + 1].charCodeAt(0) && tmp[i + 1].charCodeAt(0) <= 90))) {
                tmp.splice(i, 1)
                i--
            }
        }
        for (var i = 0; i < tmp.length; i++) {
            if (!(97 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 122) && !(65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90)) {
                tmp.splice(i, 1)
                i--
            } else {
                break
            }
        }
        for (var i = 1; i < tmp.length; i++) {
            if ((65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90) && !(65 <= tmp[i - 1].charCodeAt(0) && tmp[i - 1].charCodeAt(0) <= 90)) {
                tmp.splice(i, 0, "_")
                i++
            }
        }
        for (var i = 0; i < tmp.length; i++) {
            if (!((97 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 122) || (65 <= tmp[i].charCodeAt(0) && tmp[i].charCodeAt(0) <= 90) || (tmp[i].charCodeAt(0) === 95))) {
                tmp.splice(i, 1)
            }
        }
        result = tmp.join("").toLowerCase()
        return result
    },
    /**
     * 创建一个数组， value（值） 是 iteratee（迭代函数）遍历 collection（集合）中的每个元素后返回的结果。 iteratee（迭代函数）调用3个参数：(value, index|key, collection).
     * 参数
     * collection (Array|Object): 用来迭代的集合。
     * [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * 返回值
     * (Array): 返回新的映射后数组。
     * 例子
     **/
    map: function(colle, pred) {
        //debugger
        var result = []
        if (this.isObject(pred)) {
            var fn = this.matches(pred)
        }
        if (this.isArray(pred)) {
            var fn = this.matchesProperty(...pred)
        }
        if (this.isString(pred)) {
            var fn = this.property(pred)
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        for (var key in colle) {
            result.push(fn(colle[key], key, colle))
        }
        return result
    },
    /**
     * 遍历 collection（集合）元素，返回 predicate（断言函数）返回真值 的所有元素的数组。 predicate（断言函数）调用三个参数：(value, index|key, collection)。
     * 参数
     * collection (Array|Object): 一个用来迭代的集合。
     * [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * 返回值
     * (Array): 返回一个新的过滤后的数组。
     * 例子
     **/
    filter: function(colle, pred) {
        //debugger
        if (this.isObject(pred)) {
            var fn = this.matches(pred)
        }
        if (this.isArray(pred)) {
            var fn = this.matchesProperty(...pred)
        }
        if (this.isString(pred)) {
            var fn = this.property(pred)
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        var result = []
        for (var i = 0; i < colle.length; i++) {
            if (fn(colle[i])) {
                result.push(colle[i])
            }
        }
        return result
    },
    /**
     * 遍历 collection（集合）元素，返回 predicate（断言函数）返回真值 的所有元素的数组。 predicate（断言函数）调用三个参数：(value, index|key, collection)。
     * 参数
     * collection (Array|Object): 一个用来迭代的集合。
     * [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * 返回值
     * (Array): 返回一个新的过滤后的数组。
     * 例子
     **/
    partition: function(arr, fn) {
        var result = [
            [],
            []
        ]
        for (var i = 0; i < arr.length; i++) {
            if (fn(arr[i])) {
                result[0].push(arr[i])
            } else {
                result[1].push(arr[i])
            }
        }
        return result
    },
    /**
     * 压缩 collection（集合）为一个值，通过 iteratee（迭代函数）遍历 collection（集合）中的每个元素，每次返回的值会作为下一次迭代使用(愚人码头注：作为iteratee（迭代函数）的第一个参数使用)。 如果没有提供 accumulator，则 collection（集合）中的第一个元素作为初始值。(愚人码头注：accumulator参数在第一次迭代的时候作为iteratee（迭代函数）第一个参数使用。) iteratee 调用4个参数：(accumulator, value, index|key, collection).
     * @param  collection (Array|Object): 用来迭代的集合。
     * @param  [iteratee=_.identity] (Function): 每次迭代调用的函数。
     * @param  [accumulator] (*): 初始值。
     * @return (*): 返回累加后的值。
     */
    reduce: function(colle, iter, acc) {
        var theKey = Object.keys(colle)
        var start = 1
        if (acc === undefined) {
            acc = colle[theKey[1]]
            start = 2
        }
        acc = iter(acc, colle[theKey[0]], theKey[0], colle)
        for (var i = start; i < theKey.length; i++) {
            acc = iter(acc, colle[theKey[i]], theKey[i], colle)
        }
        return acc
    },
    /**
     * 这个方法类似 _.reduce ，除了它是从右到左遍历collection（集合）中的元素的。
     * @param  collection (Array|Object): 用来迭代的集合。
     * @param  [iteratee=_.identity] (Function): 每次迭代调用的函数。
     * @param  [accumulator] (*): 初始值。
     * @return (*): 返回累加后的值。
     */
    reduceRight: function(colle, iter, acc) {
        var theKey = Object.keys(colle)
        var start = theKey.length - 2
        if (acc === undefined) {
            acc = colle[theKey[theKey.length - 2]]
            start = theKey.length - 3
        }
        acc = iter(acc, colle[theKey[theKey.length - 1]], theKey[theKey.length - 1], colle)
        for (var i = start; i >= 0; i--) {
            acc = iter(acc, colle[theKey[i]], theKey[i], colle)
        }
        return acc
    },
    /**
     * 创建一个object键值倒置后的对象。 如果 object 有重复的值，后面的值会覆盖前面的值。
     * 参数
     * object (Object): 要键值倒置对象。
     * 返回值
     * (Object): 返回新的键值倒置后的对象。
     * 例子
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     * invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    invert: function(obj) {
        var result = {}
        for (keys in obj) {
            result[obj[keys]] = keys
        }
        return result
    },
    /**
     * 创建一个object键值倒置后的对象。 如果 object 有重复的值，放入数组。
     * 参数
     * object (Object): 要键值倒置对象。
     * 返回值
     * (Object): 返回新的键值倒置后的对象。
     * 例子
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     * invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    invert2: function(obj) {
        var result = {}
        for (keys in obj) {
            if (!result[obj[keys]]) {
                result[obj[keys]] = keys
            } else if (Array.isArray(result[obj[keys]])) {
                result[obj[keys]].push(keys)
            } else {
                result[obj[keys]] = [result[obj[keys]]]
                result[obj[keys]].push(keys)

            }

        }
        return result
    },
    /**
     * 创建一个 object 的自身可枚举属性名为数组。
     * 参数
     * object (Object): 要检索的对象。
     * 返回
     * (Array): 返回包含属性名的数组。
     * function Foo() {this.a = 1;this.b = 2;}
     * Foo.prototype.c = 3;
     * keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     * keys('hi');
     * // => ['0', '1']
     * activate-power-mode
     */
    keys: function(obj) {
        var result = []
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(key)
            }
        }
        return result
    },
    /**
     * 创建一个 object 自身 和 继承的可枚举属性名为数组。
     * @param  object (Object): 要检索的对象。
     * @return (Array): 返回包含属性名的数组。
     */
    keysIn: function(obj) {
        var result = []
        for (key in obj) {
            result.push(key)
        }
        return result
    },
    /**
     * 使用 iteratee 遍历对象的自身和继承的可枚举属性。 iteratee 会传入3个参数：(value, key, object)。 如果返回 false，iteratee 会提前退出遍历。
     * 参数
     * object (Object): 要遍历的对象。
     * [iteratee=_.identity] (Function): 每次迭代时调用的函数。
     * 返回
     * (Object): 返回 object。
     * function Foo() {this.a = 1;this.b = 2;}
     * Foo.prototype.c = 3;
     * forIn(new Foo, function(value, key) {console.log(key);});
     * // => Logs 'a', 'b', then 'c' (无法保证遍历的顺序)。
     */
    forIn: function(obj, fn) {
        for (keys in obj) {
            if (obj[keys]) {
                fn(obj[keys], keys, obj)
            } else {
                break
            }
        }
        return obj
    },
    /**
     * 反向版 _.mapValues。 这个方法创建一个对象，对象的值与object相同，并且 key 是通过 iteratee 运行 object 中每个自身可枚举属性名字符串 产生的。iteratee调用三个参数： (value, key, object)。
     * @param  object (Object): 要遍历的对象。
     * @param  [iteratee=_.identity] (Function): 每次迭代时调用的函数。
     * @return (Object): 返回映射后的新对象。
     * example mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {return key + value;});
     * // => { 'a1': 1, 'b2': 2 }
     */
    mapKeys: function(obj, fn) {
        var result = {}
        for (keys in obj) {
            result[fn(obj[keys], keys, obj)] = obj[keys]
        }
        return result
    },
    /**
     * 创建一个对象，这个对象的key与object对象相同，值是通过 iteratee 运行 object 中每个自身可枚举属性名字符串产生的。 iteratee调用三个参数： (value, key, object)。
     * @param  object (Object): 要遍历的对象。
     * @param  [iteratee=_.identity] (Function): 每次迭代时调用的函数。
     * @return (Object): 返回映射后的新对象。
     * example var users = {'fred':{ 'user': 'fred',    'age': 40 },'pebbles': { 'user': 'pebbles', 'age': 1 }};
     * mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     * mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    mapValues: function(obj, fn) {
        var result = {}
        if (typeof fn == "string") {
            for (keys in obj) {
                result[keys] = obj[keys][fn]
            }
        } else {
            for (keys in obj) {
                result[keys] = fn(obj[keys], keys, obj)
            }
        }
        return result
    },
    /**
     * 创建一个从 object 中选中的属性的对象。
     * @param  object (Object): 来源对象。
     * @param  [props] (...(string|string[])): 要被忽略的属性。
     * @return (Object): 返回新对象。
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     * pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    pick: function(obj, arr) {
        var result = {}
        for (var i = 0; i < arr.length; i++) {
            for (keys in obj) {
                if (arr[i] == keys) {
                    result[keys] = obj[keys]
                }
            }
        }
        return result
    },
    /**
     * 创建 object 自身可枚举属性的值为数组。
     * @param  object (Object): 要检索的对象。
     * @return (Array): 返回对象属性的值的数组。
     * example function Foo() {this.a = 1;this.b = 2;}
     * Foo.prototype.c = 3;
     * values(new Foo);
     * // => [1, 2]
     * values('hi');
     * // => ['h', 'i']
     */
    values: function(obj) {
        var result = []
        for (keys in obj) {
            if (obj.hasOwnProperty(keys)) {
                result.push(obj[keys])
            }
        }
        return result
    },
    /**
     * 创建一个数组，值来自 object 的paths路径相应的值。
     * @param  object (Object): 要迭代的对象。
     * @param  [paths] (...(string|string[])): 要获取的对象的元素路径，单独指定或者指定在数组中。
     * @return (Array): 返回选中值的数组。
     * example var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     * at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */
    at: function(obj, arr) {
        debugger
        var result = []
        for (var i = 0; i < arr.length; i++) {
            result.push(eval("obj." + arr[i]))
        }
        return result
    },
    /**
     * 分配来源对象的可枚举属性到目标对象上。 来源对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。
     * @param  object (Object): 目标对象。
     * (Object): 返回 object.
     * example
     * function Foo() {this.a = 1;}
     * function Bar() {this.c = 3;}
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     * assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    assign: function(obj) {
        var result = {}
        for (var i = 0; i < arguments.length; i++) {
            for (keys in arguments[i]) {
                result[keys] = arguments[i][keys]
            }
        }
        return result
    },
    /**
     * 该方法类似_.assign， 除了它递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。如果目标值存在，被解析为undefined的sources 来源对象属性将被跳过。数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。
     * @param  object (Object): 目标对象。
     * @param [sources] (...Object): 来源对象。
     * @return (Object): 返回 object.
     * example var object = {'a': [{ 'b': 2 }, { 'd': 4 }]};
     * var other = {'a': [{ 'c': 3 }, { 'e': 5 }]};
     * merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    merge: function(obj) {
        for (var i = 1; i < arguments.length; i++) {
            for (keys in arguments[i]) { //arguments[1] == other
                if (!obj[keys]) { // obj[a]
                    obj[keys] = arguments[i][keys]
                } else {
                    for (var j = 0; j < arguments[i][keys].length; j++) {
                        if (typeof arguments[i][keys][j] == "object" && arguments[i][keys][j] !== null) {
                            for (key in arguments[i][keys][j]) {
                                obj[keys][j][key] = arguments[i][keys][j][key]
                            }
                        } else {
                            obj[keys][j] = arguments[i][keys][j]
                        }
                    }
                }
            }

        }
        return obj
    },
    /**
     * 该方法类似_.merge，除了它接受一个 customizer，调用以产生目标对象和来源对象属性的合并值
     * @param  object (Object): 目标对象。
     * @param  [sources] (...Object): 来源对象。
     * @param  customizer (Function): 这个函数定制合并值。
     * @return (Object): 返回 object。
     */
    mergeWith: function(obj) {
        if (arguments[arguments.length - 1] === undefined) {
            var fn = function(objV, objS) {
                obj[keys][j][key] = arguments[i][keys][j][key]
            }
        } else {
            var fn = arguments[arguments.length - 1]
        }
        for (var i = 1; i < arguments.length - 1; i++) {
            for (keys in arguments[i]) { //arguments[1] == other
                if (!obj[keys]) { // obj[a]
                    obj[keys] = arguments[i][keys]
                } else {
                    obj[keys] = fn(obj[keys], arguments[i][keys])
                }
            }

        }
        return obj
    },
    /**
     * 创建一个调用func的函数，通过this绑定和创建函数的参数调用func，调用次数不超过 n 次。 之后再调用这个函数，将返回一次最后调用func的结果。
     * @param  n (number): 超过多少次不再调用func
     * @param  func (Function): 限制执行的函数。
     * @return (Function): 返回新的限定函数。
     */
    before: function(n, fn) {
        var count
        var theLastResult
        return function(arg) {
            count++
            if (count < n) {
                theLastResult = fn(arg)
                return theLastResult
            } else {
                return theLastResult
            }
        }
    },
    /**
     * _.before的反向函数;此方法创建一个函数，当他被调用n或更多次之后将马上触发func 。
     * @param  n (number): func 方法应该在调用多少次后才执行。
     * @param  func (Function): 用来限定的函数。
     * @return (Function): 返回新的限定函数。
     */
    after: function(n, fn) {
        var count = 0
        return function(arg) {
            count++
            if (count >= n) {
                return fn(arg)
            }
        }
    },
    /**
     * 执行深比较来确定两者的值是否相等。
     * @param  value (*): 用来比较的值。
     * @param  other (*): 另一个用来比较的值。
     * @return (boolean): 如果 两个值完全相同，那么返回 true，否则返回 false。
     * example
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     * isEqual(object, other);
     * // => true
     */
    isEqual: function(value1, value2) {
        //debugger
        if (value1 !== value1 && value2 !== value2) {
            return true
        }
        if (value1 === value2) {
            return true
        } else if (typeof value1 !== 'object' || typeof value2 !== 'object') {
            return false
        } else if (Array.isArray(value1) !== Array.isArray(value2)) {
            return false
        } else {
            var p
            for (p in value1) {
                if (typeof value1[p] !== 'undefined' && typeof value2[p] === 'undefined') {
                    return false;
                }
                if (!TianXiaoBo.isEqual(value1[p], value2[p])) {
                    return false;
                }

            }
            for (p in value2) {
                if (typeof value2[p] !== 'undefined' && typeof value1[p] === 'undefined') {
                    return false;
                }
            }
            return true;

        }
    },
    /**
     * 创建一个深比较的方法来比较给定的对象和 source 对象。 如果给定的对象拥有相同的属性值返回 true，否则返回 false。
     * @param  source (Object): 要匹配属性值的源对象。
     * @return (Function): 返回新的函数。
     */
    matches: function(source) {
        var self = this
        return function(obj) {
            for (key in source) {
                if (!self.isEqual(source[key], obj[key])) {
                    return false
                }
            }
            return true
        }
    },
    /**
     * 创建一个深比较的方法来比较给定对象的 path 的值是否是 srcValue 。 如果是返回 true ，否则返回 false 。
     * @param  path (Array|string): 给定对象的属性路径名。
     * srcValue (*): 要匹配的值。
     * @return (Function): 返回新的函数。
     */
    matchesProperty: function(path, value) {
        return function(obj) {
            if (TianXiaoBo.isEqual(eval('obj.' + path), value)) {
                return true
            } else {
                return false
            }
        }
    },
    /**
     * 创建一个返回给定对象的 path 的值的函数。
     * @param  path (Array|string): 要得到值的属性路径。
     * @return path (Array|string): 要得到值的属性路径。
     */
    property: function(path) {
        if (Array.isArray(path)) {
            path.join(".")
        }
        return function(obj) {
            return eval('obj.' + path)
        }
    },
    /**
     * 创建一个切片数组，去除array中从 predicate 返回假值开始到尾部的部分
     * @param  array (Array): 要查询的数组。
     * @param  [predicate=_.identity] (Function): 这个函数会在每一次迭代调用。
     * @return (Array): 返回array剩余切片。
     */
    dropRightWhile: function(arr, ident) {
        var newArray = Array.prototype.slice.call(arr)
        var self = this
        if (this.isObject(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj, ident)
            }
        }
        if (this.isArray(ident)) {

            var fn = function(obj) {
                return self.isEqual(obj[ident[0]], ident[1])
            }
        }
        if (this.isString(ident)) {
            var fn = function(obj) {
                return !(ident in obj)
            }
        }
        if (this.isFunction(ident)) {
            var fn = ident
        }
        for (var i = 0; i < arr.length; i++) {
            if (fn(arr[i])) {
                break
            }
        }
        newArray.length = i
        return newArray
    },
    /**
     * 创建一个切片数组，去除array中从起点开始到 predicate 返回假值结束部分。
     * @param  array (Array): 要查询的数组。
     * @param  [predicate=_.identity] (Function): 这个函数会在每一次迭代调用。
     * @return (Array): 返回array剩余切片。
     */
    dropWhile: function(arr, ident) {
        var newArray = Array.prototype.slice.call(arr)
        var self = this
        if (this.isObject(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj, ident)
            }
        }
        if (this.isArray(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj[ident[0]], ident[1])
            }
        }
        if (this.isString(ident)) {
            var fn = function(obj) {
                return !(ident in obj)
            }
        }
        if (this.isFunction(ident)) {
            var fn = ident
        }
        for (var i = 0; i < arr.length; i++) {
            if (fn(arr[i])) {
                newArray.shift()
            } else {
                return newArray
            }
        }
    },
    /**
     * 检查 value 是否是一个类 arguments 对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果value是一个 arguments 对象 返回 true，否则返回 false。
     */
    isArguments: function(arg) {
        if (arg.callee) {
            return true
        } else {
            return false
        }
    },
    /**
     * 检查 value 是否是 Array 类对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果value是一个数组返回 true，否则返回 false。
     */
    isArray: function(arr) {
        if (arr instanceof Array) {
            return true
        } else {
            return false
        }
    },
    /**
     * 检查 value 是否是原始 boolean 类型或者对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是一个布尔值，那么返回 true，否则返回 false。
     */
    isBoolean: function(value) {

        return typeof value === 'boolean'
    },
    /**
     * 检查 value 是否是 Date 对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是一个日期对象，那么返回 true，否则返回 false。
     */
    isDate: function(value) {

        return value instanceof Date
    },
    /**
     * 检查 value 是否是原始有限数值。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是一个有限数值，那么返回 true，否则返回 false。
     */
    isFinite: function(value) {
        if (typeof value == 'number') {
            if (value === 0) {
                return true
            } else if (value + value == value) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    },
    /**
     * 检查 value 是否是 Function 对象。
     * @param  value (*): 要检查的值
     * @return (boolean): 如果 value 是一个函数，那么返回 true，否则返回 false。
     */
    isFunction: function(value) {

        return typeof value === 'function'
    },
    /**
     * 检查 value 是否是 NaN。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是一个 NaN，那么返回 true，否则返回 false。
     */
    isNaN: function(value) {
        if (value !== value) {
            return true
        } else {
            if (typeof value == 'object') {
                if (value.valueOf() !== value.valueOf()) {
                    return true
                }
            } else {
                return false
            }
        }
    },
    /**
     * 检查 valuealue 是否是 null。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为null，那么返回 true，否则返回 false。
     */
    isNull: function(value) {
        if (value == undefined && value !== undefined) {
            return true
        } else {
            return false
        }
    },
    /**
     * 检查 value 是否是原始Number数值型 或者 对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个对象，那么返回 true，否则返回 false。
     */
    isNumber: function(value) {
        if (typeof value == 'number' || typeof value.valueOf() == 'number') {
            return true
        } else {
            return false
        }
    },
    /**
     * 检查 value 是否为 Object 的 language type
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个对象，那么返回 true，否则返回 false。
     */
    isObject: function(value) {
        if (this.isNull(value)) {
            return false
        } else if (this.isFunction(value)) {
            return true
        } else if (typeof value == 'object') {
            return true
        } else {
            return false
        }
    },
    /**
     * 检查 value 是否为RegExp对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个正则表达式，那么返回 true，否则返回 false。
     */
    isRegExp: function(value) {

        return value instanceof RegExp
    },
    /**
     * 检查 value 是否是原始字符串String或者对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个字符串，那么返回 true，否则返回 false。
     */
    isString: function(value) {

        return typeof value == 'string'
    },
    /**
     * 检查 value 是否是 undefined.
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是 undefined ，那么返回 true，否则返回 false。
     */
    isUndefined: function(value) {

        return typeof value == 'undefined'
    },
    /**
     * 是否是类数组对象或字符串
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    iscollection: function(value) {

        return this.isObject(value) || this.isString(value)
    },
    /**
     * 返回collection（集合）的长度，如果集合是类数组或字符串，返回其 length ；如果集合是对象，返回其可枚举属性的个数。
     * @param  collection (Array|Object): 要检查的集合
     * @return (number): 返回集合的长度。
     */
    size: function(collection) {
        var count = 0
        if (this.iscollection(collection)) {
            for (key in collection) {
                count++
            }
        }
        return count
    },
    /**
     * 检查 value 是否为一个空对象，集合，映射或者set。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为空，那么返回 true，否则返回 false。
     */
    isEmpty: function(value) {
        if (typeof value == 'object' || typeof value == 'string') {
            if (this.size(value)) {
                return false
            }
        }
        return true
    },
    /**
     * 这个方法返回首个提供的参数。
     * @param  value (*): 任何值。
     * @return (*): 返回 value.
     */
    identity: function(value) {

        return value
    },
    /**
     * 调用 iteratee 遍历 collection(集合) 中的每个元素， iteratee 调用3个参数： (value, index|key, collection)
     * @param  collection (Array|Object): 一个用来迭代的集合。
     * @param  [iteratee=_.identity] (Function): 每次迭代调用的函数。
     * @return (*): 返回集合 collection。
     */
    forEach: function(collection, iteratee) {
        if (iteratee == undefined) {
            this.identity(collection)
        }
        if (this.iscollection(collection)) {
            for (key in collection) {
                var tmp = iteratee(collection[key], key, collection)
                if (tmp === false) {
                    break
                }
            }
        }
        return collection
    },
    /**
     * 创建一个调用func的函数，通过this绑定和创建函数的参数调用func，调用次数不超过 n 次。 之后再调用这个函数，将返回一次最后调用func的结果。
     * @param  n (number): 超过多少次不再调用func（愚人码头注：限制调用func 的次数）。
     * @param  func (Function): 限制执行的函数。
     * @return (Function): 返回新的限定函数。
     */
    before: function(n, func) {
        var count
        var lastResult
        return function(arg) {
            count++
            if (count <= n) {
                lastResult = func(arg)
                return lastResult
            } else {
                return lastResult
            }
        }
    },
    /**
     * before的反向函数;此方法创建一个函数，当他被调用n或更多次之后将马上触发func 。
     * @param  n (number): func 方法应该在调用多少次后才执行。
     * @param  func (Function): 用来限定的函数
     * @return (Function): 返回新的限定函数。
     */
    after: function(n, func) {
        var co
        unt
        return function(arg) {
            count++
            if (count >= n) {
                return func(arg)
            }
        }
    },
    /**
     * 创建一个调用func的函数，thisArg绑定func函数中的 this ，并且func函数会接收partials附加参数。
     * _.bind.placeholder值，默认是以 _ 作为附加部分参数的占位符。
     * @param  func (Function): 绑定的函数。
     * @param  thisArg (*): func 绑定的this对象。
     * @param  [partials] (...*): 附加的部分参数。
     * @return (Function): 返回新的绑定函数。
     */
    bind: function(func, thisArg) {
        var self = this
        var temp = Array.prototype.slice.call(arguments, 2)
        return function(...args) {
            for (var i = 0; i < temp.length; i++) {
                if (self.isEqual(temp[i], _)) {
                    temp[i] = args.shift()
                }
            }
            return func.apply(thisArg, temp.concat(args))
        }
    },
    /**
     * 分配来源对象的可枚举属性到目标对象上。 来源对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。
     * @param  object (Object): 目标对象。
     * @param  [sources] (...Object): 来源对象。]
     * @return (Object): 返回 object.
     */
    assign: function(object, source) {
        for (var i = 0; i < arguments.length; i++) {
            for (key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    object[key] = arguments[i][key]
                }
            }
        }
        return object
    },
    /**
     * 这个方法类似 _.assign， 除了它会遍历并继承来源对象的属性。
     * @param  object (Object): 目标对象。
     * @param  [sources] (...Object): 来源对象。
     * @return (Object): 返回 object。n]
     */
    assignIn: function(object, source) {
        for (var i = 0; i < arguments.length; i++) {
            for (key in arguments[i]) {
                object[key] = arguments[i][key]
            }
        }
        return object
    },
    /**
     * 该方法类似_.find，区别是该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。
     * @param  array (Array): 要搜索的数组。
     * @param  [fromIndex=0] (number): The index to search from.
     * @return (number): 返回找到元素的 索引值（index），否则返回 -1。
     */
    findIndex: function(arr, ident, index) {
        index = index || 0
        var self = this
        if (this.isObject(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj, ident)
            }
        }
        if (this.isArray(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj[ident[0]], ident[1])
            }
        }
        if (this.isString(ident)) {
            var fn = function(obj) {
                return obj[ident]
            }
        }
        if (this.isFunction(ident)) {
            var fn = ident
        }
        for (var i = index; i < arr.length; i++) {
            if (fn(arr[i])) {
                return i
            }
        }
        return -1
    },
    /**
     * 这个方式类似 _.findIndex， 区别是它是从右到左的迭代集合array中的元素。
     * @param  array (Array): 要搜索的数组。
     * @param  [predicate=_.identity] (Array|Function|Object|string): 这个函数会在每一次迭代调用。
     * @param  [fromIndex=array.length-1] (number): The index to search from.
     * @return (number): 返回找到元素的 索引值（index），否则返回 -1。
     */
    findLastIndex: function(arr, ident, index) {
        index = index || arr.length - 1
        var self = this
        if (this.isObject(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj, ident)
            }
        }
        if (this.isArray(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj[ident[0]], ident[1])
            }
        }
        if (this.isString(ident)) {
            var fn = function(obj) {
                return obj[ident]
            }
        }
        if (this.isFunction(ident)) {
            var fn = ident
        }
        for (var i = index; i >= 0; i--) {
            if (fn(arr[i])) {
                return i
            }
        }
        return -1
    },
    /**
     * 根据 depth 递归减少 array 的嵌套层级
     * @param  array (Array): 需要减少嵌套层级的数组。
     * @param  [depth=1] (number):最多减少的嵌套层级数。
     * @return (Array): 返回减少嵌套层级后的新数组。
     */
    flattenDepth: function(arr, depth) {
        //debugger
        var result = arr
        for (var i = 0; i < depth; i++) {
            result = this.flatten(result)
        }
        return result
    },
    /**
     * 这个方法类似 _.intersection，区别是它接受一个 iteratee 调用每一个arrays的每个值以产生一个值，通过产生的值进行了比较。结果值是从第一数组中选择。
     * @params [arrays] (...Array): 待检查的数组。
     * @params [iteratee=_.identity] (Array|Function|Object|string): iteratee（迭代器）调用每个元素。
     * @return (Array): 返回一个包含所有传入数组交集元素的新数组。
     */
    intersectionBy: function() {
        var ident = arguments[arguments.length - 1]
        var result = []
        var self = this
        if (this.isString(ident)) {
            var fn = function(obj) {
                return obj[ident]
            }
        }
        if (this.isFunction(ident)) {
            var fn = ident
        }
        //return this.intersection(arguments[0].map(fn), arguments[1].map(fn))
        for (var keys in arguments[0]) {
            for (var key in arguments[1]) {
                if (fn(arguments[0][keys]) === fn(arguments[1][key])) {
                    result.push(arguments[0][keys])
                }
            }
        }
        return result
    },
    /**
     * 这个方法类似 _.intersection，区别是它接受一个 comparator 调用比较arrays中的元素。结果值是从第一数组中选择。comparator 会传入两个参数：(arrVal, othVal)。
     * @params [arrays] (...Array): 待检查的数组。
     * @params [comparator] (Function): comparator（比较器）调用每个元素。
     * @return (Array): 返回一个包含所有传入数组交集元素的新数组。
     */
    intersectionWith: function() {
        var ident = arguments[arguments.length - 1]
        var result = []
        for (var keys in arguments[0]) {
            for (var key in arguments[1]) {
                if (ident(arguments[0][keys], arguments[1][key])) {
                    result.push(arguments[0][keys])
                }
            }
        }
        return result
    },
    /**
     * 创建一个调用func的函数。调用func时最多接受 n个参数，忽略多出的参数。
     * @param  func (Function): 需要被限制参数个数的函数。
     * @param  [n=func.length] (number): 限制的参数数量。
     * @return (Function): 返回新的覆盖函数。
     */
    ary: function(func, n) {
        return function(args) {
            if (arguments.length > n) {
                arguments.length = n
            }
            return func(args)
        }
    },
    /**
     * 这个方法类似于_.pullAll ，区别是这个方法接受一个 iteratee（迭代函数） 调用 array 和 values的每个值以产生一个值，通过产生的值进行了比较。
     * @param  array (Array): 要修改的数组。
     * @param  values (Array): 要移除值的数组
     * @param  [iteratee=_.identity] (Array|Function|Object|string): iteratee（迭代器）调用每个元素。
     * @return (Array): 返回 array.
     */
    pullAllBy: function(arr, value, iter) {
        if (this.isString(iter)) {
            var fn = function(obj) {
                return obj[iter]
            }
        }
        for (var i = 0; i < value.length; i++) {
            for (var j = 0; j < arr.length; j++) {
                if (fn(value[i]) == fn(arr[j])) {
                    arr.splice(j, 1)
                    j--
                }
            }
        }
        return arr
    },
    /**
     * 这个方法类似于 _.pullAll，区别是这个方法接受 comparator 调用array中的元素和values比较。
     * @param  array (Array): 要修改的数组。
     * @param  values (Array): 要移除值的数组。
     * @param  [comparator] (Function): comparator（比较器）调用每个元素。
     * @return (Array): 返回 array。
     */
    pullAllWith: function(arr, oth, fn) {
        for (var i = 0; i < oth.length; i++) {
            for (var j = 0; j < arr.length; j++) {
                if (fn(arr[j], oth[i])) {
                    arr.splice(j, 1)
                    j--
                }
            }
        }
        return arr
    },
    /**
     * 这个方法类似 _.sortedIndex ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）元素，返回结果和value 值比较来计算排序。
     * @param  array (Array): 要检查的排序数组。
     * @param  value (*): 要评估的值。
     * @param  [iteratee=_.identity] (Array|Function|Object|string): 迭代函数，调用每个元素。
     * @return (number): 返回 value值 应该在数组array中插入的索引位置 index。
     */
    sortedIndexBy: function(arr, value, iter) {
        if (this.isFunction(iter)) {
            var fn = iter
        }
        if (this.isString(iter)) {
            var fn = function(obj) {
                return obj[iter]
            }
        }
        for (var i = 0; i < arr.length; i++) {
            if (fn(value) <= fn(arr[i])) {
                break
            }
        }
        return i
    },
    /**
     * 这个方法类似 _.indexOf，除了它是在已经排序的数组array上执行二进制检索。
     * @param  array (Array): 要搜索的数组。
     * @param  value (*): 搜索的值。
     * @return (number): 返回匹配值的索引位置，否则返回 -1。
     */
    sortedIndexOf: function(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (value == arr[i]) {
                return i
            }
        }
        return -1
    },
    /**
     * 此方法类似于_.sortedIndex，除了 它返回 value值 在 array 中尽可能大的索引位置（index）。
     * @param  array (Array): 要检查的排序数组。
     * @param  value (*): 要评估的值。
     * @return (number): 返回 value值 应该在数组array中插入的索引位置 index。
     */
    sortedLastIndex: function(arr, value) {
        for (var i = arr.length - 1; i >= 0; i--) {
            if (value == arr[i]) {
                return i + 1
            }
        }
        return -1
    },
    /**
     * 这个方法类似 _.sortedLastIndex ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）元素，返回结果和value 值比较来计算排序。
     * @param  array (Array): 要检查的排序数组。
     * @param  value (*): 要评估的值。
     * @param  [iteratee=_.identity] (Array|Function|Object|string): 迭代函数，调用每个元素。
     * @return (number): 返回 value值 应该在数组array中插入的索引位置 index。
     */
    sortedLastIndexBy: function(arr, value, iter) {
        if (this.isFunction(iter)) {
            var fn = iter
        }
        if (this.isString(iter)) {
            var fn = function(obj) {
                return obj[iter]
            }
        }
        for (var i = 0; i < arr.length; i++) {
            if (fn(value) < fn(arr[i])) {
                break
            }
        }
        return i
    },
    /**
     * 这个方法类似 _.lastIndexOf，除了它是在已经排序的数组array上执行二进制检索。
     * @param  array (Array): 要搜索的数组。
     * @param  value (*): 搜索的值。
     * @return (number): 返回匹配值的索引位置，否则返回 -1。
     */
    sortedLastIndexOf: function(arr, value) {
        for (var i = arr.length - 1; i >= 0; i--) {
            if (value == arr[i]) {
                return i
            }
        }
        return -1
    },
    /**
     * 这个方法类似 _.uniq，除了它会优化排序数组。
     * @param  array (Array): 要检查的数组。
     * @return (Array): 返回一个新的不重复的数组。
     */
    sortedUniq: function(arr) {
        arr.sort(function(a, b) {
            return a - b
        })
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i] == arr[i + 1]) {
                arr.splice(i, 1)
                i--
            }
        }
        return arr
    },
    /**
     * 这个方法类似 _.uniqBy，除了它会优化排序数组。
     * @param  array (Array): 要检查的数组。
     * @param  [iteratee] (Function): 迭代函数，调用每个元素。
     * @return (Array): 返回一个新的不重复的数组。
     */
    sortedUniqBy: function(arr, fn) {
        arr.sort(function(a, b) {
            return a - b
        })
        for (var i = 0; i < arr.length - 1; i++) {
            if (fn(arr[i]) == fn(arr[i + 1])) {
                arr.splice(i + 1, 1)
                i--
            }
        }
        return arr
    },
    /**
     * 从array数组的最后一个元素开始提取元素，直到 predicate 返回假值。predicate 会传入三个参数： (value, index, array)。
     * @param  array (Array): 要检索的数组。
     * @param  [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @return (Array): 返回 array 数组的切片。
     */
    takeRightWhile: function(arr, ident) {
        var self = this
        if (this.isObject(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj, ident)
            }
        }
        if (this.isArray(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj[ident[0]], ident[1])
            }
        }
        if (this.isString(ident)) {
            var fn = function(obj) {
                return !(ident in obj)
            }
        }
        if (this.isFunction(ident)) {
            var fn = ident
        }
        var result = []
        for (var i = arr.length - 1; i >= 0; i--) {
            if (fn(arr[i])) {
                result.unshift(arr[i])
            } else {
                return result
            }
        }
    },
    /**
     * 从array数组的起始元素开始提取元素，，直到 predicate 返回假值
     * @param  array (Array): 需要处理的数组
     * @param  [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @return (Array): 返回 array 数组的切片。
     */
    takeWhile: function(arr, ident) {
        var self = this
        if (this.isObject(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj, ident)
            }
        }
        if (this.isArray(ident)) {
            var fn = function(obj) {
                return self.isEqual(obj[ident[0]], ident[1])
            }
        }
        if (this.isString(ident)) {
            var fn = function(obj) {
                return !(ident in obj)
            }
        }
        if (this.isFunction(ident)) {
            var fn = ident
        }
        var result = []
        for (var i = 0; i < arr.length; i++) {
            if (fn(arr[i])) {
                result.push(arr[i])
            } else {
                return result
            }
        }
    },
    /**
     * 使用 iteratee 遍历自身的可枚举属性。 iteratee 会传入3个参数：(value, key, object)。 如果返回 false，iteratee 会提前退出遍历。
     * @param  object (Object): 要遍历的对象。
     * @param  [iteratee=_.identity] (Function): 每次迭代时调用的函数。
     * @return (Object): 返回 object。
     */
    forOwn: function(obj, iter) {
        for (keys in obj) {
            if (obj.hasOwnProperty(keys)) {
                if (iter(obj[keys], keys, obj) === false) {
                    break
                }
            }
        }
        return obj
    },
    /**
     * 这个方法类似 _.union ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。iteratee 会传入一个参数：(value)。
     * @param  [arrays] (...Array): 要检查的数组。
     * @param  [iteratee=_.identity] (Array|Function|Object|string): 迭代函数，调用每个元素。
     * @return (Array): 返回一个新的联合数组。
     */
    unionBy: function(arr, value, iter) {
        if (this.isString(iter)) {
            var fn = function(obj) {
                return obj[iter]
            }
        }
        if (this.isFunction(iter)) {
            fn = iter
        }
        var result = Array.prototype.slice.call(arr)
        var onOff = true
        for (var i = 0; i < value.length; i++) {
            onOff = true
            for (var j = 0; j < arr.length; j++) {
                if (fn(value[i]) == fn(arr[j])) {
                    onOff = false
                }
            }
            if (onOff) {
                result.push(value[i])
            }
        }
        return result
    },
    /**
     * 这个方法类似 _.union， 除了它接受一个 comparator 调用比较arrays数组的每一个元素
     * @params [arrays] (...Array): 要检查的数组
     * @params [comparator] (Function): 比较函数，调用每个元素。
     * @return (Array): 返回一个新的联合数组。
     */
    unionWith: function() {
        var temp = Array.prototype.slice.call(arguments)
        var onOff
        for (var i = 1; i < temp.length - 1; i++) {
            for (var j = 0; j < temp[i].length; j++) {
                onOff = true
                for (var k = 0; k < temp[0].length; k++) {
                    if (temp[temp.length - 1](temp[0][k], temp[i][j])) {
                        onOff = false
                        continue
                    }
                }
                if (onOff) {
                    temp[0].push(temp[i][j])
                }
            }
        }
        return temp[0]
    },
    /**
     * 这个方法类似 _.uniq ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。
     * @param  array (Array): 要检查的数组。
     * @param  [iteratee=_.identity] (Array|Function|Object|string): 迭代函数，调用每个元素。
     * @return (Array): 返回新的去重后的数组。
     */
    uniqBy: function(arr, iter) {
        var result = Array.prototype.slice.call(arr)
        if (this.isString(iter)) {
            var fn = function(obj) {
                return obj[iter]
            }
        }
        if (this.isFunction(iter)) {
            var fn = iter
        }
        for (var i = 0; i < result.length; i++) {
            for (var j = i + 1; j < result.length; j++) {
                if (fn(result[i]) == fn(result[j])) {
                    result.splice(j, 1)
                    j--
                }
            }
        }
        return result
    },
    uniqWith: function(arr, comp) {
        debugger
        var result = Array.prototype.slice.call(arr)
        for (var i = 0; i < result.length; i++) {
            for (var j = i + 1; j < result.length; j++) {
                if (comp(arr[i], arr[j])) {
                    result.splice(j, 1)
                    j--
                }
            }
        }
        return result
    },

    
    /**
     * 两个数相加。
     * @param augend (number): 相加的第一个数。
     * @param addend (number): 相加的第二个数。
     * @result (number): 返回总和。
     */
    add: function(num1, num2) {

        return num1 + num2
    },
    /**
     * 此方法类似于_.unzip，除了它接受一个iteratee指定重组值应该如何被组合。iteratee 调用时会传入每个分组的值： (...group)。
     * @param  array (Array): 要处理的分组元素数组。
     * @param  [iteratee=_.identity] (Function): 这个函数用来组合重组的值。
     * @return (Array): 返回重组元素的新数组。
     */
    unzipWith: function(arr, iter) {
        var result = []
        for (var j = 0; j < arr[0].length; j++) {
            for (var i = 0; i < arr.length - 1; i++) {
                result.push(iter(arr[i][j], arr[i + 1][j]))
            }
        }
        return result
    },
    arrayToLinkedList: function(array) {
        var result = {
            next: null
        }
        array.map(function(thevalue) {
            return {
                value: thevalue,
                next: null
            }
        }).reduce(function(list, curr) {
            list.next = curr
            return curr
        }, result)
        return result
    },
    /**
     * 这个方法类似 _.xor ，除了它接受 iteratee（迭代器），这个迭代器 调用每一个 arrays（数组）的每一个值，以生成比较的新值。iteratee 调用一个参数： (value).
     * @params [arrays] (...Array): 要检查的数组。
     * @params [iteratee=_.identity] (Array|Function|Object|string): 调用每一个元素的迭代函数。
     * @return (Array): 返回过滤值后的新数组。
     */
    xorBy: function() {
        var result = []
        var iter = arguments[arguments.length - 1]
        if (this.isString(iter)) {
            var fn = function(obj) {
                return obj[iter]
            }
        }
        if (this.isFunction(iter)) {
            var fn = iter
        }
        var temp = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
        var theComp = this.flattenDeep(temp)
        var count = 0
        for (var i = 0; i < theComp.length; i++) {
            count = 0
            for (var j = 0; j < theComp.length; j++) {
                if (this.isEqual(fn(theComp[i]), fn(theComp[j]))) {
                    count++
                }
            }
            if (count == 1) {
                result.push(theComp[i])
            }
        }
        return result
    },
    /**
     * 该方法是像 _.xor，除了它接受一个 comparator ，以调用比较数组的元素。 comparator 调用2个参数：(arrVal, othVal).
     * @params [arrays] (...Array): 要检查的数组。
     * @params [comparator] (Function): 调用每一个元素的比较函数。
     * @return (Array): 返回过滤值后的新数组。
     */
    xorWith: function() {
        var result = []
        var iter = arguments[arguments.length - 1]
        var temp = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
        var theComp = this.flattenDeep(temp)
        var count = 0
        for (var i = 0; i < theComp.length; i++) {
            count = 0
            for (var j = 0; j < theComp.length; j++) {
                if (iter(theComp[i], theComp[j])) {
                    count++
                }
            }
            if (count == 1) {
                result.push(theComp[i])
            }
        }
        return result
    },
    /**
     * 这个方法类似 _.fromPairs，除了它接受2个数组，第一个数组中的值作为属性标识符（属性名），第二个数组中的值作为相应的属性值。
     * @param  [props=[]] (Array): The property identifiers.
     * @param  [values=[]] (Array): The property values.
     * @return (Object): Returns the new object.
     */
    zipObject: function(props, value) {
        var result = {}
        for (var i = 0; i < props.length; i++) {
            result[props[i]] = value[i]
        }
        return result
    },
    /**
     * 这个方法类似 _.zipObject，除了它支持属性路径。
     * @param  [props=[]] (Array): 属性标识符（属性名）。
     * @param  [values=[]] (Array): 属性值。
     * @return (Object): 返回新对象。
     */
    zipObjectDeep: function(props, value) {
        debugger
        var result = {}
        for (var i = 0; i < props.length; i++) {
            var thePath = '.' + props[i]
            parse(thePath, result, value[i], 0)
        }
        return result
            /**
             * 解析字符串，将字符串路径添加到对象上，并返回对象
             * @param  {[string]} pathstr [路径字符串,且路径正确]
             * @param  {[object]} obj     [被添加的对象]
             * @param  {[number/string/boolean..]} [需要赋给叶子的值]
             * @return {[object]}         [返回对象]
             */
        function parse(pathstr, obj, value, flag) {
            var start = flag + 1,
                end = start + 1,
                key
            while (true) {
                if (pathstr[end] === '.' || pathstr[end] === '[' || pathstr[end] === undefined || pathstr[end] === ']') {
                    break
                }
                end++
            }
            key = pathstr.slice(start, end)
            if (pathstr[end] === ']') {
                end++
            }
            start = end
            if (key in obj) {
                parse(pathstr, obj[key], value, start)
            } else if (pathstr[end] === '.') {
                obj[key] = {}
                parse(pathstr, obj[key], value, start)
            } else if (pathstr[end] === '[') {
                obj[key] = []
                parse(pathstr, obj[key], value, start)
            } else if (pathstr[end] === undefined) {
                obj[key] = value
                return obj
            }
        }
    },
    /**
     * 这个方法类似于_.zip，不同之处在于它接受一个 iteratee（迭代函数），来 指定分组的值应该如何被组合。 该iteratee调用每个组的元素： (...group).
     * @param [arrays] (...Array): 要处理的数组。
     * @param [iteratee=_.identity] (Function): 函数用来组合分组的值。
     * @return (Array): 返回分组元素的新数组。
     */
    zipWith: function() {
        var result = [],
            theArr = Array.prototype.slice.call(arguments, 0, arguments.length - 1),
            theIter = arguments[arguments.length - 1],
            temp
        for (var j = 0; j < theArr[0].length; j++) {
            temp = []
            for (var i = 0; i < theArr.length; i++) {
                temp.push(theArr[i][j])
            }
            result.push(theIter(...temp))
        }
        return result
    },
    /**
     * 创建一个组成对象，key（键）是经过 iteratee（迭代函数） 执行处理collection中每个元素后返回的结果，每个key（键）对应的值是 iteratee（迭代函数）返回该key（键）的次数（愚人码头注：迭代次数）。
     * @param  {[type]} colle [description]
     * @param  {[type]} iter  [description]
     * @return {[type]}       [description]
     */
    countBy: function(colle, iter) {
        var count,
            result = {},
            keys
        if (this.isString(iter)) {
            var fn = function(obj) {
                return obj[iter]
            }
        }
        if (this.isFunction(iter)) {
            var fn = iter
        }
        for (var key in colle) {
            keys = fn(colle[key])
            if (keys in result) {
                count++
            } else {
                count = 1
            }
            result[keys] = count
        }
        return result
    },
    /**
     * 通过 predicate（断言函数） 检查 collection（集合）中的 所有 元素是否都返回真值。
     * @param  collection (Array|Object): 一个用来迭代的集合。
     * @param  [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @return (boolean): 如果所有元素经 predicate（断言函数） 检查后都都返回真值，那么就返回true，否则返回 false 。
     */
    every: function(colle, pred) {
        //debugger
        if (this.isObject(pred)) {
            var fn = this.matches(pred)
        }
        if (this.isArray(pred)) {
            var fn = this.matchesProperty(...pred)
        }
        if (this.isString(pred)) {
            var fn = this.property(pred)
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        for (var i = 0; i < colle.length; i++) {
            if (!fn(colle[i])) {
                return false
            }
        }
        return true
    },
    /**
     * 遍历 collection（集合）元素，返回 predicate（断言函数）第一个返回真值的第一个元素。predicate（断言函数）调用3个参数： (value, index|key, collection)。
     * @param  collection (Array|Object): 一个用来迭代的集合。
     * @param  [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @param  [fromIndex=0] (number): 开始搜索的索引位置。
     * @return (*): 返回匹配元素，否则返回 undefined。
     */
    find: function(colle, pred, index) {
        if (index === undefined) {
            index = 0
        }
        if (this.isObject(pred)) {
            var fn = this.matches(pred)
        }
        if (this.isArray(pred)) {
            var fn = this.matchesProperty(...pred)
        }
        if (this.isString(pred)) {
            var fn = this.property(pred)
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        for (var i = index; i < colle.length; i++) {
            if (fn(colle[i])) {
                return colle[i]
            }
        }
    },
    /**
     * 这个方法类似_.find ，不同之处在于，_.findLast是从右至左遍历collection （集合）元素的。
     * @param  collection (Array|Object): 一个用来迭代的集合。
     * @param  [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @param  [fromIndex=collection.length-1] (number): 开始搜索的索引位置。
     * @return (*): 返回匹配元素，否则返回 undefined。
     */
    findLast: function(colle, pred, index) {
        if (index === undefined) {
            index = colle.length - 1
        }
        if (this.isObject(pred)) {
            var fn = this.matches(pred)
        }
        if (this.isArray(pred)) {
            var fn = this.matchesProperty(...pred)
        }
        if (this.isString(pred)) {
            var fn = this.property(pred)
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        for (var i = index; i >= 0; i--) {
            if (fn(colle[i])) {
                return colle[i]
            }
        }
    },
    /**
     * 创建一个扁平化（愚人码头注：同阶数组）的数组，这个数组的值来自collection（集合）中的每一个值经过 iteratee（迭代函数） 处理后返回的结果，并且扁平化合并。 iteratee 调用三个参数： (value, index|key, collection)。
     * @param  collection (Array|Object): 一个用来迭代遍历的集合。
     * @param  [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @return (Array): 返回新扁平化数组。
     */
    flatMap: function(colle, iter) {
        var result = []
        if (this.isFunction(iter)) {
            var fn = iter
        }
        for (var i = 0; i < colle.length; i++) {
            result.push(fn(colle[i]))
        }
        return this.flatten(result)
    },
    /**
     * 这个方法类似 _.flatMap 不同之处在于，_.flatMapDeep 会继续扁平化递归映射的结果。
     * @param  collection (Array|Object): 一个用来迭代的集合。
     * @param  [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @return (Array): 返回新扁平化数组。
     */
    flatMapDeep: function(colle, iter) {
        var result = []
        if (this.isFunction(iter)) {
            var fn = iter
        }
        for (var i = 0; i < colle.length; i++) {
            result.push(fn(colle[i]))
        }
        return this.flattenDeep(result)
    },
    /**
     * 该方法类似_.flatMap，不同之处在于，_.flatMapDepth 会根据指定的 depth（递归深度）继续扁平化递归映射结果。
     * @param  collection (Array|Object): 一个用来迭代的集合。
     * @param  [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @param  [depth=1] (number): 最大递归深度。
     * @return (Array): 返回新扁平化数组。
     */
    flatMapDepth: function(colle, iter, depth) {
        if (depth === undefined) {
            depth = 1
        }
        var result = []
        if (this.isFunction(iter)) {
            var fn = iter
        }
        for (var i = 0; i < colle.length; i++) {
            result.push(fn(colle[i]))
        }
        return this.flattenDepth(result, depth)
    },
    /**
     * 调用 iteratee 遍历 collection(集合) 中的每个元素， iteratee 调用3个参数： (value, index|key, collection)。 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。
     * @param  collection (Array|Object): 一个用来迭代的集合。
     * @param  [iteratee=_.identity] (Function): 每次迭代调用的函数。
     * @return (*): 返回集合 collection。
     */
    forEachRight: function(collection, iteratee) {
        if (this.iscollection(collection)) {
            var theKey = []
            for (key in collection) {
                theKey.unshift(key)
            }
            for (var i = 0; i < theKey.length; i++) {
                if (!iteratee(collection[theKey[i]], theKey[i], collection) === false) {
                    break
                }
            }
        }
        return collection
    },
    /**
     * 创建一个对象，key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果。
     * @param  collection (Array|Object): 一个用来迭代的集合。
     * @param  [iteratee=_.identity] (Array|Function|Object|string): 这个迭代函数用来转换key。
     * @return (Object): 返回一个组成聚合的对象。
     */
    groupBy: function(colle, iter) {
        debugger
        if (this.isString(iter)) {
            var fn = function(obj) {
                return obj[iter]
            }
        }
        if (this.isFunction(iter)) {
            var fn = iter
        }
        var result = {}
        var theKey
        for (var key in colle) {
            theKey = fn(colle[key])
            if (theKey in result) {
                result[theKey].push(colle[key])
            } else {
                result[theKey] = [colle[key]]
            }

        }
        return result
    },
    /**
     * 检查 value(值) 是否在 collection(集合) 中。如果 collection(集合)是一个字符串，那么检查 value（值，子字符串） 是否在字符串中， 否则使用 SameValueZero 做等值比较。 如果指定 fromIndex 是负数，那么从 collection(集合) 的结尾开始检索。
     * @param  collection (Array|Object|string): 要检索的集合。
     * @param  value (*): 要检索的值。
     * @param  [fromIndex=0] (number): 要检索的 索引位置。
     * @return (boolean): 如果找到 value 返回 true， 否则返回 false。
     */
    includes: function(colle, value, index) {
        var temp = []
        if (index === undefined) {
            index = 0
        }
        for (var key in colle) {
            temp.push(colle[key])
        }
        if (this.isString(colle)) {
            var onOff
            for (var i = 0; i < colle.length; i++) {
                onOff = false
                if (value[0] === colle[i]) {
                    onOff = true
                    for (var j = 1; j < value.length; j++) {
                        if (value[j] !== colle[i + j]) {
                            onOff = false
                        }
                    }
                }
                if (onOff) {
                    return true
                }
            }
        } else {
            if (index < 0) {
                index = temp.length + index
                for (var i = index; i >= 0; i--) {
                    if (temp[i] === value) {
                        return true
                    }
                }
            } else {
                for (var i = index; i < temp.length; i++) {
                    if (temp[i] === value) {
                        return true
                    }
                }
            }
        }
        return false
    },
    /**
     * 调用path（路径）上的方法处理 collection(集合)中的每个元素，返回一个数组，包含每次调用方法得到的结果。任何附加的参数提供给每个被调用的方法。如果methodName（方法名）是一个函数，每次调用函数时，内部的 this 指向集合中的每个元素。
     * @param  collection (Array|Object): 用来迭代的集合。
     * @param  path (Array|Function|string): 用来调用方法的路径 或 者每次迭代调用的函数。
     * @param  [args] (...*): 调用每个方法的参数。
     * @return (Array): 返回的结果数组。
     */
    invokeMap: function(colle, path, ...args) {
        var result = []
        if (this.isString(path)) {
            for (var key in colle) {
                result.push(colle[key][path](...args))
            }
        }
        if (this.isFunction(path)) {
            for (var key in colle) {
                result.push(path.call(colle[key], ...args))
            }
        }
        return result
    },
    /**
     * 创建一个对象组成， key（键） 是 collection（集合）中的每个元素经过 iteratee（迭代函数） 处理后返回的结果。 每个 key（键）对应的值是生成key（键）的最后一个元素。iteratee（迭代函数）调用1个参数：(value)。
     * @param  collection (Array|Object): 用来迭代的集合。
     * @param  [iteratee=_.identity] (Array|Function|Object|string): 这个迭代函数用来转换key。
     * @return (Object): 返回一个组成聚合的对象。
     */
    keyBy: function(colle, iter) {
        var result = {}
        if (this.isString(iter)) {
            var fn = function(obj) {
                return obj[iter]
            }
        }
        if (this.isFunction(iter)) {
            var fn = iter
        }
        for (var key in colle) {
            result[fn(colle[key])] = colle[key]
        }
        return result
    },
    /**
     * 此方法类似于_.sortBy，除了它允许指定 iteratee（迭代函数）结果如何排序。 如果没指定 orders（排序），所有值以升序排序。 否则，指定为"desc" 降序，或者指定为 "asc" 升序，排序对应值。
     * @param  collection (Array|Object): 用来迭代的集合。
     * @param  [iteratees=[_.identity]] (Array[]|Function[]|Object[]|string[]): 排序的迭代函数。
     * @param  [orders] (string[]): iteratees迭代函数的排序顺序。
     * @return (Array): 排序排序后的新数组。
     */
    orderBy: function(colle, iter, order) {
        debugger
        for (var i = iter.length - 1; i >= 0; i--) {
            if (order[i] === 'desc') {
                colle.sort(function(a, b) {
                    if (a[iter[i]] > b[iter[i]]) {
                        return -1
                    } else if (a[iter[i]] == b[iter[i]]) {
                        return 0
                    } else {
                        return 1
                    }
                })
            } else {
                colle.sort(function(a, b) {
                    if (a[iter[i]] < b[iter[i]]) {
                        return -1
                    } else if (a[iter[i]] == b[iter[i]]) {
                        return 0
                    } else {
                        return 1
                    }
                })
            }
        }
        return colle
    },
    /**
     * 创建一个分成两组的元素数组，第一组包含predicate（断言函数）返回为 truthy（真值）的元素，第二组包含predicate（断言函数）返回为 falsey（假值）的元素。predicate 调用1个参数：(value)。
     * @param  collection (Array|Object): 用来迭代的集合。
     * @param  {[predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @return (Array): 返回元素分组后的数组。
     */
    partition: function(colle, pred) {
        var result = [
            [],
            []
        ]
        if (this.isString(pred)) {
            var fn = this.property(pred)
        }
        if (this.isObject(pred)) {
            var fn = this.matches(pred)
        }
        if (this.isArray(pred)) {
            var fn = this.matchesProperty(...pred)
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        for (var i = 0; i < colle.length; i++) {
            if (fn(colle[i])) {
                result[0].push(colle[i])
            } else {
                result[1].push(colle[i])
            }
        }
        return result
    },
    /**
     * _.filter的反向方法;此方法 返回 predicate（断言函数） 不 返回 truthy（真值）的collection（集合）元素（愚人码头注释：非真）。
     * @param  collection (Array|Object): 用来迭代的集合。
     * @param  [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @return (Array): 返回过滤后的新数组
     */
    reject: function(colle, pred) {
        var result = []
        if (this.isObject(pred)) {
            var fn = this.matches(pred)
        }
        if (this.isArray(pred)) {
            var fn = this.matchesProperty(...pred)
        }
        if (this.isString(pred)) {
            var fn = this.property(pred)
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        for (var i = 0; i < colle.length; i++) {
            if (!fn(colle[i])) {
                result.push(colle[i])
            }
        }
        return result
    },
    /**
     * 从collection（集合）中获得一个随机元素。
     * @param  collection (Array|Object): 要取样的集合。
     * @return (*): 返回随机元素。
     */
    sample: function(colle) {
        var theKey = parseInt(Math.random() * colle.length)
        return colle[theKey]
    },
    /**
     * 从collection（集合）中获得 n 个随机元素。
     * @param  collection (Array|Object): 要取样的集合。
     * @param  [n=1] (number): 取样的元素个数。
     * @return (Array): 返回随机元素。
     */
    sampleSize: function(colle, n) {
        var result = [],
            theKey
        if (n === undefined) {
            n = 1
        }
        if (n > colle.length) {
            n = colle.length
        }
        for (var i = 0; i < n; i++) {
            theKey = parseInt(Math.random() * colle.length)
            result.push(colle[theKey])
        }
        return result
    },
    /**
     * 通过 predicate（断言函数） 检查collection（集合）中的元素是否存在 任意 truthy（真值）的元素，一旦 predicate（断言函数） 返回 truthy（真值），遍历就停止。 predicate 调用3个参数：(value, index|key, collection)。
     * @param  collection (Array|Object): 用来迭代的集合。
     * @param  [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
     * @return (boolean): 如果任意元素经 predicate 检查都为 truthy（真值），返回 true ，否则返回 false 。
     */
    some: function(colle, pred) {
        if (this.isObject(pred)) {
            var fn = this.matches(pred)
        }
        if (this.isArray(pred)) {
            var fn = this.matchesProperty(...pred)
        }
        if (this.isString(pred)) {
            var fn = this.property(pred)
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        for (var i = 0; i < colle.length; i++) {
            if (fn(colle[i], i, colle)) {
                return true
            }
        }
        return false
    },
    /**
     * 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。
     * @param  collection (Array|Object): 用来迭代的集合。
     * @param [iteratees=[_.identity]] (...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])): 这个函数决定排序。
     * @return (Array): 返回排序后的数组。
     */
    sortBy: function(colle) {
        debugger
        for (var i = 1; i < arguments.length; i++) {
            if (this.isFunction(arguments[i][0])) {
                var fn = arguments[i][0]
                colle.sort(function(a, b) {
                    if (fn(a) < fn(b)) {
                        return -1
                    } else if (fn(a) === fn(b)) {
                        return 0
                    } else {
                        return 1
                    }
                })
            }
            if (this.isArray(arguments[i])) {
                for (var k = arguments[i].length - 1; k >= 0; k--) {
                    var theValue = arguments[i]
                    colle.sort(function(a, b) {
                        if (a[theValue[k]] < b[theValue[k]]) {
                            return -1
                        } else if (a[theValue[k]] === b[theValue[k]]) {
                            return 0
                        } else {
                            return 1
                        }
                    })
                }
            }
            if (this.isString(arguments[i])) {
                var theStr = arguments[i]
                colle.sort(function(a, b) {
                    if (a[theStr] < b[theStr]) {
                        return -1
                    } else if (a[theStr] < b[theStr]) {
                        return 0
                    } else {
                        return 1
                    }
                })
            }
        }
        return colle
    },
    /**
     * 推迟调用func，直到当前堆栈清理完毕。 调用时，任何附加的参数会传给func。
     * @param  func (Function): 要延迟的函数。
     * @param  [args] (...*): 会在调用时传给 func 的参数
     * @return (number):返回计时器 id。
     */
    defer: function(func, ...args) {

        return setTimeout(func(...args), 0);
    },
    /**
     * 延迟 wait 毫秒后调用 func。 调用时，任何附加的参数会传给func。
     * @param  func (Function): 要延迟的函数。
     * @param  wait (number): 要延迟的毫秒数。
     * @param  [args] (...*): 会在调用时传入到 func 的参数。
     * @return (number): 返回计时器 id
     */
    delay: function(func, wait, ...args) {

        return setTimeout(func(...args), wait);
    },
    /**
     * 如果 value 不是数组, 那么强制转为数组。
     * @param  value (*): 要处理的值。
     * @return (Array): 返回转换后的数组。
     */
    castArray: function(value) {
        var result = []
        if (arguments.length === 0) {
            return result
        }
        if (this.isArray(value)) {
            return value
        } else {
            result.push(value)
        }
        return result
    },
    /**
     * 创建一个被打乱值的集合。 使用 Fisher-Yates shuffle 版本。
     * @param  collection (Array|Object): 要打乱的集合。
     * @return (Array): 返回打乱的新数组。
     */
    shuffle: function(colle) {
        var result = colle.sort(function(a, b) {
            if (Math.random() > 0.5) {
                return 1
            } else {
                return -1
            }
        })
        return result
    },
    /**
     * 通过调用断言source的属性与 object 的相应属性值，检查 object是否符合 source。当source偏应用时，这种方法和 _.conforms函数是等价的。
     * @param  object (Object): 要检查的对象。
     * @param  source (Object): 要断言属性是否符合的对象。
     * @return (boolean): 如果 object 符合，返回 true，否则 false。
     */
    conformsTo: function(obj, sour) {
        for (var key in obj) {
            if (key in sour) {
                if (sour[key](obj[key])) {
                    return true
                }
            }
        }
        return false
    },
    /**
     * 执行 SameValueZero 比较两者的值，来确定它们是否相等。
     * @param  value (*): 要比较的值。
     * @param  other (*): 另一个要比较的值。
     * @return (boolean): 如果两个值相等返回 true ，否则返回 false 。
     */
    eq: function(value1, value2) {
        if (typeof value1 === 'number' && typeof value2 === 'number') {
            if (value1.toString() === 'NaN' && value2.toString() === 'NaN') {
                return true
            }
        }
        if (value1 === value2) {
            return true
        }
        return false
    },
    /**
     * 检查 value是否大于 other。
     * @param  value (*): 要比较的值。
     * @param  other (*): 另一个要比较的值。
     * @return (boolean): 如果value 大于 other 返回 true，否则返回 false。
     */
    gt: function(value, other) {
        if (value > other) {
            return true
        }
        return false
    },
    /**
     * 检查 value是否大于或者等于 other。
     * @param  value (*): 要比较的值。
     * @param  other (*): 另一个要比较的值。
     * @return (boolean): 如果value 大于或者等于 other 返回 true，否则返回 false。
     */
    gte: function(value, other) {
        if (value >= other) {
            return true
        }
        return false
    },
    /**
     * 检查 value 是否是 ArrayBuffer 对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果value是一个数组 buffer 返回 true，否则返回 false。
     */
    isArrayBuffer: function(value) {

        return value instanceof ArrayBuffer
    },
    /**
     * 检查 value 是否是类数组。 如果一个值被认为是类数组，那么它不是一个函数，并且value.length是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER。
     * @param  value (*): 要检查的值
     * @return (boolean): 如果value是一个类数组，那么返回 true，否则返回 false。
     */
    isArrayLike: function(value) {
        if (this.isFunction(value)) {
            return false
        }
        if (typeof value === 'object' || typeof value === 'string') {
            if (Math.round(value.length) === value.length && 0 <= value.length && value.length <= Number.MAX_SAFE_INTEGER) {
                return true
            }
        }
        return false
    },
    /**
     * 这个方法类似_.isArrayLike。除了它还检查value是否是个对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是一个类数组对象，那么返回 true，否则返回 false。
     */
    isArrayLikeObject: function(value) {
        if (this.isFunction(value)) {
            return false
        }
        if (typeof value === 'object') {
            if (Math.round(value.length) === value.length && 0 <= value.length && value.length <= Number.MAX_SAFE_INTEGER) {
                return true
            }
        }
        return false
    },
    /**
     * 检查 value 是否是可能是 DOM 元素。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是一个DOM元素，那么返回 true，否则返回 false。
     */
    isElement: function(value) {
        if (value instanceof HTMLElement) {
            return true
        }
        return false
    },
    /**
     * 检查 value 是否是 Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, 或者 URIError对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是一个错误（Error）对象，那么返回 true，否则返回 false。
     */
    isError: function(value) {

        return value instanceof Error
    },
    isInteger: function(value) {
        return parseInt(value) === value
    },
    /**
     * 检查 value 是否为有效的类数组长度。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是一个有效长度，那么返回 true，否则返回 false。
     */
    isLength: function(value) {
        if (parseInt(value) === value) {
            if (0 <= value && value <= Number.MAX_SAFE_INTEGER) {
                return true
            }
        }
        return false
    },
    /**
     * 检查 value 是否为一个 Map 对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是一个 Map 对象，那么返回 true，否则返回 false。
     */
    isMap: function(value) {

        return value instanceof Map
    },
    /**
     * 执行一个深度比较，来确定 object 是否含有和 source 完全相等的属性值。
     * @param  object (Object): 要检查的对象。
     * @param  source (Object): 属性值相匹配的对象。
     * @return (boolean): 如果object匹配，那么返回 true，否则返回 false。
     */
    isMatch: function(obj, source) {
        if (source === undefined) {
            var self = this
            return function(obj) {
                for (key in obj) {
                    if (!self.isEqual(obj[key], obj[key])) {
                        return false
                    }
                }
                return true
            }
        } else {
            for (var key in source) {
                if (this.isEqual(obj[key], source[key])) {
                    return true
                }
            }
            return false
        }
    },
    /**
     * 检查 value 是否是一个原生函数。未实现
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 是一个 原生函数，那么返回 true，否则返回 false。
     */
    isNative: function(value) {
        if (value === undefined) {
            return true
        }
        return value instanceof Function
    },
    /**
     * 检查 value 是否是 null 或者 undefined。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为null 或 undefined，那么返回 true，否则返回 false。
     */
    isNil: function(value) {
        if (value === undefined || value === null) {
            return true
        }
        return false
    },
    /**
     * 检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"。
     * @param  value (*): 要检查的值。
     * @return {Boolean}       [description]
     */
    isObjectLike: function(value) {
        if (typeof value === 'object' && value !== null) {
            return true
        }
        return false
    },
    /**
     * 检查 value 是否是普通对象。 也就是说该对象由 Object 构造函数创建，或者 [[Prototype]] 为 null 。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个普通对象，那么返回 true，否则返回 false。
     */
    isPlainObject: function(value) {
        if (Object.getPrototypeOf(value) === null || (value).constructor === Object) {
            return true
        }
        return false
    },
    /**
     * 检查 value 是否是一个安全整数。 一个安全整数应该是符合 IEEE-754 标准的非双精度浮点数。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个安全整数，那么返回 true，否则返回 false。
     */
    isSafeInteger: function(value) {

        return value === parseInt(value)
    },
    /**
     * 检查 value 是否是一个Set对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个 set 对象，那么返回 true，否则返回 false。
     */
    isSet: function(value) {

        return value instanceof Set
    },
    /**
     * 检查 value 是否是原始 Symbol 或者对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个symbol，那么返回 true，否则返回 false。
     */
    isSymbol: function(value) {
        if (typeof value === 'symbol' || typeof value === 'object') {
            return true
        }
        return false
    },
    /**
     * 检查 value 是否是TypedArray。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个typed array，那么返回 true，否则返回 false。
     */
    isTypedArray: function(value) {
        if (value.constructor === Int8Array) {
            return true
        }
        if (value.constructor === Uint8Array) {
            return true
        }
        if (value.constructor === Uint8ClampedArray) {
            return true
        }
        if (value.constructor === Int16Array) {
            return true
        }
        if (value.constructor === Uint16Array) {
            return true
        }
        if (value.constructor === Int32Array) {
            return true
        }
        if (value.constructor === Uint32Array) {
            return true
        }
        if (value.constructor === Float32Array) {
            return true
        }
        if (value.constructor === Float64Array) {
            return true
        }
        return false
    },
    /**
     * 检查 value 是否是 WeakMap 对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个 WeakMap 对象 ，那么返回 true，否则返回 false。
     */
    isWeakMap: function(value) {

        return value instanceof WeakMap
    },
    /**
     * 检查 value 是否是 WeakSet 对象。
     * @param  value (*): 要检查的值。
     * @return (boolean): 如果 value 为一个 WeakSet 对象 ，那么返回 true，否则返回 false。
     */
    isWeakSet: function(value) {

        return value instanceof WeakSet
    },
    /**
     * 检查 value 是否小于 other。
     * @param  value (*): 用来比较的值。
     * @param  other (*): 另一个用来比较的值。
     * @return (boolean): 如果value 小于等于 other 返回 true，否则返回 false。
     */
    lt: function(value, other) {
        if (value < other) {
            return true
        }
        return false
    },
    /**
     * 检查 value 是否小于等于 other。
     * @param  value (*): 用来比较的值。
     * @param  other (*): 另一个用来比较的值。
     * @return {[type]}       [description]
     */
    lte: function(value, other) {
        if (value <= other) {
            return true
        }
        return false
    },
    /**
     * 转换 value 为一个数组。
     * @param  value (*): 要转换的值。
     * @return (Array): 返回转换后的数组。
     */
    toArray: function(value) {
        var result = []
        if (typeof value === 'object' && value !== null) {
            for (var key in value) {
                result.push(value[key])
            }
        }
        if (typeof value === 'string') {
            for (var i = 0; i < value.length; i++) {
                result.push(value[i])
            }
        }
        return result
    },
    /**
     * 转换 value 为一个有限数字。
     * @param  value (*): 要转换的值。
     * @return (number): 返回转换后的数字。
     */
    toFinite: function(value) {
        if (isNaN(Number(value) === NaN)) {
            return "it's not a number"
        } else {
            if (Number.MIN_VALUE <= Number(value) && Number(value) <= Number.MAX_VALUE) {
                return Number(value)
            } else if (value < 0) {
                return Number.MIN_VALUE
            } else {
                return Number.MAX_VALUE
            }
        }
    },
    /**
     * 转换 value 为一个整数。
     * @param  value (*): 要转换的值。
     * @return (number): 返回转换后的整数。
     */
    toInteger: function(value) {
        var num = Number(value)
        if (isNaN(num === NaN)) {
            return "it's not a number"
        } else {
            if (Number.MIN_VALUE <= num && num <= Number.MAX_VALUE) {
                if (num >= 0) {
                    return Math.round(num)
                } else {
                    return 0
                }
            } else if (value < 0) {
                return 0
            } else {
                return Number.MAX_VALUE
            }
        }
    },
    /**
     * 转换 value 为用作类数组对象的长度整数。
     * @param  value (*): 要转换的值。
     * @return (number): 返回转换后的整数。
     */
    toLength: function(value) {
        var num = Number(value)
        if (isNaN(num === NaN)) {
            return "it's not a number"
        } else {
            if (0 <= num && num <= 4294967295) {
                return Math.round(num)
            } else if (value < 0) {
                return 0
            } else {
                return 4294967295
            }
        }
    },
    /**
     * 转换 value 为一个数字。
     * @param  value (*): 要处理的值。
     * @return (number): 返回数字。
     */
    toNumber: function(value) {
        if (isNaN(Number(value) === NaN)) {
            return "it's not a number"
        } else {
            return Number(value)
        }
    },
    /**
     * 转换 value 为安全整数。 安全整数可以用于比较和准确的表示。
     * @param  value (*): 要转换的值。
     * @return (number): 返回转换后的整数。
     */
    toSafeInteger: function(value) {
        var num = Number(value)
        if (isNaN(num === NaN)) {
            return "it's not a number"
        } else if (num < -9007199254740991) {
            return -9007199254740991
        } else if (num > 9007199254740991) {
            return 9007199254740991
        } else {
            return Math.round(num)
        }
    },
    /**
     * 根据 precision（精度） 向上舍入 number。（愚人码头注： precision（精度）可以理解为保留几位小数。）
     * @param  number (number): 要向上舍入的值。
     * @param  [precision=0] (number): 向上舍入的的精度。
     * @return (number): 返回向上舍入的值。
     */
    ceil: function(number, prec) {
        if (prec === undefined) {
            prec = 0
        }
        var temp = number
        var count = 0
        while (parseInt(temp) !== temp) {
            temp *= 10
            count++
        }
        var d = Math.pow(10, count - prec)
        if (parseInt(temp / d) === temp / d) {
            return number
        } else {
            temp = parseInt(temp / d) + 1
            return temp / Math.pow(10, prec)
        }
    },
    /**
     * 两个数相除。
     * @param  dividend (number): 相除的第一个数。
     * @param  divisor (number): 相除的第二个数。
     * @return (number): 返回商数。
     */
    divide: function(dividend, divisor) {

        return dividend / divisor
    },
    /**
     * 根据 precision（精度） 向下舍入 number。（愚人码头注： precision（精度）可以理解为保留几位小数。）
     * @param  number (number): 要向下舍入的值。
     * @param  [precision=0] (number): 向下舍入的精度。
     * @return (number): 返回向下舍入的值。
     */
    floor: function(number, prec) {
        if (prec === undefined) {
            prec = 0
        }
        var temp = number
        var count = 0
        while (parseInt(temp) !== temp) {
            temp *= 10
            count++
        }
        var d = Math.pow(10, count - prec)
        temp = parseInt(temp / d)
        return temp / Math.pow(10, prec)
    },
    /**
     * 计算 array 中的最大值。 如果 array 是 空的或者假值将会返回 undefined。
     * @param  array (Array): 要迭代的数组。
     * @return (*): 返回最大的值。
     */
    max: function(arr) {
        if (arr.length === 0) {
            return undefined
        }
        if (arr.length === 1) {
            return arr[0]
        }
        return arr.reduce((a, b) => a > b ? a : b)
    },
    /**
     * 这个方法类似 _.max 除了它接受 iteratee 来调用 array中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: (value) 。
     * @param  array (Array): 要迭代的数组。
     * @param  [iteratee=_.identity] (Function): 调用每个元素的迭代函数。
     * @return (*): 返回最大的值。
     */
    maxBy: function(arr, iter) {
        if (this.isString(iter)) {
            var fn = this.property(iter)
        }
        if (this.isFunction(iter)) {
            var fn = iter
        }
        return arr.reduce((a, b) => fn(a) > fn(b) ? a : b)
    },
    /**
     * 计算 array 的平均值。
     * @param  array (Array): 要迭代的数组。
     * @return (number): 返回平均值。
     */
    mean: function(arr) {
        if (arr.length === 0) {
            return undefined
        }
        if (arr.length === 1) {
            return arr[0]
        }
        return arr.reduce((a, b) => a + b) / arr.length
    },
    /**
     * 这个方法类似 _.mean， 除了它接受 iteratee 来调用 array中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: (value) 。
     * @param  array (Array): 要迭代的数组。
     * @param  [iteratee=_.identity] (Function): 调用每个元素的迭代函数。
     * @return (number): 返回平均值。
     */
    meanBy: function(arr, iter) {
        if (this.isString(iter)) {
            var fn = this.property(iter)
        }
        if (this.isFunction(iter)) {
            var fn = iter
        }
        return arr.map(a => fn(a)).reduce((a, b) => a + b) / arr.length
    },
    /**
     * 计算 array 中的最小值。 如果 array 是 空的或者假值将会返回 undefined。
     * @param  array (Array): 要迭代的数组。
     * @return (*): 返回最小的值。
     */
    min: function(arr) {
        if (arr.length === 0) {
            return undefined
        }
        if (arr.length === 1) {
            return arr[0]
        }
        return arr.reduce((a, b) => a < b ? a : b)
    },
    /**
     * 这个方法类似 _.min 除了它接受 iteratee 来调用 array中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: (value) 。
     * @param  array (Array): 要迭代的数组。
     * @param  [iteratee=_.identity] (Function): 调用每个元素的迭代函数。
     * @return (*): 返回最小的值。
     */
    minBy: function(arr, iter) {
        if (this.isString(iter)) {
            var fn = this.property(iter)
        }
        if (this.isFunction(iter)) {
            var fn = iter
        }
        return arr.reduce((a, b) => fn(a) < fn(b) ? a : b)
    },
    /**
     * 两个数相乘。
     * @param  augend (number): 相乘的第一个数。
     * @param  addend (number): 相乘的第二个数。
     * @return (number): 返回乘积。
     */
    multiply: function(multiplier, multiplicand) {

        return multiplier * multiplicand
    },
    /**
     * 根据 precision（精度） 四舍五入 number。
     * @param  number (number): 要四舍五入的数字。
     * @param  [precision=0] (number): 四舍五入的精度。
     * @return (number): 返回四舍五入的数字。
     */
    round: function(number, prec) {
        if (prec === undefined) {
            prec = 0
        }
        var temp = number
        var count = 0
        while (parseInt(temp) !== temp) {
            temp *= 10
            count++
        }
        var d = Math.pow(10, count - prec)
        if (temp / d - parseInt(temp / d) < 0.5) {
            return temp = parseInt(temp / d)
            return temp / Math.pow(10, prec)
        } else {
            temp = parseInt(temp / d) + 1
            return temp / Math.pow(10, prec)
        }
    },
    /**
     * 两数相减
     * @param  minuend (number): 相减的第一个数。
     * @param  subtrahend (number): 相减的第二个数。
     * @return (number): 返回差。
     */
    subtract: function(minuend, subtrahend) {

        return minuend - subtrahend
    },
    /**
     * 计算 array 中值的总和
     * @param  array (Array): 要迭代的数组。
     * @return (number): 返回总和。
     */
    sum: function(array) {

        return array.reduce((a, b) => a + b)
    },
    /**
     * 这个方法类似 _.summin 除了它接受 iteratee 来调用 array中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: (value) 。
     * @param  array (Array): 要迭代的数组。
     * @param  [iteratee=_.identity] (Function): 调用每个元素的迭代函数。
     * @return (number): 返回总和。
     */
    sumBy: function(arr, iter) {
        if (this.isString(iter)) {
            var fn = this.property(iter)
        }
        if (this.isFunction(iter)) {
            var fn = iter
        }
        return arr.map(a => fn(a)).reduce((a, b) => a + b)
    },
    /**
     * 返回限制在 lower 和 upper 之间的值。
     * @param  number (number): 被限制的值。
     * @param  [lower] (number): 下限。
     * @param  upper (number): 上限
     * @return (number): 返回被限制的值。
     */
    clamp: function(num, low, upp) {

        return num > low ? (num > upp ? upp : num) : low
    },
    /**
     * 检查 n 是否在 start 与 end 之间，但不包括 end。 如果 end 没有指定，那么 start 设置为0。 如果 start 大于 end，那么参数会交换以便支持负范围。
     * @param  number (number): 要检查的值。
     * @param  [start=0] (number): 开始范围。
     * @param  end (number): 结束范围。
     * @return (boolean): 如果number在范围内 ，那么返回true，否则返回 false。
     */
    inRange: function(number, start, end) {
        if (end === undefined) {
            end = start
            start = 0
        }
        number = Math.abs(number)
        start = Math.abs(start)
        end = Math.abs(end)
        return start <= number && number < end ? true : false
    },
    /**
     * 产生一个包括 lower 与 upper 之间的数。 如果只提供一个参数返回一个0到提供数之间的数。 如果 floating 设为 true，或者 lower 或 upper 是浮点数，结果返回浮点数。
     * @param  [lower=0] (number): 下限。
     * @param  [upper=1] (number): 上限。
     * @param  [floating] (boolean): 指定是否返回浮点数。
     * @return (number): 返回随机数。
     */
    random: function(low, upp, float) {
        if (float === undefined) {
            if (upp === undefined) {
                upp = low
                low = 0
                float = false
            } else if (parseInt(upp) === upp) {
                float = false
            } else if (typeof upp !== 'number') {
                float = upp
                upp = low
                low = 0
            } else {
                float = true
            }
        }
        if (low === upp) {
            return low
        } else if (low > upp) {
            var temp = low
            low = upp
            upp = temp
        }
        var num
        var sym
        do {
            num = Math.random()
            sym = Math.random() > 0.5 ? 1 : -1
            if (low >= 0) {
                sym = 1
            }
            num = num * (Math.abs(low) > Math.abs(upp) ? Math.abs(low) : Math.abs(upp)) * sym
            num = float ? num : Math.round(num)
        } while (num < low || upp <= num)
        return num
    },
    /**
     * 分配来源对象的可枚举属性到目标对象所有解析为 undefined 的属性上。 来源对象从左到右应用。 一旦设置了相同属性的值，后续的将被忽略掉。
     * @param  object (Object): 目标对象。
     * @param  [sources] (...Object): 来源对象。
     * @return (Object): 返回 object。
     */
    defaults: function(obj) {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (key in obj) {
                    continue
                } else {
                    obj[key] = arguments[i][key]
                }
            }
        }
        return obj
    },
    /**
     * 这个方法类似 _.defaults，除了它会递归分配默认属性。
     * @param  object (Object): 目标对象。
     * @param  [sources] (...Object): 来源对象。
     * @return (Object): 返回 object。
     */
    defaultsDeep: function(obj) {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (key in obj) {
                    if (typeof obj[key] === 'object') {
                        this.defaults(obj[key], arguments[i][key])
                    } else {
                        continue
                    }
                } else {
                    obj[key] = arguments[i][key]
                }
            }
        }
        return obj
    },
    /**
     * 这个方法类似 _.find 。 除了它返回最先被 predicate 判断为真值的元素 key，而不是元素本身。
     * @param  object (Object): 需要检索的对象。
     * @param  [predicate=_.identity] (Function): 每次迭代时调用的函数。
     * @return (*): 返回匹配的 key，否则返回 undefined。
     */
    findKey: function(colle, pred) {
        if (this.isObject(pred)) {
            var fn = this.matches(pred)
        }
        if (this.isArray(pred)) {
            var fn = this.matchesProperty(...pred)
        }
        if (this.isString(pred)) {
            var fn = this.property(pred)
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        for (var key in colle) {
            if (fn(colle[key])) {
                return key
            }
        }
    },
    /**
     * 这个方法类似_.findKey。 不过它是反方向开始遍历的。
     * @param  object (Object): 需要检索的对象。
     * @param  [predicate=_.identity] (Function): 每次迭代时调用的函数。
     * @return (*): 返回匹配的 key，否则返回 undefined.
     */
    findLastKey: function(colle, pred) {
        if (this.isObject(pred)) {
            var fn = this.matches(pred)
        }
        if (this.isArray(pred)) {
            var fn = this.matchesProperty(...pred)
        }
        if (this.isString(pred)) {
            var fn = this.property(pred)
        }
        if (this.isFunction(pred)) {
            var fn = pred
        }
        var keys = Object.keys(colle)
        for (var i = keys.length - 1; i >= 0; i--) {
            if (fn(colle[keys[i]])) {
                return keys[i]
            }
        }
    },
    /**
     * 这个方法类似 _.forIn。 除了它是反方向开始遍历object的。
     * @param  object (Object): 要遍历的对象。
     * @param  [iteratee=_.identity] (Function): 每次迭代时调用的函数。
     * @return (Object): 返回 object。
     */
    forInRight: function(obj, fn) {
        var keys = []
        for (var key in obj) {
            keys.push(key)
        }
        for (var i = keys.length - 1; i >= 0; i--) {
            if (obj[keys[i]]) {
                fn(obj[keys[i]], keys[i], obj)
            } else {
                break
            }
        }
        return obj
    },
    /**
     * 这个方法类似 _.forOwn。 除了它是反方向开始遍历object的。
     * @param  object (Object): 要遍历的对象。
     * @param  [iteratee=_.identity] (Function): 每次迭代时调用的函数。
     * @return (Object): 返回 object。
     */
    forOwnRight: function(obj, iter) {
        var keys = Object.keys(obj)
        for (var i = keys.length - 1; i >= 0; i--) {
            if (iter(obj[keys[i]], keys[i], obj) === false) {
                break
            }
        }
        return obj
    },
    /**
     * 调用 iteratee n 次，每次调用返回的结果存入到数组中。 iteratee 调用入1个参数： (index)。
     * @param  n (number): 调用 iteratee 的次数。
     * @param  [iteratee=_.identity] (Function): 每次迭代调用的函数。
     * @return [iteratee=_.identity] (Function): 每次迭代调用的函数。
     */
    times: function(n, iter) {
        var result = []
        for (var i = 0; i < n; i++) {
            result.push(iter(i))
        }
        return result
    },
    /**
     * 创建一个返回 value 的函数。
     * @param  value (*): 要新函数返回的值。
     * @return (Function): 返回新的常量函数。
     */
    constant: function(value) {
        return function() {
            return value
        }
    },
    /**
     * 创建一个函数属性名称的数组，函数属性名称来自object对象自身可枚举属性。
     * @param  object (Object): 要检查的对象。
     * @return (Array): 返回函数名。
     */
    functions: function(obj) {
        return Object.keys(obj)
    },
    functionsIn: function(obj) {
        var result = []
        for (var keys in obj) {
            result.push(keys)
        }
        return result
    },
    /**
     * 创建一个函数属性名称的数组，函数属性名称来自object对象自身和继承的可枚举属性。
     * @param  object (Object): 要检查的对象。
     * @return (Array): 返回函数名。
     */
    functionsIn: function(obj) {
        var result = []
        for (var keys in obj) {
            result.push(keys)
        }
        return result
    },
    /**
     * 根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
     * @param  object (Object): 要检索的对象。
     * @param  path (Array|string): 要获取属性的路径。
     * @param  [defaultValue] (*): 如果解析值是 undefined ，这值会被返回。
     * @return (*): 返回解析的值。
     */
    get: function(obj, path, defaults) {
        var temp = [],
            start = 0,
            end = 1,
            result
        if (typeof path === 'string') {
            while (start < path.length) {
                if (path[end] === '.' || path[end] === '[' || path[end] === undefined) {
                    temp.push(path.slice(start, end))
                    end++
                    start = end
                } else if (path[end] === ']') {
                    temp.push(path.slice(start, end))
                    end += 2
                    start = end
                } else {
                    end++
                }
            }
        } else {
            temp = path
        }
        if (obj.hasOwnProperty(temp[0])) {
            result = obj[temp[0]]
        }
        for (var i = 1; i < temp.length; i++) {
            if (temp[i] in result) {
                result = result[temp[i]]
            } else {
                return defaults
            }
        }
        if (result === undefined) {
            return defaults
        }
        return result
    },
    /**
     * 创建一个继承 prototype 的对象。 如果提供了 prototype，它的可枚举属性会被分配到创建的对象上。
     * @param  prototype (Object): 要继承的对象。
     * @param  [properties] (Object): 待分配的属性。
     * @return (Object): 返回新对象。
     */
    create: function(proto, prop) {
        var result = {}
        Object.setPrototypeOf(result, proto)
        if (prop) {
            for (var key in prop) {
                result[key] = prop[key]
            }
        }
        return result
    },
    /**
     * 检查 path 是否是object对象的直接属性。
     * @param  object (Object): 要检索的对象。
     * @param  path (Array|string): 要检查的路径path。
     * @return (boolean): 如果path存在，那么返回 true ，否则返回 false。
     */
    has: function(obj, path) {
        if (this.get(obj, path, 'undefined') === 'undefined') {
            return false
        }
        return true
    },
    /**
     * 检查 path 是否是object对象的直接或继承属性。
     * @param  object (Object): 要检索的对象。
     * @param  path (Array|string): 要检查的路径path。
     * @return (boolean): 如果path存在，那么返回 true ，否则返回 false。
     */
    hasIn: function(obj, path) {
        //debugger
        var temp = [],
            start = 0,
            end = 1
        if (typeof path === 'string') {
            while (start < path.length) {
                if (path[end] === '.' || path[end] === '[' || path[end] === undefined) {
                    temp.push(path.slice(start, end))
                    end++
                    start = end
                } else if (path[end] === ']') {
                    temp.push(path.slice(start, end))
                    end += 2
                    start = end
                } else {
                    end++
                }
            }
        } else {
            temp = path
        }
        return theIn(obj, temp, 0)

        function theIn(obj, arr, index) {
            if (index >= arr.length) {
                return true
            }
            if (arr[index] in obj) {
                return theIn(obj[arr[index]], arr, index + 1)
            } else {
                return false
            }
        }
    },
    /**
     * 这个方法类似 _.invert，除了倒置对象 是 collection（集合）中的每个元素经过 iteratee（迭代函数） 处理后返回的结果。每个反转键相应反转的值是一个负责生成反转值key的数组。
     * @param  object (Object): 要键值倒置对象。
     * @param  [iteratee=_.identity] (Function): 每次迭代时调用的函数。
     * @return (Object): 返回新的键值倒置后的对象。
     */
    invertBy: function(obj, iter) {
        var result = {},
            theKey
        if (iter === undefined) {
            var fn = function(obj) {
                return obj
            }
        }
        if (this.isFunction(iter)) {
            var fn = iter
        }
        for (keys in obj) {
            theKey = fn(obj[keys])
            if (!(theKey in result)) {
                result[theKey] = []
            }
            result[theKey].push(keys)
        }
        return result
    },
    /**
     * 调用object对象path上的方法。
     * @param  object (Object): 要检索的对象。
     * @param  path (Array|string): 用来调用的方法路径。
     * @param  [args] (...*): 调用的方法的参数。
     * @return (*): 返回调用方法的结果。
     */
    invoke: function(obj, path, ...args) {
        //debugger
        var temp = [],
            start = 0,
            end = 1
        if (typeof path === 'string') {
            while (start < path.length) {
                if (path[end] === '.' || path[end] === '[' || path[end] === undefined) {
                    temp.push(path.slice(start, end))
                    end++
                    start = end
                } else if (path[end] === ']') {
                    temp.push(path.slice(start, end))
                    end += 2
                    start = end
                } else {
                    end++
                }
            }
        } else {
            temp = path
        }
        result = obj[temp[0]]
        for (var i = 1; i < temp.length - 1; i++) {
            result = result[temp[i]]
        }
        return result[temp[temp.length - 1]](...args)
    },
    /**
     * 反向版 _.pick; 这个方法一个对象，这个对象由忽略属性之外的object自身和继承的可枚举属性组成。
     * @param  object (Object): 来源对象。
     * @param  [props] (...(string|string[])): 要被忽略的属性
     * @return (Object): 返回新对象。
     */
    omit: function(obj, prop) {
        var temp = [],
            start = 0,
            end = 1,
            result = {}
        if (typeof path === 'string') {
            while (start < path.length) {
                if (path[end] === '.' || path[end] === '[' || path[end] === undefined) {
                    temp.push(path.slice(start, end))
                    end++
                    start = end
                } else if (path[end] === ']') {
                    temp.push(path.slice(start, end))
                    end += 2
                    start = end
                } else {
                    end++
                }
            }
        } else {
            temp = prop
        }
        for (var key in obj) {
            result[key] = obj[key]
        }
        for (var i = 0; i < temp.length; i++) {
            if ((temp[i] in obj) && (obj.hasOwnProperty(temp[i]))) {
                delete result[temp[i]]
            }
        }
        return result
    },
    /**
     * 反向版 _.pickBy；这个方法一个对象，这个对象忽略 predicate（断言函数）判断不是真值的属性后，object自身和继承的可枚举属性组成。
     * @param  object (Object): 来源对象。
     * @param  [predicate=_.identity] (Function): 调用每一个属性的函数。
     * @return (Object): 返回新对象。
     */
    omitBy: function(obj, pred) {
        var result = {}
        for (var key in obj) {
            result[key] = obj[key]
        }
        for (var key in obj) {
            if (pred(obj[key])) {
                delete result[key]
            }
        }
        return result
    },
    /**
     * 这个方法类似 _.get， 除了如果解析到的值是一个函数的话，就绑定 this 到这个函数并返回执行后的结果。
     * @param  object (Object): 要检索的对象。
     * @param  path (Array|string): 要解析的属性路径。
     * @param  [defaultValue] (*): 如果值解析为 undefined，返回这个值。
     * @return (*): 返回解析后的值。
     */
    result: function(obj, path, defaults) {
        var temp = [],
            start = 0,
            end = 1,
            result
        if (typeof path === 'string') {
            while (start < path.length) {
                if (path[end] === '.' || path[end] === '[' || path[end] === undefined) {
                    temp.push(path.slice(start, end))
                    end++
                    start = end
                } else if (path[end] === ']') {
                    temp.push(path.slice(start, end))
                    end += 2
                    start = end
                } else {
                    end++
                }
            }
        } else {
            temp = path
        }
        if (obj.hasOwnProperty(temp[0])) {
            result = obj[temp[0]]
        }
        for (var i = 1; i < temp.length; i++) {
            if (temp[i] in result) {
                result = result[temp[i]]
            } else {
                if (typeof defaults === 'function') {
                    return defaults()
                }
                return defaults
            }
        }
        if (result === undefined) {
            if (typeof defaults === 'function') {
                return defaults()
            }
            return defaults
        }
        if (typeof result === 'function') {
            var self = this
            return result.call(self)
        }
        return result
    },
    /**
     * 设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。 使用 _.setWith 定制path创建。
     * @param object (Object): 要修改的对象。
     * @param path (Array|string): 要设置的对象路径。
     * @param value (*): 要设置的值。
     * @return (Object): 返回 object。
     */
    set: function(obj, path, value) {
        debugger
        var temp = [],
            start = 0,
            end = 1
        if (typeof path === 'string') {
            while (start < path.length) {
                if (path[end] === '.' || path[end] === '[' || path[end] === undefined) {
                    temp.push(path.slice(start, end))
                    end++
                    start = end
                } else if (path[end] === ']') {
                    temp.push(path.slice(start, end))
                    end += 2
                    start = end
                } else {
                    end++
                }
            }
        } else {
            temp = path
        }
        theIn(obj, temp, 0, value)
        return obj

        function theIn(obj, arr, index, value) {
            if (index >= arr.length - 1) {
                obj[arr[index]] = value
                return obj
            }
            if (arr[index] in obj) {
                return theIn(obj[arr[index]], arr, index + 1, value)
            } else if (arr[index + 1] === '0') {
                obj[arr[index]] = []
                return theIn(obj[arr[index]], arr, index + 1, value)
            } else {
                obj[arr[index]] = {}
                return theIn(obj[arr[index]], arr, index + 1, value)
            }
        }
    },
    /**
     * 这个方法类似_.set，除了它接受一个 customizer，调用生成对象的 path。 如果 customizer 返回 undefined 将会有它的处理方法代替
     * @param object (Object): 要修改的对象
     * @param path (Array|string): 要设置的对象路径。
     * @param value (*): 要设置的值。
     * @return (Object): 返回 object。
     */
    setWith: function(obj, path, value, cust) {
        debugger
        var temp = [],
            start = 0,
            end = 1
        if (typeof path === 'string') {
            while (start < path.length) {
                if (path[start] === '[') {
                    start++
                    end++
                }
                if (path[end] === '.' || path[end] === '[' || path[end] === undefined) {
                    temp.push(path.slice(start, end))
                    end++
                    start = end
                } else if (path[end] === ']') {
                    temp.push(path.slice(start, end))
                    end += 2
                    start = end
                } else {
                    end++
                }
            }
        } else {
            temp = path
        }
        theIn(obj, temp, 0, value)
        return obj

        function theIn(obj, arr, index, value) {
            if (index >= arr.length - 1) {
                obj[arr[index]] = value
                return obj
            }
            if (arr[index] in obj) {
                return theIn(obj[arr[index]], arr, index + 1, value)
            } else {
                obj[arr[index]] = cust()
                return theIn(obj[arr[index]], arr, index + 1, value)
            }
        }
    },
    /**
     * 创建一个object对象自身可枚举属性的键值对数组。这个数组可以通过_.fromPairs撤回。如果object 是 map 或 set，返回其条目。
     * @param  object (Object): 要检索的对象。
     * @return (Array): 返回键值对的数组。
     */
    toPairs: function(obj) {
        if (this.isMap(obj) || this.isSet(obj)) {
            return obj
        }
        var result = [],
            temp = []
        for (var key in obj) {
            temp = []
            if (obj.hasOwnProperty(key)) {
                temp.push(key)
                temp.push(obj[key])
                result.push(temp)
            }
        }
        return result
    },
    /**
     * 创建一个object对象自身和继承的可枚举属性的键值对数组。这个数组可以通过_.fromPairs撤回。如果object 是 map 或 set，返回其条目。
     * @param  object (Object): 要检索的对象。
     * @return (Array): 返回键值对的数组。
     */
    toPairsIn: function(obj) {
        if (this.isMap(obj) || this.isSet(obj)) {
            return obj
        }
        var result = [],
            temp = []
        for (var key in obj) {
            temp = []
            temp.push(key)
            temp.push(obj[key])
            result.push(temp)
        }
        return result
    },
    /**
     * 创建一个对象，这个对象组成为从 object 中经 predicate 判断为真值的属性。
     * @param  object (Object): 来源对象。
     * @param  [predicate=_.identity] (Function): 调用每一个属性的函数。
     * @return (Object): 返回新对象。
     */
    pickBy: function(obj, iter) {
        var result = {}
        for (keys in obj) {
            if (iter(obj[keys])) {
                result[keys] = obj[keys]
            }
        }
        return result
    },
    /**
     * _.reduce的替代方法;此方法将转换object对象为一个新的accumulator对象，结果来自iteratee处理自身可枚举的属性。
     * @param  object (Object): 要遍历的对象
     * @param  [iteratee=_.identity] (Function): 每次迭代时调用的函数。
     * @param  [accumulator] (*): 定制叠加的值。
     * @return (*): 返回叠加后的值。
     */
    transform: function(colle, iter, acc) {
        var theKey = Object.keys(colle)
        var start = 0
        if (acc === undefined) {
            acc = colle[theKey[0]]
            start = 1
        }
        for (var i = start; i < theKey.length; i++) {
            if (iter(acc, colle[theKey[i]], theKey[i], colle) === false) {
                break
            }
        }
        return acc
    },
    /**
     * 移除object对象 path 路径上的属性。
     * @param  object (Object): 要修改的对象。
     * @param  path (Array|string): 要移除的对象路径。
     * @return (boolean): 如果移除成功，那么返回 true ，否则返回 false。
     */
    unset: function(obj, path) {
        var temp = [],
            start = 0,
            end = 1
        if (typeof path === 'string') {
            while (start < path.length) {
                if (path[end] === '.' || path[end] === '[' || path[end] === undefined) {
                    temp.push(path.slice(start, end))
                    end++
                    start = end
                } else if (path[end] === ']') {
                    temp.push(path.slice(start, end))
                    end += 2
                    start = end
                } else {
                    end++
                }
            }
        } else {
            temp = path
        }
        return theIn(obj, temp, 0)

        function theIn(obj, arr, index) {
            if (index >= arr.length - 1) {
                return delete obj[arr[index]]
            }
            if (arr[index] in obj) {
                return theIn(obj[arr[index]], arr, index + 1)
            } else if (arr[index + 1] === '0') {
                obj[arr[index]] = []
                return theIn(obj[arr[index]], arr, index + 1)
            } else {
                obj[arr[index]] = {}
                return theIn(obj[arr[index]], arr, index + 1)
            }
        }
    },
    /**
     * 该方法类似_.set，除了接受updater以生成要设置的值。使用 _.updateWith来自定义生成的新path。updater调用1个参数：(value)。
     * @param  object (Object): 要修改的对象。
     * @param  path (Array|string): 要设置属性的路径。
     * @param  updater (Function): 用来生成设置值的函数。
     * @return (Object): 返回 object 。
     */
    update: function(obj, path, updater) {
        var temp = [],
            start = 0,
            end = 1
        if (typeof path === 'string') {
            while (start < path.length) {
                if (path[end] === '.' || path[end] === '[' || path[end] === undefined) {
                    temp.push(path.slice(start, end))
                    end++
                    start = end
                } else if (path[end] === ']') {
                    temp.push(path.slice(start, end))
                    end += 2
                    start = end
                } else {
                    end++
                }
            }
        } else {
            temp = path
        }
        theIn(obj, temp, 0, updater)
        return obj

        function theIn(obj, arr, index, updater) {
            if (index >= arr.length - 1) {
                obj[arr[index]] = updater(obj[arr[index]])
                return obj
            }
            if (arr[index] in obj) {
                return theIn(obj[arr[index]], arr, index + 1, updater)
            } else if (arr[index + 1] === '0') {
                obj[arr[index]] = []
                return theIn(obj[arr[index]], arr, index + 1, updater)
            } else {
                obj[arr[index]] = {}
                return theIn(obj[arr[index]], arr, index + 1, updater)
            }
        }
    },
    /**
     * 该方法类似_.update，不同之处在于它接受customizer，调用来生成新的对象的path。
     * @param  object (Object): 要修改的对象。
     * @param  path (Array|string): 要设置属性的路径。
     * @param  updater (Function): 用来生成设置值的函数。
     * @param  [customizer] (Function): 用来自定义分配值的函数。
     * @return (Object): 返回 object.
     */
    updateWith: function(obj, path, updater, cust) {
        var temp = [],
            start = 0,
            end = 1
        if (typeof path === 'string') {
            while (start < path.length) {
                if (path[start] === '[') {
                    start++
                    end++
                }
                if (path[end] === '.' || path[end] === '[' || path[end] === undefined) {
                    temp.push(path.slice(start, end))
                    end++
                    start = end
                } else if (path[end] === ']') {
                    temp.push(path.slice(start, end))
                    end += 2
                    start = end
                } else {
                    end++
                }
            }
        } else {
            temp = path
        }
        theIn(obj, temp, 0, updater)
        return obj

        function theIn(obj, arr, index, updater) {
            if (index >= arr.length - 1) {
                obj[arr[index]] = updater(obj[arr[index]])
                return obj
            }
            if (arr[index] in obj) {
                return theIn(obj[arr[index]], arr, index + 1, updater)
            } else {
                obj[arr[index]] = cust()
                return theIn(obj[arr[index]], arr, index + 1, updater)
            }
        }
    },
    /**
     * 创建 object 自身和继承的可枚举属性的值为数组
     * @param  object (Object): 要检索的对象。
     * @return (Array): 返回对象属性的值的数组。
     */
    valuesIn: function(obj) {
        var result = []
        for (keys in obj) {
            result.push(obj[keys])
        }
        return result
    },
    /**
     * 转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。
     * @param  [string=''] (string): 要转义的字符串。
     * @return (string): 返回转义后的字符串。
     */
    escape: function(str) {
        var result = str.split("").map(function(a) {
            switch (a) {
                case '&':
                    return '&amp;'
                case '<':
                    return '&lt;'
                case '>':
                    return '&gt;'
                case '"':
                    return '&quot;'
                case "'":
                    return '&apos'
                default:
                    return a
            }
        }).
        reduce((a, b) => a.concat(b))
        return result
    },
    /**
     * 转义 RegExp 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", 和 "|" 。
     * @param  [string=''] (string): 要转义的字符串。
     * @return (string): 返回转义后的字符串。
     */
    escapeRegExp: function(str) {
        return str.split("").map(function(a) {
            switch (a) {
                case '^':
                    return '\\^'
                case '$':
                    return '\\$'
                case '.':
                    return '\\.'
                case '*':
                    return '\\*'
                case '+':
                    return '\\+'
                case '?':
                    return '\\?'
                case '(':
                    return '\\('
                case ')':
                    return '\\)'
                case '[':
                    return '\\['
                case ']':
                    return '\\]'
                case '{':
                    return '\\{'
                case '}':
                    return '\\}'
                case '|':
                    return '\\|'
                default:
                    return a

            }
        }).
        reduce((a, b) => a.concat(b))
    },
    /**
     * 转换string字符串为指定基数的整数。
     * @param  string (string): 要转换的字符串。
     * @param  [radix=10] (number):转换基数。
     * @return (number): 返回转换后的整数。
     */
    parseInt: function(str, radix) {
        radix = radix ? radix : 10
        var temp = str.split("")
        var result = []
        if (temp[0] !== '-' && typeof(+temp[0]) !== 'number') {
            return NaN
        } else {
            result.push(temp[0])
        }
        for (var i = 1; i < temp.length; i++) {
            if (typeof(+temp[i]) === 'number') {
                result.push(temp[i])
            } else {
                break
            }
        }
        return +result.join("")
    },
    /**
     * 替换string字符串中匹配的pattern为给定的replacement 。
     * @param  [string=''] (string): 待替换的字符串。
     * @param  pattern (RegExp|string): 要匹配的内容。
     * @param  replacement (Function|string): 替换的内容。
     * @return (string): 返回替换后的字符串
     */
    replace: function(str, pattern, replace) {
        var result = [],
            start = 0
        for (var i = 0; i < str.length; i++) {
            if (str[i] === pattern[0]) {
                if (str.slice(i, i + pattern.length) === pattern) {
                    result.push(str.slice(start, i))
                    result.push(replace)
                    i = i + pattern.length - 1
                    start = i + 1
                }
            }
        }
        result.push(str.slice(start, str.length))
        result = result.join("")
        return result
    },
    /**
     * 根据separator 拆分字符串string。
     * @param  [string=''] (string): 要拆分的字符串。
     * @param  separator (RegExp|string): 拆分的分隔符。
     * @param  [limit] (number): 限制结果的数量。
     * @return (Array): 返回拆分部分的字符串的数组。
     */
    split: function(str, separ, limit) {
        var result = [],
            start = 0
        for (var i = 0; i < str.length; i++) {
            if (str[i] === separ[0]) {
                if (str.slice(i, i + separ.length) === separ) {
                    result.push(str.slice(start, i))
                    i = i + separ.length - 1
                    start = i + 1
                }
            }
            if (result.length >= limit) {
                return result
            }
        }
        result.push(str.slice(start, str.length))
        return result
    },
    /**
     * 转换 string 字符串为 start case.
     * @param  [string=''] (string): 要转换的字符串。
     * @return (string): 返回转换后的字符串。
     */
    startCase: function(str) {
        debugger
        var temp = str.split("")
        if (('A'.charCodeAt() <= temp[0].charCodeAt() && temp[0].charCodeAt() <= 'Z'.charCodeAt()) || ('a'.charCodeAt() <= temp[0].charCodeAt() && temp[0].charCodeAt() <= 'z'.charCodeAt())) {
            temp.splice(0, 1, temp[0].toUpperCase())
        }
        for (var i = 0; i < temp.length - 1; i++) {
            if (!(('A'.charCodeAt() <= temp[i].charCodeAt() && temp[i].charCodeAt() <= 'Z'.charCodeAt()) || ('a'.charCodeAt() <= temp[i].charCodeAt() && temp[i].charCodeAt() <= 'z'.charCodeAt())) && (('A'.charCodeAt() <= temp[i + 1].charCodeAt() && temp[i + 1].charCodeAt() <= 'Z'.charCodeAt()) || ('a'.charCodeAt() <= temp[i + 1].charCodeAt() && temp[i + 1].charCodeAt() <= 'z'.charCodeAt()))) {
                temp.splice(i + 1, 1, temp[i + 1].toUpperCase())
            }
            if (((temp[i].charCodeAt() < 'A'.charCodeAt() || 'Z'.charCodeAt() < temp[i].charCodeAt())) && (('A'.charCodeAt() <= temp[i + 1].charCodeAt() && temp[i + 1].charCodeAt() <= 'Z'.charCodeAt()))) {
                temp.splice(i + 1, 0, ' ')
                i++
            }
        }
        for (var i = temp.length - 1; i >= 0; i--) {
            if (!(('A'.charCodeAt() <= temp[i].charCodeAt() && temp[i].charCodeAt() <= 'Z'.charCodeAt()) || ('a'.charCodeAt() <= temp[i].charCodeAt() && temp[i].charCodeAt() <= 'z'.charCodeAt())) && temp[i] !== ' ') {
                temp.splice(i, 1)
            }
        }
        for (var i = 0; i < temp.length; i++) {
            if (temp[i] !== ' ') {
                break
            } else {
                temp.splice(i, 1)
                i--
            }
        }
        var result = temp.join("")
        return result
    },
    /**
     * 检查字符串string是否以 target 开头。
     * @param  [string=''] (string): 要检索的字符串。
     * @param  [target] (string): 要检查的字符串。
     * @param  [position=0] (number): 检索的位置。
     * @return (boolean): 如果string以 target，那么返回true，否则返回 false 。
     */
    startsWith: function(str, target, pos) {
        if (pos === undefined) {
            pos = 0
        }
        if (str.indexOf(target) === pos) {
            return true
        } else {
            return false
        }
    },
    /**
     * 转换整个string字符串的字符为小写，类似 String#toLowerCase。
     * @param  [string=''] (string): 要转换的字符串。
     * @return (string): 返回小写的字符串。
     */
    toLower: function(str) {

        return str.toLowerCase()
    },
    /**
     * 转换整个string字符串的字符为大写，类似 String#toUpperCase.
     * @param  [string=''] (string): 要转换的字符串。
     * @return (string): 返回大写的字符串。
     */
    toUpper: function(str) {
        return str.toUpperCase()
    },
    /**
     * 从string字符串中移除前面和后面的 空格 或 指定的字符。
     * @param  [string=''] (string): 要处理的字符串。
     * @param  [chars=whitespace] (string): 要移除的字符。
     * @return (string): 返回处理后的字符串。
     */
    trim: function(str, char) {
        if (char === undefined) {
            char = " "
        }
        var temp = str.split("")
        for (var i = 0; i < temp.length; i++) {
            if (char.indexOf(temp[i]) >= 0) {
                temp.splice(i, 1)
                i--
            } else {
                break
            }
        }
        for (var i = temp.length - 1; i >= 0; i--) {
            if (char.indexOf(temp[i]) >= 0) {
                temp.splice(i, 1)
            } else {
                break
            }
        }
        var result = temp.join("")
        return result
    },
    /**
     * 从string字符串中移除后面的 空格 或 指定的字符。
     * @param  [string=''] (string): 要处理的字符串。
     * @param  [chars=whitespace] (string): 要移除的字符。
     * @return (string): 返回处理后的字符串。
     */
    trimEnd: function(str, char) {
        if (char === undefined) {
            char = " "
        }
        var temp = str.split("")
        for (var i = temp.length - 1; i >= 0; i--) {
            if (char.indexOf(temp[i]) >= 0) {
                temp.splice(i, 1)
            } else {
                break
            }
        }
        var result = temp.join("")
        return result
    },
    /**
     * 从string字符串中移除前面的 空格 或 指定的字符。
     * @param  [string=''] (string): 要处理的字符串。
     * @param  [chars=whitespace] (string): 要移除的字符。
     * @return (string): 返回处理后的字符串。
     */
    trimStart: function(str, char) {
        if (char === undefined) {
            char = " "
        }
        var temp = str.split("")
        for (var i = 0; i < temp.length; i++) {
            if (char.indexOf(temp[i]) >= 0) {
                temp.splice(i, 1)
                i--
            } else {
                break
            }
        }
        var result = temp.join("")
        return result
    },
    trimStart: function(str, char) {
        if (char === undefined) {
            char = ' '
        }
        var temp = str.split("")
        for (var i = 0; i < temp.length; i++) {
            if (char.indexOf(temp[i]) >= 0) {
                temp.splice(i, 1)
                i--
            } else {
                break
            }
        }
        var result = temp.join("")
        return result
    },
    /**
     * 截断string字符串，如果字符串超出了限定的最大值。 被截断的字符串后面会以 omission 代替，omission 默认是 "..."。
     * @param  [string=''] (string): 要截断的字符串。
     * @param  [options={}] (Object): 选项对象。
     * @param  [options.length=30] (number): 允许的最大长度。
     * @param  [options.omission='...'] (string): 超出后的代替字符。
     * @param  [options.separator] (RegExp|string): 截断点。
     * @return (string): Returns the truncated string.
     */
    truncate: function(str, options) {
        if (options === undefined) {
            options = {}
            options.length = 30
            options.omission = '...'
        }
        if (!('length' in options)) {
            options.length = 30
        }
        if (!('omission' in options)) {
            options.omission = '...'
        }
        var temp = str.split("")
        if ('separator' in options) {
            if (this.isRegExp(options.separator)) {
                var theReg = new RegExp(options.separator, "g")
                var tmp = str.match(theReg)
                var theChar = tmp[tmp.length - 1]
            } else {
                var theChar = options.separator
            }
            for (var i = str.length - 1; i >= 0; i--) {
                if (theChar[0] === str[i] && theChar === str.slice(i, theChar.length + i)) {
                    temp.length = i
                    break
                }
            }
            temp.push(options.omission)

        }
        if (temp.length > options.length) {
            temp.length = options.length - 3
            temp.push(options.omission)

        }

        var result = temp.join("")
        return result
    },
    /**
     * _.escape的反向版。 这个方法转换string字符串中的 HTML 实体 &amp;, &lt;, &gt;, &quot;, &#39;, 和 &#96; 为对应的字符。
     * @param  [string=''] (string): 要转换的字符串。
     * @return (string): 返回转换后的字符串。
     */
    unescape: function(str) {
        debugger
        var temp = str.split("")
        for (var i = 0, j = 0; i < str.length; i++, j++) {
            if (str[i] === '&') {
                do {
                    j++
                    if (str[j] === ';') {
                        var theChar = str.slice(i, j + 1)
                        temp.splice(i, j - i + 1, char(theChar))
                        i = j
                        break
                    }
                } while (j < str.length)
            }
        }
        var result = temp.join("")
        return result

        function char(a) {
            switch (a) {
                case '&amp;':
                    return '&'
                case '&lt;':
                    return '<'
                case '&gt;':
                    return '>'
                case '&quot;':
                    return '"'
                case '&apos':
                    return "'"
                default:
                    return a
            }
        }
    },
    /**
     * 转换字符串string为 空格 分隔的大写单词。
     * @param  [string=''] (string): 要转换的字符串。
     * @return (string): 返回大写单词。
     */
    upperCase: function(str) {
        return this.startCase(str).toUpperCase()
    },
    /**
     * 转换字符串string的首字母为大写。
     * @param  [string=''] (string): 要转换的字符串。
     * @return (string): 返回转换后的字符串。
     */
    upperFirst: function(str) {
        var temp = str.split("")
        temp[0] = temp[0].toUpperCase()
        var result = temp.join("")
        return result
    },
    /**
     * 拆分字符串string中的词为数组 。
     * @param  [string=''] (string): 要拆分的字符串。
     * @param  [pattern] (RegExp|string): 匹配模式。
     * @return (Array): 返回拆分string后的数组。
     */
    words: function(str, pattern) {
        if (pattern === undefined) {
            var flag = 0,
                result = []
            for (var i = 0; i < str.length; i++, flag++) {
                if (('A'.charCodeAt() <= str[i].charCodeAt() && str[i].charCodeAt() <= 'Z'.charCodeAt()) || ('a'.charCodeAt() <= str[i].charCodeAt() && str[i].charCodeAt() <= 'z'.charCodeAt())) {
                    do {
                        flag++
                        if (flag === str.length || !(('A'.charCodeAt() <= str[flag].charCodeAt() && str[flag].charCodeAt() <= 'Z'.charCodeAt()) || ('a'.charCodeAt() <= str[flag].charCodeAt() && str[flag].charCodeAt() <= 'z'.charCodeAt()))) {
                            var theChar = str.slice(i, flag)
                            result.push(theChar)
                            flag--
                            i = flag
                            break
                        }
                    } while (flag < str.length)
                }
            }
        } else {
            return str.match(pattern)
        }
        return result
    },
    /**
     * 绑定一个对象的方法到对象本身，覆盖现有的方法。
     * @param  object (Object): 用来绑定和分配绑定方法的对象。
     * @param  methodNames (...(string|string[])): 对象绑定方法的名称。
     * @return (Object): 返回 object.
     */
    bindAll: function(obj, method) {
        var temp = []
        if (typeof method === 'string') {
            temp.push(method)
        } else {
            temp = method
        }
        for (var i = 0; i < temp.length; i++) {
            obj[temp[i]].bind(obj)
        }
    },
    /**
     * 创建一个包含从 start 到 end，但不包含 end 本身范围数字的数组。 如果 start 是负数，而 end 或 step 没有指定，那么 step 从 -1 为开始。 如果 end 没有指定，start 设置为 0。 如果 end 小于 start ，会创建一个空数组，除非指定了 step。
     * @param  [start=0] (number): 开始的范围。
     * @param  end (number): 结束的范围。
     * @param  [step=1] (number): 范围的增量 或者 减量。
     * @return (Array): 返回范围内数字组成的新数组。
     */
    range: function(start, end, step) {
        var result = []
        if (start < 0 && end === undefined) {
            step = -1
        }
        if (end === undefined) {
            end = start
            start = 0

        }
        if (end < start && step === undefined) {
            return []
        }
        if (step === undefined) {
            step = 1
        }
        var count = 0
        if (end >= start) {
            for (var i = start; i < end && count < end - start; i += step) {
                result.push(i)
                count++
            }
        } else {
            for (var i = start; i > end && count < start - end; i += step) {
                result.push(i)
                count++
            }
        }
        return result
    },
    /**
     * 这个方法类似 _.range ， 除了它是降序生成值的。
     * @param  [start=0] (number): 开始的范围。
     * @param  end (number): 结束的范围。
     * @param  [step=1] (number):范围的增量 或者 减量。
     * @return (Array): 返回范围内数字组成的新数组。
     */
    rangeRight: function(start, end, step) {
        var result = []
        if (start < 0 && end === undefined) {
            step = -1
        }
        if (end === undefined) {
            end = start
            start = 0

        }
        if (end < start && step === undefined) {
            return []
        }
        if (step === undefined) {
            step = 1
        }
        var count = 0
        if (end >= start) {
            for (var i = start; i < end && count < end - start; i += step) {
                result.unshift(i)
                count++
            }
        } else {
            for (var i = start; i > end && count < start - end; i += step) {
                result.unshift(i)
                count++
            }
        }
        return result
    },
    /**
     * 将字符串转换为电话拨号盘数字
     * @param  {[string]} str [需要转换的字符串]
     * @return {[string]}     [转换后的数字字符串]
     */
    dellTo3355: function(str) {
        return str.split("").map(charToDigit).join("")

        function charToDigit(char) {
            var lowerChar = char.toLowerCase()

            if (lowerChar <= 'c') {
                return 2
            }

            if (lowerChar <= 'f') {
                return 3
            }

            if (lowerChar <= 'i') {
                return 4
            }

            if (lowerChar <= 'l') {
                return 5
            }

            if (lowerChar <= 'o') {
                return 6
            }

            if (lowerChar <= 's') {
                return 7
            }

            if (lowerChar <= 'v') {
                return 8
            }

            if (lowerChar <= 'z') {
                return 9
            }
        }
    },
    /**
     * 判定一个数是不是素数
     * @param  {[number]}  num [被判定数]
     * @return {Boolean}     [真假]
     */
    isPrime: function(num) {
        var isIPrime
        if (num % 2 === 0) {
            return false
        }
        for (var i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    },
    /**
     * [提取一定范围内的所有素数]
     * @param  {[n]} n [范围下限]
     * @param  {[m]} m [范围上限]
     * @return {[array]}   [提取出的素数]
     */
    'n - m 之间的素数': function(n, m) {

        return new Array(m - n + 1).fill(0).map(a => n++).filter(isPrime)
    },
}
