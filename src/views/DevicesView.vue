<template>
    <div class="devices">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <Navbar />
      <div ref="BioPlateScopes">
                <h4>BioPlateScopes</h4>
                <Devices v-bind:type="'BioPlateScope'"/>
            </div>
            <div ref="Autoculture">
                <h4>Autoculture</h4>
                <Devices v-bind:type="'BioPlateScope'" />
            </div>
            <div ref="Maxwell">
                <h4>Maxwell</h4>
                <Devices v-bind:type="'BioPlateScope'"/>
            </div>
            <div ref="Other">
                <h4>Other</h4>
                <Devices v-bind:type="'BioPlateScope'" />
            </div>

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
  