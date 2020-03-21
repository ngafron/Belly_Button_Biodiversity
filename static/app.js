function buildMetadata(data) {

    d3.json("samples.json").then(function(data) {

        var metaData = data.metadata;
        // console.log(metaData[0]['wfreq']);

        var panel = d3.select("#sample-metadata");

        var wfreq = [];

        panel.html("");

        Object.entries(metaData).forEach(([key, value]) => {
            var row = panel.append("p");
            row.text(`${key}: ${value}`);
        });
    });
};

function buildCharts(sample) {
    //build bubble chart
    d3.json("samples.json").then((data) => {
        console.log(data);
        console.log(`${sample}`);
        var samples = data.samples;

        for (var i = 0; i < samples.length; ++i) {
            if ((data.samples[i].id) === (`${sample}`)) {
                ids = data.samples[i];
                console.log(ids);
                //save arrays
                var otu_ids = ids.otu_ids;
                var sample_values = ids.sample_values;
                var otu_labels = ids.otu_labels;

                //slice for top ten of each
                var otu_ids_10 = otu_ids.slice(0, 10);
                var sample_values_10 = sample_values.slice(0, 10);
                var otu_labels_10 = otu_labels.slice(0, 10);

                // log some data
                console.log(otu_ids_10);
                console.log(otu_labels_10);
                console.log(sample_values_10);

                //build trace and data
                var trace1 = {
                    x: sample_values_10,
                    y: otu_ids_10,
                    mode: "markers",
                    orientation: 'h',
                    text: otu_labels_10,
                    width: 25,
                    type: 'bar'
                };
                var data1 = [trace1];

                //build bubble plot layout
                var layout1 = {
                    showlegend: false,
                    title: `Top 10 OTU IDs for ${sample}`,
                    xaxis: {
                        title: "Value",
                    },
                    yaxis: {
                        otu_ids_10

                    },
                };

                //plot bubble plot
                Plotly.newPlot("bar", data1, layout1); { break; }
            } else {
                console.log(`not correct sample. looking at next index ${data.samples[i+1].id}`);

            }

            //build pie chart with top ten entries (already sorted in response)
            //build data
            // var trace2 = {
            //     values: sample_values_10,
            //     labels: otu_ids_10,
            //     type: 'pie',
            //     text: otu_labels_10,
            //     textinfo: 'percent',
            //     hoverinfo: 'label+text+value+percent'
            // };
            // var data2 = [trace2];

            // //build layout
            // var layout2 = {
            //     title: `Top Ten Measurements for Sample ${ids}`,
            // };

            // //build plot
            // Plotly.newPlot("pie", data2, layout2);

        };
    });
};
//function to initiate plots
function init() {
    d3.json("samples.json").then(function(data) {
        var names = data.names;
        //grab a reference to the dropdown select
        var selector = d3.select("#selDataset");

        //use the list of sample names to populate the select options
        names.forEach((sample) => {
            selector.append("option").text(sample).property("value", sample);
        });

        //use the first sample from list to build the initial plots
        const firstSample = names[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);

    });
};
//function to change charts when a new sample is selected
function optionChanged(newSample) {
    console.log(`sample changed to ${newSample}`);
    //fetch new data and build charts
    buildCharts(newSample);
    buildMetadata(newSample);
};

init();