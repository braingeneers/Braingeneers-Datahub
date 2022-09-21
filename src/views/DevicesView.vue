<template>
    <div class="devices">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <Navbar />
      <Devices />
    </div>
</template>
  
  <script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  import Navbar from '@/components/Navbar.vue'
  import Devices from '@/components/Devices.vue'
  
  export default {
    name: 'DevicesView',
    components: {
        Navbar,
        Devices,
   },
   methods:{
  
   },
  
  }
  </script>
  