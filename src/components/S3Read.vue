<template>
    <div>
        <Navbar />

        <!-- <b-jumbotron header="Bootstrap + Vue2" :lead="msg"> -->
        <b-container fluid>
            <Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
        </b-container>
        <!-- <b-button variant="primary" @click="showDismissibleAlert=true" :disabled="showDismissibleAlert">More Info</b-button> -->
        <!-- </b-jumbotron> -->
    </div>
</template>
   
<script>

//    const AWS = require('aws-sdk');
//    AWS.config.update({
//         accessKeyId: `${process.env.VUE_APP_AWS_ACCESS_KEY_ID}`,
//         secretAccessKey: `${process.env.VUE_APP_AWS_SECRET_ACCESS_KEY}`,
//    });
// import AWS from 'aws-sdk';
const AWS = require('aws-sdk');
// import { AWS } from 'aws-sdk';
import { Plotly } from 'vue-plotly'
import Navbar from './Navbar.vue';

export default {
    name: 'S3Read',
    components: {
        Navbar,
        Plotly
    },
    data() {
        return {
            metadata: {},
            trace1: {
                x: [1, 2, 3, 4],
                y: [10, 15, 13, 17],
                mode: 'markers',
                type: 'scatter'
            },
            trace2: {
                x: [2, 3, 4, 5],
                y: [16, 5, 11, 9],
                mode: 'lines',
                type: 'scatter'
            },
            data: [],
            layout: {
                title: "My graph"
            },
            s3: new AWS.S3({ endpoint: "https://s3-west.nrp-nautilus.io", accessKeyId: `${process.env.VUE_APP_S3_ACCESS_KEY_ID}`, secretAccessKey: `${process.env.VUE_APP_S3_SECRET_KEY}`, s3ForcePathStyle: true })
        }
    },
    async mounted() {
        this.data = [this.trace1, this.trace2]
        // const s3 = new AWS.S3({ endpoint: "https://s3-west.nrp-nautilus.io", accessKeyId: `${process.env.VUE_APP_S3_ACCESS_KEY_ID}`, secretAccessKey: `${process.env.VUE_APP_S3_SECRET_KEY}`, s3ForcePathStyle: true });
        // console.log("access key id: ", `${process.env.VUE_APP_S3_ACCESS_KEY_ID}`);
        console.log(this.s3.endpoint);
        // console.log("hi");
        // console.log(s3);
        // console.log("hi");

        // await this.s3.getObject(params, function (err, data) {
        //     if (err) console.log(err); // an error occurred
        //     else {
        //         // console.log(JSON.stringify(data, 0, 2));  
        //         this.metadata = data
        //         console.log(JSON.stringify(this.metadata, 0, 2));
        //         }         // successful response
        // });
        const metadata_response = await this.load_metadata("2022-09-02-e-hebbian")
        this.metadata = JSON.parse(metadata_response.Body)
        // console.log(this.metadata);
        //     console.log("boof");
        //     console.log(data);
        //     this.metadata = data;
        // });
        // console.log(JSON.stringify(this.metadata, 0, 2));
        this.load_data(this.metadata, "experiment4", 0, 60000);
        // JSON.parse(this.metadata.body.data)
    },
    methods: {
        async load_metadata(uuid) {
            const params = {
                Bucket: 'braingeneers',
                Key: `ephys/${uuid}/metadata.json`
            };
            const response = await this.s3.getObject(params).promise();
            return response
        },
        async load_data(metadata, experiment, offset = 0, data_length = null, channels = null, parallelism = 'auto') {
            var dataset_size = 0
            // console.log(channels, hardware, batch_uuid, experiment_name, offset, data_length, parallelism)
            console.log("experiment: ", experiment);
            // console.log("metadata: ", metadata);
            console.log("offset: ", offset);
            console.log("data_length: ", data_length);
            console.log("channels: ", channels);
            console.log("parallelism: ", parallelism);
            // console.log("metadata[ephys_experiments]: ", JSON.parse(metadata['ephys_experiments']));
            var blocks = "nf" // not found
            var experiment_data
            for (var i in metadata['ephys_experiments']) {
                console.log(metadata['ephys_experiments'][i].name)
                if (experiment === metadata['ephys_experiments'][i].name) {
                    experiment_data = metadata['ephys_experiments'][i]
                    blocks = experiment_data.blocks
                    break
                }
            }
            console.log("blocks: ", blocks);
            if (blocks === "nf") {
                console.error("experiment not found")
                return
            }
            // const blocks = metadata['ephys_experiments'][]['blocks']
            for (var block in blocks){
                console.log("num frames: ", blocks[block].num_frames);
                dataset_size += blocks[block].num_frames
            }
            if (offset + data_length > dataset_size) {
                const error = `offset + length (${offset + data_length}) exceeds dataset size (${dataset_size})`
                console.error(error)
            }
            // console log datatype of experiment object



            //python line from braingeneerspy to account for more complicated structures: experiment_name = list(metadata['ephys_experiments'].keys())[experiment] if isinstance(experiment, int) else experiment
            // if (typeof experiment === 'number'){
            //     console.log("boof")

            // }
            const experiment_name = experiment

            const batch_uuid = metadata['uuid']
            const hardware = experiment_data.hardware

            console.log(channels, hardware, batch_uuid, experiment_name, offset, data_length, parallelism)
            await this.load_data_maxwell(experiment_data)

            // return data

        },
        async load_data_maxwell(experiment_reference_data ) {
            var experiment_stem = experiment_reference_data.blocks[0].path
            console.log("experiment stem: ", experiment_stem);
            // const data = await this.load_data_maxwell(metadata, batch_uuid, experiment_name, channels, offset, length)
            // return data
        },

        async getImage(s3) {
            const data = s3.getObject(
                {
                    Bucket: 'companyimages',
                    Key: 'your stored image'
                }
            ).promise();
            return data;
        }
    },

}
</script>