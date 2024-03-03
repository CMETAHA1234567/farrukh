<script setup>
import {ref} from 'vue'
import Cell from "@/components/cell.vue";

let columns = [],
    rows = [];

let ifCreateWindow = ref(false),
    ifTableWindow = ref(false);


let fieldWidth = ref(4);
let fieldHeight = ref(4);

let backImg = ref('https://celes.club/uploads/posts/2022-06/1655669027_45-celes-club-p-tekstura-travi-besshovnaya-krasivo-56.jpg')

function optionsOn() {
  ifTableWindow.value = false;
  ifCreateWindow.value = true;

  columns = [];
  rows = [];
}

function go() {
  for (let i = 0; i < fieldWidth.value; i++) {
    rows.push('')
  }
  for (let i = 0; i < fieldHeight.value; i++) {
    columns.push(rows)
  }

  ifTableWindow.value = true;
  ifCreateWindow.value = false;

}
</script>

<template>
  <button id="optionsOn" @click="optionsOn()">
    Create field
  </button>

  <div id="optionsWin" v-if="ifCreateWindow">
    <p>Input width:</p>
    <input type="number" v-model="fieldWidth"/>
    <p>Input height:</p>
    <input type="number" v-model="fieldHeight"/>
    <p>Input URL background:</p>
    <input type="text" v-model="backImg"/>
    <button id="optionOff" @click="go()">GO!</button>
  </div>

  <div id="fieldContainer" v-if="ifTableWindow">
    <table id="myTable"
           :style="{backgroundImage: `url(${backImg})`,
           width: 100 * rows.length + 'px'}">
      <tr class="str" v-for="item in columns">
        <td v-for="item in rows">
            <cell></cell>
        </td>
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
  overflow: scroll;
}
</style>