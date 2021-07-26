<script lang="jsx">
import typeMix from "./type"
export default {
    mixins: [typeMix],
    name: "tw-emotion",
    render() {
        const {$slots, $attrs} = this
        let baseClass = `${$attrs.class} inline-flex items-center cursor-pointer justify-center font-semibold rounded p-2`.split(" ")
        baseClass.push(`text-${this._type_color}-400`)
        baseClass.push(`bg-${this._type_color}-200`)

        return <div {...$attrs} class={baseClass} >{ $slots.default() }</div>
    }
}
</script>