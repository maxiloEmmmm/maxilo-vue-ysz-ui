<template>
  <div id="app">
      <ysz-list-items style="width:120px">
        <template v-for="i in 5">
          <span :key="i">left:</span>
          right content
        </template>
      </ysz-list-items>
      <ysz-card>
        <ysz-toggle slot="header">title</ysz-toggle>
        <span slot="footer">title</span>
        
        <ysz-no-scroll style="height:50px">
          <ysz-active :alone="false" style="height:250px">
            <div model="1">1</div>
            <div model="2">1</div>
            <div model="3">1</div>
            <div model="4">1</div>
          </ysz-active>
        </ysz-no-scroll>
      </ysz-card>
  </div>
</template>

<script>
import utils from '../../src/utils'
export default {
  name: 'App',
  created(){
    var a = {a:1}
    var b = utils.cloneDeep(a)
    b.a = 5
    console.log(a)
  }
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
