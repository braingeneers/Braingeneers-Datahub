<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="dropdown">
        <select v-model="selectedOption">
        <option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
        </select>
    </div>


    <button class="add-button" @click="addPlotlyGraph">+</button>
    <div class="plotly-graphs">
        <draggable v-model="plotlyGraphs">   
            <div v-for="(plotlyGraph, index) in plotlyGraphs" :key="index">

                    <div class="drag-handle">Drag here</div>
                    <!-- placekitten image -->
                    <!-- <img src="https://placekitten.com/200/300" alt="placekitten image" /> -->
                    <PlotlyGraph :source="plotlyGraph.source" @remove="removePlotlyGraph(index)"/>
            </div>
        </draggable>
    </div>
  </div>
</template>

<script>

import PlotlyGraph from '@/components/PlotlyGraph.vue'
import draggable from 'vuedraggable';
// import axios from 'axios';

export default {
  name: 'PlotlyViewer',
  components: {
    draggable,
    PlotlyGraph,
    // HelloWorld
  },
  data() {
    return {
        plotlyGraphs: [],
        options: [],
        selectedOption: null,
        // myList: ["https://placekitten.com/200/300", "https://placekitten.com/400/300", "https://placekitten.com/200/500"],
    };
  },
  mounted() {
    const baseUrl = window.location.origin;
    const path = baseUrl + '/links_to_plots.txt';
    fetch(path)
    .then((response) => response.text())
    .then((text) => {
      this.options = text.split('\n');
      console.log(this.options);
    });
    // const file = require('./assets/links_to_plots.txt');
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //     this.options = e.target.result.split('\n');
    //     console.log(this.options);
    // };
    // reader.readAsText(file);
    // axios.get("./assets/links_to_plots.txt").then((response) => {
    //   this.options = response.data.split('\n');
    // });
  },
  methods: {
    addPlotlyGraph() {
      // Create a new PlotlyGraph object with a random source URL
      if (!this.selectedOption) {
            throw new Error('No option selected');
        } 

      const newPlotlyGraph = {
        //throw exception if selectedOption is null
        source: this.selectedOption,
      };

      // Add the new PlotlyGraph object to the array
      this.plotlyGraphs.push(newPlotlyGraph);
    },
    removePlotlyGraph(index) {
      // Remove the PlotlyGraph object at the specified index from the array
      this.plotlyGraphs.splice(index, 1);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.add-button {
  font-size: 48px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  border: none;
  margin: 0 auto;
  display: block;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.add-button:hover {
  background-color: #0056b3;
  cursor: pointer;
}

.add-button:active {
  transform: scale(0.9);

.plotly-graphs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.plotly-graph-wrapper {
  margin: 10px;
}

.plotly-graph-wrapper .card {
  cursor: move;
}
}
</style>
