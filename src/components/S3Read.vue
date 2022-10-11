<template>
    <div>

        <!-- <b-jumbotron header="Bootstrap + Vue2" :lead="msg"> -->
        <p>For more information visit website</p>
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
import axios from 'axios';
export default {
    name: 'S3Read',
    data() {
        return {
            foo: true,
            // s3: new AWS.S3()
        }
    },
    async mounted() {
        // AWS.config.update({
        //     accessKeyId: `${process.env.S3_ACCESS_KEY}`,
        //     secretAccessKey: `${process.env.S3_SECRET_KEY}`,
        // })
        // var ep = new AWS.Endpoint('https://nrp-nautilus.io');
        const s3 = new AWS.S3({ endpoint: "https://s3-west.nrp-nautilus.io", accessKeyId: `${process.env.S3_ACCESS_KEY}`, secretAccessKey: `${process.env.S3_SECRET_KEY}`, s3ForcePathStyle: true });
        console.log(s3.endpoint);
        // console.log("hi");
        // console.log(s3);
        const params = {
            
            Bucket: 'braingeneers',
            Key: 'imaging/2022-03-23-i-UCB-bio/images/manifest.json'
            //Key: 'braingeneers/ephys/2022-09-02-e-hebbian/original/data/hebbian_0log.csv'
        };
        console.log("hi");
        // s3.listBuckets(function (err, buckets) {
        //     if (err) return console.log(err)
        //     console.log('buckets :', buckets)
        // })
        s3.getObject(params, function (err) {
            if (err) return console.log(err)
            console.log('File downloaded successfully')
        })
        fetch('https://s3-west.nrp-nautilus.io/braingeneers/imaging/2022-03-23-i-UCB-bio/images/manifest.json')
            .then(stream => stream.json())
            .then(data => {
                console.log('File fetched')
                console.log(JSON.stringify(data, 0, 2));
                // console.log(this.loadTrigger)

            })
            .catch(error => {
                console.log(error)
                alert("Unable to load experiment, does the uuid exist?")
            })
        //get the file with axios
        await axios.get('https://s3-west.nrp-nautilus.io/braingeneers/imaging/2022-03-23-i-UCB-bio/images/manifest.json')
            .then(response => {
                console.log('File axiosed fetched')
                console.log(JSON.stringify(response.data, 0, 2));
                // console.log(this.loadTrigger)

            })
            .catch(error => {
                console.log(error)
                alert("Unable to load experiment, does the uuid exist?")
            })

        // await s3.getObject(params, function (err, data) {
        //     if (err) console.log(err); // an error occurred
        //     else console.log(data);           // successful response
        // });
    },
    methods: {
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