<script setup>
import {useStore} from "vuex";

let store = useStore()
 const initiativeList = store.getters.getArray
function turn(){
store.commit('nextTurn')
}
</script>

<template>
<button @click="turn()">Next turn</button>
  <div id="initIcon" v-if="initiativeList.length != 0">
<div class="icon"
     v-for="item  in initiativeList"
     :style="{backgroundImage: `url(${item.portrait})`}"
     :key="item">
  <span id="iconName">{{ item.name }}</span>
</div>
  </div>
</template>

<style scoped>
div {
  border-radius: 10px;
  border: #2c3e50 2px solid;
  margin: 10px;
  padding: 10px;
}
#initIcon{
  display: flex;
}
.icon {
  background-size: 100%;
  margin-top: 25px;
  z-index: 2;
  display: flex;
  border: black 1px solid;
  height: 100px;
  width: 100px;
  border-radius: 100px;
  justify-content: center;
  position: relative;
}
#iconName {
  position: absolute;
  top: -25px;
}
</style>