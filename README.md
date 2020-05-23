Belly Button Biodiversity

Description:
- Build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

- Utilize a D3 library to read through the JSON file.
- Utilizing JavaScript, create a horizontal bar chart and bubble chart to display the samples.
- Show the metadata of the sample in a side panel with a dropdown menu.
- Display the charts and information on a webpage created with HTML and CSS. 

```
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
```
