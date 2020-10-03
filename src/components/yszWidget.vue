<script>
import utils from "../utils"
export default {
    name: "yszWidget",
    render(){
        const {$scopedSlots, $slots} = this
        return  <div class="ysz-widget">
            { $scopedSlots.title || $scopedSlots.desc || $scopedSlots.bar 
                ? <div class="ysz-widget__head">
                    <div class="ysz-widget__head-wrap">
                        {$scopedSlots.title 
                            ? <div class="ysz-widget__head-title">{ utils.getRender(this, $scopedSlots.title , {}) }</div>
                            : null}
                        {$scopedSlots.desc 
                            ? <div class="ysz-widget__head-desc">{ utils.getRender(this, $scopedSlots.desc , {}) }</div>
                            : null}
                    </div>
                    {$scopedSlots.bar 
                        ? <div class="ysz-widget__head-bar">{ utils.getRender(this, $scopedSlots.bar , {}) }</div>
                        : null}
                </div>
                : null}
            <div class="ysz-widget__body">{ $slots.default }</div>
        </div>
    }
}
</script>

<style lang="scss" scoped>
    .ysz-widget{
        padding: 15px;
        & > .ysz-widget__head {
            padding: 0.5rem 0 1.1rem 0; align-items: stretch; justify-content: space-between;
            margin-bottom: 0.5rem; border-top-left-radius: 4px; border-top-right-radius: 4px;
            flex-direction: row; display: flex;
            & > .ysz-widget__head-bar {
                display: flex; align-items: center; cursor: pointer;
            }
            & > .ysz-widget__head-wrap {
                & > .ysz-widget__head-title {
                    font-size: 1.3rem; font-weight: 500; margin-bottom: 0; color: #6c7293;
                }
                & > .ysz-widget__head-desc {
                    display: inline-block; margin-top: 0.2rem; color: #a7abc3;
                }
            }
            
            & > .ysz-widget__body {
                display: flex; align-items: center;
            }
        }
    }
</style>