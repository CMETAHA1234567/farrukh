<script setup>
import {ref} from 'vue'

let field = [],
    rows = [];
let createWindow = ref(false);
let fieldWidth = ref(4);
let fieldHeight = ref(4);
let ifTable = ref(false);
let backImg = ref('https://celes.club/uploads/posts/2022-06/1655669027_45-celes-club-p-tekstura-travi-besshovnaya-krasivo-56.jpg')

function optionsOn() {
  ifTable.value = false;
  createWindow.value = true;
  field = [];
  rows = [];
}

function go() {
  for (let i = 0; i < fieldWidth.value; i++) {
    rows.push('')
  }
  for (let i = 0; i < fieldHeight.value; i++) {
    field.push(rows)
  }

  ifTable.value = true;
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
    <input type="text" v-model="backImg"/>
    <button id="optionOff" v-on:click="go()">GO!</button>
  </div>
  <div id="fieldContainer" v-if="ifTable">
    <table id="myTable" :style="{backgroundImage: `url(${backImg})`}">
      <tr class="str" v-for="i in field">
        <td v-for="i in rows"></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
div {
  border-radius: 10px;
  border: #2c3e50 2px solid;
  margin: 10px;
  padding: 10px;
  overflow: scroll;
}

td {
  height: 100px;
  width: 100px;
  border: black 1px solid;
  z-index: 1;
}
#myTable {
  background-size: 100%;
}
</style>