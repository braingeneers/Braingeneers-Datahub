<script>
import axios from 'axios'
import $ from 'jquery'

export default {
    props: ["plate_name"],
    data() {
        return {
            wells: [],
            //   filter_string: '?filters[plate][name][$eq]=test-plate-1',
            filter_params: "?filters[plate][name][$contains]=",
            error: null,
            form: {
                sample_name: '',
                sample_description: ''
            },
            api_token: "63e7b69b04c8f9d9c1c368a10ee586de676e5ae58b970225b4eb4d4ac8a633f141e98c656f296fabb0c1be54b01b23c152d09f41a562f7d6acde3865c3b53e33af5e1fbb4680adf71552f6b8e733e5df460a1c8fa32f42e2ccc26f204198bddc9382dcfe5d1af774465ce706baa6fcda5e0c0b8050f90a74f86dd8cffa1ccecb"
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
            //added populate=* to get all the associated nested data
            const response = await axios.get(`http://localhost:1337/api/wells${this.filter_params}&populate=*`)
            this.wells = response.data.data
            // console.log(this.wells)
        } catch (error) {
            this.error = error;
        }
    },
    methods: {
            showModal(id) {
                console.log("#"+id)
                $("#"+id).click();
            },
            createSample(well_id){
                console.log("create sample")
                console.log(this.form.sample_name)
                console.log(this.form.sample_description)
                console.log(well_id)
                // post with api_token
                axios.post('http://localhost:1337/api/samples', {
                    data:{
                        name: this.form.sample_name,
                        description: this.form.sample_description,
                        well: well_id
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${this.api_token}`
                    }
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getSamples(well_id){
                console.log("get samples")
                console.log(well_id)
                // post with api_token
                axios.get(`http://localhost:1337/api/samples?filters[well][id][$eq]=${well_id}`)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            deleteSample(sample_id, well_id){
                console.log("delete sample")
                console.log(sample_id)
                // post with api_token
                axios.delete(`http://localhost:1337/api/samples/${sample_id}`, {
                    headers: {
                        'Authorization': `Bearer ${this.api_token}`
                    }
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                // var temp_wells = this.wells
                // $(temp_wells).each( function() {
                //     if (this.id == well_id) console.log("found");

                //     else (console.log("not found"));
                // });
                console.log(well_id)
                console.log(`http://localhost:1337/api/wells${this.filter_params}&populate=*`)
                axios.get(`http://localhost:1337/api/wells${this.filter_params}&populate=*`)                
                .then(response => {
                    console.log(response);
                    this.wells = []
                    this.wells = response.data.data
                })  
                .catch(function (error) {
                    console.log(error);
                });
                // delete page element
                console.log("deleting page element: " + "sample-" + sample_id);
                $("#"+'sample-'+sample_id).remove();

                // try {
                //     const response = await axios.get(`http://localhost:1337/api/wells${this.filter_params}&populate=*`)
                //     this.wells = response.data.data
                // }
                // catch (error) {
                //     console.log(error);
                // }

                
            }

        }
}
</script>

<style>
    .img-wrap {
        width: 100px;
        height: 100px;
        position: relative;
        display: inline-block;
        overflow: hidden;
        margin: 0;

    }

    .img-card-fill {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 

        /* min-height: 100%;
        min-width: 100%; */
    }

    /* #my-button{
        height:0px;
        width:0px
    }  */
</style>


<template>
    <b-container fluid="xl">
        <!-- display plate name header -->
        <b-row>
            <h1>Plate: {{plate_name}}</h1>
        </b-row>
        <div v-if="wells.length">
            <!-- <b-row> -->
                <!-- <table id="picture-grid"> -->
                    <div v-for="row in 4" :key="row">
                        <b-row>
                            <div v-for="col in 6" :key="row * 10 + col">
                                <b-col>
                                    <b-card 
                                        tag="article" 
                                        class="mb-2 img-wrap">
                                        <b-card-text>{{ `${wells[((row-1)*6+col)-1].attributes.description}` }}</b-card-text>
                                        <!-- create unique collapse toggle for each card in for loop -->
                                        <img class="img-card-fill" v-on:click="showModal('boof' + wells[((row-1)*6+col)-1].id)"  :src="`https://placekitten.com/g/600/600`"/>
                                        <div>
                                                <!-- <b-button  id="indirect-button" @click="showModal('boof' + wells[((row-1)*6+col)-1].id)" > indirect</b-button> -->
                                                <b-button style="display:none" v-bind:id="'boof'+ wells[((row-1)*6+col)-1].id" v-b-modal="'modal-centere' + wells[((row-1)*6+col)-1].id">Launch centered modal</b-button>
                                                <b-modal v-bind:id="'modal-centere' + wells[((row-1)*6+col)-1].id" centered v-bind:title= wells[((row-1)*6+col)-1].attributes.name>
                                                    <img class="img-responsive" :src="`https://placekitten.com/g/600/600`" style="max-height:300px; display:block;">
                                                    <!-- <p class="my-4">cute cat</p> -->
                                                    samples
                                                    <b-button pill style="display:block;" v-b-toggle="'collapse-samples-' + wells[((row-1)*6+col)-1].id" variant="primary"> List Samples</b-button>
                                                    <b-collapse v-bind:id="'collapse-samples-' + wells[((row-1)*6+col)-1].id" class="mt-2">
                                                        <b-list-group>
                                                            <b-list-group-item v-for="sample in wells[((row-1)*6+col)-1].attributes.samples.data" :key="sample.id">
                                                                <div v-bind:id="'sample-' +sample.id">
                                                                    <b-button v-b-toggle="'collapse-sample' + sample.id" variant="secondary"> {{sample.attributes.name}} </b-button>
                                                                    <b-button v-on:click="deleteSample(sample.id, wells[((row-1)*6+col)-1].id)" class="float-right" v-bind:id="'delete-sample-'+sample.id" variant="danger"> X </b-button>
                                                                    <b-collapse v-bind:id="'collapse-sample' + sample.id" class="mt-2">
                                                                        <b-card>
                                                                            <b-card-text>{{sample.attributes.description}}</b-card-text>
                                                                        </b-card>
                                                                    </b-collapse>
                                                                </div>
                                                            </b-list-group-item>
                                                     
                                                        </b-list-group>
                                                    </b-collapse>
                                                    <b-button pill style="display:block;" v-b-toggle="'collapse-create-sample-' + wells[((row-1)*6+col)-1].id" variant="success"> Label new sample</b-button>
                                                    <b-collapse v-bind:id="'collapse-create-sample-' + wells[((row-1)*6+col)-1].id" class="mt-2">
                                                        <div>
                                                            <!-- button and text field to add sample to the database via restAPI call -->
                                                            <b-form @submit.prevent="createSample(wells[((row-1)*6+col)-1].id)">
                                                                <b-form-group
                                                                    id="input-group-1"
                                                                    label="Sample Name:"
                                                                    label-for="input-1"
                                                                    description="name the sample"
                                                                >
                                                                    <b-form-input
                                                                    id="input-1"
                                                                    v-model="form.sample_name"
                                                                    placeholder="name"
                                                                    required
                                                                    ></b-form-input>
                                                                </b-form-group>
                                                                <b-form-group id="input-group-2" label="Description:" label-for="input-2">
                                                                    <b-form-textarea
                                                                        id="input-2"
                                                                        v-model="form.sample_description"
                                                                        placeholder="description"
                                                                        rows = "6"
                                                                        required
                                                                    ></b-form-textarea>
                                                                </b-form-group>
                                                                <b-button type="submit" variant="primary">Submit</b-button>
                                                            </b-form>
                                                        </div>
                                                    </b-collapse>

                                                </b-modal>
                                        </div>                               
                                        <!-- <b-button id="my-button" v-b-toggle="'collapse-' + wells[((row-1)*6+col)-1].id" variant="primary" ></b-button>
                                        <b-collapse v-bind:id="'collapse-' + wells[((row-1)*6+col)-1].id" class="mt-2">
                                            <h>Hello!</h>
                                        </b-collapse> -->
                                        <!-- elements removed from card
                                            @click="showModal('modal-centere' + wells[((row-1)*6+col)-1].id)"
                                            @click="showModal('modal-centere' + wells[((row-1)*6+col)-1].id)"
                                            v-bind:title="wells[((row-1)*6+col)-1].attributes.name"
                                        v-bind:img-src="`https://placekitten.com/g/200/200`"
                                        img-alt="Image" 
                                        img-top 
                                        -->
                                    </b-card>
                                </b-col>
                            </div>
                        </b-row>
                    </div>
                <!-- </div> -->
                <!-- </table> -->
            <!-- </b-row> -->
        </div>
        <div v-else>
            <h5>No wells found . . .</h5>
        </div>
    </b-container>
</template>
