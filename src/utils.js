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
    endValue = false,
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

const get = function (obj, path, d = undefined) {
    let value = has(obj, path, true, undefined)
    return value === undefined ? d : value
}

const set = function (obj, path, d) {
    has(obj, path, false, false, function (obj, pathInfo) {
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
            height: 100 %;
            position: absolute;
            visibility: hidden;
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
    iframe.contentWindow.onresize = function () {
        clearTimeout(timer)
        timer = setTimeout(sizeChange, 20)
    };
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

export default {
    set,
    get,
    has,
    resize,
    getSlot,
    bind,
    cloneDeep
}