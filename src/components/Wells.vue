<script>
import axios from 'axios'

export default {
  data () {
    return {
      wells: [],
      filter_string: '?filters[plate][name][$eq]=test-plate-1',
      error: null
    }
  },
  async mounted () {
    try {
      const response = await axios.get('http://localhost:1337/api/wells'+this.filter_string)
      this.wells = response.data.data
    } catch (error) {
      this.error = error;
    }
  }
}
</script>


<template>
  <b-container>
    <div v-if="wells.length">
      <b-row>
        <div v-bind:key="well.id" v-for="well in wells">
          <b-col l="4">
            <b-card
              v-bind:img-src="`https://via.placeholder.com/200`"
              v-bind:title="well.attributes.name"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>{{ `${well.attributes.description}` }}</b-card-text>
              <!-- <span>
                <strong>Price: ${{ `${well.price}` }} </strong>
              </span> -->
              <b-button @click="placeOrder" variant="primary">Order well</b-button>
            </b-card>
          </b-col>
        </div>
      </b-row>
    </div>
    <div v-else>
      <h5>Fetching wells . . .</h5>
    </div>
  </b-container>
</template>
