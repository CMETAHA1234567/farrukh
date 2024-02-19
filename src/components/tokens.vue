<script setup>
import {ref} from "vue";

const characters = ref([]);
let characterOptions = ref(false),
    currentName = ref('Vasya'),
    currentAC = ref(10),
    currentIB = ref(2),
    currentPortrait = ref('https://aigis.club/uploads/posts/2022-02/1645467754_14-adonius-club-p-dvarf-art-18.jpg')
class Character {
  constructor(name, armor, init, portrait) {
    this.name = name;
    this.armor = armor;
    this.initBonus = init;
    this.portrait = portrait;
  }
}
function addCharacter(){
  let character = new Character(currentName.value, currentAC.value, currentIB.value, currentPortrait.value)
  characters.value.push(character)

}
</script>

<template>
<div>
  <button v-on:click="characterOptions = true">Create character</button>
  <div id="characterIcons">
    <div class="icon" v-for="item in characters" :style="{backgroundImage: `url(${item.portrait})`}">
      <span id="iconName">{{item.name}}</span>
      <img id="wang" src="../assets/wang.png"/>
<img id="shield" src="../assets/shield.png"/>
      <span id="iconArmor">{{item.armor}}</span>
    </div>
  </div>
  <div v-if="characterOptions">
    <p>Input name:</p>
    <input v-model="currentName">
    <p>Input armor class:</p>
    <input type="number" v-model="currentAC">
    <p>Input initiative bonus:</p>
    <input type="number" v-model="currentIB">
    <p>Input icon link:</p>
    <input v-model="currentPortrait">
    <button v-on:click="addCharacter()">Go</button>
  </div>
</div>
</template>

<style scoped>
div{
  border-radius: 10px;
  border: #2c3e50 2px solid;
  margin: 10px;
  padding: 10px;
}
.icon{
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
#characterIcons{
  display: flex;
}
#shield{
  z-index: 2;
  height: 60px;
  position: absolute;
  top: 70px;
  left: 70px;
}
#iconArmor{
  z-index: 3;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 85px;
  left: 85px;
}
#iconName{
  position: absolute;
  top: -25px;
}
#wang{
  height: 25px;
  position: absolute;
  top: -25px;
  right: 0;
  cursor: pointer;
}
</style>