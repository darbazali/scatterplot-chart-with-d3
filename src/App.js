import * as d3 from 'd3'

// select target node
const container = d3.select('#container');

// create title
container
  .append('h2')
  .attr('id', 'title')
  .text('Doping in Professional Bicycle Racing')

// define margins
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 60
}

// define dimentions
const width = 800 - margin.right - margin.left;
const height = 400 - margin.top - margin.bottom;


// create the canvas
const canvas = container
  .append('svg')
  .attr('viewBox', `0 0 ${ width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

// create a group for svg elements
const svgGroups = canvas
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)



//  define scales
const xScale = d3
  .scaleTime()
  .range([0, width]);

const yScale = d3
  .scaleTime()
  .range([0, height])


// define time formatters
const parseTimeRecord = d3.timeParse("%M:%S");
const parseTimeYear = d3.timeParse("%Y");







const drawScatterplot = data => {
  return
}



const api_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";


fetch( api_url )
.then( res => res.json())
.then( data => {
  drawScatterplot(data)
})