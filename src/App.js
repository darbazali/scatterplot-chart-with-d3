import * as d3 from 'd3'

// select target node
const container = d3.select('#container');

// create title
container
  .append('h2')
  .attr('id', 'title')
  .text('Doping in Professional Bicycle Racing')


/*==================================================
    CREATE LEGEND
===================================================*/
const legend = container
  .append('dvi')
  .attr('id', 'legend')

const list = legend.append('ul');
list.append('li')
  .text("Doping Allegations");

list.append('li')
  .text('No Doping Allegations')


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

/*==================================================
    TOOLTIP DRAWER FUNCTION
===================================================*/
const drawTooltip = (d, tooltip) => {
  tooltip
    .style('opacity', 1)
    .style('left', `${d3.event.layerX - 70}px`)
    .style('top', `${d3.event.layerY - 20}px`)

    .attr('data-year', d["Year"])

    .text( () => {
      let rider = d["Name"];
      let country = d["Nationality"];
      let year = d["Year"].getFullYear();
      let time = d["Time"].getMinutes() + ":" + d["Time"].getSeconds();
      let doping = d["Doping"]

      return `${rider}: ${country} \n Year: ${year}, Time: ${time} \n ${doping}`
    })
}

/* 
  "Time": "36:50",
    "Place": 1,
    "Seconds": 2210,
    "Name": "Marco Pantani",
    "Year": 1995,
    "Nationality": "ITA",
    "Doping": "Alleged drug use during 1995 due to high hematocrit levels",
    "URL": "https://en.wikipedia.org/wiki/Marco_Pantani#Alleged_drug_use
*/

/*==================================================
    PLOT DRAWER FUNCTION
===================================================*/
const drawScatterplot = data => {
  // format time
  data.forEach(item => {
    item["Time"] = parseTimeRecord(item["Time"]);
    item["Year"] = parseTimeYear(item["Year"]);
  });

  // define domains
  xScale.domain( d3.extent( data, d => d["Year"]));
  yScale.domain( d3.extent( data, d => d["Time"]));

  // creat Axes
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.timeFormat("%M:%S"));




  /*==================================================
    APPEND AXES TO THE GROUP
  ===================================================*/
  svgGroups
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

  svgGroups
    .append('g')
    .attr('id', 'y-axis')
    .call(yAxis)




  /*==================================================
    CREATE TOOLTIP
  ===================================================*/
  const tooltip = container
    .append('div')
    .attr('id', 'tooltip')



  /*==================================================
    PLOT DOTS
  ===================================================*/
  svgGroups
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')

    // events for tooltip
    .on('mouseenter', d => drawTooltip(d, tooltip))
    .on('mouseout', () => {
      tooltip
        .style('opacity', 0)
    })

    // data values
    .attr('data-xvalue', d => d["Year"])
    .attr('data-yvalue', d => d["Time"])

    // coordinations
    .attr('cx', d => xScale(d["Year"]))
    .attr('cy', d => yScale(d["Time"]))
    .attr('r', 5)

    // css attributes
    .attr('class', 'dot')
    .attr('fill', d => (d["Doping"] == "" ? "#EF8536" : "#3A76AF" ))

}



const api_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";


fetch( api_url )
.then( res => res.json())
.then( data => {
  drawScatterplot(data)
})