<template>
    <div class="devices">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <Navbar />
      <div ref="BioPlateScopes">
                <h4>BioPlateScopes</h4>
                <Devices v-bind:type="'BioPlateScope'" v-bind:interaction_things="interaction_things"/>
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
  import axios from 'axios'
  import Navbar from '@/components/Navbar.vue'
  import Devices from '@/components/Devices.vue'
  
  export default {
    name: 'DevicesView',
    components: {
        Navbar,
        Devices,
   },
   data () {
        return {
          interaction_things: [],
          error: null,
          user: [],
        }
      },
    async mounted () {
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/api/interaction-things?populate=%2A`)
          this.interaction_things = response.data.data
        } catch (error) {
          console.log(error)
          this.error = error;
        }
      }
  }
  </script>
  