import dashboard from "../dashboard"
import common from "../common"

import alert from "./alert.vue"
import listItem1 from "./listItem1.vue"
import listItem2 from "./listItem2.vue"
import emotion from "./emotion.vue"
export default [...dashboard, ...common, 
    listItem1,
    listItem2,
    alert,
    emotion]