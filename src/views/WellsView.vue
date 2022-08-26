

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Wells from '@/components/Wells.vue'

export default {
  name: 'WellsView',
  props: ['plate_name_from_url'],
  components: {
    Navbar,
    Wells,
 },
 data: function () {
    return {
    //   plate: "",
      loadTrigger: 0,
    }
  },
  methods:{
    mounted() {
    //load list of uuids
    //   this.loadTrigger = 1
        console.log("mounted wellview")
        if (this.plate_name_from_url){
            this.plate = this.plate_name_from_url
            this.loadTrigger++
        }
    },
  }
}
</script>

<template>
  <div class="wells">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Navbar />
    <Wells ref="wells" v-bind:plate_name="plate_name_from_url" v-bind:loadTrigger="loadTrigger"/>
  </div>
</template>