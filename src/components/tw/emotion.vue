<script>
import typeMix from "./type"
export default {
    mixins: [typeMix],
    name: "tw-emotion",
    render() {
        const {$slots, $attrs, $listeners} = this
        let baseClass = "inline-flex items-center cursor-pointer justify-center font-semibold rounded p-2".split(" ")
        baseClass.push(`text-${this._type_color}-400`)
        baseClass.push(`bg-${this._type_color}-200`)

        return <div class={baseClass} {...{on: $listeners}}>{ $slots.default }</div>
    }
}
</script>