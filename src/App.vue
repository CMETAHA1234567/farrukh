<script setup>
import Field from "@/components/field.vue";
import Tokens from "@/components/tokens.vue";
import Tracker from "@/components/tracker.vue";
import FieldMap from "@/components/field-map.vue";
import {ref} from "vue";
import FieldMapBroadcact from "@/components/field-map-broadcact.vue";

const mapVisible = ref(false)
</script>

<template>
  <button>
    <router-link to="broadcast" target="_blank">Broadcast</router-link>
  </button>
  <tracker></tracker>
  <tokens></tokens>
  <field @toggleTrue="mapVisible = true" @toggleFalse="mapVisible = false"></field>
  <template v-if="mapVisible">
    <field-map></field-map>
    <field-map-broadcact></field-map-broadcact>
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
