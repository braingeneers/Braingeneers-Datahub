<template>
    <div>
    <br />
    <Navbar />
    <Plates />
    <!-- <Wells /> -->
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Plates from "./components/Plates";
// import Wells from "./components/Wells";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
    Plates
    // Wells
    ,
}
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
