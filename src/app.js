import { myExampleUtil } from './utils';
import scrollama from "scrollama";
import vegaEmbed from 'vega-embed';
import * as d3 from "d3";
import './main.css';

// Source for Scrollama code and experimentation:
// https://codepen.io/aw207/pen/BXwVPa

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
    const fig = vegaEmbed("#vs", "./data/wb.vg.json", {
      renderer: 'svg', "actions": false
    }).catch(console.warn);

  } else if (response.index === 1) {
    d3.selectAll("path").interrupt();
    const fig = vegaEmbed("#vs", "./data/population.vg.json", {
      renderer: 'svg', "actions": false
    }).catch(console.warn);

  } else if (response.index === 2) {
    const fig = vegaEmbed("#vs", "./data/map1.vg.json", {
      renderer: 'svg', "actions": false
    }).catch(console.warn);

  } else if (response.index === 3) {
    const fig = vegaEmbed("#vs", "./data/map2.vg.json", {
      renderer: 'svg', "actions": false
    }).catch(console.warn);

  } else if (response.index === 4) {
    const fig = vegaEmbed("#vs", "./data/map3.vg.json", {
      renderer: 'svg', "actions": false
    }).catch(console.warn);

  } else if (response.index === 5) {
    const fig = vegaEmbed("#vs", "./data/map4.vg.json", {
      renderer: 'svg', "actions": false
    }).catch(console.warn);

  }

  handleResize();
}


function setupStickyfill() {
  d3.selectAll(".sticky").each(function () {
    Stickyfill.add(this);
  });
}


function init() {
  setupStickyfill();
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({

      step: "#scroll .scroll__text .step",
      debug: false
    })
    .onStepEnter(handleStepEnter);


  // setup resize event
  window.addEventListener("resize", handleResize);
}
const fig1 = vegaEmbed("#vend1", "./data/last1.vg.json", {
  renderer: 'svg', "actions": false
}).catch(console.warn);
const fig2 = vegaEmbed("#vend2", "./data/last2.vg.json", {
  renderer: 'svg', "actions": false
}).catch(console.warn);

// kick things off
init();