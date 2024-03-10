<script setup>
import Cell from "@/components/cell.vue";
import {useStore} from "vuex";

const store = useStore();
const columns = store.getters.getColumns;
const rows = store.getters.getRows;
const backImg = store.getters.getFieldMapBackground;

</script>

<template>
  <div id="fieldContainer">
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
</style>