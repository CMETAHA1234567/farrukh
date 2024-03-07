<script setup>
import {useStore} from "vuex";

const store = useStore(),
    initiativeList = store.getters.getArray;

function deleteInit(item){
  store.commit('deleteCharacter', item)
  store.commit('addDeletedInit', item)
}
function turn(){
store.commit('nextTurn')
}
</script>

<template>
<button @click="turn()">Next turn</button>
  <div id="initIcons" v-if="initiativeList.length != 0">
<div class="icon"
     v-for="item  in initiativeList"
     :style="{backgroundImage: `url(${item.portrait})`}"
     :key="item">
  <span id="iconName">{{ item.name }}</span>
  <img id="skull" src="../assets/skull.png" @click="deleteInit(item)"/>
</div>
  </div>
</template>

<style scoped>
button{
  background: #98a678;
  border-radius: 10px;
  border: 0;
  height: 2em;
  width: 10em;
  margin: 2px;
  cursor: pointer;
}
button:hover{
  background: #98c178;
}
div {
  border-radius: 10px;
  border: #2c3e50 2px solid;
  margin: 10px;
  padding: 10px;
}
#initIcons{
  display: flex;
  background: #ece4d9;
  box-shadow: -10px 5px 5px #ece4d940 ;
}
.icon {
  background-size: 100%;
  margin-top: 25px;
  display: flex;
  border: black 1px solid;
  min-height: 100px;
  height: 8em;
  aspect-ratio: 1/1;
  border-radius: 50%;
  justify-content: center;
  position: relative;
}
#iconName {
  position: absolute;
  top: -25px;
}
#skull {
  height: 25px;
  position: absolute;
  top: -25px;
  right: 0;
  cursor: pointer;
}
</style>