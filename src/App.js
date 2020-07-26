import * as d3 from 'd3'

// select target node
const container = d3.select('#container');

// create title
container
  .append('h2')
  .attr('id', 'title')
  .text('Doping in Professional Bicycle Racing')






const drawScatterplot = data => {
  return
}



const api_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";


fetch( api_url )
.then( res => res.json())
.then( data => {
  drawScatterplot(data)
})