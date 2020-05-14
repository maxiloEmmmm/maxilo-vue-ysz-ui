<template>
  <div id="app">
    <ysz-list :no-line="false" :group="3" :row="true">
      <ysz-list-item v-for="i in 5" :key="i" style="width:120px">
        <span slot="left">left:</span>
        right content
      </ysz-list-item>
    </ysz-list>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
