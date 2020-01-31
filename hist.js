let margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#myDiv")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get data
d3.csv("Admission_Predict.csv", function (data) {


    // make x scaling function and append x-axis
    let xScale = d3.scaleLinear()
        .domain([90, 125])
        .range([52, width]);
    svg.append('g')
        //.attr('id', 'x-axis')
        .attr('transform', 'translate(0,450)')
        .call(d3.axisBottom(xScale));

    /******************************************
    * HISTOGRAM SECTION
    ******************************************/

    // set parameters for our histogram function
    let histogram = d3.histogram(data)

        //console.log(data);
        // what value we want to count in our histogram
        .value(function (d) { return d["TOEFL Score"] })
        // the range of values from our data
        .domain(xScale.domain())
        // the number of bins (bars) we want in our histogram (roughly) 
        // learn more about bins here:
        // https://stackoverflow.com/questions/43380637/javascript-d3-histogram-thresholds-producing-wrong-number-of-bins
        // xScale.ticks(10) -> [0,10,20,...]
        .thresholds(xScale.ticks(14));

    // get our bins
    let bins = histogram(data);
    //console.log(d3.max(bins, function(d){ return d.length}));
    //console.log(bins)

    // make y-axis and y scaling function
    let yScale = d3.scaleLinear()
        .range([450, 0])
        .domain([0, d3.max(bins, function (d) { return d.length; })]);

    // figure out our max y value
    // below code is equivalent to:
    //let max = d3.max(bins, function (d) { return d.length })
    //let max = 0;
    // for (let i = 0; i < bins.length; i++) {
    //     if (bins[i].length > max) {
    //         max = bins[i].length
    //     }
    // }
    //console.log(max)


    let yAxis = d3.axisLeft(yScale)

    svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', 'translate(50,0)')
        .call(yAxis)

    // append bars of histogram
    svg.selectAll('.rect')
        .data(bins) // use the bins data 
        .enter()
        .append('rect')
        // x and y determine the upper left corner of our rectangle

        // d.x0 is the lower bound of one bin
        .attr('x', function (d) { return xScale(d.x0) })
        // d.length is the count of values in the bin
        .attr('y', function (d) { return yScale(d.length) })
        .attr('width', function (d) { return xScale(d.x1) - xScale(d.x0) })
        .attr('height', function (d) { return 450 - yScale(d.length) })
        .attr('fill', 'steelblue')
        .attr('stroke', 'white')

    //console.log(yScale(bins[0].length))

    // *********************************************************

    // function calcBinAvg(numberOfBins) {

    //     let increment = (highest_TOEFL_Score - Lowest_TOEFL_Score) / (numberOfBins)

    //     for (i = 0; i < numberOfBins; i++) {

    //     }
    //----------------------
    // let toeflScores = [];
    // for(i = 0; i < data.length; i++){
    //     toeflScores.push(data[i]["TOEFL Score"]);
    // }

    // let temp =  (Math.max(...toeflScores) - Math.min(...toeflScores)) / 15 ;

    // for (i = Math.min(...toeflScores); i < Math.max(...toeflScores); i += temp){
        
    // }


    // get the ramges for all the different bins
    // each range should have a corresponding array? 
    // loop thru toefl scores array and compare each score to the bin ranges, placing it in its proper array
    // calculate array avgs
    // display those avgs in the tooltip

    })


