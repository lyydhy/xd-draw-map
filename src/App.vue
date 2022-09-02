

<template>
  <div style="width:100vw;height:100vh;position:relative">
    <draw-map-point  ref="mapRef" style="width:100%;height:100%;" :zoom="7"></draw-map-point>
    <button @click="getData" style="position:absolute;bottom:50px;right:30px">获取结果</button>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import DrawMapPoint from "./components/drawMapPoint";
let mapRef = ref(null)

function getData() {
  // console.log(mapRef.value)
}
</script>
<style>
#app {
  margin: 0;
  padding: 0;
  max-width: 100vw;
  width: 100vw;
  height: 100vh;
}
body {
  width: 100vw;
  height: 100vh;
}
</style>
