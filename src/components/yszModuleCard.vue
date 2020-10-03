<script>
import utils from "../utils"
export default {
    name: 'yszModuleCard',
    props: {
        bodyFit: {type: Boolean, default: false},
        title: {type: String, default: ""}
    },
    render(){
        const {$scopedSlots, $slots} = this
        return <ysz-module class={{'ysz-module__body--fit': this.bodyFit}}>
            {this.title || $scopedSlots.title
                ?   <div class="ysz-module__head">
                        <div class="ysz-module__head-label">{ utils.getRender(this, this.title || $scopedSlots.title, {}) }</div>
                        {$scopedSlots.bar
                            ? <div class="ysz-module__head-bar">{ utils.getRender(this, $scopedSlots.bar, {}) }</div>
                            : null}
                    </div>
                : null}
            <div class="ysz-module__body">
                { $slots.default }
            </div>
        </ysz-module>
    }
}
</script>

<style lang="scss" scoped>
    .ysz-module {
        & > .ysz-module__head {
            padding: 0 15px; min-height: 50px; display: flex;
            align-items: stretch; justify-content: space-between;
            border-bottom: 1px solid #ebedf2; 
            border-top-left-radius: 4px; border-top-right-radius: 4px;
            & > .ysz-module__head-label, & > .ysz-module__head-bar {
                display: flex; align-items: center;
            }

            & > .ysz-module__head-bar {
                cursor: pointer;
            }
        }
        & > .ysz-module__body {
            padding: 15px;
        }
        &.ysz-module__body--fit > .ysz-module__body{padding: 0}
    }
</style>