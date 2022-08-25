<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Navbar />
    <Plates />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Plates from '@/components/Plates.vue'

export default {
  name: 'HomeView',
  components: {
    Navbar,
    Plates,
 }
}
</script>
