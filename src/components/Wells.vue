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
                console.log("#"+id)
                $("#"+id).click();
            },
            // hideModal(id) {
            //     this.$refs[id].hide();
            // },
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
                                                <b-modal v-bind:id="'modal-centere' + wells[((row-1)*6+col)-1].id" centered title="BootstrapVue">
                                                    <img class="img-responsive" :src="`https://placekitten.com/g/600/600`" style="max-height:250px;">
                                                    <p class="my-4">Vertically centered modal!</p>
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
