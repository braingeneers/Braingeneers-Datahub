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
    // async loader() {
    //     try {
    //         console.log(this.filter_params)
    //         console.log(this.plate_name)
    //         const response = await axios.get(`http://localhost:1337/api/wells${this.filter_params}${this.plate_name}`)
    //         this.wells = response.data.data
    //     } catch (error) {
    //         this.error = error;
    //     }
    // }
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
                            class="mb-2">
                            <b-card-text>{{ `${well.attributes.description}` }}</b-card-text>
                            <!-- create unique collapse toggle for each card in for loop -->
                            <b-button v-b-toggle="'collapse-' + well.id" variant="primary">Toggle</b-button>
                            <b-collapse v-bind:id="'collapse-' + well.id" class="mt-2">
                                <b-card>Hello!</b-card>
                            </b-collapse> 
                                <!-- <b-card-text>
                                    <b-row>
                                        <b-col>
                                            <b-card-text>Plate: {{ well.attributes.plate.data.attributes.name }}</b-card-text>
                                            <b-card-text>Experiment: {{ well.attributes.plate.data.attributes.experiment.data.attributes.name }}</b-card-text>
                                            <b-card-text>Sample: {{ well.attributes.sample.data.attributes.name }}</b-card-text>
                                            <b-card-text>Sample Type: {{ well.attributes.sample.data.attributes.sample_type.data.attributes.name }}</b-card-text>
                                            <b-card-text>Sample Description: {{ well.attributes.sample.data.attributes.description }}</b-card-text>
                                        </b-col>
                                        <b-col>
                                            <b-card-text>Sample Concentration: {{ well.attributes.sample.data.attributes.concentration }}</b-card-text>
                                            <b-card-text>Sample Volume: {{ well.attributes.sample.data.attributes.volume }}</b-card-text>
                                            <b-card-text>Sample Units: {{ well.attributes.sample.data.attributes.units }}</b-card-text>
                                            <b-card-text>Sample Date: {{ well.attributes.sample.data.attributes.date }}</b-card-text>
                                            <b-card-text>Sample Time: {{ well.attributes.sample.data.attributes.time }}</b-card-text>
                                        </b-col>
                                    </b-row>
                                </b-card-text>
                            </b-collapse> -->
                        </b-card>
                    </b-col>
                </div>
            </b-row>
        </div>
        <div v-else>
            <h5>No wells found . . .</h5>
        </div>
    </b-container>
</template>
