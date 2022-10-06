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
export default {
    name: 'S3Read',
    data() {
        return {
            foo: true,
            // s3: new AWS.S3()
        }
    },
    async mounted() {
        AWS.config.update({
            accessKeyId: `${process.env.VUE_APP_AWS_ACCESS_KEY_ID}`,
            secretAccessKey: `${process.env.VUE_APP_AWS_SECRET_ACCESS_KEY}`,
        })
        var ep = new AWS.Endpoint('awsproxy.example.com');
        const s3 = new AWS.S3({endpoint: ep});
        console.log(s3.endpoint);
        // console.log("hi");
        console.log(s3);
        const params = {
            Bucket: 'strapi-shadows-auth0',
            Key: 'test.txt'
        };
        console.log("hi");
        await s3.getObject(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        });
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