<script>
import axios from 'axios'

export default {
  data () {
    return {
      plates: [],
      error: null
    }
  },
  async mounted () {
    try {
      const response = await axios.get('http://localhost:1337/api/plates?populate=%2A')
      this.plates = response.data.data
    } catch (error) {
      this.error = error;
    }
  }
}
</script>


<template>
  <b-container>
    <div v-if="plates.length">
      <b-row>
        <div v-bind:key="plate.id" v-for="plate in plates">
          <b-col l="4">
            <b-card
              v-bind:img-src="`https://via.placeholder.com/150`"
              v-bind:title="plate.attributes.name"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>{{ `${plate.attributes.description}` }}</b-card-text>
              <span>
                <div v-bind:key="well.id" v-for="well in plate.attributes.wells.data">
                  <strong>{{ `${well.attributes.name}` }}</strong>
                </div>
              </span>
              <b-button @click="placeOrder" variant="primary">Order plate</b-button>
            </b-card>
          </b-col>
          <div v-bind:key="well.id" v-for="well in plate.attributes.wells.data">
            {{well.name}}
          </div>
        </div>
      </b-row>
    </div>
    <div v-else>
      <h5>Fetching plates . . .</h5>
    </div>
  </b-container>
</template>
