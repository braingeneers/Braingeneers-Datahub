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
            metadata : {},
            trace1 : {
                    x: [1, 2, 3, 4],
                    y: [10, 15, 13, 17],
                    mode: 'markers',
                    type: 'scatter'
                },
            trace2 : {
                    x: [2, 3, 4, 5],
                    y: [16, 5, 11, 9],
                    mode: 'lines',
                    type: 'scatter'
                },
            data : [],
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
        this.metadata = metadata_response
        console.log(this.metadata);
        //     console.log("boof");
        //     console.log(data);
        //     this.metadata = data;
        // });
        console.log(JSON.stringify(this.metadata, 0, 2));
    },
    methods: {
        async load_metadata(uuid){
            const params = {
                Bucket: 'braingeneers',
                Key: `ephys/${uuid}/metadata.json`
            };
            const response = await this.s3.getObject(params).promise();
            
            // , function (err, data) {
            //     if (err){
            //         console.error(err); // an error occurred
            //         return null
            //     }
            //     else {
            //         console.log(JSON.stringify(data, 0, 2));  
            //         return data
            //         // console.log(JSON.stringify(this.metadata, 0, 2));
            //         }         // successful response
            // });
            // console.log("inner response: ", response);
            return response
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