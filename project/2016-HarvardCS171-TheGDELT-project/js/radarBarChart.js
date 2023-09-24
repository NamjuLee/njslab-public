
BarChart = function(_parentElement, _data, _index){
    this.parentElement = _parentElement;
    this.data = _data;
    this.displayData = this.data;
    this.index = _index; // see data wrangling

    // DEBUG RAW DATA
    console.log(this.displayData);

    this.initVis();
};

BarChart.prototype.initVis = function(){
    var vis = this;

    vis.width = 400;
    vis.height = 300;
    vis.margin =  {top: 100, right: 20, bottom:100, left: 20};

    vis.color = ["#CC333F","#00A0B0","#EDC951"];


    //Initiate the radar chart SVG
    vis.svg = d3.select(vis.parentElement).append("svg")
        .attr("width",  vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .attr("class", "bar"+vis.parentElement);

    //Append a g element
    vis.g = vis.svg.append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    // Scales and axes
    vis.x = d3.scale.ordinal()
        .domain(["USA", "China", "Russia", "Germany", "UK", "Japan", "France"])
        .rangeBands([0, width]);


    vis.y = d3.scale.linear()
        .range([vis.height, 0]);

    vis.xAxis = d3.svg.axis()
        .scale(vis.x)
        .orient("bottom")
        .tickValues(["USA", "China", "Russia", "Germany", "UK", "Japan", "France"]);


    vis.yAxis = d3.svg.axis()
        .scale(vis.y)
        .orient("left");

    vis.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.height + ")")
        .call(vis.xAxis);

    vis.svg.append("g")
        .attr("class", "y-axis axis")
        .call(vis.yAxis);


    vis.svg.append("text")
        .attr("class", "bar-label")
        .attr('text-anchor', 'middle')
        .text("More Positive")
        .attr("transform", "translate(3,50)rotate(90)");


    // TO-DO: (Filter, aggregate, modify data)
    vis.wrangleData();

};

BarChart.prototype.wrangleData = function(){
    var vis = this;

    vis.displayData = vis.data[vis.index];

    vis.updateVis();
};

BarChart.prototype.updateVis = function(){
    var vis = this;

    vis.padding = 25;

    vis.y.domain([4, 0]);

    // Call axis functions with the new domain
    //vis.svg.select(".x-axis").transition().duration(800).call(vis.xAxis);
    //vis.svg.select(".y-axis").transition().duration(800).call(vis.yAxis);

    vis.rect = vis.svg.selectAll("rect")
        .data(vis.displayData);

    vis.rect
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr("opacity", 0)
        .attr('y', vis.height)
        .attr('height', 0)
        .transition()
        .duration(800)
        .attr("opacity", 0.7)
        .attr("height", function(d, i){
            return vis.y(d.value);
        })
        .attr('y', function(d, i){
            return vis.height - vis.y(d.value);
        });

    vis.rect
        .attr('x', function(d, i){
            return i*(vis.width/7) + vis.padding/2;
        })

        .attr("width", (vis.width/7) - vis.padding)
        .style("fill", vis.color[vis.index])
        .on('mouseover', function (){
            d3.select(this).style("opacity", 0.3);
        })
        .on('mouseout', function(){
            d3.select(this).style("opacity", 0.7);
        });




};