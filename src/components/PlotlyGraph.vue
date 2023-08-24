<!-- https://stackoverflow.com/questions/69721109/embed-plotly-fig-to-html-into-vue-component -->
<template>
    <div class="plotly-graph">
      <button class="close-button" @click="removeGraph">
        X
      <i class="fas fa-times"></i>
      </button>
      <div v-if="loading" class="loading-icon">
            <!-- <h1>Loading...</h1> -->
            <font-awesome-icon icon="spinner" spin size="3x"/>
      </div>
      <iframe :src="source" width="100%" height="500" @load="onLoad"></iframe>
    </div>
  </template>

<script>
// Import the HTML file using webpack's html-loader dynamically

// const Plotly = require('plotly.js-dist');
// window.Plotly = Plotly;

export default {
  name: 'PlotlyGraph',
  props: {
    source: {
      type: String,
      required: true,
    },
    // htmlFilePath: {
    //   type: String,
    //   required: true,
    // },
  },
  data() {
    return {
      loading: true, // Will be set to false once the content is loaded
    };
  },
  methods: {
    onLoad() {
      this.loading = false;
      console.log('loaded');
    },
    removeGraph() {
      this.$emit('remove');
    },
  },
};
</script>


<style>
.plotly-graph {
  position: relative;
  width: 100%;
  height: 500;
  padding-bottom: 1%;
}

.loading-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #f5f5f5; */
  z-index: 1;
}

.loading-icon i {
  font-size: 48px;
  color: #007bff;
}

.close-button {
  position: relative;
  top: 10px;
  right: 50%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
}

.close-button i {
  margin-top: 5px;
}
/* iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500;
  border: none;
  z-index: 0;
} */
</style>