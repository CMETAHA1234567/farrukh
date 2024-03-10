<script setup>
import Field from "@/components/field.vue";
import Tokens from "@/components/tokens.vue";
import Tracker from "@/components/tracker.vue";
import FieldMap from "@/components/field-map.vue";
import {ref} from "vue";

/*export default {
  name: 'App',
  components: {
    FieldMap,
    Tracker,
    Tokens,
    Field
  }
}*/

const mapVisible = ref(false)
</script>

<template>
  <tracker></tracker>
  <tokens></tokens>
  <field @toggle="mapVisible = true"></field>
  <template v-if="mapVisible">
    <field-map></field-map>
  </template>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#div {
  width: 100%;
  height: 100px;
  border: #ece4d9 4px solid;
}

body {
  background: linear-gradient(to right, #2a2928, #2c2b2a, #3f3e3b);
}
</style>
