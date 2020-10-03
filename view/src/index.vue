<template>
    <dashboard :navs="navs"></dashboard>
</template>

<script>
export default {
    data(){
        return {
            navs: [
                {title: "模块", href: "/#/test"},
                {title: "tw模块", href: "/#/test-tw"}
            ]
        }
    },
}
</script>