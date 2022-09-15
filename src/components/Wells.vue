<script>
import axios from 'axios'
import $ from 'jquery'

export default {
    props: ["plate_name"],
    data() {
        return {
            plate: {"attributes": {"image_parameters" : false}},
            wells: [],
            //   filter_string: '?filters[plate][name][$eq]=test-plate-1',
            filter_params: "?filters[plate][name][$contains]=",
            error: null,
            form: {
                sample_name: '',
                sample_description: ''
            },
            api_token: "63e7b69b04c8f9d9c1c368a10ee586de676e5ae58b970225b4eb4d4ac8a633f141e98c656f296fabb0c1be54b01b23c152d09f41a562f7d6acde3865c3b53e33af5e1fbb4680adf71552f6b8e733e5df460a1c8fa32f42e2ccc26f204198bddc9382dcfe5d1af774465ce706baa6fcda5e0c0b8050f90a74f86dd8cffa1ccecb",
            api_endpoint: "http://localhost:1337",
            //image viewer stuff
            progress: 0,
            images: [],
            uuid:"2022-07-11-i-connectoid-3",
            groupID:"C", 
            endpoint: "https://s3-west.nrp-nautilus.io/braingeneers/imaging",
            manifest: {
                stack_size: 0,
                captures: [],
            },
            curTimestampIndex: 0,
            curZ: 0,
            curRow: 1,
            curCol: 1,
            firstLoadIndex: 0,
            startTimestampIndex: 0,
            startZ: 0,
            panning: false
        }

    },
    async mounted() {
        try {
            this.loader("oldest")
            console.log(this.filter_params)
            console.log(this.plate_name)
            if (!this.plate_name) {
                this.filter_params = ""
            } else {
                this.filter_params = this.filter_params + this.plate_name
            }
            // ${this.plate_name}
            //added populate=* to get all the associated nested data

            const response = await axios.get(`${this.api_endpoint}/api/wells${this.filter_params}&populate=*`)
            this.wells = response.data.data
            const response2 = await axios.get(`${this.api_endpoint}/api/plates?filters[name][$eq]=${this.plate_name}`)
            this.plate = response2.data.data[0]
            console.log("plate", JSON.stringify(this.plate.attributes.image_parameters.images, 0, 2))
            // console.log("wells", JSON.stringify(this.wells, 0, 2))
            // console.log(this.wells)
        } catch (error) {
            console.log(error)
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
                .then(response => {
                    console.log(response);
                    if (response.status == 200){
                        //refresh the wells
                        axios.get(`http://localhost:1337/api/wells${this.filter_params}&populate=*`)                
                        .then(response => {
                            console.log(response);
                            this.wells = []
                            this.wells = response.data.data
                        })  
                        .catch(function (error) {
                            console.log(error);
                        });
                    }
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
            deleteSample(sample_id){
                console.log("delete sample")
                console.log(sample_id)
                // post with api_token
                axios.delete(`http://localhost:1337/api/samples/${sample_id}`, {
                    headers: {
                        'Authorization': `Bearer ${this.api_token}`
                    }
                })
                .then(response => {
                    console.log(response);
                    if (response.status == 200){
                        axios.get(`http://localhost:1337/api/wells${this.filter_params}&populate=*`)                
                        .then(response => {
                            console.log(response);
                            this.wells = []
                            this.wells = response.data.data
                        })  
                        .catch(function (error) {
                            console.log(error);
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                // delete page element

                // console.log("deleting page element: " + "sample-" + sample_id);
                // $("#"+'sample-'+sample_id).remove();
            },
            // begin image viewer stuff
            loader(start_index) {
                console.log(start_index)
                console.log("Loading...", this.uuid)
                console.log(`${this.endpoint}/${this.uuid}/images/manifest.json`)
                fetch(`${this.endpoint}/${this.uuid}/images/manifest.json`)
                    .then(stream => stream.json())
                    .then(data => {
                    this.manifest = data
                    switch(start_index){
                        case "newest":
                        this.curTimestampIndex = this.manifest.captures.length -1
                        this.firstLoadIndex = this.manifest.captures.length -1
                        break;
                        case "oldest":
                        this.curTimestampIndex = 0
                        this.firstLoadIndex = 0
                        break;
                        case "sync":
                        this.firstLoadIndex = this.curTimestampIndex
                        break;
                        default:
                        console.log(this.loadTrigger)

                    }
                    })
                    .catch(error => {
                    console.log(error)
                    alert("Unable to load experiment, does the uuid exist?")
                    })
            },
            changeImageSet(uuid){
                this.uuid = uuid
                this.groupID = this.plate.attributes.image_parameters.group_id
                this.loader("newest")
            },
            missing(event) {
                console.log("Missing image", event.target.src)
                event.target.src = "https://placekitten.com/g/600/600"
            },
            OnArrowRightClick() {
                console.log()
                if (this.curTimestampIndex < this.manifest.captures.length-1) {
                    this.curTimestampIndex = this.curTimestampIndex + 1
                }
                else {
                    console.log("At max timestamp")
                    console.log("this.curTimestampIndex: "+ this.curTimestampIndex)
                }
            },
            OnArrow48RightClick() {
                console.log()
                if (this.curTimestampIndex < this.manifest.captures.length-49) {
                    this.curTimestampIndex = this.curTimestampIndex + 48
                }
                else {
                    this.curTimestampIndex = this.manifest.captures.length-1
                    console.log("At max timestamp")
                    console.log("this.curTimestampIndex: "+ this.curTimestampIndex)
                }
            },
            OnArrowLeftClick() {
                console.log()
                if (this.curTimestampIndex > 0) {
                    this.curTimestampIndex = this.curTimestampIndex - 1
                }
                else {
                    console.log("At minimum timestamp")
                    console.log("this.curTimestampIndex: "+ this.curTimestampIndex)
                }
            },
            OnArrow48LeftClick() {
                console.log()
                if (this.curTimestampIndex > 48) {
                    this.curTimestampIndex = this.curTimestampIndex - 48
                }
                else {
                    this.curTimestampIndex = 0
                    console.log("At first timestamp")
                    console.log("this.curTimestampIndex: "+ this.curTimestampIndex)
                }
            },
            OnPreviousFocalViewClick() {
                if (this.curZ > 0) {
                console.log("this.curZ: " + this.curZ)
                this.startZ = this.curZ
                this.curZ = this.startZ - 1

                } else {
                    console.log("At minimum focal length")
                }
            },
            OnNextFocalViewClick() {
                if (this.curZ < this.manifest.stack_size-1) {
                console.log("this.curZ: " + this.curZ)
                this.startZ = this.curZ
                this.curZ = this.startZ + 1

                } else {
                    console.log("At maximum focal length")
                }
            },
            loadAllImagesFromLayer(row, col, layer){
                console.log("load all images from layer", row, col, layer)
                // fetch image from url with axios
                // axios.get(`http://localhost:1337/api/wells${this.filter_params}&populate=*`)
                var img = new Image()
                // img.src = `${this.endpoint}/${this.uuid}/images/${this.manifest.captures[this.curTimestampIndex].timestamp}/${this.curZ}.png`
                img.src = "https://placekitten.com/g/600/600"
                this.images.push(img)

            },
        

        }
}
</script>

<style>
    .img-wrap {
        width: auto;
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
                                        <!-- <img class="img-card-fill" v-on:click="showModal('boof' + wells[((row-1)*6+col)-1].id)"  :src="`https://placekitten.com/g/600/600`"/> -->
                                        <img class="img-card-fill" v-on:click="showModal('boof' + wells[((row-1)*6+col)-1].id)" @error="missing($event)" :src="`${endpoint}/${uuid}/images/${manifest.captures[firstLoadIndex]}/camera${groupID}${row}${col}/${0 + 1}.jpg`"/>
                                        <div>
                                                <!-- <b-button  id="indirect-button" @click="showModal('boof' + wells[((row-1)*6+col)-1].id)" > indirect</b-button> -->
                                                <b-button style="display:none" v-bind:id="'boof'+ wells[((row-1)*6+col)-1].id" v-b-modal="'modal-centere' + wells[((row-1)*6+col)-1].id">Launch centered modal</b-button>
                                                <b-modal v-bind:id="'modal-centere' + wells[((row-1)*6+col)-1].id" centered v-bind:title= wells[((row-1)*6+col)-1].attributes.name>
                                                    <img class="img-responsive" @error="missing($event)" :src="`${endpoint}/${uuid}/images/${manifest.captures[curTimestampIndex]}/camera${groupID}${row}${col}/${curZ + 1}.jpg`" style="max-height:300px; display:block;">
                                                    Current Timestamp: {{curTimestampIndex+1}}/{{manifest.captures.length}}
                                                    T: {{ manifest.captures[curTimestampIndex] }} Z: {{ curZ+1 }}/{{manifest.stack_size}}
                                                    <vue-ellipse-progress :size="25" :progress="progress"/>
                                                    <div style="padding-top: 1vw">
                                                        <b-button id="Arrow48Left" type="button" v-on:click="OnArrow48LeftClick">
                                                                Back 48 Timesteps
                                                        </b-button>
                                                        <b-button id="ArrowLeft" type="button" v-on:click="OnArrowLeftClick">
                                                                Previous Timestamp
                                                        </b-button>
                                                        <b-button id="ArrowRight" type="button" v-on:click="OnArrowRightClick">
                                                                Next Timestamp
                                                        </b-button>
                                                        <b-button id="Arrow48Right" type="button" v-on:click="OnArrow48RightClick">
                                                                Forward 48 Timesteps
                                                        </b-button>
                                                    </div>
                                                    <div style="padding-top: 1vw">
                                                        <b-button v-on:click="OnPreviousFocalViewClick">
                                                            Previous Focal View
                                                        </b-button>

                                                        <b-button v-on:click="OnNextFocalViewClick" >
                                                            Next Focal View
                                                        </b-button>
                                                    </div>
                                                    samples
                                                    <b-button pill style="display:block;" v-b-toggle="'collapse-samples-' + wells[((row-1)*6+col)-1].id" variant="primary"> List Samples</b-button>
                                                    <b-collapse v-bind:id="'collapse-samples-' + wells[((row-1)*6+col)-1].id" class="mt-2">
                                                        <b-list-group>
                                                            <b-list-group-item v-for="sample in wells[((row-1)*6+col)-1].attributes.samples.data" :key="sample.id">
                                                                <div v-bind:id="'sample-' +sample.id">
                                                                    <b-button v-b-toggle="'collapse-sample' + sample.id" variant="secondary"> {{sample.attributes.name}} </b-button>
                                                                    <b-button v-on:click="deleteSample(sample.id)" class="float-right" v-bind:id="'delete-sample-'+sample.id" variant="danger"> X </b-button>
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
                                    </b-card>
                                </b-col>
                            </div>
                        </b-row>
                    </div>
        </div>
        <div v-else>
            <h5>No wells found . . .</h5>
        </div>
        <div>
            <!-- if this.plate has attribute image, show dropdown -->
            <b-row v-if="plate.attributes.image_parameters.images">
            <!-- <b-row v-if="plate_name"> -->
                <b-col>
                    <b-dropdown id="dropdown-1" text="Select Image Set" variant="primary" menu-class="w-100">
                        <b-dropdown-item v-for="uuid in plate.attributes.image_parameters.uuids" :key="uuid" v-on:click="changeImageSet(uuid)">
                            {{uuid}}
                        </b-dropdown-item>
                    </b-dropdown>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>
