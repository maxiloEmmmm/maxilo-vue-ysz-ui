<script lang="jsx">
import utils from '../utils.js'

export default {
    name: 'yszList',
    props: {
        row: {
            type: Boolean,
            default: false
        },
        noP: {
            type: Boolean,
            default: false
        },
        noLine: {
            type: Boolean,
            default: true
        },
        group: {
            type: Number,
            default: 0
        },
    },
    render() {
        let children = this.$slots.default()
        if(!Array.isArray(children)) {
            children = []
        }

        const cc = []
        children.forEach(node => {
            if (typeof node.type !== "symbol") {
                cc.push(node)
                return
            }

            switch (node.type.toString()) {
                case 'Symbol(Text)':
                    if (node.children.replace(/^[\s]*.*?[\s]*$/, "").length !== 0) {
                        cc.push(node)
                    }
                    break
                case 'Symbol(Comment)':
                    break
                case 'Symbol(Fragment)':
                    cc.push(...node.children)
                    break
                default:
                    alert(`miaomiaomiao, ${node.type} is not in yszUI - yszList filter children`)
            }
        })

        let child_nums = cc.length
        let direction = this.row ? 'column' : 'row'
        let hasGroup = this.group !== 0

        let _class = {
            'ysz': true,
            'ysz-list':  true,
            'ysz-list__row': this.row,
            'ysz-list__group': hasGroup,
            'no-p': this.noP
        }

        return <div {...this.$attrs} class={_class}>
            {cc.map((val, k) => {
                let isLast = this.row && ((k+1) % this.group) === 0 || k + 1 === child_nums
                let style = hasGroup ? {"flexBasis": (100 / this.group).toFixed(6) + '%'} : {}
                return <div {...{
                    style: Object.assign({}, style, {display: 'block'}),
                    class: {
                        ['ysz-list__' + direction + '-wrapper']: true,
                        'ysz-list__wrapper-last': isLast,
                        'ysz-list__wrapper-no-line': !hasGroup || this.noLine,
                    }
                }}>
                    {val}
                </div>
            })}
        </div>
    }
}
</script>