<script setup>
import { ref, defineModel } from 'vue'
let field = [],
    rows = [];
let createWindow = ref(false);
let fieldWidth = defineModel('fieldWidth');
let fieldHeight = defineModel('fieldHeight');
let table = ref(false);
let back = defineModel('back');
function optionsOn(){
  table.value = false;
  createWindow.value = true;
  field = [];
  rows = [];
}
function go(){
  for (let i = 0; i < fieldWidth.value; i++){
    rows.push('')
  }
  for (let i = 0; i < fieldHeight.value; i++){
    field.push(rows)
  }

  table.value = true;
  createWindow.value = false;
}
</script>

<template>
<button id="optionsOn" v-on:click="optionsOn()">Create field</button>
  <div id="optionsWin" v-if="createWindow">
    <p>Input width:</p>
    <input type="number" v-model="fieldWidth"/>
    <p>Input height:</p>
    <input type="number" v-model="fieldHeight"/>
    <p>Input URL background:</p>
    <input type="text" v-model="back"/>
    <button id="optionOff" v-on:click="go()">GO!</button>
  </div>
  <table id="table" v-if="table">
    <tr class="str" v-for="item in field"><td v-for="item in rows"></td></tr>
  </table>
</template>

<style scoped>
#optionsWin{
  border-radius: 10px;
  border: #2c3e50 2px solid;
  margin: 10px;
  padding: 10px;
}
td{
  height: 100px;
  width: 100px;
  border: black 1px solid;
}
#table{
  background-image: url("https://sun9-80.userapi.com/impf/VqS3wbv1owdP8Sx0o4SfSnjZQ6yVmaDXbY3xbA/6o2a_Q-cFRQ.jpg?size=2160x2160&quality=96&sign=41bb9c095fcba220b6995bb8b5fb7647&type=album");
  background-size: 100%;
}
</style>