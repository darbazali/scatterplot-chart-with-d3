





const drawScatterplot = data => {
  return
}



const api_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";


fetch( api_url )
.then( res => res.json())
.then( data => {
  drawScatterplot(data)
})