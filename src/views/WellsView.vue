<template>
  <div class="wells">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Navbar />
    <Wells />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Wells from '@/components/Wells.vue'

export default {
  name: 'WellsView',
  components: {
    Navbar,
    Wells,
 }
}
</script>
