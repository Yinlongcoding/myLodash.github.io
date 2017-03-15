(function (windowGlobal) {

  // core function ==========================

  /**
   * 分配一个或多个被分配对象可自身可枚举属性，到目标对象上，
   * 分配的属性会覆盖目标对象身上的同名属性
   * @param  {object} obj     目标属性
   * @param  {...object} args 被分配的对象
   * @return {object}         分配后的目标对象
   */
  let assign = function (obj, ...sources) {
    let that = this
    this.forEach(sources, function (a) {
      that.forOwn(a, function (element, key) {
        obj[key] = element
      })
    })
    return obj
  }

  /**
   * 分配一个或者多个被分配对象自身 或者 继承到的 可枚举属性，到目标对象上，
   * 分配的属性会覆盖目标身上的同名属性
   * @param  {object} obj      目标属性
   * @param  {...sources} args 被分配的对象
   * @return {object}          分配后的目标对象
   */
  let assignIn = function (obj, ...sources) {
    this.forEach(sources, function (a) {
      for (let key in a) {
        obj[key] = a[key]
      }
    })
    return obj
  }

  /**
   * 类似 assignIn 但接收一个 customizer
   * @param {object} object 目标对象
   * @param {...object} args 被分配的对象
   * @param {function} customizer 处理函数
   * @returns
   */
  let assignInWith = function (object, ...args) {
    let sources, customizer
    if (this.isFunction(args[args.length - 1])) {
      customizer = args.pop()
    } else {
      customizer = function (objValue, srcValue) {
        return srcValue
      }
    }
    this.forEach(args, function (it, i, array) {
      for (let key in it) {
        object[key] = customizer(object[key], it[key], key, object, array)
      }
    })
    return object
  }

  /**
   * 类似 assignIn 但接收一个 customizer
   * @param {object} object 目标对象
   * @param {...object} args 被分配的对象
   * @param {function} customizer 处理函数
   * @returns
   */
  let assignWith = function (object, ...args) {
    let sources, customizer
    if (this.isFunction(args[args.length - 1])) {
      customizer = args.pop()
    } else {
      customizer = function (objValue, srcValue) {
        return srcValue
      }
    }
    this.forEach(args, function (it, i, array) {
      for (let key in it) {
        if (it.hasOwnProperty(key)) {
          object[key] = customizer(object[key], it[key], key, object, array)
        }
      }
    })
    return object
  }

  /**
   * 限制函数的调用的函数，让函数只能被调用有限次数（n 次）
   * 当 限制次数为 0 时，被限制的函数不会被调用， 返回 undefined
   * @param  {number} n      指定被限制调用的次数
   * @param  {function} func 指定被限制调用的函数
   * @return {function}      新的被限制调用的函数
   */
  let before = function (n, func) {
    let count = 0
    let result
    return function (...arg) {
      count++
      if (count <= n) {
        result = func(...arg)
      }
      return result
    }
  }

  /**
   * 绑定 this 和部分参数给 被调用函数，
   * 使得 func 在 绑定的 this 的上下文环境被调用，并固定部分参数
   * @param  {function}  func     被绑定的函数
   * @param  {*} thisArg          被绑定函数执行的上下文
   * @param  {...*}  partials     被绑定的参数
   * @return {function}           绑定后的新函数
   */
  let bind = function (func, thisArg, ...partials) {
    let that = this
    return function (...args) {
      partials = that.map(partials, function (a) {
        if (a === _) {
          a = args.shift()
        }
        return a
      })
      return func.call(thisArg, ...partials, ...args)
    }
  }

  /**
   * 检查传入的值是不是一个 arguments 对象
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 arguments 对象，返回 true
   */
  let isArguments = function (value) {
    return toString.call(value) === '[object Arguments]'
  }

  /**
   * 检查传入的值是不是一个 数组
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 对象，返回 true
   */
  let isArray = function (value) {
    return toString.call(value) === '[object Array]'
  }

  /**
   * 检查一个值是不是 ArrayBuffer 对象
   * @param  {*}  value      需要检查的值
   * @return {Boolean}       如果是 ArrayBuffer 对象，返回 true
   */
  let isArrayBuffer = function (value) {
    return toString.call(value) === '[object ArrayBuffer]'
  }

  /**
   * 检查一个对象是否是类数组对象，包括 string ，（string 含有 length 属性，函数不是类数组对象）
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 类数组对象，返回 true
   */
  let isArrayLike = function (value) {
    return !!((typeof value === 'object' || typeof value === 'string') &&
      isFinite(value.length) &&
      Number.isInteger(value.length) &&
      value.length >= 0 &&
      value.length <= Number.MAX_SAFE_INTEGER)
  }

  /**
   * 检查一个对象是否是类数组对象，不包括 string 和 function
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 类数组对象，返回 true
   */
  let isArrayLikeObject = function (value) {
    return !!(typeof value === 'object' &&
      isFinite(value.length) &&
      Number.isInteger(value.length) &&
      value.length >= 0 &&
      value.length <= Number.MAX_SAFE_INTEGER)
  }

  /**
   * 检查 传入的值 是否是布尔值
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是布尔值。返回 true
   */
  let isBoolean = function (value) {
    return toString.call(value) === '[object Boolean]'
  }

  /**
   * 检查 传入的值是否是 buffer
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 buffer 对象，返回 true
   */
  let isBuffer = function (value) {
    return toString.call(value) === '[object Uint8Array]'
  }

  /**
   * 检查一个对象是否是 日期对象
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 Date 对象，返回 true
   */
  let isDate = function (value) {
    return toString.call(value) === '[object Date]'
  }

  /**
   * 检查一个值 是否是 DOM 元素
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果是 DOM 元素，返回 true
   */
  let isElement = function (value) {
    return /Element\]$/.test(toString.call(value))
  }

  /**
   * 检查一个值是不是 空对象
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果是空对象，返回 true
   */
  let isEmpty = function (value) {
    if (value === null) {
      return true
    }
    if (value.length && value.length === 0) {
      return true
    } else if (value.size && value.size === 0) {
      return true
    } else if (Object.keys(value) && Object.keys(value).length === 0) {
      return true
    }
    return false
  }

  /**
   * 检查值是否是有限数
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果是有限数，返回 true
   */
  let isFinite = function (value) {
    return Number.isFinite(value)
  }

  /**
   * 检查值是否是 函数对象
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果是函数对象，返回 true
   */
  let isFunction = function (value) {
    return toString.call(value) === '[object Function]'
  }

  /**
   * 判断一个值是不是 NaN，实例 NaN 对象也会正常判断，
   * 出数字外其他类型值判断返回 false
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果是 NaN 对象，返回 true
   */
  let isNaN = function (value) {
    if ((typeof value === 'number' || value instanceof Number) && +value !== +value) {
      return true
    }
    return false
  }

  /**
   * 检查一个值 是不是 null
   * @param  {*}  value      被检查的对象
   * @return {Boolean}       如果是 null，返回 true
   */
  let isNull = function (value) {
    return toString.call(value) === '[object Null]'
  }

  /**
   * 判断一个值是不是数字类型
   * @param  {*}  value      被检查的数
   * @return {Boolean}       如果是 数字，返回 true
   */
  let isNumber = function (value) {
    return toString.call(value) === '[object Number]'
  }

  /**
   * 检查一个值 是否是 对象，null 返回 false
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果该值继承自对象，返回 true
   */
  let isObject = function (value) {
    return value instanceof Object
  }

  /**
   * 这个方法返回 undefined
   * @return undefined
   */
  let noop = function () {
    return void 0
  }

  /**
   * 调用迭代器 n 次，并将调用的结果以数组的形式返回，
   * 迭代器只传一个参数：循环的指针数
   * @param  {number} n          需要调用的次数
   * @param  {function} iteratee 被调用的迭代器
   * @return {array}             迭代出的结果集
   */
  let times = function (n, iteratee = this.identity) {
    let result = []
    for (let i = 0; i < n; i++) {
      result.push(iteratee(i))
    }
    return result
  }

  /**
   * 返回接收到的第一个参数
   * @param  {*} value 任何值
   * @return {*}       返回值
   */
  let identity = function (value) {
    return value
  }

  /**
   * 创建一个返回值的函数
   * @param  {*} value      被新函数返回的值
   * @return {function}     新的函数
   */
  let constant = function (value) {
    return function () {
      return value
    }
  }

  /**
   * 检查一个值是否是正则表达式
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果是正则表达式，返回 true
   */
  let isRegExp = function (value) {
    return toString.call(value) === '[object RegExp]'
  }

  /**
   * 检查一个值是否是字符串
   * @param  {*}  value 被检查的值
   * @return {Boolean}       如果是字符串，返回 true
   */
  let isString = function (value) {
    return toString.call(value) === '[object String]'
  }

  /**
   * 判断一个值是不是 未定义的值
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果是 未定义 undefined ，返回 true
   */
  let isUndefined = function (value) {
    return toString.call(value) === '[object Undefined]'
  }

  /**
   * 将两个值进行深度比较，确定他们是否相等
   * This method supports comparing
   * arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays.
   * Object objects are compared by their own, not inherited, enumerable properties.
   * Functions and DOM nodes are compared by strict equality, i.e. ===.
   * @param  {*}  value      被检查的值
   * @param  {[type]}  other 去比较的值
   * @return {Boolean}       如果两个值深度相等，返回 true
   */
  let isEqual = function (value, other) {
    if (value === other) {
      return true
    }
    if (this.isRegExp(value) && this.isRegExp(other)) {
      return '' + value === '' + other
    }
    if (this.isNumber(value) && this.isNumber(other)) {
      return +value === +other
    }
    if (this.isString(value) && this.isString(other)) {
      return '' + value === '' + other
    }
    if (this.isBoolean(value) && this.isBoolean(other)) {
      return !!value === !!other
    }
    if (this.isError(value) && this.isError(other)) {
      return value.message === other.message
    }
    if (this.isDate(value) && this.isDate(other)) {
      return '' + value === '' + other
    }
    if (this.isSymbol(value) && this.isSymbol(other)) {
      return value.name === other.name
    }
    if (this.isFunction(value) && this.isFunction(other)) {
      return value === other
    }
    if (this.isElement(value) && this.isElement(other)) {
      return value === other
    }
    if ((this.isArray(value) && this.isArray(other)) ||
      (this.isArrayBuffer(value) && this.isArrayBuffer(other)) ||
      (this.isMap(value) && this.isMap(other)) ||
      (this.isPlainObject(value) && this.isPlainObject(other)) ||
      (this.isSet(value) && this.isSet(other)) ||
      (this.isArrayLike(value) && this.isArrayLike(other)) ||
      (this.isArrayLikeObject(value) && this.isArrayLikeObject(other)) ||
      (this.isBuffer(value) && this.isBuffer(other))
    ) {
      let size = Object.keys(value)
      if (size.length === 0 && Object.keys(other).length === 0) {
        return true
      }
      if (size.length === Object.keys(other).length) {
        let onOff = true
        for (let i = 0; i < size.length; i++) {
          if (!this.isEqual(value[size[i]], other[size[i]])) {
            onOff = false
            break
          }
        }
        return onOff
      }
    }
    return false
  }

  /**
   * 判断一个值是不是 error 对象
   * @param  {*}  value      被判断的值
   * @return {Boolean}       如果是 error 对象，返回 true
   */
  let isError = function (value) {
    return toString.call(value) === '[object Error]'
  }

  /**
   * 判断一个值是不是 Symbol 对象
   * @param  {*}  value      被判断的值
   * @return {Boolean}       如果是 Symbol 对象，返回 true
   */
  let isSymbol = function (value) {
    return toString.call(value) === '[object Symbol]'
  }

  /**
   * 判断一个值是不是 Map 对象
   * @param  {*}  value      被判断的值
   * @return {Boolean}       如果是 Map 对象，返回 true
   */
  let isMap = function (value) {
    return toString.call(value) === '[object Map]'
  }

  /**
   * 判断一个值是不是 WeakMap 对象
   * @param  {*}  value      被判断的值
   * @return {Boolean}       如果是 WeakMap 对象，返回 true
   */
  let isWeakMap = function (value) {
    return toString.call(value) === '[object WeakMap]'
  }

  /**
   * 根据参数重载，如果参数是属性名（字符串形式），返回 返回对应的属性值 的回调函数
   * 如果参数是数组（长度为 2 的一维 键值对），返回 返回布尔值 的回调函数
   * 如果参数是对象 ，返回布尔值
   * @param  {string | array | object} func 选择回调函数的参数
   * @return {function}                     返回该回调函数
   */
  let iteratee = function (func = this.identity) {
    //debugger
    if (this.isString(func)) {
      return this.property(func)
    }
    if (this.isArray(func)) {
      return this.matchesProperty(func[0], func[1])
    }
    if (this.isPlainObject(func)) {
      return this.matches(func)
    }
    if (this.isFunction(func)) {
      return func
    }
  }

  /**
   * 将第一个参数作为包装函数的第一个参数，将提供给新建函数的其他参数追加到函数里，
   * 并绑定 this 与包装器相同
   * @param  {*} value        被封装的值
   * @param  {[type]} wrapper 封装函数
   * @return {[type]}         被封装后的新函数
   */
  let wrap = function (value, wrapper = this.identity) {
    return this.bind(wrapper, this, value)
  }

  /**
   * 将字符串中的 '&' '<' '>' "'" '"' 转换成对应的 HTML 实体
   * @param  {string} string 待转换的字符串
   * @return {string}        转换后的字符串
   */
  let escape = function (string = '') {
    return string.replace(/[\&\<\>\'\"]/g, function (char) {
      switch (char) {
        case '&':
          return '&amp;'
        case '<':
          return '&lt;'
        case '>':
          return '&gt;'
        case "'":
          return '&acute;'
        case '"':
          return '&quot;'
        default:
          return ''
      }
    })
  }

  /**
   * 创建一个包含所给对象所有的可枚举自有属性的数组
   * @param  {object} object 被枚举的对象
   * @return {array}         包含所给对象的所有可枚举自有属性的数组
   */
  let keys = function (object) {
    let obj = Object(object)
    let result = []
    this.forOwn(object, function (value, key) {
      result.push(key)
    })
    return result
  }

  /**
   * 创建一个包含所给对象所有的可枚举属性的数组
   * @param  {object} object 被枚举的对象
   * @return {array}         包含所给对象的所有可枚举自有属性的数组
   */
  let keysIn = function (object) {
    let result = []
    for (let key in object) {
      result.push(key)
    }
    return result
  }

  /**
   * 返回数组的最后一项的值
   * @param  {array} array  被查询的数组
   * @return {*}            该数组最后一项的值
   */
  let last = function (array) {
    return array[array.length - 1]
  }

  /**
   * 返回一个函数，执行对象和给定参数的深度对比，
   * 如果对象具有等效的属性。返回 true
   * @param  {object} source 需要对比的参数
   * @return {function}      返回新的函数
   */
  let matches = function (source) {
    let that = this
    return function (it) {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          if (!that.isEqual(source[key], it[key])) {
            return false
          }
        }
      }
      return true
    }
  }

  /**
   * 创建一个函数，根据指定的路径和值来判断对象，如果等值，则返回 true
   * @param  { array | string } path     用于比较的路径
   * @param  {*} srcValue                用于比较的值
   * @return {function}                  返回新的函数
   */
  let matchesProperty = function (path, srcValue) {
    let prop
    if (this.isString(path)) {
      prop = path.match(/\w+/g)
    }
    if (this.isArray(path)) {
      prop = path
    }
    let that = this
    return function (it) {
      return that.isEqual(that.reduce(prop, function (memo, curr) {
        return memo = memo[curr]
      }, it), srcValue)
    }
  }

  /**
   * 迭代集合元素，返回第一个 返回 true 的元素
   * @param  {array | object} collection                被迭代的集合
   * @param  {function} [predicate=this.identity]       判定条件
   * @param  {Number} [fromIndex=0]                     判定起始位置
   * @return {*}                                        第一个判定成功的元素
   */
  let find = function (collection, predicate = this.identity, fromIndex = 0) {
    for (let key in collection) {
      if (this.isArray(collection)) {
        if (key < fromIndex) {
          continue
        }
      }
      if (collection.hasOwnProperty(key)) {
        if (this.iteratee(predicate)(collection[key], key, collection)) {
          return collection[key]
        }
      }
    }
  }

  /**
   * 迭代集合元素，返回第一个 返回 true 的元素键名
   * @param  {array | object} collection                被迭代的集合
   * @param  {function} [predicate=this.identity]       判定条件
   * @param  {Number} [fromIndex=0]                     判定起始位置
   * @return {*}                                        第一个判定成功的元素的键名
   */
  let findKey = function (collection, predicate = this.identity) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (this.iteratee(predicate)(collection[key], key, collection)) {
          return key
        }
      }
    }
  }

  /**
   * 创建一个返回给定对象路径的值的函数
   * @param  {array | string} path 查找的路径
   * @return {function}       创建的新的函数
   */
  let property = function (path) {
    let prop
    if (this.isString(path)) {
      prop = path.match(/\w+/g)
    }
    if (this.isArray(path)) {
      prop = path
    }
    let that = this
    return function (it) {
      return that.reduce(prop, function (memo, curr) {
        return memo = memo[curr]
      }, it)
    }
  }

  /**
   * 返回一个以升序排序后的数组
   * @param  {array} collection                    被排序的对象
   * @param  {Array}  [iteratee=[ this.identity ]] 判断条件集合
   * @return {array}                               排序后的新数组
   */
  let sortBy = function (collection, iteratee = [this.identity]) {
    let that = this
    let result = []
    for (let i = 0; i < collection.length; i++) {
      result.push(this.assign({}, collection[i]))
    }
    if (this.isFunction(iteratee)) {
      result.sort(function (a, b) {
        return that.iteratee(iteratee)(a) > that.iteratee(iteratee)(b)
      })
    } else {
      for (let i = 0; i < iteratee.length; i++) {
        result.sort(function (a, b) {
          return that.iteratee(iteratee[i])(a) > that.iteratee(iteratee[i])(b)
        })
      }
    }
    return result
  }

  /**
   * 迭代集合的每一个元素，通过调用 iteratee 返回一个新的数组
   * @param  {array | object} collection    被迭代的集合
   * @param  {function | string} iteratee   用于迭代的函数
   * @return {array}                        返回一个新数组
   */
  let map = function (collection, iteratee) {
    let result = []
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (this.isString(iteratee)) {
          result.push(this.property(iteratee)(collection[key], key, collection))
        } else if (this.isFunction(iteratee)) {
          result.push(iteratee(collection[key], key, collection))
        }
      }
    }
    return result
  }

  /**
   * 迭代集合元素，返回成员调用断言函数后为 true 的数组
   * @param  {array | object} collection                     被迭代的对象
   * @param  {function | object | array | string} predicate  断言
   * @return {array}                                         筛选后的新数组
   */
  let filter = function (collection, predicate) {
    let result = []
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (this.iteratee(predicate)(collection[key], key, collection)) {
          result.push(collection[key])
        }
      }
    }
    return result
  }

  /**
   * 判断一个值是不是纯对象
   * 纯对象为 Object 构造函数构造出来的对象或 原型对象为 null 的对象
   * @param  {*}  value      被检查的值
   * @return {Boolean}       如果是纯对象，返回 true
   */
  let isPlainObject = function (value) {
    return value.constructor === Object || Object.getPrototypeOf(value) === null
  }

  /**
   * 计算数组的最大值，如果 array 为空或者 false，返回 undefined
   * @param  {array} array 需要判断的数组
   * @return {*}           最大值
   */
  let max = function (array) {
    if (this.isEmpty(array) || !array) {
      return void 0
    }
    return this.reduce(array, function (memo, curr) {
      return memo > curr ? memo : curr
    })
  }

  /**
   * 计算数组的最小值，如果 array 为空或者 false，返回 undefined
   * @param  {array} array 需要判断的数组
   * @return {*}           最小值
   */
  let min = function (array) {
    if (this.isEmpty(array) || !array) {
      return void 0
    }
    return this.reduce(array, function (memo, curr) {
      return memo < curr ? memo : curr
    })
  }

  /**
   * 创建一个否定 func 结果的函数，并绑定 this
   * @param  {function} predicate 被否定的函数
   * @return {function}           新建的函数
   */
  let negate = function (predicate) {
    return function (...arg) {
      return !predicate(...arg)
    }
  }

  /**
   * 创建一个限制多次调用 func 的函数，对于重复调用 func，只返回 第一次调用的值
   * @param  {function} func 被限制的函数
   * @return {function}      限制后的函数
   */
  let once = function (func) {
    return this.before(1, func.bind(this))
  }

  /**
   * 创建由选取的对象属性组成的对象
   * @param  {object} object         被选取的对象
   * @param  {string | array} paths  选取条件
   * @return {object}                新的对象
   */
  let pick = function (object, paths) {
    let arr
    if (this.isString(paths)) {
      arr = [paths]
    } else {
      arr = paths
    }
    let result = {}
    for (let i = 0; i < arr.length; i++) {
      result[arr[i]] = object[arr[i]]
    }
    return result
  }

  /**
   * 将集合由 iteratee 迭代成一个值
   * @param  {array | object} collection               被迭代的集合
   * @param  {function} [iteratee=this.identity]       迭代器
   * @param  {*} accumulator                           初始值
   * @return {*}                                       迭代出来的值
   */
  let reduce = function (collection, iteratee = this.identity, accumulator) {
    let keys = Object.keys(collection)
    let result = accumulator !== undefined ? accumulator : collection[keys[0]]
    for (let i = accumulator !== undefined ? 0 : 1; i < keys.length; i++) {
      result = iteratee(result, collection[keys[i]], keys[i], collection)
    }
    return result
  }

  /**
   * 通过给定路径返回给定对象的值，如果值是函数，返回调用的结果
   * 如果返回值是 undefined ，返回 defaultValue
   * @param  {object} object               被查找的对象
   * @param  {array | string} path         查找的路径
   * @param  {*} defaultValue              替代返回值是 undefined 的值
   * @return {*}                           得到的值
   */
  let result = function (object, path, defaultValue) {
    let result = this.property(path)(object)
    result = result === undefined ? defaultValue : result
    if (this.isFunction(result)) {
      return result.call(this)
    }
    return result
  }

  /**
   * 返回 集合的大小
   * @param  {array | string | object} collection 被统计的对象
   * @return {number}                             统计后的大小
   */
  let size = function (collection) {
    let count = 0
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        count++
      }
    }
    return count
  }

  /**
   * 提取数组片段
   * @param  {array} array               被提取的数组
   * @param  {Number} [start=0]          提取起始位置
   * @param  {number} [end=array.length] 提取结束位置（不包括）
   * @return {array}                     被提取的数组
   */
  let slice = function (array, start = 0, end = array.length) {
    let result = []
    for (let i = start; i < end; i++) {
      if (array[i] !== undefined) {
        result.push(array[i])
      }
    }
    return result
  }

  /**
   * 使用迭代器检查集合成员是否满足条件，一旦满足，返回 true
   * @param  {array | object} collection                被检查的对象
   * @param  {function} [predicate=this.identity]       迭代器
   * @return {boolean}                                  一旦满足，返回 true
   */
  let some = function (collection, predicate = this.identity) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (this.iteratee(predicate)(collection[key], key, collection)) {
          return true
        }
      }
    }
    return false
  }

  /**
   * 将值转换为数组
   * @param  {*} value      需要被转换的值
   * @return {array}        返回转换后的数组
   */
  let toArray = function (value) {
    let result = []
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        result.push(value[key])
      }
    }
    return result
  }

  /**
   * 生成唯一的 ID，如果有前缀，附上前缀
   * @param  {*} value      前缀
   * @return {array}        ID
   */
  let uniqueId = (function () {
    let uniqueIdCount = 0
    return function (prefix = '') {
      uniqueIdCount++
      return prefix + uniqueIdCount
    }
  })()

  /**
   * 浅复制两值，并返回
   * @param  {*} value 被复制的值
   * @return {*}       复制后的值
   */
  let clone = function (value) {
    let result
    if (this.isDate(value)) {
      return new Date(value.toString())
    } else if (this.isRegExp(value)) {
      return new RegExp(value)
    } else if (this.isSymbol(value) || this.isString(value) || this.isBoolean(value) || this.isNumber(value)) {
      return value
    } else if (this.isArray(value)) {
      result = new Array()
    } else if (this.isArrayBuffer(value)) {
      result = new ArrayBuffer()
    } else if (this.isMap(value)) {
      result = new Map()
    } else if (this.isPlainObject(value)) {
      result = new Object()
    } else if (this.isSet(value)) {
      result = new Set()
    } else {
      return {}
    }
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = value[key]
      }
    }
    return result
  }

  /**
   * 深度复制
   * @param  {*} value  被复制的值
   * @return {*}        复制后的值
   */
  let cloneDeep = function (value) {
    let result
    if (this.isDate(value)) {
      return new Date(value.toString())
    } else if (this.isRegExp(value)) {
      return new RegExp(value)
    } else if (this.isSymbol(value) || this.isString(value) || this.isBoolean(value) || this.isNumber(value)) {
      return value
    } else if (this.isArray(value)) {
      result = new Array()
    } else if (this.isArrayBuffer(value)) {
      result = new ArrayBuffer()
    } else if (this.isMap(value)) {
      result = new Map()
    } else if (this.isPlainObject(value)) {
      result = new Object()
    } else if (this.isSet(value)) {
      result = new Set()
    } else {
      return {}
    }

    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = this.cloneDeep(value[key])
      }
    }
    return result
  }

  /**
   * 判断一个值是不是 Set
   * @param  {*}  value 需要判断的值
   * @return {Boolean}  如果是 返回 true
   */
  let isSet = function (value) {
    return toString.call(value) === '[object Set]'
  }

  /**
   * 创建一个删除所有可隐式为 false 的元素的数组
   * @param  {array} array  被筛选的数组
   * @return {array}        新的数组
   */
  let compact = function (array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        result.push(array[i])
      }
    }
    return result
  }

  /**
   * 连接值和数组
   * @param  {array} array   被连接的数组
   * @param  {...*} values   需要连接的数组
   * @return {array}         连接后的数组
   */
  let concat = function (array, ...values) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      result.push(array[i])
    }
    for (let i = 0; i < values.length; i++) {
      if (this.isArray(values[i])) {
        for (let j = 0; j < values[i].length; j++) {
          result.push(values[i][j])
        }
      } else {
        result.push(values[i])
      }
    }
    return result
  }

  /**
   * 创建一个从原型继承的对象，如果给出属性，
   * 该属性的可枚举自有属性会被分配给创建的对对象
   * @param  {object} prototype  继承的对象
   * @param  {object} properties 需要分配的属性
   * @return {object}            返回新的对象
   */
  let create = function (prototype, properties) {
    let obj = new Object()
    Object.setPrototypeOf(obj, prototype)
    if (properties) {
      for (let key in properties) {
        if (properties.hasOwnProperty(key)) {
          obj[key] = properties[key]
        }
      }
    }
    return obj
  }

  /**
   * 将源对象的可枚举自有属性分配到目标对象上，
   * 目标对象上已有的键值不能被覆盖
   * @param  {object} object     目标对象
   * @param  {...object} sources 源对象
   * @return {object}            修改后的目标对象
   */
  let defaults = function (object, ...sources) {
    sources.forEach(function (obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && !(key in object)) {
          object[key] = obj[key]
        }
      }
    })
    return object
  }


  /**
   * 递归分配属性
   * 目标对象上已有的键值不能被覆盖
   * @param  {object} object     目标对象
   * @param  {...object} sources 源对象
   * @return {object}            修改后的目标对象
   */
  let defaultsDeep = function (object, ...sources) {
    sources.forEach(function (obj) {
      for (let key in obj) {
        if (typeof object[key] === 'object' && typeof obj[key] === 'object') {
          defaultsDeep(object[key], obj[key])
        } else if (obj.hasOwnProperty(key) && !(key in object)) {
          object[key] = obj[key]
        }
      }
    })
    return object
  }

  /**
   * 等待当前调用栈清空后调用函数，并可以传给该函数参数
   * @param  {function} func 被调用函数
   * @param  {...*} args     传入的参数
   * @return {number}        id
   */
  let defer = function (func, ...args) {
    return setTimeout(func.bind(this, ...args, 0))
  }

  /**
   * 延时调用函数
   * @param  {function} func 延时调用函数
   * @param  {number} wait   延时时间
   * @param  {...*} args     传入函数的参数
   * @return {number}        id
   */
  let delay = function (func, wait, ...args) {
    return setTimeout(func.bind(this, ...args), wait)
  }

  /**
   * 使用迭代器迭代集合
   * @param  {array | object} collection          被迭代的集合
   * @param  {function} [iteratee=identity]        迭代器
   * @return {*}                                   返回值
   */
  let each = function (collection, iteratee = this.identity) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (iteratee(collection[key], key, collection) === false) {
          return collection
        }
      }
    }
    return collection
  }

  /**
   * 迭代器迭代集合，当所有迭代结果都为 true 时，返回 true
   * @param  {array | object} collection                被迭代的集合
   * @param  {function} [predicate=this.identity]       迭代器
   * @return {boolean}                                  如果所有成员迭代结果都为 true ，返回 true
   */
  let every = function (collection, predicate = this.identity) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (this.iteratee(predicate)(collection[key], key, collection) === false) {
          return false
        }
      }
    }
    return true
  }

  /**
   * 将数组降一维
   * @param  {array} array 待降维数组
   * @return {array}       降维后的数组
   */
  let flatten = function (array) {
    let result = []
    let that = this
    array.forEach(function (it) {
      if (that.isArray(it)) {
        it.forEach(function (a) {
          result.push(a)
        })
      } else {
        result.push(it)
      }
    })
    return result
  }

  /**
   * 将数组将为一维数组
   * @param  {array} array 待降维数组
   * @return {array}       降维后的一维数组
   */
  let flattenDeep = function (array) {
    let result = this.flatten(array)
    let onOff = true
    for (let i = 0; i < result.length; i++) {
      if (this.isArray(result[i])) {
        onOff = false
        break
      }
    }
    if (!onOff) {
      result = this.flattenDeep(result)
    }
    return result
  }

  /**
   * 判断给定路径是否在对象自身上存在，且可枚举
   * @param  {object}  object         被查找的对象
   * @param  {array | string}  path   给定的路径
   * @return {Boolean}                如果存在，返回 true
   */
  let has = function (object, path) {
    let prop
    if (this.isString(path)) {
      prop = path.match(/\w+/g)
    } else {
      prop = path
    }
    let temp = object
    for (let i = 0; i < prop.length; i++) {
      if (temp.hasOwnProperty(prop[i])) {
        temp = temp[prop[i]]
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 返回数组的第一项
   * @param  {array} array 被查询的数组
   * @return {*}           数组中的第一个成员
   */
  let head = function (array) {
    return array[0]
  }

  let indexOf = function (array, value, fromIndex = 0) {
    let len = array.length
    if (fromIndex >= 0) {
      for (; fromIndex < len; fromIndex++) {
        if (this.isEqual(array[fromIndex], value)) {
          break
        }
      }
    } else {
      for (fromIndex = len + fromIndex; fromIndex >= 0; fromIndex--) {
        if (this.isEqual(array[fromIndex], value)) {
          break
        }
      }
    }
    return fromIndex < len ? fromIndex : -1
  }

  /**
   * 遍历对象的可枚举自有属性
   * @param  {object} object     被迭代的对象
   * @param  {function} iteratee 对对象每个成员进行调用的函数
   * @return {object}            返回一个对象
   */
  let forOwn = function (object, iteratee = this.identity) {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        if (iteratee(object[key], key, object) === false) {
          break
        }
      }
    }
  }

  // base function ================================

  /**
   * 创建一个新数组，将原数组分组
   * @param  {array} array     原数组
   * @param  {Number} [size=1] 每组长度
   * @return {array}           新的数组
   */
  let chunk = function (array, size = 1) {
    //debugger
    return this.reduce(array, function (memo, curr, index) {
      if (index % size === 0) {
        memo.push([curr])
      } else {
        memo[memo.length - 1].push(curr)
      }
      return memo
    }, [])
  }

  /**
   * 创建一个新数组，其成员是被比较数组中的成员，且不在对比数组中的值
   * @param  {array} array     被比较数组
   * @param  {...array} values 比较数组
   * @return {array}           返回新的数组
   */
  let difference = function (array, ...values) {
    return this.differenceBy(array, ...values)
  }

  /**
   * 类似于 difference 为每个值调用 iteratee ，在进行比较
   * @param  {array} array                  被比较数组
   * @param  {...array} values              比较数组
   * @param  {function} iteratee=_.identity 调用的函数
   * @return {array}           返回新的数组
   */
  let differenceBy = function (array, ...others) {
    let iteratee
    let that = this
    if (!this.isArray(others[others.length - 1])) {
      iteratee = others.pop()
    } else {
      iteratee = this.identity
    }
    let flat = this.map(this.flatten(others), it => this.iteratee(iteratee)(it))
    return this.reduce(array, function (memo, curr) {
      if (!that.includes(flat, that.iteratee(iteratee)(curr))) {
        memo.push(curr)
      }
      return memo
    }, [])
  }

  /**
   * 类似于 difference 自定义比较方式在进行比较
   * @param  {array} array                    被比较数组
   * @param  {...array} values                比较数组
   * @param  {function} comparator            调用的函数
   * @return {array}                          返回新的数组
   */
  let differenceWith = function (array, ...others) {
    let that = this
    let comparator = others.pop()
    let flat = this.flatten(others)
    return this.reduce(array, function (memo, curr) {
      that.each(flat, function (a) {
        if (!comparator.call(that, a, curr)) {
          memo.push(curr)
        }
      })
      return memo
    }, [])
  }

  /**
   * 检查一个值是否都在集合中
   * @param  {array | object | string} collection    被比较的集合
   * @param  {*} value                               检查的值
   * @param  {Number} [fromIndex=0]                  查找的索引
   * @return {booleam}                               如果存在，返回 true
   */
  let includes = function (collection, value, fromIndex = 0) {
    let count = 0
    for (let key in collection) {
      if (count < fromIndex) {
        count++
        continue
      }
      if (collection.hasOwnProperty(key)) {
        if (this.isEqual(collection[key], value)) {
          return true
        }
      }
    }
    if (this.isString(collection) && this.isString(value)) {
      let reg = new RegExp(value)
      return reg.test(collection)
    }
    return false
  }

  /**
   * 返回一个 从指定位置在原数组上切割 的新数组
   * @param  {array} array  被切割数组
   * @param  {Number} [n=1] 开始切割的位置
   * @return {array}        返回新数组
   */
  let drop = function (array, n = 1) {
    return array.reduce(function (memo, curr, index) {
      if (index >= n) {
        memo.push(curr)
      }
      return memo
    }, [])
  }

  /**
   * 返回一个 从指定位置反方向在原数组上切割 的新数组
   * @param  {array} array  被切割数组
   * @param  {Number} [n=1] 开始切割的位置
   * @return {array}        返回新数组
   */
  let dropRight = function (array, n = 1) {
    let index = array.length - n
    return array.reduce(function (memo, curr, i) {
      if (i < index) {
        memo.push(curr)
      }
      return memo
    }, [])
  }

  /**
   * 返回一个 切割数组，直道从右往左出现的第一个 false
   * @param  {array} array                        被切割数组
   * @param  {function} [predicate=this.identity] 断言函数
   * @return {array}                              返回新数组
   */
  let dropRightWhile = function (array, predicate = this.identity) {
    let result = [],
      i = array.length - 1
    for (; i >= 0; i--) {
      if (this.iteratee(predicate)(array[i]) === false) {
        break
      }
    }
    for (let j = 0; j <= i; j++) {
      result.push(array[j])
    }
    return result
  }

  /**
   * 返回一个 切割数组 从左往右出现的第一个 false 开始切割
   * @param  {array} array                        被切割数组
   * @param  {function} [predicate=this.identity] 断言函数
   * @return {array}                              返回新数组
   */
  let dropWhile = function (array, predicate = this.identity) {
    let result = [],
      i = 0
    for (; i < array.length; i++) {
      if (this.iteratee(predicate)(array[i]) === false) {
        break
      }
    }
    for (; i < array.length; i++) {
      result.push(array[i])
    }
    return result
  }

  /**
   * 给数组指定区段分配成员
   * @param  {array} array               被分配的数组
   * @param  {*} value                   分配给数组的值
   * @param  {Number} [start=0]          区段起始位置
   * @param  {number} [end=array.length] 区段结束为止（不包含）
   * @return {array}                     修改后的数组
   */
  let fill = function (array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }

  /**
   * 返回断言函数第一次返回 true 的元素的索引
   * @param  {array} array                        被查找的数组
   * @param  {function} [predicate=this.identity] 断言函数
   * @param  {Number} [fromIndex=0]               开始查找的位置
   * @return {number}                             索引
   */
  let findIndex = function (array, predicate = this.identity, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (this.iteratee(predicate)(array[i])) {
        return i
      }
    }
    return -1
  }

  /**
   * 从右往左返回断言函数第一次返回 true 的元素的索引
   * @param  {array} array                        被查找的数组
   * @param  {function} [predicate=this.identity] 断言函数
   * @param  {Number} [fromIndex=0]               开始查找的位置
   * @return {number}                             索引
   */
  let findLastIndex = function (array, predicate = this.identity, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (this.iteratee(predicate)(array[i])) {
        return i
      }
    }
    return -1
  }

  /**
   * 指定降维深度
   * @param  {array} array      降维数组
   * @param  {Number} [depth=1] 降维深度
   * @return {array}            降维后的数组
   */
  let flattenDepth = function (array, depth = 1) {
    let result = array
    for (let i = 0; i < depth; i++) {
      result = this.flatten(result)
    }
    return result
  }

  /**
   * 将二维数组转换为对象
   * @param  {array} pairs  键值对二维数组
   * @return {object}       转换后的对象
   */
  let fromPairs = function (pairs) {
    return pairs.reduce(function (memo, curr) {
      memo[curr[0]] = curr[1]
      return memo
    }, {})
  }

  /**
   * 返回一个除了原数组最后一个元素的数组
   * @param  {array} array 原数组
   * @return {array}       新数组
   */
  let initial = function (array) {
    return array.reduce(function (memo, curr, index) {
      if (index < array.length - 1) {
        memo.push(curr)
      }
      return memo
    }, [])
  }

  /**
   * 返回一个所有参数数组都拥有的值的集合
   * @param  {...array} array 被筛选数组群
   * @return {array}          筛选出来的数组
   */
  let intersection = function (...array) {
    return this.intersectionBy(...array)
  }

  /**
   * 和 intersection 类似，通过 迭代器筛选
   * @param  {...array} array 被筛选数组群
   * @return {array}          筛选出来的数组
   */
  let intersectionBy = function (...paras) {
    let iteratee
    if (!this.isArray(paras[paras.length - 1])) {
      iteratee = paras.pop()
    } else {
      iteratee = this.identity
    }
    let temp = this.drop(paras)
    let that = this
    return paras[0].reduce(function (memo, curr) {
      let onOff = that.reduce(temp, function (me, cu) {
        let tmp = that.map(cu, it => that.iteratee(iteratee)(it))
        if (!that.includes(tmp, that.iteratee(iteratee)(curr))) {
          me = false
        }
        return me
      }, true)
      if (onOff) {
        memo.push(curr)
      }
      return memo
    }, [])
  }

  /**
   * 和 intersection 类似，可自定义比较方式
   * @param  {...array} array 被筛选数组群
   * @return {array}          筛选出来的数组
   */
  let intersectionWith = function (...paras) {
    let comparator = paras.pop()
    let that = this
    let others = this.drop(paras)
    return paras[0].reduce(function (memo, curr) {
      let onOff = that.reduce(others, function (me, cu) {
        for (let i = 0; i < cu.length; i++) {
          if (comparator.call(that, curr, cu[i])) {
            me = true
          }
        }
        return me
      }, false)
      if (onOff) {
        memo.push(curr)
      }
      return memo
    }, [])
  }

  /**
   * 根据指定符号连接数组成员为字符串
   * @param  {array} array           被连接的数组
   * @param  {String} [separator=''] 连接符号
   * @return {string}                连接成功的字符串
   */
  let join = function (array, separator = ',') {
    return this.reduce(array, function (memo, curr, index, arr) {
      if (index == arr.length - 1) {
        memo += curr
      } else {
        memo += curr + separator
      }
      return memo
    }, '')
  }

  /**
   * 从走往左检索数组，返回第一个与给定值相等的索引
   * @param  {array} array                         被检索的数组
   * @param  {*} value                             给定判断的值
   * @param  {number} [fromIndex=array.length - 1] 判断的起始位置
   * @return {number}                              索引值
   */
  let lastIndexOf = function (array, value, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (this.isEqual(array[i], value)) {
        return i
      }
    }
    return -1
  }

  /**
   * 返回数组中给定索引的值，给定索引为负数时，从后往前找
   * @param  {array} array  待查数组
   * @param  {Number} [n=0] 索引
   * @return {*}            找到的值
   */
  let nth = function (array, n = 0) {
    if (n >= 0) {
      return array[n]
    } else {
      return array[array.length + n]
    }
  }

  /**
   * 从给定数组中剔除所有指定的值
   * @param  {array} array   被操作的数组
   * @param  {*} values      指定的值
   * @return {array}         操作后的值
   */
  let pull = function (array, ...values) {
    return this.pullAllBy(array, values)
  }

  /**
   * 从给定数组中剔除指定数组中的所有值
   * @param  {array} array   被操作的数组
   * @param  {*} values      指定的值
   * @return {array}         操作后的值
   */
  let pullAll = function (array, values) {
    return this.pullAllBy(array, values)
  }

  /**
   * 通过迭代器从给定数组中剔除所有指定的值
   * @param  {array} array                       被操作的数组
   * @param  {*} values                          指定的值
   * @param  {function} [iteratee=this.identity] 迭代器
   * @return {array}                             操作后的值
   */
  let pullAllBy = function (array, values, iteratee = this.identity) {
    let that = this
    this.forEach(values, function (element) {
      for (let i = 0; i < array.length; i++) {
        if (that.isEqual(that.iteratee(iteratee)(element), that.iteratee(iteratee)(array[i]))) {
          array.splice(i, 1)
          i--
        }
      }
    })
    return array
  }

  /**
   * 和 pullAllBy 类似，自定义指定比较函数
   * @param  {array} array                       被操作的数组
   * @param  {*} values                          指定的值
   * @param  {function} [comparator]             自定义函数
   * @return {array}                             操作后的值
   */
  let pullAllWith = function (array, values, comparator) {
    let that = this
    this.forEach(values, function (element) {
      for (let i = 0; i < array.length; i++) {
        if (comparator.call(that, element, array[i])) {
          array.splice(i, 1)
          i--
        }
      }
    })
    return array
  }

  /**
   * 移除制定索引的元素
   * @param  {array} array   被操作的数组
   * @param  {number} indexs 索引集
   * @return {array}         操作后的数组
   */
  let pullAt = function (array, ...indexs) {
    let result = []
    let index = this.flatten(indexs)
    for (let i = 0; i < index.length; i++) {
      result.push(array[index[i]])
    }
    index = index.sort((a, b) => b - a)
    for (let i = 0; i < index.length; i++) {
      array.splice(index[i], 1)
    }
    return result
  }

  /**
   * 断言数组内所有的成员，删除返回 true 的成员并返回被删成员数组
   * @param  {array} array                      被判断的数组
   * @param  {function} predicate=this.identity 断言函数
   * @return {array}                            被删成员集合
   */
  let remove = function (array, predicate = this.identity) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        result.push(array[i])
        array.splice(i, 1)
        i--
      }
    }
    return result
  }

  /**
   * 反转数组
   * @param  {array} array 待反转的数组
   * @return {array}       反转后的数组
   */
  let reverse = function (array) {
    return array.reverse()
  }

  /**
   * 将给定的值插入到所给数组中，保持其顺序不变
   * @param  {array} array 被检索数组
   * @param  {*} value     给定的值
   * @return {unmber}      检索出的索引
   */
  let sortedIndex = function (array, value) {
    return this.sortedIndexBy(array, value)
  }

  /**
   * 类似 sortedIndex 调用迭代函数检索
   * @param  {array} array 被检索的数组
   * @param  {*} value     给定的值
   * @param  {function}    调用的迭代函数
   * @return {number}      索引值
   */
  let sortedIndexBy = function (array, value, iteratee = this.identity) {
    let i = 0;
    for (; i < array.length; i++) {
      if (this.iteratee(iteratee)(value) <= this.iteratee(iteratee)(array[i])) {
        break
      }
    }
    return i
  }

  /**
   * 第一个匹配到值的索引
   * @param  {array} array 被查找的数组
   * @param  {*} value     匹配的值
   * @return {number}      匹配到的索引
   */
  let sortedIndexOf = function (array, value) {
    let i = 0
    for (; i < array.length; i++) {
      if (this.isEqual(array[i], value)) {
        break
      }
    }
    return i === array.length ? -1 : i
  }

  /**
   * 从左往右将给定的值插入到所给数组中，保持其顺序不变
   * @param  {array} array 被检索数组
   * @param  {*} value     给定的值
   * @return {unmber}      检索出的索引
   */
  let sortedLastIndex = function (array, value) {
    return this.sortedLastIndexBy(array, value)
  }

  /**
   * 从左往右类似 sortedIndex 调用迭代函数检索
   * @param  {array} array 被检索的数组
   * @param  {*} value     给定的值
   * @param  {function}    调用的迭代函数
   * @return {number}      索引值
   */
  let sortedLastIndexBy = function (array, value, iteratee = this.identity) {
    let i = array.length - 1
    for (; i >= 0; i--) {
      if (this.iteratee(iteratee)(value) >= this.iteratee(iteratee)(array[i])) {
        break
      }
    }
    return i + 1
  }

  /**
   * 从左往右第一个匹配到值的索引
   * @param  {array} array 被查找的数组
   * @param  {*} value     匹配的值
   * @return {number}      匹配到的索引
   */
  let sortedLastIndexOf = function (array, value) {
    let i = array.length - 1
    for (; i >= 0; i--) {
      if (this.isEqual(array[i], value)) {
        return i
      }
    }
    return -1
  }

  /**
   * 类似 uniq 筛选的时候保持顺序
   * @param  {array} array 被筛选的数组
   * @return {array}       筛选后的数组
   */
  let sortedUniq = function (array) {
    return this.uniqBy(array)
  }

  /**
   * 类似 uniq 通过迭代器筛选 数组
   * @param  {array} array        被筛选的数组
   * @param  {function} iteratee  迭代器
   * @return {array}              筛选后的数组
   */
  let sortedUniqBy = function (array, iteratee) {
    return this.uniqBy(array, iteratee)
  }


  /**
   * 筛选数组，保持数组内不存在重复项
   * @param  {array} array 被筛选的数组
   * @return {array}       筛选后的数组
   */
  let uniq = function (array) {
    return this.uniqBy(array)
  }

  /**
   * 类似 uniq 通过迭代器筛选数组
   * @param  {array} array                      被筛选的数组
   * @param  {function} iteratee=this.identity  迭代器
   * @return {array}                            筛选后的数组
   */
  let uniqBy = function (array, iteratee = this.identity) {
    let that = this
    return this.reduce(array, function (memo, curr) {
      for (let i = 0; i < memo.length; i++) {
        if (that.isEqual(that.iteratee(iteratee)(curr), that.iteratee(iteratee)(memo[i]))) {
          return memo
        }
      }
      memo.push(curr)
      return memo
    }, [])
  }

  /**
   * 将数组第一项去除
   * @param  {array} array 被操作的数组
   * @return {array}       操作后的数组
   */
  let tail = function (array) {
    return this.reduce(array, function (memo, curr, i) {
      if (i == 0) {
        return memo
      }
      memo.push(curr)
      return memo
    }, [])
  }

  /**
   * 顺序提取给定数量的成员
   * @param  {array} array 被提取的数组
   * @param  {number} n=1  给定的数量
   * @return {array}       提取后的数组
   */
  let take = function (array, n = 1) {
    return this.reduce(array, function (memo, curr, i) {
      if (i >= n) {
        return memo
      }
      memo.push(curr)
      return memo
    }, [])
  }

  /**
   * 根据给定的数目，从右往左提取成员
   * @param  {array} array 被提取的数组
   * @param  {*} n=1       给定的数量
   * @return {array}       提取后的数组
   */
  let takeRight = function (array, n = 1) {
    let index = array.length - n
    return this.reduce(array, function (memo, curr, i) {
      if (i < index) {
        return memo
      }
      memo.push(curr)
      return memo
    }, [])
  }

  /**
   * 依据断言函数，从右向左提取数据
   * @param  {array} array                      被提取数组
   * @param  {function} predicate=this.identity 断言函数
   * @return {array}                            提取后的数组
   */
  let takeRightWhile = function (array, predicate = this.identity) {
    debugger
    let result = [],
      onOff = true
    for (let i = array.length - 1; i >= 0; i--) {
      if (this.iteratee(predicate)(array[i], i, array) === false) {
        onOff = false
      }
      if (onOff) {
        result.unshift(array[i])
      }
    }
    return result
  }

  /**
   * 依据断言函数，提取数据
   * @param  {array} array                      被提取数组
   * @param  {function} predicate=this.identity 断言函数
   * @return {array}                            提取后的数组
   */
  let takeWhile = function (array, predicate = this.identity) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      if (this.iteratee(predicate)(array[i], i, array) === false) {
        return result
      }
      result.push(array[i])
    }
    return result
  }

  /**
   * 将数组集提取出成员，且不重复提取
   * @param  {array} ...arrays  被提取的数组集
   * @return {array}            提取后的数组
   */
  let union = function (...arrays) {
    let that = this
    return Array.from(new Set(that.flatten(arrays)))
  }

  /**
   * 通过迭代函数将数组集提取出成员，且不重复提取
   * @param  {array} ...arrays   被提取的数组集
   * @param  {function}          迭代函数
   * @return {array}             提取后的数组
   */
  let unionBy = function (...others) {
    let iteratee
    if (!this.isArray(others[others.length - 1])) {
      iteratee = others.pop()
    } else {
      iteratee = this.identity
    }
    let that = this
    others = this.flatten(others)
    return others.map(it => this.iteratee(iteratee)(it)).reduce(function (memo, curr, i) {
      let onOff = memo.reduce(function (me, cu) {
        if (that.isEqual(that.iteratee(iteratee)(cu), curr)) {
          me = false
        }
        return me
      }, true)
      if (onOff) {
        memo.push(others[i])
      }
      return memo
    }, [])
  }

  /**
   * 自定义函数将数组集提取出成员，且不重复提取
   * @param  {array} ...arrays  被提取的数组集
   * @param  {function}         对比函数
   * @return {array}            提取后的数组
   */
  let unionWith = function (...others) {
    let comparator = others.pop()
    others = this.flatten(others)
    for (let i = 0; i < others.length; i++) {
      for (let j = i + 1; j < others.length; j++) {
        if (comparator.call(this, others[i], others[j])) {
          others.splice(j, 1)
        }
      }
    }
    return others
  }

  /**
   * 返回一个数组，将每个成员数组的相同项统筹
   * @param  {array} ...arrays 被压缩的数组
   * @return                   压缩后的数组
   */
  let zip = function (...arrays) {
    let result = []
    for (let i = 0; i < arrays[0].length; i++) {
      result.push([arrays[0][i]])
    }
    for (let i = 1; i < arrays.length; i++) {
      for (let j = 0; j < arrays[i].length; j++) {
        result[j].push(arrays[i][j])
      }
    }
    return result
  }

  /**
   * 解压数组
   * @param  {array} array 需要被解压的数组
   * @return {array}       解压后的数组
   */
  let unzip = function (array) {
    return this.zip(...array)
  }

  /**
   * 通过迭代器解压数组
   * @param  {array} array                    需要被解压的数组
   * @param  {array} iteratee=this.identity   迭代函数
   * @return                                  解压后的数组
   */
  let unzipWith = function (array, iteratee = this.identity) {
    let temp = this.zip(...array)
    return this.map(temp, (it) => this.iteratee(iteratee)(...it))
  }

  /**
   * 两数相加
   * @param  {number} augend 加数
   * @param  {number} addend 被加数
   * @return {number}        和
   */
  let add = function (augend, addend) {
    return augend + addend
  }
  /**
   * 将数组内所有给定值都去除
   * @param  {array} array 被操作的数组
   * @param  {*} ...values 需要在数组中去除的值
   * @return {array}       操作后的数组
   */
  let without = function (array, ...values) {
    let that = this
    let result = this.clone(array)
    return this.reduce(values, function (memo, curr) {
      for (let i = 0; i < memo.length; i++) {
        if (that.isEqual(memo[i], curr)) {
          memo.splice(i, 1)
          i--
        }
      }
      return memo
    }, result)
  }
  /**
   * 仅保留数组中出现一次的成员
   * @param  {array} ...arrays 被检查的数组
   * @return {array}           筛选出的数组
   */
  let xor = function (...arrays) {
    let that = this
    let result = this.flatten(arrays)
    return this.reduce(result, function (memo, curr, i, array) {
      if (that.lastIndexOf(array, curr) != i) {
        for (let i = 0; i < array.length; i++) {
          if (that.isEqual(curr, array[i])) {
            array.splice(i, 1)
          }
        }
      }
      return array
    })
  }

  /**
   * 通过迭代仅保留数组中出现一次的成员
   * @param  {array} ...arrays 被检查的数组
   * @return {array}           筛选出的数组
   */
  let xorBy = function (...others) {
    let iteratee
    if (!this.isArray(others[others.length - 1])) {
      iteratee = others.pop()
    } else {
      iteratee = this.identity
    }
    let result = this.flatten(others)
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (this.isEqual(this.iteratee(iteratee)(result[i]), this.iteratee(iteratee)(result[j]))) {
          result.splice(j, 1)
          result.splice(i, 1)
          i--
        }
      }
    }
    return result
  }

  /**
   * 通过自定义函数仅保留数组中出现一次的成员
   * @param  {array} ...arrays 被检查的数组
   * @return {array}           筛选出的数组
   */
  let xorWith = function (...others) {
    let comparator = others.pop()
    let result = this.flatten(others)
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (comparator.call(this, result[i], result[j])) {
          result.splice(j, 1)
          result.splice(i, 1)
          i--
        }
      }
    }
    return result
  }

  /**
   * 将参数压缩成对象
   * @param  {array} props=[]  键
   * @param  {array} values=[] 值
   * @return {object}          压缩后的对象
   */
  let zipObject = function (props = [], values = []) {
    return this.reduce(props, function (memo, curr, i) {
      memo[curr] = values[i]
      return memo
    }, {})
  }

  /**
   * 根据路径，将参数打包成对象
   * @param  {array} props=[] 路径
   * @param  {array} values=[] 值
   * @return {object}           打包后的对象
   */
  let zipObjectDeep = function (props = [], values = []) {
    let that = this
    debugger
    let prop = props.map(it => it.match(/\w+/g))
    let result = {}
    for (let i = 0; i < prop.length; i++) {
      parse(prop[i], result, values[i])
    }
    return result

    function parse(path, obj, value) {
      let key = path.shift()
      if (path.length === 0) {
        obj[key] = value
        return obj
      }
      if (obj[key]) {
        parse(path, obj[key], value)
      } else if (that.isNaN(+path[0])) {
        obj[key] = {}
        parse(path, obj[key], value)
      } else {
        obj[key] = []
        parse(path, obj[key], value)
      }
      return obj
    }
  }

  /**
   * 根据迭代器 打包数组
   * @param {array} ...array                    需要打包的数组
   * @param {function} iteratee = this.identity 迭代器
   * @return {array}                            打包后的数组
   */
  let zipWith = function (...others) {
    let iteratee
    if (!this.isArray(others[others.length - 1])) {
      iteratee = others.pop()
    } else {
      iteratee = this.identity
    }
    let result = this.zip(...others)
    return this.map(result, a => iteratee(...a))
  }

  /**
   * 创建一个对象，
   * 将每个元素的迭代结果作为该对象的键名，该结果出现的次数，作为该对象的键值
   * @param  {array | object} collection       被操作的集合
   * @param  {function} iteratee=this.identity 迭代器
   * @return {object}                           迭代出的结果
   */
  let countBy = function (collection, iteratee = this.identity) {
    let that = this
    return this.reduce(collection, function (memo, curr) {
      let key = that.iteratee(iteratee)(curr)
      if (key in memo) {
        memo[key]++
      } else {
        memo[key] = 1
      }
      return memo
    }, {})
  }

  /**
   * 反方向遍历数组
   * @param  {array | object} collection 被迭代的集合
   * @param  {function} iteratee=this.identity 迭代器
   * @return {*}                               返回集合
   */
  let eachRight = function (collection, iteratee = this.identity) {
    let keys = Object.keys(collection)
    for (let i = keys.length - 1; i >= 0; i--) {
      if (iteratee(collection[keys[i]], keys[i], collection) === false) {
        return collection
      }
    }
    return collection
  }

  /**
   * 从右往左迭代成员，返回第一个满足的成员
   * @param  {array | object} collection                     被迭代的集合
   * @param  {function} predicate=this.identity     迭代器
   * @param  {number} fromIndex=collection.length-1 索引起始位置
   * @return {*}                                    满足条件的第一个成员，未找到返回 undefined
   */
  let findLast = function (collection, predicate = this.identity, fromIndex = collection.length - 1) {
    let keys = Object.keys(collection)
    for (let i = fromIndex; i >= 0; i--) {
      if (this.iteratee(predicate)(collection[keys[i]])) {
        return collection[keys[i]]
      }
    }
  }

  /**
   * 从右往左迭代成员，返回第一个满足的成员的键名
   * @param  {array | object} collection            被迭代的集合
   * @param  {function} predicate=this.identity     迭代器
   * @param  {number} fromIndex=collection.length-1 索引起始位置
   * @return {*}                                    满足条件的第一个成员的键名，未找到返回 undefined
   */
  let findLastKey = function (collection, predicate = this.identity) {
    let keys = Object.keys(collection)
    for (let i = keys.length - 1; i >= 0; i--) {
      if (this.iteratee(predicate)(collection[keys[i]])) {
        return keys[i]
      }
    }
  }

  /**
   * 迭代集合成员，并将结果降一维
   * @param  {array | object} collection                 被迭代的集合
   * @param  {function} iteratee=this.identity 迭代器
   * @return {array}                           处理后的数组
   */
  let flatMap = function (collection, iteratee = this.identity) {
    return this.flatten(this.map(collection, (it, index, array) => iteratee(it, index, array)))
  }

  /**
   * 迭代集合成员，并将结果降成一维
   * @param  {array | object} collection                 被迭代的集合
   * @param  {function} iteratee=this.identity 迭代器
   * @return {array}                           处理后的数组
   */
  let flatMapDeep = function (collection, iteratee = this.identity) {
    return this.flattenDeep(this.map(collection, (it, index, array) => iteratee(it, index, array)))
  }

  /**
   * 迭代集合成员，并将结果降维，维度自定义
   * @param  {array | object} collection                 被迭代的集合
   * @param  {function} iteratee=this.identity 迭代器
   * @param  {number} depth = 1                维度
   * @return {array}                           处理后的数组
   */
  let flatMapDepth = function (collection, iteratee = this.identity, depth = 1) {
    return this.flattenDepth(this.map(collection, (it, index, array) => iteratee(it, index, array)), depth)
  }

  /**
   * 利用迭代期迭代集合，将迭代出来的结果作为键名，被迭代的成员作为键值
   * @param  {array | object} collection       被迭代的集合
   * @param  {function} iteratee=this.identity 迭代器
   * @return {object}                          新对象
   */
  let groupBy = function (collection, iteratee = this.identity) {
    let that = this
    return this.reduce(collection, function (memo, curr) {
      let tmp = that.iteratee(iteratee)(curr)
      if (tmp in memo) {
        memo[tmp].push(curr)
      } else {
        memo[tmp] = [curr]
      }
      return memo
    }, {})
  }

  /**
   * 对集合中每一个元素调用方法，返回结果数组
   * @param  {array | object} collection      被调用的集合
   * @param  {array | function | string} path 调用方法的路径
   * @param  {...*} ...args                   方法的参数
   * @return {array}                          结果集
   */
  let invokeMap = function (collection, path, ...args) {
    let that = this
    return this.map(collection, function (it) {
      if (that.isFunction(path)) {
        return path.apply(it, args)
      } else {
        return that.propertyOf(it)(path).call(it, ...args)
      }
    })
  }

  /**
   * 与 property 相反，通过对象返回一个函数，函数通过参数返回结果
   * @param  {object} object         查找的对象
   * @return {function}              返回的函数
   */
  let propertyOf = function (object) {
    let that = this
    return function (path) {
      let prop
      if (that.isString(path)) {
        prop = path.match(/\w+/g)
      }
      if (that.isArray(path)) {
        prop = path
      }
      return that.reduce(prop, function (memo, curr) {
        return memo = memo[curr]
      }, object)
    }
  }
  /**
   * 创建一个对象，键名是集合成员通过接待后的结果，键值是该成员
   * @param  {array | object} collection       被迭代的集合
   * @param  {function} iteratee=this.identity 迭代器
   * @return {object}                          生成的新对象
   */
  let keyBy = function (collection, iteratee = this.identity) {
    let that = this
    return this.reduce(collection, function (memo, curr) {
      memo[that.iteratee(iteratee)(curr)] = curr
      return memo
    }, {})
  }
  /**
   * 类似于 sortby 除了可以指定排序顺序
   * @param  {array | object} collection                                         被排序的集合
   * @param  {function[] | array[] | object[] | string[]} iteratee=this.identity 迭代器
   * @param  {string} orders='asc'                                               顺序指令
   * @return {array}                                                             排序后的数组
   */
  let orderBy = function (collection, iteratee = this.identity, orders = 'asc') {
    let that = this
    let result = this.clone(collection)
    for (let i = iteratee.length - 1; i >= 0; i--) {
      result.sort(function (a, b) {
        let order = that.iteratee(iteratee[i])(a) > that.iteratee(iteratee[i])(b)
        return orders[i] === 'asc' ? order : !order
      })
    }
    return result
  }

  /**
   * 断言集合中的元素，并进行分组
   * @param  {array | object} collection        被断言的集合
   * @param  {function} predicate=this.identity 断言函数
   * @return {array}                            分组后的数组
   */
  let partition = function (collection, predicate = this.identity) {
    let that = this
    let result = [
      [],
      []
    ]
    return this.reduce(collection, function (memo, curr) {
      that.iteratee(predicate)(curr) ? result[0].push(curr) : result[1].push(curr)
      return result
    }, result)
  }

  /**
   * 同 reduce 从右往左迭代
   * @param  {array | object} collection       别迭代的集合
   * @param  {function} iteratee=this.identity 迭代器
   * @param  {*} accumulator                   初始值
   * @return {*}                               迭代后的值
   */
  let reduceRight = function (collection, iteratee = this.identity, accumulator) {
    let keys = Object.keys(collection)
    let result = accumulator || collection[keys[0]]
    for (let i = accumulator ? keys.length - 1 : keys.length - 2; i >= 0; i--) {
      result = iteratee(result, collection[keys[i]], keys[i], collection)
    }
    return result
  }

  /**
   * 和 filter 相反，收集断言失败的函数
   * @param  {array | object} collection        被断言的集合
   * @param  {function} predicate=this.identity 断言函数
   * @return {array}                            收集的集合
   */
  let reject = function (collection, predicate = this.identity) {
    let result = []
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (!this.iteratee(predicate)(collection[key], key, collection)) {
          result.push(collection[key])
        }
      }
    }
    return result
  }

  /**
   * 随机选取一个成员
   * @param  {array | object} collection 待选集合
   * @return {array}                     选中成员数组
   */
  let sample = function (collection) {
    let keys = Object.keys(collection)
    let size = keys.length
    return collection[keys[~~(Math.random() * size)]]
  }

  /**
   * 随机选取一组成员
   * @param  {array | object} collection 待选集合
   * @param  {number}                    选取成员的个数
   * @return {array}                     选中成员数组
   */
  let sampleSize = function (collection, n = 1) {
    let result = []
    let keys = Object.keys(collection)
    let size = keys.length
    let index
    n = n >= size ? size : n
    while (n) {
      index = ~~(Math.random() * size)
      result.push(collection[keys.splice(index, 1)[0]])
      size--
      n--
    }
    return result
  }

  /**
   * 通过 Fisher - Yates 随机打乱数组
   * @param  {array | object} collection 待打乱集合
   * @return {array | object}            打乱后的数组
   */
  let shuffle = function (collection) {
    let result = Object.keys(collection)
    let size = result.length
    let index
    result.forEach(function (a, i, array) {
      index = ~~(Math.random() * (size - i - 1)) + i
      array.splice(i, 1, array[index])
      array.splice(index, 1, a)
    })
    return this.map(result, it => collection[it])
  }
  /**
   * 返回从 1970 1.1 00：00：00 UTC 至今的毫秒数
   */
  let now = function () {
    return Date.now()
  }

  /**
   * func 在第 n 次调用后才会执行
   * @param  {number} n      约定第几次开始执行函数 func
   * @param  {function} func 被约束的函数
   * @return {function}      新的函数
   */
  let after = function (n, func) {
    let count = 0
    return function (...args) {
      count++
      if (count >= n) {
        return func(...args)
      }
    }
  }

  /**
   * 返回一个新函数来限制调用函数的参数数量
   * @param  {function} func        被限制的函数
   * @param  {number} n=func.length 被限制参数的数量
   * @return {function}             返回新的函数
   */
  let ary = function (func, n = func.length) {
    return function (...args) {
      args.length = n
      return func(...args)
    }
  }

  /**
   * 返回一个函数，调用对象的方法
   * @param  {object} object         被调用方法所附的对象
   * @param  {string} key            方法名
   * @param  {partials} ...partials  绑定的参数
   * @return {function}              返回新的函数
   */
  let bindKey = function (object, key, ...partials) {
    return function (...args) {
      partials = partials.map(function (it) {
        if (it === _) {
          it = args.shift()
        }
        return it
      })
      return object[key](...partials, ...args)
    }
  }

  /**
   * 柯里化函数
   * @param  {function} func            需要柯里化的函数
   * @param  {number} arity=func.length 指定参数数量
   * @return {function}                 柯里化后的函数
   */
  let curry = function (func, arity = func.length) {
    let that = this
    let len
    return function fn(...args) {
      len = that.reduce(args, function (memo, curr) {
        if (curr === _) {
          return memo
        }
        return ++memo
      }, 0)
      if (len < arity) {
        return that.partial(fn, ...args)
      } else {
        return func(...args)
      }
    }
  }

  /**
   * 反向柯里化函数
   * @param  {function} func            需要柯里化的函数
   * @param  {number} arity=func.length 指定参数数量
   * @return {function}                 柯里化后的函数
   */
  let curryRight = function (func, arity = func.length) {
    let that = this
    let len
    return function fn(...args) {
      len = that.reduce(args, function (memo, curr) {
        if (curr === _) {
          return memo
        }
        return ++memo
      }, 0)
      if (len < arity) {
        return that.partialRight(fn, ...args)
      } else {
        return func(...args)
      }
    }
  }

  /**
   * 参数绑定
   * @param  {function} func      需要参数绑定的函数
   * @param  {...*} ...partials   被绑定的参数
   * @return {function}           绑定后的函数
   */
  let partial = function (func, ...partials) {
    let that = this
    return function (...args) {
      partials = that.map(partials, function (it) {
        if (it === _) {
          return args.shift()
        } else {
          return it
        }
      })
      return func(...partials, ...args)
    }
  }

  /**
   * 反向参数绑定
   * @param  {function} func      需要参数绑定的函数
   * @param  {...*} ...partials   被绑定的参数
   * @return {function}           绑定后的函数
   */
  let partialRight = function (func, ...partials) {
    let that = this
    return function (...args) {
      partials = that.map(partials, function (it) {
        if (it === _) {
          return args.shift()
        } else {
          return it
        }
      })
      return func.call(that, ...args, ...partials)
    }
  }
  /**
   * 返回一个函数，将传入的参数颠倒调用
   * @param  {function} func 被调用的函数
   * @return {function}      调整后的函数
   */
  let flip = function (func) {
    let that = this
    return function (...args) {
      return func(...that.reverse(args))
    }
  }
  /**
   * 缓存计算结果，二次调用时，直接返回缓存中的数据
   * @param  {function} func     被缓存的值的函数
   * @param  {function} resolver 缓存键名迭代方法
   * @return {function}
   */
  let memoize = function (func, resolver) {
    let cache = new Map()
    let that = this
    return function fn(...args) {
      fn.cache = cache
      let key = (resolver ? resolver.call(that, ...args) : args[0])
      if (cache.has(key)) {
        return cache.get(key)
      } else {
        cache.set(key, func.call(that, ...args))
        return cache.get(key)
      }
    }
  }


  /**
   * 将对象的值放入数组返回
   * @param  {object} object 被处理的数组
   * @return {array}         提取后的数组
   */
  let values = function (object) {
    let result = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        result.push(object[key])
      }
    }
    return result
  }

  /**
   * 返回一个新函数，将函数的所有参数依次调用 transform 函数，再传入函数执行
   * @param {function} func                    需要改变参数的函数
   * @param {function | function[]} transforms 被参数调用的函数
   * @returns {function}                       新的函数
   */
  let overArgs = function (func, ...transforms) {
    let that = this
    return function (...args) {
      transforms = that.flatten(transforms)
      transforms.length = args.length
      transforms.map(function (it) {
        return transforms || that.identity
      })
      return func(...args.map(function (it, i) {
        return transforms[i](it)
      }))
    }
  }

  /**
   * 返回一个新函数根据 给定 参数位置，重新对参数进行排序
   * @param {function} func        需要调整参数的函数
   * @param {...* | array} indexes 给定参数下标
   * @returns {function}           新的函数
   */
  let rearg = function (func, ...indexes) {
    indexes = this.flatten(indexes)
    let that = this
    return function (...args) {
      let arg = that.map(indexes, it => args[it])
      return func(...arg)
    }
  }

  /**
   * 创建一个新函数，收集原函数没有形参的实参
   * @param {function} func                   被收集参数的函数
   * @param {number} [start=func.length - 1]  起始收集位置
   * @returns {function}                      新的函数
   */
  let rest = function (func, start = func.length - 1) {
    return function (...args) {
      let restArg = args.splice(start, args.length - start)
      return func(...args, restArg)
    }
  }

  /**
   * 船价格一个新函数，是的原函数只接受一个参数，多余的参数忽略
   * @param {any} func 被消减参数的函数
   * @returns          新的函数
   */
  let unary = function (func) {
    return this.ary(func, 1)
  }


  /**
   * 将值强行转换为数组
   * @param {*} value  待转换的值
   * @returns {array}  转换后的数组
   */
  let castArray = function (value) {
    if (this.isArray(value)) {
      return value
    } else if (arguments.length === 0) {
      return []
    } else {
      return [value]
    }
  }

  /**
   * 通过 source 方法，检查 object 是否满足条件
   * @param {object} object 被判断的对象
   * @param {object} source 判断条件安
   * @returns {boolean}     满足，返回 true
   */
  let conformsTo = function (object, source) {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        if (!source[key](object[key])) {
          return false
        }
      }
    }
    return true
  }

  /**
   * 判断两个值是否浅相等
   * NaN 与 NaN 相等
   * @param {*} value 第一个值
   * @param {*} other 第二个值
   * @returns {bolean} 相等，返回 true
   */
  let eq = function (value, other) {
    if (this.isNaN(value) && this.isNaN(other)) {
      return true
    }
    return value === other
  }

  /**
   * 判断第一个值是否大于第二个值
   * @param {*} value 第一个值
   * @param {*} other 第二个值
   * @returns {boolean} 大于，返回 true
   */
  let gt = function (value, other) {
    return value > other
  }

  /**
   * 判断第一个值是否大于等于第二个值
   * @param {*} value 第一个值
   * @param {*} other 第二个值
   * @returns {boolean} 大于，返回 true
   */
  let gte = function (value, other) {
    return value >= other
  }

  /**
   * 判断值是不是整数
   * @param {*} value 被判断的值
   * @returns {boolean} 如果是，返回 true
   */
  let isInteger = function (value) {
    return Number.isInteger(value)
  }

  /**
   * 判断一个值是否复合 length 属性
   * @param {*} value   被判断的值
   * @returns {boolean} 可作为 length 属性，返回 true
   */
  let isLength = function (value) {
    return this.isInteger(value) && 0 <= value && value <= 4294967295
  }

  /**
   * 深度不交 object 与 source 是否后等值的属性
   * @param {object} object   被比较的对象
   * @param {object} source   匹配的对象
   * @returns {boolean}       匹配成功 返回 true
   */
  let isMatch = function (object, source) {
    return this.isMatchWith(object, source)
  }

  /**
   * 类似 isMatch 接收一个函数进行比较
   * @param {object} object      要检查的对象
   * @param {object} source      匹配的对象
   * @param {boolean} customizer 如果对象满足，返回 true
   * @returns
   */
  let isMatchWith = function (object, source, customizer) {
    customizer = customizer || this.isEqual
    let that = this
    let temp = Object.entries(source)
    return temp.every(function (it) {
      return customizer.call(that, object[it[0]], it[1], it[0], object, source)
    })
  }

  /**
   * 判断一个值是否是 null 或是 undefined
   * @param {*} value   被判断的值
   * @returns {boolean} 如果是，返回 true
   */
  let isNil = function (value) {
    return this.isNull(value) || this.isUndefined(value)
  }

  /**
   * 
   * 判断值是不是类对象
   * @param {*} value   要检查的值
   * @returns {boolean} 如果是，返回 true
   */
  let isObjectLike = function (value) {
    return typeof value === 'object' ? (!this.isNull(value)) ? true : false : false
  }


  /**
   * 判断这个数是不是安全整数
   * @param {*} value   被判断的数
   * @returns {boolean} 如果是，返回 true 
   */
  let isSafeInteger = function (value) {
    return Number.isSafeInteger(value)
  }

  /**
   * 判断一个值是不是类型数组
   * @param {*} value   被判断的值
   * @returns {boolean} 如果是，返回 true
   */
  let isTypedArray = function (value) {
    return toString.call(value) === '[object Uint8Array]'
  }

  /**
   * 检查值是hi否是弱类型集合
   * @param {*} value   被判断的值
   * @returns {boolean} 如果是，返回 true
   */
  let isWeakSet = function (value) {
    return toString.call(value) === '[object WeakSet]'
  }

  /**
   * 判断值是否小于第二个值
   * @param {*} value   需要判断的值
   * @param {*} other   对比的值
   * @returns {boolean} 如果满足，返回 true
   */
  let lt = function (value, other) {
    return value < other
  }

  /**
   * 判断值是否小于等于第二个值
   * @param {*} value   需要判断的值
   * @param {*} other   对比的值
   * @returns {boolean} 如果满足，返回 true
   */
  let lte = function (value, other) {
    return value <= other
  }

  /**
   * 将一个值转为有限数
   * @param {*} value   被转换的值
   * @returns {number}  转换后的值
   */
  let toFinite = function (value) {
    return value < -Number.MAX_VALUE ? -Number.MAX_VALUE : value > Number.MAX_VALUE ? Number.MAX_VALUE : isNaN(value) ? 0 : +value
  }

  /**
   * 将值转换为整数
   * @param {*} value   被转换的值
   * @returns {number}  转换后的值
   */
  let toInteger = function (value) {
    return Math.round(this.toFinite(value))
  }

  /**
   * 将值转换为 长度
   * @param {*} value    被转换的值
   * @returns {number}   转换后的值
   */
  let toLength = function (value) {
    let result = this.toInteger(value)
    return result > 4294967295 ? 4294967295 : result < 0 ? 0 : result
  }

  /**
   * 将值转换为数字
   * @param {*} value   被转换的值
   * @returns {number}  转换后的值
   */
  let toNumber = function (value) {
    return +value
  }

  /**
   * 将值转换为纯对象
   * @param {*} value    被转换的值
   * @returns {object}   转换后的值
   */
  let toPlainObject = function (value) {
    let result = {}
    for (let key in value) {
      result[key] = value[key]
    }
    return result
  }

  /**
   * 将值转换为安全整数
   * @param {*} value   需要转换的值
   * @returns {boolean} 转换后的值
   */
  let toSafeInteger = function (value) {
    let result = +value
    return isNaN(result) ? 0 : result > 9007199254740991 ? 9007199254740991 : result < -9007199254740991 ? -9007199254740991 : ~~result
  }

  /**
   * 求两个值的除数
   * @param {number} dividend 被除数
   * @param {number} divisor  除数
   * @returns {number}        商
   */
  let divide = function (dividend, divisor) {
    return dividend / divisor
  }

  /**
   * 通过迭代选择出数组内最大项
   * @param {array} array                       被选数组
   * @param {function} [iteratee=this.identity] 迭代函数
   * @returns {*}                               最大值
   */
  let maxBy = function (array, iteratee = this.identity) {
    let that = this
    return this.reduce(array, function (memo, curr) {
      return that.iteratee(iteratee)(memo) > that.iteratee(iteratee)(curr) ? memo : curr
    })
  }

  /**
   * 求平均数
   * @param {array} array  求数组的平均数
   * @returns {number}     得到的平均值
   */
  let mean = function (array) {
    return this.meanBy(array)
  }

  /**
   * 通过迭代求平均数
   * @param {array} array  求数组的平均数
   * @returns {number}     得到的平均值
   */
  let meanBy = function (array, iteratee = this.identity) {
    return this.sumBy(array, iteratee) / array.length
  }

  /**
   * 
   * 根据迭代求出最小值
   * @param {array} array                       被筛选数组
   * @param {function} [iteratee=this.identity] 迭代函数
   * @return {*}                                最小值
   */
  let minBy = function (array, iteratee = this.identity) {
    let that = this
    return this.reduce(array, function (memo, curr) {
      return that.iteratee(iteratee)(memo) < that.iteratee(iteratee)(curr) ? memo : curr
    })
  }

  /**
   * 
   * 两数相乘
   * @param {number} multiplier     乘数
   * @param {number} multiplicand   乘数
   * @returns {number}              乘积
   */
  let multiply = function (multiplier, multiplicand) {
    return multiplier * multiplicand
  }

  /**
   * 
   * 两数相减
   * @param {number} minuend     被减数
   * @param {number} subtrahend  减数
   * @returns {number}           被减数
   */
  let subtract = function (minuend, subtrahend) {
    return minuend - subtrahend
  }

  /**
   * 
   * 计算集合总和
   * @param {array} array  被叠加的集合
   * @returns {number}     总和
   */
  let sum = function (array) {
    return this.sumBy(array)
  }

  /**
   * 
   * 通过迭代计算集合总和
   * @param {array} array  被叠加的集合
   * @returns {number}     总和
   */
  let sumBy = function (array, iteratee = this.identity) {
    let that = this
    return this.reduce(array, function (memo, curr) {
      return memo + that.iteratee(iteratee)(curr)
    }, 0)
  }

  /**
   * 
   * 限制 number
   * @param {number} number    被限制的数
   * @param {number} lower     下限
   * @param {number} upper     上限
   * @returns {number}         返回被限制的值
   */
  let clamp = function (number, ...args) {
    if (args.length == 1) {
      return number > args[0] ? args[0] : number
    } else {
      return number > args[1] ? args[1] : number < args[0] ? args[0] : number
    }
  }

  /**
   * 
   * 检查 值 是否在区间内
   * @param {number} number  被检查值
   * @param {number} start   下限
   * @param {number} end     上限
   * @returns {number}       如果在，返回 true
   */
  let inRange = function (number, start, end) {
    if (end === undefined) {
      end = start
      start = 0
    }
    if (start > end) {
      let temp = start
      start = end
      end = temp
    }
    return number < start ? false : number >= end ? false : true
  }

  /**
   * 
   * 生成规定范围内的随机数
   * @param {number} lower 下限
   * @param {number} upper 上限
   * @param {boolean} floating 是否返回浮点数
   * @return {number}      随机数
   */
  let random = function (...args) {
    let lower, upper, floating
    if (args.length === 1) {
      lower = 0
      upper = args[0]
      floating = true
    } else if (args.length === 2) {
      if (this.isNumber(args[1])) {
        lower = args[0]
        upper = args[1]
        floating = true
      } else {
        lower = 0
        upper = args[0]
        floating = args[1]
      }
    } else {
      lower = args[0]
      upper = args[1]
      floating = args[2]
    }
    let result = Math.random() * (upper - lower) + lower
    return floating ? result : parseInt(result)
  }


  /**
   * 创建一个数组，成员是 path 的路径对应的值
   * @param {object} object          被迭代的对象
   * @param {string | string[]} path 路径
   * @returns {array}                值的数组
   */
  let at = function (object, ...path) {
    let p,
      that = this
    path = this.flatten(path)
    return this.reduce(path, function (memo, curr) {
      temp = object
      p = curr.split(/[\[\]\.]/).filter(it => it !== '')
      memo.push(that.reduce(p, function (memo, curr) {
        memo = memo[curr]
        return memo
      }, object))
      return memo
    }, [])
  }

  /**
   * 通過 iteratee 迭代对象的可枚举和不可枚举对象
   * @param {object} object                     被迭代的对象
   * @param {function} [iteratee=this.identity] 迭代器
   * @returns {object}                          返回原对象
   */
  let forIn = function (object, iteratee = this.identity) {
    for (let key in object) {
      iteratee(object[key], key, object)
    }
    return object
  }

  /**
   * 通過 iteratee 反向迭代对象的可枚举和不可枚举对象
   * @param {object} object                     被迭代的对象
   * @param {function} [iteratee=this.identity] 迭代器
   * @returns {object}                          返回原对象
   */
  let forInRight = function (object, iteratee = this.identity) {
    let keys = []
    for (let key in object) {
      keys.push(key)
    }
    for (let i = keys.length - 1; i >= 0; i--) {
      iteratee(object[keys[i]], keys[i], object)
    }
    return object
  }

  /**
   * 通過 iteratee 反向迭代对象的可枚举和不可枚举对象
   * @param {object} object                     被迭代的对象
   * @param {function} [iteratee=this.identity] 迭代器
   * @returns {object}                          返回原对象
   */
  let forOwnRight = function (object, iteratee = this.identity) {
    let keys = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key)
      }
    }
    for (let i = keys.length - 1; i >= 0; i--) {
      iteratee(object[keys[i]], keys[i], object)
    }
    return object
  }

  /**
   * 列举对象中所有自有方法 
   * @param {object} object 被列举的对象
   * @returns {array}       返回函数名数组
   */
  let functions = function (object) {
    let result = []
    if (object === null) {
      return result
    } else {
      for (let key in object) {
        if (object.hasOwnProperty(key) && this.isFunction(object[key])) {
          result.push(key)
        }
      }
    }
    return result
  }

  /**
   * 列举对象中所有自有和继承方法 
   * @param {object} object 被列举的对象
   * @returns {array}       返回函数名数组
   */
  let functionsIn = function (object) {
    let result = []
    if (object === null) {
      return result
    } else {
      for (let key in object) {
        if (this.isFunction(object[key])) {
          result.push(key)
        }
      }
    }
    return result
  }

  /**
   * 根据路径获取值
   * 
   * @param {object} object       被检索的对象
   * @param {array | string} path 路径
   * @param {*} defaultValue      如果解析 undefined，返回该值
   * @returns {*}                 解析出来的值
   */
  let get = function (object, path, defaultValue) {
    if (this.isString(path)) {
      path = path.split(/[\[\]\.]/).filter(it => it !== '')
    }
    let result = path.reduce(function (memo, curr) {
      return memo === undefined ? memo : memo[curr]
    }, object)
    return result === undefined ? defaultValue : result
  }

  /**
   * 检查 path 是否是对象的继承和直接属性
   * @param {object} object       检索对象
   * @param {array | string} path 检查的路径
   * @returns {boolean}           存在，返回 true
   */
  let hasIn = function (object, path) {
    if (this.isString(path)) {
      path = path.split(/[\[\]\.]/).filter(it => it !== '')
    }
    let result = path.reduce(function (memo, curr) {
      return memo === undefined ? memo : memo[curr]
    }, object)
    return result === undefined ? false : true
  }

  /**
   * 创建一个 object 键值倒置后的对象
   * 
   * @param {object} object 被倒置的对象
   * @returns {object}      倒置后的对象
   */
  let invert = function (object) {
    let result = {}
    for (let key in object) {
      result[object[key]] = key
    }
    return result
  }

  /**
   * 进过迭代函数，返回键值倒置，值为数组的对象
   * 
   * @param {object} object                     被倒置的对象
   * @param {function} [iteratee=this.identity] 倒置后的对象
   * @returns
   */
  let invertBy = function (object, iteratee = this.identity) {
    let result = {},
      tempKey
    for (let key in object) {
      tempKey = iteratee(object[key], key, object)
      if (result[tempKey] === undefined) {
        result[tempKey] = [key]
      } else {
        result[tempKey].push(key)
      }
    }
    return result
  }









  // unfinish =======================

  // 未完全实现

  let debounce = function (func, wait = 0, options = {}) {
    let lastTimer = this.now()
    let that = this
    return function () {
      let currTimer = that.now()
      if (currTimer - lastTimer >= wait) {
        lastTimer = currTimer
        return func()
      } else {
        lastTimer = currTimer
      }
    }
  }

  let throttle = function (func, wait = 0, options = {}) {
    let lastTimer = this.now()
    let that = this
    return function () {
      let currTimer = that.now()
      if (currTimer - lastTimer >= wait) {
        lastTimer = currTimer
        return func()
      }
    }
  }


  let spread = function (func, start = 0) {
    let that = this
    return function (arg) {
      return func.call(that, ...arg)
    }
  }



  // undo ====================

  let mixin = function () {}
  let noConflict = function () {}
  let tap = function () {}
  let thru = function () {}
  let value = function () {}
  let chain = function () {}
  let cloneWith = function () {}
  let cloneDeepWith = function () {}
  let isEqualWith = function () {}
  let isNative = function () {}
  let ceil = function (number, precision = 0) {}
  let floor = function (number, precision = 0) {}
  let round = function (number, precision = 0) {}
  let invoke = function (object, path, ...args) {}


  // =========================

  /*  let _ = function (value) {
      this.wrapped = value
    }*/

  /*
  function _(value) {
    this.wrapped = value
  }
  _.a = function(){}
  _.b = function(){}

  for(m in _) {
    _.prototype[m] = function(...args){
      return this.wrapped = _[m](this.wrapped,...args)
    }
  }
  */

  windowGlobal._ = {
    assign: assign,
    assignIn: assignIn,
    extend: assignIn,
    before: before,
    bind: bind,
    isArguments: isArguments,
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isArrayLike: isArrayLike,
    isArrayLikeObject: isArrayLikeObject,
    isBoolean: isBoolean,
    isBuffer: isBuffer,
    isDate: isDate,
    isElement: isElement,
    isEmpty: isEmpty,
    isFinite: isFinite,
    isFunction: isFunction,
    isNaN: isNaN,
    isNull: isNull,
    isNumber: isNumber,
    isObject: isObject,
    isRegExp: isRegExp,
    isString: isString,
    isUndefined: isUndefined,
    isEqual: isEqual,
    iteratee: iteratee,
    keys: keys,
    last: last,
    matches: matches,
    matchesProperty: matchesProperty,
    property: property,
    forOwn: forOwn,
    map: map,
    filter: filter,
    isPlainObject: isPlainObject,
    times: times,
    constant: constant,
    noop: noop,
    isError: isError,
    isSymbol: isSymbol,
    isMap: isMap,
    isWeakMap: isWeakMap,
    escape: escape,
    wrap: wrap,
    identity: identity,
    find: find,
    sortBy: sortBy,
    max: max,
    min: min,
    negate: negate,
    once: once,
    pick: pick,
    reduce: reduce,
    result: result,
    size: size,
    slice: slice,
    some: some,
    toArray: toArray,
    uniqueId: uniqueId,
    isSet: isSet,
    clone: clone,
    compact: compact,
    concat: concat,
    create: create,
    defaults: defaults,
    defer: defer,
    delay: delay,
    forEach: each,
    each: each,
    every: every,
    flatten: flatten,
    flattenDeep: flattenDeep,
    has: has,
    head: head,
    first: head,
    indexOf: indexOf,
    chunk: chunk,
    includes: includes,
    difference: difference,
    differenceWith: differenceWith,
    differenceBy: differenceBy,
    drop: drop,
    dropRight: dropRight,
    dropRightWhile: dropRightWhile,
    dropWhile: dropWhile,
    fill: fill,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    flattenDepth: flattenDepth,
    fromPairs: fromPairs,
    initial: initial,
    intersection: intersection,
    intersectionBy: intersectionBy,
    intersectionWith: intersectionWith,
    join: join,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    pullAllBy: pullAllBy,
    pullAllWith: pullAllWith,
    pullAt: pullAt,
    remove: remove,
    reverse: reverse,
    sortedIndex: sortedIndex,
    sortedIndexBy: sortedIndexBy,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexBy: sortedLastIndexBy,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexBy: sortedLastIndexBy,
    sortedLastIndexOf: sortedLastIndexOf,
    uniq: uniq,
    sortedUniq: sortedUniq,
    uniqBy: uniqBy,
    sortedUniqBy: sortedUniqBy,
    tail: tail,
    take: take,
    takeRight: takeRight,
    takeRightWhile: takeRightWhile,
    takeWhile: takeWhile,
    union: union,
    unionBy: unionBy,
    unionWith: unionWith,
    zip: zip,
    unzip: unzip,
    unzipWith: unzipWith,
    add: add,
    without: without,
    xor: xor,
    xorBy: xorBy,
    xorWith: xorWith,
    zipObject: zipObject,
    zipObjectDeep: zipObjectDeep,
    zipWith: zipWith,
    countBy: countBy,
    eachRight: eachRight,
    forEachRight: eachRight,
    findLast: findLast,
    flatMap: flatMap,
    flatMapDeep: flatMapDeep,
    flatMapDepth: flatMapDepth,
    groupBy: groupBy,
    invokeMap: invokeMap,
    propertyOf: propertyOf,
    keyBy: keyBy,
    orderBy: orderBy,
    partition: partition,
    reduceRight: reduceRight,
    reject: reject,
    sample: sample,
    sampleSize: sampleSize,
    shuffle: shuffle,
    now: now,
    after: after,
    ary: ary,
    bindKey: bindKey,
    curry: curry,
    partial: partial,
    partialRight: partialRight,
    curryRight: curryRight,
    debounce: debounce,
    flip: flip,
    memoize: memoize,
    values: values,
    overArgs: overArgs,
    rearg: rearg,
    rest: rest,
    spread: spread,
    throttle: throttle,
    unary: unary,
    castArray: castArray,
    cloneDeep: cloneDeep,
    conformsTo: conformsTo,
    eq: eq,
    gt: gt,
    gte: gte,
    isInteger: isInteger,
    isLength: isLength,
    isMatchWith: isMatchWith,
    isMatch: isMatch,
    isNil: isNil,
    isObjectLike: isObjectLike,
    isSafeInteger: isSafeInteger,
    isTypedArray: isTypedArray,
    isWeakSet: isWeakSet,
    lt: lt,
    lte: lte,
    toFinite: toFinite,
    toInteger: toInteger,
    toLength: toLength,
    toPlainObject: toPlainObject,
    toNumber: toNumber,
    toSafeInteger: toSafeInteger,
    ceil: ceil,
    divide: divide,
    maxBy: maxBy,
    meanBy: meanBy,
    mean: mean,
    minBy: minBy,
    multiply: multiply,
    subtract: subtract,
    sum: sum,
    sumBy: sumBy,
    clamp: clamp,
    inRange: inRange,
    random: random,
    assignInWith: assignInWith,
    assignWith: assignWith,
    at: at,
    defaultsDeep: defaultsDeep,
    findKey: findKey,
    findLastKey: findLastKey,
    forIn: forIn,
    forInRight: forInRight,
    forOwnRight: forOwnRight,
    functions: functions,
    functionsIn: functionsIn,
    get: get,
    hasIn: hasIn,
    invert: invert,
    invertBy: invertBy,
    invoke: invoke,
    keysIn: keysIn,


  }
})(typeof global === 'undefined' ? window : global)
