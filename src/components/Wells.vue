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
                                v-bind:img-src="`https://via.placeholder.com/200`" 
                                v-bind:title="wells[((row-1)*6+col)-1].attributes.name"
                                img-alt="Image" 
                                img-top 
                                tag="article" 
                                style="max-width: 20rem;" 
                                class="mb-2">
                                <b-card-text>fart</b-card-text>
                                <b-card-text>{{ `${wells[0].attributes.description}` }}</b-card-text>
                                <!-- create unique collapse toggle for each card in for loop -->
                                <b-button v-b-toggle="'collapse-' + wells[0].id" variant="primary">Toggle</b-button>
                                <b-collapse v-bind:id="'collapse-' + wells[0].id" class="mt-2">
                                    <b-card>Hello!</b-card>
                                </b-collapse> 
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
