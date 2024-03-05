<script setup>
console.log(1)
import {useStore} from "vuex";
import {ref} from "vue";

const store = useStore(),
    initiativeList = store.getters.getArray;

let currentPortrait = ref()
let isFull = ref(false)

let ifAddOnField = ref(false);

let addOnFieldX = ref(0),
    addOnFieldY = ref(0);

function addOnField(event){
  addOnFieldY.value = event.pageY + 'px';
  addOnFieldX.value = event.pageX + 'px';
  ifAddOnField.value = true
}
function addOnFieldCharacters (item){
  currentPortrait.value = item.portrait
  ifAddOnField.value = false
  console.log(currentPortrait.value)
  isFull.value = true
}
</script>

<template>
  <div @contextmenu.prevent="addOnField($event)"
       id="eventCatch">
    <div id="icon"
         :style="{backgroundImage: `url(${currentPortrait})`}"
         v-if="isFull">
    </div>
  </div>
  <div id="AddOnField"
       v-if="ifAddOnField"
       :style="{top: addOnFieldY,
       left: addOnFieldX}">
    <p v-for="item in initiativeList"
       class="addOnFieldCharacters"
       @click="addOnFieldCharacters(item)">
      {{item.name}}</p>
  </div>
</template>

<style scoped>
#AddOnField{
  border-radius: 0;
  border: black 1px solid;
  margin: 0;
  padding: 5px;
  overflow: hidden scroll;
  width: 10em;
  height: 5em;
  z-index: 100;
  position: absolute;
  background: aliceblue;
}
.addOnFieldCharacters {
  font-size: 10px;
  cursor: pointer;
  padding: 2px;
}
.addOnFieldCharacters:hover {
  background: bisque;
}
#eventCatch {
  width: 100%;
  height: 100%;
}
#icon {
  margin: 0;
  background-size: 100%;
  z-index: 100;
  display: flex;
  border: black 1px solid;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  justify-content: center;
  overflow: hidden;
}
</style>