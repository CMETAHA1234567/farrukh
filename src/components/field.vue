<script setup>
import {ref, watch} from 'vue';
import {useStore} from "vuex";

const store = useStore()
const columns = store.getters.getColumns;
const rows = store.getters.getRows;
const ifCreateWindow = ref(false);
const fieldName = ref('Grass');
const fieldWidth = ref(4);
const fieldHeight = ref(4);
const backImg = store.getters.getFieldMapBackground;
const listName = `${fieldName.value} (${fieldWidth.value} X ${fieldHeight.value})`;
const fields = ref([]);
const currentField = ref();

class Field {
  constructor(name, width, height, img) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.img = img;
  }
}

function createField() {
  store.commit('clearRows');
  store.commit('clearColumns');

  for (let i = 0; i < fieldWidth.value; i++) {
    store.commit('rowsPush');
  }
  for (let i = 0; i < fieldHeight.value; i++) {
    store.commit('columnsPush');
  }
}

function optionsOn() {
  store.commit('ifTableWindowSwitch',false);
  ifCreateWindow.value = true;
  createField()
}
watch([fieldWidth, fieldHeight], () => {
  createField()
})

function go() {
  createField()

  store.commit('ifTableWindowSwitch', true);
  ifCreateWindow.value = false;

  let newField = new Field(listName, fieldWidth.value, fieldHeight.value, backImg)
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
  store.commit('setFieldMapBackground', field.img);
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
      <button id="optionOff" @click="go(); $emit('toggle')">GO!</button>
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

<!--  <div id="fieldContainer" v-if="ifTableWindow">
    <table id="myTable"
           :style="{backgroundImage: `url(${backImg})`,
           width: 7 * rows.length + 'em'}">
      <tr class="str" v-for="item in columns">
        <td v-for="item in rows">
          <cell></cell>
        </td>
      </tr>
    </table>
  </div>-->
</template>

<style scoped>
#optionsWin {
  padding: 5px;
  background: #ece4d9;
  border-radius: 10px;
  box-shadow: -10px 5px 5px #ece4d940;
  width: 30%;
}

/*td {
  height: 100px;
  width: 100px;
  border: black 1px solid;
}

#myTable {
  background-size: 100%;
  overflow: scroll;
}*/

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
  border: black solid 1px;
}

#myTablePreview {
}
</style>