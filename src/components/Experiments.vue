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


<template>
  <b-container>
    <div v-if="experiments.length">
      <b-row>
        <div v-bind:key="experiment.id" v-for="experiment in experiments">
          <b-col l="4">
            <b-card
              v-bind:img-src="`https://via.placeholder.com/150`"
              v-bind:title="experiment.attributes.name"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>{{` ${experiment.attributes.description}` }}</b-card-text>
              <span>
                <!-- <div v-bind:key="well.id" v-for="well in experiment.attributes.wells.data">
                  <strong>{{ `${well.attributes.name}` }}</strong>
                </div> -->
              </span>
              <button v-on:click="redirectToURL(experiment.attributes.name)"> Plates </button>
              <!-- <router-link to="/wells/" + ${experiment.attributes.name} >Wells</router-link>  -->
            </b-card>
          </b-col>
        </div>
      </b-row>
    </div>
    <div v-else>
      <h5>Fetching experiments . . .</h5>
    </div>
  </b-container>
</template>
