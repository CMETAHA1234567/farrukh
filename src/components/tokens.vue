<script setup>
import {ref} from "vue";
import {useStore} from "vuex";

const store = useStore()

const characters = ref([]);

let ifCharacterOptions = ref(false);
let ifTokenOptions = ref(false);

let currentName = ref('Фаррух'),
    currentArmor = ref(10),
    currentPortrait = ref('https://phonoteka.org/uploads/posts/2022-09/1663290054_3-phonoteka-org-p-monakh-art-instagram-4.jpg');

class Character {
  constructor(name, armor, portrait) {
    this.name = name;
    this.armor = armor;
    this.portrait = portrait;
  }
}
function initiativeAssigned(name){
  let player = JSON.parse(localStorage.getItem(name))
  store.commit('initiativeAssigned', player)
}
function completionCharacters(){
  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    characters.value.push(JSON.parse(localStorage.getItem(key)))
  }
}
if (localStorage.length > 0){
  completionCharacters()
}
function addCharacter() {
  let character = new Character(currentName.value, currentArmor.value, currentPortrait.value)
  characters.value.push(character)
  localStorage.setItem(currentName.value, JSON.stringify(character))
  ifCharacterOptions.value = false
  console.log(localStorage);
}

function characterOptions(){
  ifCharacterOptions.value = true
}
</script>

<template>
  <div>
    <button @click="characterOptions">
      Create character
    </button>

    <div id="characterIcons">
      <div class="icon"
           v-for="item in characters"
           :style="{backgroundImage: `url(${item.portrait})`}"
           @contextmenu="ifTokenOptions = true">
        <span id="iconName">{{ item.name }}</span>
        <img id="wang" src="../assets/wang.png" @click.once="initiativeAssigned(item.name)"/>
        <img id="shield" src="../assets/shield.png"/>
        <span id="iconArmor">{{ item.armor }}</span>
      </div>
    </div>

    <div id="createWindow">
    <div id="CharacterOptions" v-if="ifCharacterOptions">
      <p>Input name:</p>
      <input v-model="currentName">
      <p>Input armor class:</p>
      <input type="number" v-model="currentArmor">
      <p>Input icon link:</p>
      <input v-model="currentPortrait">
      <button @click="addCharacter()">Go</button>
    </div>
    <div id="CharacterPreview" v-if="ifCharacterOptions">
      <div id="iconPreview" :style="{backgroundImage: `url(${currentPortrait})`}"></div>
    </div>
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

#characterIcons {
  display: flex;
}

#shield {
  z-index: 2;
  height: 60px;
  position: absolute;
  top: 70px;
  left: 70px;
}

#iconArmor {
  z-index: 3;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 85px;
  left: 85px;
}

#iconName {
  position: absolute;
  top: -25px;
}

#wang {
  height: 25px;
  position: absolute;
  top: -25px;
  right: 0;
  cursor: pointer;
}
#CharacterOptions {
  width: 59%;
}
#CharacterPreview {
  width: 39%;
}
#createWindow {
  display: flex;
}
#iconPreview{
  border-radius: 50%;
  aspect-ratio: 1/1;
  background-size: 100%;
}
</style>