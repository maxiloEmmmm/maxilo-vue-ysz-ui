<script lang="jsx">
import utils from "../utils"
export default {
    name: 'yszModuleWidget',
    props: {
        title: {type: String, default: ""},
        desc: {type: String, default: ""}
    },
    render(){
        const {$slots} = this
        return <ysz-module>
            <ysz-widget>
                {this.title || $slots.title
                    ? <template slot="title">{ utils.getRender(this, this.title || $slots.title , {}) }</template>
                    : null}
                {this.desc || $slots.desc
                    ? <template slot="desc">{ utils.getRender(this, this.desc || $slots.desc, {}) }</template>
                    : null}
                {$slots.bar
                    ? <template slot="bar">{ utils.getRender(this, $slots.bar, {}) }</template>
                    : null}
                { $slots.default }
            </ysz-widget>
        </ysz-module>
    }
}
</script>