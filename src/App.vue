<template>
  <div>
    <br />
    <Plates />
  </div>
</template>
<script>
import Plates from "./components/Plates";
export default {
  name: "App",
  components: {
    Plates
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
