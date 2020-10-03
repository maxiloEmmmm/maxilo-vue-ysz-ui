<template>
  <no-scroll style="height:100vh">
    <ysz-module-card body-fit>
      <emotion slot="title" size="xs">容器表</emotion>
      <ysz-curd @ha="ha" @ha1="ha1" fetchUrl="http://localhost:8000/containers?s=local" :columns="columns" :models="models"></ysz-curd>      
    </ysz-module-card>
  </no-scroll>
</template>

<script>
import tmp from "./tmp.jpg"

let bs = (bytes) => {
    if (bytes === 0) return '0 B';
    let k = 1024;
    let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    let num = bytes / Math.pow(k, i);
    return num.toPrecision(3) + ' ' + sizes[i];
}
export default {
  data(){return {
    columns: [
      {title: "容器名", field: "Names", type: "string", filter: true, filterKey: "name"},
      {title: "快操", tdRender: ({th, view}) => {
        return <div class="flex p-1 justify-between">
          <emotion vOn:click={e => this.startContainer(view)}>起</emotion>
          <emotion vOn:click={e => this.stopContainer(view)}>停</emotion>
          <emotion vOn:click={e => this.restartContainer(view)}>R</emotion>
          <emotion vOn:click={e => this.logContainer(view)}>L</emotion></div>
      }},
      {title: "空间", tdRender: ({th, view}) => {
        return <span>{bs(view.SizeRootFs)}</span>
      }},
      {title: "状态名", field: "State", type: "string", tdRender: ({th, view}) => {
        return <span>{view.State} | {view.Status}</span>
      }},
      {title: "镜像", field: "Image", type: "string"},
      {title: "IP", tdRender: ({th, view}) => {
        let mode = view.HostConfig.NetworkMode == "default" ? "bridge" : view.HostConfig.NetworkMode
        let net = view.NetworkSettings.Networks[mode]
        return net ? net.IPAddress : "-"
      }},
      {title: "端口", tdRender: ({th, view}) => {
        return view.Ports.length > 0
          ? <span>{view.Ports[0].PublicPort} -> {view.Ports[0].PrivatePort}</span>
          : null
      }}
    ],
    models: [
      {title: '可用端口', api: 'event', type: 'api', key: "ha1", dispatchArea: "topBar"},
    ]
  }},
  methods: {
    startContainer(container){
      this.$http.patch("http://localhost:8000/container?s=local", {
        action: "start", cid: container.Id
      })
        .then(r => console.log(r))
    },
    stopContainer(container){
      this.$http.patch("http://localhost:8000/container?s=local", {
        action: "stop", cid: container.Id
      })
        .then(r => console.log(r))
    },
    restartContainer(container){
      this.$http.patch("http://localhost:8000/container?s=local", {
        action: "restart", cid: container.Id
      })
        .then(r => console.log(r))
    },
    logContainer(container){},
    ha(d){
      console.log(d)
    },
    ha1(data){
      let ports = []
      data.forEach(row => {
        row.Ports.forEach(port => port.PublicPort && ports.push(port.PublicPort))
      })
      ports = ports.sort()
      let tmp = [], base = ports[0]
      for(let i = 0; i < 10; i++ ){
        while(ports.includes(base)) {
          base++
        }
        tmp.push(base)
        ports.push(base)
      }
    }
  }
}
</script>