/**
 * Created by ligang on 17/2/10.
 */
(function (global, name, factory) {
    "use strict";

    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        global[name] = factory.apply(this);
    }
}(this, "mixin", function () {

    var VERSION = "1.0.0";

    /**
     * 判断类型的工具方法
     * @param type  类型
     * @returns {Function}
     * @private
     */
    function _isType(type) {
        return function (obj) {
            return {}.toString.call(obj) == "[object " + type + "]";
        };
    }

    // 工具对象
    var UTILS = {
        isPlainObject: _isType("Object"),
        isFunction: _isType("Function"),
        isArray: Array.isArray || _isType("Array")
    };

    /**
     * 核心方法
     * @returns {*|{}}
     */
    function mixin(){
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // 第一个参数为布尔值,则判断是否进行深拷贝
        if (typeof target === "boolean") {
            deep = target;

            // 跳过第一个布尔值
            target = arguments[i] || {};
            i++;
        }

        // 处理"目标"为字符串后者其他 (可能为深拷贝)
        if (typeof target !== "object" && !UTILS.isFunction(target)) {
            target = {};
        }

        for (; i < length; i++) {
            // 只处理非空/未定义的值
            if ((options = arguments[i]) != null) {
                // 扩展"基础"对象
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // 终止无限循环
                    if (target === copy) {
                        continue;
                    }

                    // 深拷贝 && 拷贝的属性为"对象"或"数组"
                    if (deep && copy && ( UTILS.isPlainObject(copy) || (copyIsArray = UTILS.isArray(copy)) )) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && UTILS.isArray(src) ? src : [];
                        } else {
                            clone = src && UTILS.isPlainObject(src) ? src : {};
                        }

                        // 递归调用
                        target[name] = mixin(deep, clone, copy);
                    } else if (copy !== undefined) {    // 只拷贝有效值
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }

    return mixin;
}));