/**
 * Created by wangqun6 on 2016/12/28.
 */
(function () {
    function loop(n, func) {
        for (var i = 0; i < n; i++) {
            func(i);
        }
    }

    function loopArray(arr, func) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            func(arr[i], i);
        }
    }

    function loopObj(obj, func) {
        for (var key in obj) {
            func(key, obj[key]);
        }
    }

    function isObject(value) {
        return Object.prototype.toString.call(value) == "[object Object]";
    }

    function isString(value) {
        return Object.prototype.toString.call(value) == "[object String]";
    }

    function isArray(value) {
        return Object.prototype.toString.call(value) == "[object Array]";
    }

    // el:dom,style:object
    function css(el, style) {
        // 先排除undefined和null的可能
        if (style) {
            loopObj(style, function (key, value) {
                el.style.setProperty(key, value);
            });
        }
    }

    function element(tagname, property, parent) {
        var el = document.createElement(tagname);
        loopObj(property, function (key, value) {
            switch (key) {
                case "klass":
                    isString(value) ? el.classList.add(value) : loopArray(value, function (klass) {
                        el.classList.add(klass);
                    });
                    break;
                case "css":
                    css(el, value);
                    break;
                case "child":
                    isArray(value) ? loopArray(value, function (c) {
                        el.appendChild(c);
                    }) : el.appendChild(value);
                    break;
                default :
                    el[key] = value;
            }
        });
        parent && parent.appendChild(el);
        return el;
    }

    window.util = {
        loop: loop,
        loopArray: loopArray,
        loopObj: loopObj,
        element: element
    }
})();