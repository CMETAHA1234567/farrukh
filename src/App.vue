<template>
  <tokens></tokens>
  <tracker></tracker>
  <field></field>
</template>

<script>
import Field from "@/components/field.vue";
import Tokens from "@/components/tokens.vue";
import Tracker from "@/components/tracker.vue";

export default {
  name: 'App',
  components: {
    Tracker,
    Tokens,
    Field
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
