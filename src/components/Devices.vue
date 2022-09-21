<script>
    import axios from 'axios'
    
    export default {
      data () {
        return {
          interaction_things: [],
          error: null,
          user: []
        }
      },
      methods:{
        redirectToURL(device_name){
          this.$router.push({ path: '/plates/'+device_name });
        },
        redirectToURL_wells(plate_name){
          this.$router.push({ path: '/wells/'+plate_name });
        },
    
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
    <style>
        .text-properties{
            display: inline;
            min-width: 2000px;
        }
    </style>
    
    
    <template>
      <b-container>
        <div v-if="interaction_things.length">
            <div ref="BioPlateScopes">
                <h4>BioPlateScopes</h4>

            </div>
            <div ref="Autoculture">
                <h4>Autoculture</h4>
                
            </div>
            <div ref="Maxwell">
                <h4>Maxwell</h4>
                
            </div>
            <div ref="Other">
                <h4>Other</h4>
                
            </div>
          <!-- <b-row> -->
            <div v-bind:key="device.id" v-for="device in interaction_things">
                <!-- <b-row> -->
                    <b-card>
                    
                    <div class="text-left">
                        <h4 class="text-properties">{{device.attributes.name}}  </h4>
    
                        <!-- horizontal white space -->
    
                        <b-card-text class="text-properties text-center"> {{device.attributes.updatedAt | luxon}}</b-card-text>
                        <b-button class="float-right" v-b-toggle="'collapse-' + device.id" variant="primary">...</b-button>
                    </div>
                    <b-collapse v-bind:id="'collapse-' + device.id" class="mt-2">
                        <div>
                            <b-card-group>
                                <!-- <b-card title="Interaction-Things">
                                <b-card-text>
                                    This is where we list interaction things
                                </b-card-text>
                                <div v-bind:key="interaction_thing.id" v-for="interaction_thing in device.attributes.interaction_things.data">
                                        <b-button v-on:click="redirectToURL_wells(interaction_thing.attributes.name)">{{interaction_thing.attributes.name}}</b-button>
                                </div>
                                <template #footer>
                                    <small class="text-muted">footer</small>
                                </template>
                                </b-card> -->
    
                                <b-card title="device-Notes">
                                <b-card-text class="text-left">
                                    {{device.attributes.description}}
                                </b-card-text>
                                <template #footer>
                                    <small class="text-muted">Last updated 3 mins ago</small>
                                </template>
                                </b-card>
    
                                <b-card title="Plates">
                                <b-card-text>
                                    This is where we list plates
                                </b-card-text>
                                    <!-- <div v-bind:key="plate.id" v-for="plate in device.attributes.plates.data"> -->
                                    <div v-if="device.attributes.plate.data">
                                        <b-button v-on:click="redirectToURL_wells(device.attributes.plate.data.attributes.name)">{{device.attributes.plate.data.attributes.name}}</b-button>
                                    </div>
                                <template #footer>
                                    <small class="text-muted">Last updated 3 mins ago</small>
                                </template>
                                </b-card>
                            </b-card-group>
                        </div>
                    </b-collapse> 
                    <!-- <span> -->
                        <!-- <div v-bind:key="well.id" v-for="well in device.attributes.wells.data">
                        <strong>{{ `${well.attributes.name}` }}</strong>
                        </div> -->
                    <!-- </span> -->
                    <!-- <button v-on:click="redirectToURL(device.attributes.name)"> Plates </button> -->
                    <!-- <router-link to="/wells/" + ${device.attributes.name} >Wells</router-link>  -->
    
                    <!-- removed bits
                    v-bind:title="device.attributes.name"
                 -->
                    </b-card>
                <!-- </b-row> -->
            </div>
          <!-- </b-row> -->
        </div>
        <div v-else>
          <h5>Fetching devices . . .</h5>
        </div>
      </b-container>
    </template>
    