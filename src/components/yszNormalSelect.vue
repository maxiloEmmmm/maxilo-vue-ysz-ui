<script lang="jsx">
export default {
    name: "yszNormalSelect",
    render(){
        return <select class="w-full border border-gray-400 py-2 px-3 rounded" value={this.value} vOn:change={e => this.onChange(e)} ref="input" style="width:100%">
            {this.options.map(option => 
                <option key={option.value} value={option.value}>{ option.label }</option>
            )}
        </select>
    },
    props: {
        options: {type: Array, default: () => []},
        value: ''
    },
    methods: {
        focus(){

        },
        onChange(e){
            this.$emit("change", e)
        }
    }
}
</script>