<script>
import axios from 'axios'

export default {
    props: ["plate_name"],
    data() {
        return {
            wells: [],
            //   filter_string: '?filters[plate][name][$eq]=test-plate-1',
            filter_params: "?filters[plate][name][$contains]=",
            error: null
        }

    },
    async mounted() {
        try {
            console.log(this.filter_params)
            console.log(this.plate_name)
            if (!this.plate_name) {
                this.filter_params = ""
            } else {
                this.filter_params = this.filter_params + this.plate_name
            }
            // ${this.plate_name}
            const response = await axios.get(`http://localhost:1337/api/wells${this.filter_params}`)
            this.wells = response.data.data
        } catch (error) {
            this.error = error;
        }
    },
    methods: {
            showModal(id) {
                this.$refs[id].show();
            },
            hideModal(id) {
                this.$refs[id].hide();
            },
        }
}
</script>
<style>
    #my-button{
        height:0px;
        width:0px
        /* opacity: .0001; */
        /* display: none; */
    }
</style>


<template>
    <b-container>
        <!-- display plate name header -->
        <b-row>
            <h1>Plate: {{plate_name}}</h1>
        </b-row>
        <div v-if="wells.length">
            <b-row>
                <table id="picture-grid">
                    <tr v-for="row in 4" :key="row">
                    <td v-for="col in 6" :key="row * 10 + col">
                        <b-col l="1">
                            <b-card 
                                v-bind:img-src="`https://placekitten.com/g/200/200`"
                                img-alt="Image" 
                                img-top 
                                tag="article" 
                                style="max-width: 20rem; min-width = 5rem;" 
                                class="mb-2">
                                <!-- <b-card-text>{{ `${wells[((row-1)*6+col)-1].attributes.description}` }}</b-card-text> -->
                                <!-- create unique collapse toggle for each card in for loop -->
                                <!-- <img v-on:click="bkl" class="capture" :src="`https://via.placeholder.com/200`"/> -->
                                <div>
                                        <b-button v-b-modal="'modal-centere' + wells[((row-1)*6+col)-1].id">Launch centered modal</b-button>
                                        <b-modal v-bind:id="'modal-centere' + wells[((row-1)*6+col)-1].id" centered title="BootstrapVue">
                                            <p class="my-4">Vertically centered modal!</p>
                                        </b-modal>
                                </div>                               
                                <b-button id="my-button" v-b-toggle="'collapse-' + wells[((row-1)*6+col)-1].id" variant="primary" ></b-button>
                                <b-collapse v-bind:ref="'collapse-' + wells[((row-1)*6+col)-1].id" class="mt-2">
                                    <h>Hello!</h>
                                </b-collapse>
                                 <!-- elements removed from card
                                    
                                    v-bind:title="wells[((row-1)*6+col)-1].attributes.name"
                                -->
                            </b-card>
                        </b-col>
                    </td>
                    </tr>
                </table>
            </b-row>
        </div>
        <div v-else>
            <h5>No wells found . . .</h5>
        </div>
    </b-container>
</template>
