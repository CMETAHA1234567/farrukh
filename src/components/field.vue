<script setup>
import {ref, watch} from 'vue';
import Cell from "@/components/cell.vue";

let columns = [],
    rows = [];

const ifCreateWindow = ref(false),
    ifTableWindow = ref(false);

const fieldName = ref('Grass'),
    fieldWidth = ref(4),
    fieldHeight = ref(4),
    backImg = ref('https://celes.club/uploads/posts/2022-06/1655669027_45-celes-club-p-tekstura-travi-besshovnaya-krasivo-56.jpg'),
    listName = `${fieldName.value} (${fieldWidth.value} X ${fieldHeight.value})`;

const fields = ref([]),
    currentField = ref();


class Field {
  constructor(name, width, height, img) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.img = img;
  }
}

function createField() {
  columns = [];
  rows = [];

  for (let i = 0; i < fieldWidth.value; i++) {
    rows.push('')
  }
  for (let i = 0; i < fieldHeight.value; i++) {
    columns.push(rows)
  }
}
function optionsOn() {
  ifTableWindow.value = false;
  ifCreateWindow.value = true;
  createField()
}
watch([fieldWidth, fieldHeight], () => {
  createField()
})
function go() {
  createField()

  ifTableWindow.value = true;
  ifCreateWindow.value = false;

  let newField = new Field(listName, fieldWidth.value, fieldHeight.value, backImg.value)
  fields.value.push(newField);
  localStorage.setItem('fields', JSON.stringify(fields.value))
}


function completionFields() {
  let allFields = JSON.parse(localStorage.getItem('fields'));
  allFields.forEach((item) => {
    fields.value.push(item)
  })
}



let key = localStorage.getItem('fields')
if (key) {
  completionFields()
}

function onChange() {
  let field = currentField.value
  fieldName.value = field.name;
  fieldWidth.value = field.width;
  fieldHeight.value = field.height;
  backImg.value = field.img;
}
</script>

<template>
  <button id="optionsOn" @click="optionsOn()">
    Create field
  </button>

  <div id="fieldOptions" v-if="ifCreateWindow">
    <div id="optionsWin">
      <p>Select field or crate new:</p>
      <select v-model="currentField"
              @change="onChange()">
        <option v-for="item in fields"
                :value="item">
          {{ item.name }}
        </option>
      </select>
      <p>Input name:</p>
      <input v-model="fieldName"/>
      <p>Input width:</p>
      <input type="number" v-model="fieldWidth"/>
      <p>Input height:</p>
      <input type="number" v-model="fieldHeight"/>
      <p>Input URL background:</p>
      <input type="text" v-model="backImg"/>
      <button id="optionOff" @click="go()">GO!</button>
    </div>
    <div id="preview">
      <table id="myTablePreview"
             :style="{backgroundImage: `url(${backImg})`,
           width: 2 * rows.length + 'em'}">
        <tr class="str" v-for="item in columns">
          <td id="td" v-for="item in rows">
          </td>
        </tr>
      </table>
    </div>
  </div>

  <div id="fieldContainer" v-if="ifTableWindow">
    <table id="myTable"
           :style="{backgroundImage: `url(${backImg})`,
           width: 7 * rows.length + 'em'}">
      <tr class="str" v-for="item in columns">
        <td v-for="item in rows">
          <cell></cell>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#optionsWin {
  padding: 5px;
  background: #ece4d9;
  border-radius: 10px;
  box-shadow: -10px 5px 5px #ece4d940;
  width: 30%;
}

td {
  height: 100px;
  width: 100px;
  border: black 1px solid;
}

#myTable {
  background-size: 100%;
  overflow: scroll;
}

button {
  background: #98a678;
  border-radius: 10px;
  border: 0;
  height: 2em;
  width: 10em;
  margin: 2px;
  cursor: pointer;
}

button:hover {
  background: #98c178;
}

input {
  border: 1px darkslategrey solid;
  border-radius: 5px;
  height: 2em;
  width: 20em;
}

#fieldOptions {
  display: flex;
}

#optionsWin {
  border: black 1px solid;
  height: 30em;
}

#preview {
  padding: 10px;
  background: #ece4d9;
  border-radius: 10px;
  box-shadow: -10px 5px 5px #ece4d940;
  margin-left: 5px;
  width: 69%;
  overflow: scroll scroll;
  height: 30em;
}

#td {
  width: 2em;
  height: 2em;
}

#myTablePreview {
}
</style>