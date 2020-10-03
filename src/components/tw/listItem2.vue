<script>
import utils from "../../utils"
export default {
    name: "twListItem2",
    props: {
        items: {type: Array, default: () => []},
        index: {type: Boolean, default: false},
        indexBorder: {type: Boolean, default: false},
        indexStart: {type: Boolean, default: false},
        fit: {type: Boolean, default: false},
    },
    render(){
        const {$scopedSlots, $listeners} = this
        let itemLen = this.items.length - 1
        let cs = 'bg-white font-normal text-base cursor-pointer flex items-center hover:bg-gray-300'.split(' ')
        if(!this.fit) {
            cs.push('px-4')
            cs.push('py-2')
        }else {
            cs.push('py-1')
        }
        let items = this.items.map((item, index) => 
            <div vOn:click={e => this.onClick({index, item, items})} style={itemLen != index ? {borderBottom: "1px solid #f7f8fa"} : {}} 
                class={cs} key={ index }>
                {this.index ? <div class={"font-bold text-gray-600 flex-shrink-0 mr-2 " + 
                    (this.indexBorder 
                        ? "px-1 bg-gray-200 w-6 h-6 flex items-center justify-center rounded-xs" 
                        : "")
                    + (this.indexStart ? ' self-start' : '')
                    }>{ index+1 }</div> : null}
                {item.icon || $scopedSlots.icon 
                    ? <div class="flex-shrink-0 w-10 mr-4 text-center">{ utils.getRender(this, item.icon || $scopedSlots.icon, {index, item, items: this.items}) }</div> 
                    : null}
                <div class="flex flex-col flex-auto hover:text-purple-700">
                    <div class="text-gray-700 text-left">{ utils.getRender(this, item.title || $scopedSlots.title, {index, item, items: this.items}) }</div>
                    <div class="text-gray-500 text-left">{ utils.getRender(this, item.desc || $scopedSlots.desc, {index, item, items: this.items}) }</div>
                </div>
                <div class="flex-shrink-0 ml-3">
                    {$scopedSlots.ext
                        ? utils.getRender(this, $scopedSlots.ext, {index, item, items: this.items})
                        : ($listeners.click ? <span class="text-gray-500 font-bold">&gt;</span> : null)}
                </div>
            </div>
        )
        return <div class={`${this.fit ? "" : "py-4"} flex flex-col`}>
            {items}
        </div>
    },
    methods: {
        onClick(option){this.$emit("click", option)}
    }
}
</script>