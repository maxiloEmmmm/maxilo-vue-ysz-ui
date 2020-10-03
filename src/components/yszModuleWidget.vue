<script>
import utils from "../utils"
export default {
    name: 'yszModuleWidget',
    props: {
        title: {type: String, default: ""},
        desc: {type: String, default: ""}
    },
    render(){
        const {$scopedSlots, $slots} = this
        return <ysz-module>
            <ysz-widget>
                {this.title || $scopedSlots.title 
                    ? <template slot="title">{ utils.getRender(this, this.title || $scopedSlots.title , {}) }</template>
                    : null}
                {this.desc || $scopedSlots.desc 
                    ? <template slot="desc">{ utils.getRender(this, this.desc || $scopedSlots.desc, {}) }</template>
                    : null}
                {$scopedSlots.bar 
                    ? <template slot="bar">{ utils.getRender(this, $scopedSlots.bar, {}) }</template>
                    : null}
                { $slots.default }
            </ysz-widget>
        </ysz-module>
    }
}
</script>