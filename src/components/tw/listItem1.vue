<script lang="jsx">
import utils from "../../utils"
export default {
    name: "twListItem1",
    props: {
        items: {type: Array, default: () => []},
        index: {type: Boolean, default: false},
        indexBorder: {type: Boolean, default: false},
        fit: {type: Boolean, default: false}
    },
    render(){
        const {$slots} = this
        let items = this.items.map((item, index) => 
            <div vOn:click={e => this.onClick({index, item, items})} class="bg-white px-4 py-1 font-normal text-base cursor-pointer flex items-center hover:bg-gray-300" key={ index }>
                {this.index ? <div class={"font-bold text-gray-600 flex-shrink-0 mr-2 " + 
                    (this.indexBorder 
                        ? "px-1 bg-gray-200 w-6 h-6 flex items-center justify-center rounded-xs" 
                        : "")
                    }>{ index+1 }</div> : null}
                { item.icon || $slots.icon
                    ? <div class="w-6 h-6 mr-2 flex items-center flex-shrink-0">{ utils.getRender(this, item.icon || $slots.icon, {index, item, items: this.items}) }</div>
                    : null}
                <div class="hover:text-purple-700 flex-grow text-left">{ utils.getRender(this, item.title || $slots.title, {index, item, items: this.items}) }</div>
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