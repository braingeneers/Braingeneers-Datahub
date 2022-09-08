<script>
import axios from 'axios'

export default {
  data () {
    return {
      experiments: [],
      error: null
    }
  },
  methods:{
    redirectToURL(experiment_name){
      this.$router.push({ path: '/plates/'+experiment_name });
    },
    redirectToURL_wells(plate_name){
      this.$router.push({ path: '/wells/'+plate_name });
    },
  },
  async mounted () {
    try {
      const response = await axios.get('http://localhost:1337/api/experiments?populate=%2A')
      this.experiments = response.data.data
    } catch (error) {
      this.error = error;
    }
  }
}
</script>
<style>
    .text-properties{
        display: inline;
        min-width: 2000px;
    }
</style>


<template>
  <b-container>

    <div v-if="experiments.length">
      <!-- <b-row> -->
        <div v-bind:key="experiment.id" v-for="experiment in experiments">
            <!-- <b-row> -->
                <b-card>
                
                <div class="text-left">
                    <h4 class="text-properties">{{experiment.attributes.name}}  </h4>

                    <!-- horizontal white space -->

                    <b-card-text class="text-properties text-center">Date {{experiment.attributes.updatedAt}}</b-card-text>
                    <b-button class="float-right" v-b-toggle="'collapse-' + experiment.id" variant="primary">...</b-button>
                </div>
                <b-collapse v-bind:id="'collapse-' + experiment.id" class="mt-2">
                    <b-card>Hello!
                        <!-- <b-card-text class="text-properties">{{` ${experiment.attributes.plates.data[0].attributes.name}` }} </b-card-text> -->
                        <b-card-text class="text-properties text-center">placehjolder </b-card-text>
                        <div v-bind:key="plate.id" v-for="plate in experiment.attributes.plates.data">
                            <b-button v-on:click="redirectToURL_wells(plate.attributes.name)">{{plate.attributes.name}}</b-button>
                        </div>
                    </b-card>
                </b-collapse> 
                <!-- <span> -->
                    <!-- <div v-bind:key="well.id" v-for="well in experiment.attributes.wells.data">
                    <strong>{{ `${well.attributes.name}` }}</strong>
                    </div> -->
                <!-- </span> -->
                <!-- <button v-on:click="redirectToURL(experiment.attributes.name)"> Plates </button> -->
                <!-- <router-link to="/wells/" + ${experiment.attributes.name} >Wells</router-link>  -->

                <!-- removed bits
                v-bind:title="experiment.attributes.name"
             -->
                </b-card>
            <!-- </b-row> -->
        </div>
      <!-- </b-row> -->
    </div>
    <div v-else>
      <h5>Fetching experiments . . .</h5>
    </div>
  </b-container>
</template>
