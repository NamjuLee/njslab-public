/*
 * Timeline - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the
 */

Timeline = function(_parentElement, _data) {
    this.parentElement = _parentElement;
    this.data = _data;

    // No data wrangling, no update sequence
    this.displayData = [];

    this.initVis();
};


/*
 * Initialize area chart with brushing component
 */

Timeline.prototype.initVis = function(){
    var vis = this; // read about the this

    vis.formatDate = d3.time.format("%Y%m%d");
    vis.formatDate2 = d3.time.format("%b %d");

    vis.nestedData = d3.nest().key(function(d){return d.DATE;}).entries(this.data);
    for (var i = 0; i < vis.nestedData.length; i++){
        var temp = {
            DATE: vis.formatDate.parse(vis.nestedData[i].key),
            ARTICLES: d3.sum(vis.nestedData[i].values, function(d) { return d.NUMARTS; })
        };
        //console.log(temp);
        vis.displayData.push(temp);

    }
    console.log(vis.displayData);

    vis.margin = {top: 30, right: 30, bottom: 30, left: 30};

    vis.width = 1150 - vis.margin.left - vis.margin.right,
        vis.height = 100 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    // Scales and axes
    vis.x = d3.time.scale()
        .range([0, vis.width])
        .domain(d3.extent(vis.displayData, function(d) { return d.DATE; }));

    vis.y = d3.scale.linear()
        .range([vis.height, 0])
        .domain([0, d3.max(vis.displayData, function(d) { return d.ARTICLES; })]);

    vis.xAxis = d3.svg.axis()
        .scale(vis.x)
        .orient("bottom");


    // SVG area path generator
    vis.area = d3.svg.area()
        .x(function(d) { return vis.x(d.DATE); })
        .y0(vis.height)
        .y1(function(d) { return vis.y(d.ARTICLES); });

    vis.svg.append("path")
        .datum(vis.displayData)
        .attr("fill", "#ccc")
        .attr("d", vis.area);


    // TO-DO: Initialize brush component

    // scale function
    vis.timeScale = d3.time.scale()
        .domain(d3.extent(vis.displayData, function(d) { return d.DATE; }))
        .range([0, vis.width])
        .clamp(true);


    // initial value
    var startingValue = new Date('2016-04-21');

    //////////

    // defines brush
    vis.brush = d3.svg.brush()
        .x(vis.timeScale)
        .extent([startingValue, startingValue])
        .on("brush", function(d){
            var value = vis.brush.extent()[0];

            if (d3.event.sourceEvent) { // not a programmatic event
                value = vis.timeScale.invert(d3.mouse(this)[0]);
                vis.brush.extent([value, value]);
            }

            vis.handle.attr("transform", "translate(" + vis.timeScale(value) + ",0)");
            vis.handle.select('text').text(vis.formatDate2(value));

            })
        .on("brushend", function(d){
            var value = vis.brush.extent()[0];

            if (d3.event.sourceEvent) { // not a programmatic event
                value = vis.timeScale.invert(d3.mouse(this)[0]);
                vis.brush.extent([value, value]);
            }

            var mydate =  value.getFullYear() + ("0" + (value.getMonth() + 1)).slice(-2) + ("0" + value.getDate()).slice(-2);
            stationMap.date = mydate;
            stationMap.map.removeLayer(stationMap.events);
            stationMap.wrangleData();
            console.log(mydate);
        });

    vis.svg.append("g")
        .attr("class", "x axis")
        // put in middle of screen
        .attr("transform", "translate(0," + vis.height + ")")
        // introduce axis
        .call(d3.svg.axis()
            .scale(vis.timeScale)
            .orient("bottom")
            .tickFormat(function(d) {
                return vis.formatDate2(d);
            })
            .tickSize(0)
            .tickPadding(12)
            .tickValues([vis.timeScale.domain()[0], vis.timeScale.domain()[1]]))
        .select(".domain")
        .select(function() {
            console.log(this);
            return this.parentNode.appendChild(this.cloneNode(true));
        })
        .attr("class", "halo")
        .style("fill", "grey")
        .style("stroke", "grey")
        .style("stroke-width", "4px")
        .style("stroke-linecap", 'round')

    vis.slider = vis.svg.append("g")
        .attr("class", "slider")
        .call(vis.brush);

    vis.slider.selectAll(".extent,.resize")
        .remove();

    vis.slider.select(".background")
        .attr("height", vis.height);

    vis.handle = vis.slider.append("g")
        .attr("class", "handle");

    vis.handle.append("path")
        .attr("transform", "translate(0," + vis.height / 2 + ")")
        .attr("d", "M 0 -20 V 20")
        .style("stroke", "grey")
        .style("stroke-width" ,"3px")
        .style("stroke-linecap", "round")
        .style("pointer-events", "none");

    vis.handle.append('text')
        .text(startingValue)
        .attr("transform", "translate(" + (-18) + " ," + (vis.height / 2 - 25) + ")")
        .style("fill", "grey")
        .style("text-align" ,"center")
        .style("font-size", "18px");

    vis.slider
        .call(vis.brush.event);

};




