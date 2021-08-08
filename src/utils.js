const bind = function _bind(struct, data) {
    let type = Object.prototype.toString.call(struct)
    if(type == '[object Object]') {
        let _struct = {}
        Object.keys(struct).forEach(k => {
            let hasRelationKey = k.indexOf('->') > -1
            let sourceK = k
            let destK = k
            if(hasRelationKey) {
                let keys = k.split('->')
                sourceK = keys[0]
                destK = keys[1]
            }

            let stype =  Object.prototype.toString.call(struct[k])
            let val = data[destK]
            if(stype == '[object Array]') {
                let s = struct[k][0]
                if(Object.prototype.toString.call(val) == '[object Array]') {
                    let childItems = []
                    val.forEach(child => {
                        childItems.push(_bind(s, child))
                    })
                    _struct[destK] = childItems
                }else {
                    _struct[destK] = []
                }
            }else {
                _struct[destK] = stype == '[object Object]' ? _bind(data, val) : struct[k](val)
            }
        })

        return _struct
    }else {
        return null
    }
}

const random = function (pre = '') {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    return pre + guid();
};

const cloneDeep = function _cloneDeep(data){
    let type = Object.prototype.toString.call(data)
    if (!['[object Array]', '[object Object]'].includes(type)) {
        return data
    }else {
        if(type == '[object Array]') {
            let items = []
            data.forEach(item => {
                items.push(_cloneDeep(item))
            })
            return item
        }else {
            let obj = {...data}
            let _obj = {}
            Object.keys(obj).forEach(k => {
                _obj[k] = _cloneDeep(obj[k])
            })
            return _obj
        }
    }
}

const has = function (
    obj,
    path,
    returnValue = false,
    endValue = null,
    failBack = null) {
    let pathInfo = path.split('.')
    let x = []
    let tmp = {}
    pathInfo.forEach(v => {
        if (/\[/.test(v)) {
            //find [a]b[c] | b[a]c | [a][b]c => a.b.c
            let arrayPathInfo = v.match(/(\[([^\[\]]+?)\]|[^\[\]]+)+?/g)
            if (arrayPathInfo !== null) {
                arrayPathInfo.forEach(q => {
                    x.push(q.replace('[', '').replace(']', ''))
                })
            }
        } else {
            x.push(v)
        }
    })
    let x_len = x.length
    for (let i = 0; i < x_len; i++) {
        let v = x[i]
        if (!['[object Array]', '[object Object]'].includes(Object.prototype.toString.call(obj))
            || !(v in obj)) {
            if (failBack !== null) {
                failBack(obj, x.slice(i))
            }
            return endValue
        }
        tmp = obj
        obj = obj[v]
    }
    if (failBack !== null) {
        failBack(tmp, [x[x_len - 1]])
    }
    return returnValue ? obj : true
}

const get = function (obj, path, d = null) {
    let value = has(obj, path, true, null)
    return value === null ? d : value
}

const set = function (obj, path, d) {
    has(obj, path, false, null, function (obj, pathInfo) {
        let p_len = pathInfo.length
        for (let i = 0; i < p_len; i++) {
            let v = pathInfo[i]
            if (i + 1 < p_len) {
                let tmp = {}
                obj = obj[v] = tmp
            } else {
                obj[v] = d
            }
        }
    })
}

const resize = function(el, cb, _c) {
    let iframe = document.createElement('iframe')

    if(_c) {
        iframe.setAttribute('class', _c)
    }

    iframe.setAttribute('style', `
            width: 100%;
            height: 100%;
            position: absolute;
            visibility: hidden;
            top: 0;
            left: 0;
            margin: 0;
            padding: 0;
            border: 0;`)

    el.appendChild(iframe)

    let oldWidth = el.offsetWidth
    let oldHeight = el.offsetHeight

    function sizeChange() {
        let width = el.offsetWidth
        let height = el.offsetHeight
        if (width !== oldWidth || height !== oldHeight) {
            cb({ width: width, height: height }, { width: oldWidth, height: oldHeight })
            oldWidth = width
            oldHeight = height
        }
    }

    let timer = 0;
    let lh = function () {
        clearTimeout(timer)
        timer = setTimeout(sizeChange, 20)
    }

    iframe.contentWindow && (iframe.contentWindow.onresize = lh)
}

let stopPropagation = function (e) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation()
};

let slotDeepClone = (vnodes, createElement) => {
    function cloneVNode(vnode) {
        const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode))
        const cloned = createElement(vnode.tag, vnode.data, clonedChildren)
        cloned.text = vnode.text
        cloned.isComment = vnode.isComment
        cloned.componentOptions = vnode.componentOptions
        cloned.elm = vnode.elm
        cloned.context = vnode.context
        cloned.ns = vnode.ns
        cloned.isStatic = vnode.isStatic
        cloned.key = vnode.key

        return cloned
    }
    if (!vnodes) { return [] }
    const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode))
    return clonedVNodes
};

let getSlot = function (target, i, clone = false) {
    if (target === undefined || !Array.isArray(target)) { return '' }
    let s = target.filter(v => v.tag)[i]
    if (!s) { return '' }
    return clone ? slotDeepClone([s], clone)[0] : s
}

const keyby = (arr, k) => {
    let m = {};
    Array.isArray(arr) && arr.forEach((item) => {
        m[item[k]]=item
    })
    return m
}

const http = {
    responseCreate: function(response){
        return response.status == 201
    },
    badRequest: function(response){
        return response.status == 400
    },
    responseDelete: function(response){
        return response.status == 204
    },

    serverError: function(response){
        return response.status == 500
    },

    responseNotFound: function(response){
        return response.status == 404
    },
    responseOk: function(response){
        switch(response.config.method.toUpperCase()) {
            case 'POST': {
                return http.responseCreate(response)
            }break;
            case 'DELETE': {
                return http.responseDelete(response)
            }break;
            case 'PUT':
            case 'GET':
            default: {
                return response.status == 200
            }
        }
    }
}

import dayjs from "dayjs"
const getTypeDefault = function(type, _d, optiom) {
    switch(type){
        case 'date': {
            return _d === undefined ? dayjs() : dayjs(_d)
        }break;
        case 'switch': {
            return !!_d
        }break;
        case 'radio': {
            if(option.list && Array.isArray(option.list) && option.list.length > 0) {
                let index = option.list.findIndex(v => v.value === _d)

                if(index === -1) {
                    return option.list[0].value
                }else {
                    return option.list[index].value
                }
            }else {
                return ''
            }
        }break;
        case 'check': {
            return Array.isArray(_d) ? _d : []
        }break;
        case 'param': {
            return Array.isArray(_d) ? _d : []
        }break;
        case 'file': {
            return Array.isArray(_d) ? _d : (getType(_d) == 'String' && !!_d ? [_d] : [])
        }break;
        case 'number': {
            return _d ? this.utilMap.tool.number(_d) : ''
        }break;
        case 'select': {
            return _d === undefined || _d === null ? '' : _d
        }break;
        case 'string':
        default: {
            return getType(_d) == 'String' ? _d : (_d === undefined || _d === null 
                ? '' 
                : _d.toString())
        }
    }
}

const number = function(value){
    return value === undefined || isNaN(value) ? 0 : Number(value)
}

const getType = function(o){
    let str = Object.prototype.toString.call(o);
    return str.slice(8, str.length-1);
}

const parseURL = function (url) {
    let tmp = {};
    url.replace(/^.*?\?/, '').split('&').forEach(v => {
        let t = v.split('=');
        tmp[t[0]] = t[1] ? t[1] : '';
    });
    return tmp;
}

const limitAction = function(time, cb) {
    let ok = true
    return function() {
        if(ok) {
            ok = false
            setTimeout(() => {
                ok = true
                cb()
            }, time * 1000)
        }
    }

}

const arrayDefault = function(arr, key, d) {
    return arr.includes(key) ? key : d
}

const getPropsData = ele => {
  let componentOptions = ele.componentOptions;
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions;
  }
  return componentOptions ? componentOptions.propsData || {} : {};
}

const getslots = ele => {
  return (ele.data && ele.data.slots) || {};
}

const getComponentFromProp = (instance, prop, options = instance, execute = true) => {
  if (instance.$createElement) {
    const h = instance.$createElement;
    const temp = instance[prop];
    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(h, options) : temp;
    }
    return (
      (instance.$slots[prop] && execute && instance.$slots[prop](options)) ||
      instance.$slots[prop] ||
      instance.$slots[prop] ||
      undefined
    );
  } else {
    const h = instance.context.$createElement;
    const temp = getPropsData(instance)[prop];
    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(h, options) : temp;
    }
    const slotScope = getslots(instance)[prop];
    if (slotScope !== undefined) {
      return typeof slotScope === 'function' && execute ? slotScope(h, options) : slotScope;
    }
    const slotsProp = [];
    const componentOptions = instance.componentOptions || {};
    (componentOptions.children || []).forEach(child => {
      if (child.data && child.data.slot === prop) {
        if (child.data.attrs) {
          delete child.data.attrs.slot;
        }
        if (child.tag === 'template') {
          slotsProp.push(child.children);
        } else {
          slotsProp.push(child);
        }
      }
    });
    return slotsProp.length ? slotsProp : undefined;
  }
}

const getRender = (d, context, options = d) => {
    return typeof(context) == "function" ? context.call(d, options) : context
}

const bytesToSize = (bytes) => {
    if (bytes === 0) return '0 B';

    var k = 1024;

    sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    i = Math.floor(Math.log(bytes) / Math.log(k));

    

    var num = bytes / Math.pow(k, i);
    return num.toPrecision(3) + ' ' + sizes[i];
}

export default {
    getType,
    set,
    get,
    has,
    resize,
    getSlot,
    bind,
    cloneDeep,
    random,
    keyby,
    http,
    number,
    parseURL,
    getTypeDefault,
    limitAction,
    arrayDefault,
    getComponentFromProp,
    getRender,
    bytesToSize,
    debounce: (cb, time = 1000) => {
        let handler = null
        return function() {
            clearTimeout(handler)
            handler = setTimeout(() => {
                cb.apply(this, arguments)
            }, time)
        }
    },
    throttle: (cb, time = 1000) => {
        let next = true
        return function() {
            if(!next) {
                return
            }
            next = false
            cb.apply(this, arguments)
            setTimeout(() => {
                next = true
            }, time)
        }
    }
}