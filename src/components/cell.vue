<script setup>
import {useStore} from "vuex";
import {ref, watch} from "vue";

const store = useStore(),
    initiativeList = store.getters.getArray;

const currentPortrait = ref(),
    currentName = ref(),
    isFull = ref(false),
    currentBorder = ref('1px solid black');


const ifAddOnField = ref(false);

const addOnFieldX = ref(0),
    addOnFieldY = ref(0);

function addOnField(event) {
  addOnFieldY.value = event.pageY + 'px';
  addOnFieldX.value = event.pageX + 'px';
  ifAddOnField.value = true
}

function addOnFieldCharacters(item) {
  currentPortrait.value = item.portrait
  currentName.value = item.name
  ifAddOnField.value = false
  isFull.value = true
  if (initiativeList[0].name === currentName.value) {
    currentBorder.value = '3px solid red'
  } else {
    currentBorder.value = '1px solid black'
  }
}
function onDragStart (ev) {
  ev.dataTransfer.setData('dragCharacter', JSON.stringify({
    portrait: currentPortrait.value,
    name: currentName.value,
    border: currentBorder.value
  }))
}
function onDragover(ev) {
  ev.dataTransfer.dropEffect = "move";
  isFull.value = false
}
function onDrop (ev) {
  let character = JSON.parse(ev.dataTransfer.getData('dragCharacter'));
  isFull.value = true;
  currentPortrait.value = character.portrait;
  currentName.value = character.name;
  currentBorder.value = character.border;
}
watch(
    () => initiativeList,
    () => {
      if (initiativeList.length === 0) return
      if (initiativeList[0].name === currentName.value) {
        currentBorder.value = '3px solid red'
      } else {
        currentBorder.value = '1px solid black'
      }
      let deleted = store.getters.getDeleteInit
      if (deleted == currentName.value){
        isFull.value = false
      }
    }, {deep: true})
</script>

<template>
  <div @contextmenu.prevent="addOnField($event)"
       id="eventCatch"
       @dragover.prevent="onDragover($event)"
       @drop.prevent="onDrop($event)">
    <div id="icon"
         v-if="isFull"
         :style="{backgroundImage: `url(${currentPortrait})`,
         border: currentBorder}"
         @dragstart="onDragStart($event)"
         draggable="true">
    </div>
  </div>
  <div id="AddOnField"
       v-if="ifAddOnField"
       :style="{top: addOnFieldY,
       left: addOnFieldX}">
    <p v-for="item in initiativeList"
       class="addOnFieldCharacters"
       @click="addOnFieldCharacters(item)">
      {{ item.name }}</p>
  </div>
</template>

<style scoped>
#AddOnField {
  border-radius: 0;
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
  border-radius: 50%;
  justify-content: center;
  overflow: hidden;
}
</style>