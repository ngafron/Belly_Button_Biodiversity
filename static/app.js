function buildMetadata(sample) {
  d3.json("samples.json").then(data => {
    var metaData = data.metadata;
    var resultArray = metaData.filter(metaDataObj => metaDataObj.id == sample);
    console.log("resultArray: " + resultArray);
    var result = resultArray[0];

    var panel = d3.select("#sample-metadata");
    panel.html("");

    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

function buildCharts(sample) {
  //build bubble chart
  d3.json("samples.json").then(data => {
    console.log(data);
    console.log(`${sample}`);
    var samples = data.samples;

    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    console.log("resultArray: " + resultArray);
    var result = resultArray[0];

    //save arrays
    var otu_ids = result.otu_ids;
    var sample_values = result.sample_values;
    var otu_labels = result.otu_labels;

    //build trace and data
    var yticks = otu_ids
      .slice(0, 10)
      .map(otu_id => `OTU ${otu_id}`)
      .reverse();
    var barData = [
      {
        x: sample_values.slice(0, 10).reverse(),
        y: yticks,
        orientation: "h",
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar"
      }
    ];

    //build bar plot layout
    var barLayout = {
      showlegend: false,
      title: `Top 10 OTU IDs for ${sample}`,
      margin: { t: 30, l: 150 }
    };
    //plot bar plot
    Plotly.newPlot("bar", barData, barLayout);

    // build pie chart with top ten entries (already sorted in response)
    // build data
    var bubData = [
      {
        x: otu_ids.reverse(),
        y: sample_values.reverse(),
        orientation: "h",
        text: otu_labels.reverse(),
        mode: "markers",
        marker: {
          color: otu_ids.reverse(),
          size: sample_values.reverse()
        }
      }
    ];

    //build layout
    var bubLayout = {
      title: `Top Ten Measurements for Sample ${sample}`
    };

    //build plot
    Plotly.newPlot("bubble", bubData, bubLayout);
  });
}
//function to initiate plots
function init() {
  d3.json("samples.json").then(function(data) {
    var names = data.names;
    //grab a reference to the dropdown select
    var selector = d3.select("#selDataset");

    //use the list of sample names to populate the select options
    names.forEach(sample => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    //use the first sample from list to build the initial plots
    const firstSample = names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
//function to change charts when a new sample is selected
function optionChanged(newSample) {
  console.log(`sample changed to ${newSample}`);
  //fetch new data and build charts
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();
