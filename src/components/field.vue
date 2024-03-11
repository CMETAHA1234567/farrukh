<script setup>
import {reactive, ref, watch} from 'vue';
import {useStore} from "vuex";

const store = useStore();

const columns = store.getters.getColumns;

const rows = store.getters.getRows;

const fields = ref([]);

const currentField = ref();

const ifCreateWindow = ref(false);

const currentFieldSpecifications = reactive({
  name: 'Grass',
  width: 4,
  height: 4,
  background: store.getters.getFieldMapBackground,
})

const listName = ref(`${currentFieldSpecifications.name} (${currentFieldSpecifications.width} X ${currentFieldSpecifications.height})`);

class Field {
  constructor(object) {
    this.name = listName.value;
    this.width = object.width;
    this.height = object.height;
    this.img = object.background;
  }
}

function createField() {
  store.commit('clearRows');
  store.commit('clearColumns');

  for (let i = 0; i < currentFieldSpecifications.width; i++) {
    store.commit('rowsPush');
  }
  for (let i = 0; i < currentFieldSpecifications.height; i++) {
    store.commit('columnsPush');
  }
}

function optionsOn() {
  ifCreateWindow.value = true;
  createField()
}
watch(
    () => currentFieldSpecifications,
    () => {
  createField()
}, {deep: true})

function go() {
  createField()

  store.commit('ifTableWindowSwitch', true);
  ifCreateWindow.value = false;

  let newField = new Field(currentFieldSpecifications)
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
  currentFieldSpecifications.name = field.name;
  currentFieldSpecifications.width = field.width;
  currentFieldSpecifications.height = field.height;
  store.commit('setFieldMapBackground', field.img);
}
</script>

<template>
  <button id="optionsOn" @click="optionsOn(); $emit('toggleFalse')">
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
      <input v-model="currentFieldSpecifications.name"/>
      <p>Input width:</p>
      <input type="number" v-model="currentFieldSpecifications.width"/>
      <p>Input height:</p>
      <input type="number" v-model="currentFieldSpecifications.height"/>
      <p>Input URL background:</p>
      <input type="text" v-model="currentFieldSpecifications.background"/>
      <button id="optionOff" @click="go(); $emit('toggleTrue')">GO!</button>
    </div>
    <div id="preview">
      <table id="myTablePreview"
             :style="{backgroundImage: `url(${currentFieldSpecifications.background})`,
           width: 2 * rows.length + 'em'}">
        <tr class="str" v-for="item in columns">
          <td id="td" v-for="item in rows">
          </td>
        </tr>
      </table>
    </div>
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