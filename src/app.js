// if the data you are going to import is small, then you can import it using es6 import
// (I like to use use screaming snake case for imported json)
// import MY_DATA from './app/data/example.json'

import { myExampleUtil } from './utils';
import scrollama from "scrollama";
import vegaEmbed from 'vega-embed';
import * as d3 from "d3";
import './main.css';
//import "intersection-observer";

// this is just one example of how to import data. there are lots of ways to do it!

const height = 500;
const width = 500;
const margin = { top: 50, bottom: 50, right: 50, left: 50 };
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

// Create function to embed vega figures
function embedPlot(spec, div_vis) {
  const fig = vegaEmbed(div_vis, spec, {
    renderer: 'svg', "actions": false
  }).catch(console.warn);
  return fig
}

// initialize the scrollama
var container = d3.select("#scroll");
var graphic = container.select(".scroll__graphic");
var text = container.select(".scroll__text");
var step = text.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepHeight = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepHeight + "px");

  // 2. update width/height of graphic element
  var figureH = window.innerHeight / 1.2;
  var figureMarginTop = (window.innerHeight - figureH) / 2;

  graphic
    .style("height", figureH + "px")
    .style("top", figureMarginTop + "px");




  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}



function handleStepEnter(response) {
  // response = { element, direction, index }

  // add color to current step only
  step.classed("is-active", function (d, i) {
    return i === response.index;
  });

  // update graphic based on step
  if (response.index === 0) {
    // Population map
    const fig = vegaEmbed("#vis1", "./data/mx.vg.json", {
      renderer: 'svg', "actions": false
    }).catch(console.warn);
  } else if (response.index === 1) {
    d3.selectAll("path").interrupt();
    embedPlot("./data/world.vg.json", "#vis1");
  } else if (response.index === 2) {
    embedPlot("./data/states_pov.vg.json", "#vis1")
  } else if (response.index === 3) {

    embedPlot("./data/sates_sd.vg.json", "#vis1")

  }
  console.log("Response is.....")
  console.log(response)
  handleResize();
}

function handleStepExit(response) {
  if (response.direction === 'down') {
    response.element.style.opacity = .4
  }
}

function setupStickyfill() {
  d3.selectAll(".sticky").each(function () {
    Stickyfill.add(this);
  });
}


function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      container: "#scroll",
      graphic: ".scroll__graphic",
      text: ".scroll__text",
      step: ".scroll__text .step",
      debug: false
    })
    .onStepEnter(handleStepEnter)
    .onContainerEnter(handleContainerEnter)
    .onContainerExit(handleContainerExit);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();