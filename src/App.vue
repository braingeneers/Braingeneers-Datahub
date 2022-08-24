<template>
  <div>
    <br />
    <Plates />
  </div>
</template>
<script>

import Plates from "./components/Plates";
import Wells from "./components/Wells";
export default {
  name: "App",
  components: {
    Plates,
    Wells
  },
};
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
