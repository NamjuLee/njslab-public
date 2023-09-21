

// reference : http://bl.ocks.org/d3noob/8375092

var margin2 = {top: 40, right: 40, bottom: 60, left: 240};

var width2 = 700 - margin2.left - margin2.right,
	height2 = 400 - margin2.top - margin2.bottom;

var i = 0, duration = 750;

// second vis svg
var svg2 = d3.select("#chart-area02").append("svg")
		.attr("width", width2 + margin2.left + margin2.right)
		.attr("height", height2 + margin2.top + margin2.bottom)
		.append("g")
		.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

// tree graph function 
var tree = d3.layout.tree()
				    .size([height2, width2]);

var diagonal = d3.svg.diagonal()
					.projection(function(d) { return [d.y, d.x]; });


var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

// data import
var malariaParasitesData;
queue()
	  .defer(d3.json, "data/malaria-parasites.json")
	  .defer(d3.csv, "data/global-malaria-2015.csv")
	  .await(function(error, malariaParasites, malariaDataCsv){
		malariaParasitesData = malariaParasites[0];
		malariaParasitesData.x0 = height / 2;
		malariaParasitesData.y0 = 0;
	    updateVis2(malariaParasitesData);
  });


// second vis update
d3.select(self.frameElement).style("height", "500px");    
function updateVis2(source){
	// Compute the new tree layout.
 	var nodes = tree.nodes(malariaParasitesData).reverse(),
	  	links = tree.links(nodes);
	// Normalize for fixed-depth.
	nodes.forEach(function(d) { d.y = d.depth * 180; });
	
	// Update the nodes…
  	var node = svg2.selectAll("g.node")
	  					  .data(nodes, function(d) { 
	  					  	return d.id || (d.id = ++i); 
	  					  });

  // Enter any new nodes at the parent's previous position.
	var nodeEnter = node.enter().append("g")
						  .attr("class", "node")
						  .attr("transform", function(d) { 
						  	return "translate(" + source.y0 + "," + source.x0 + ")"; 
						  })
						  .on("click", click);

	nodeEnter.append("circle")
						  .attr("r", 1e-6)
						  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

	nodeEnter.append("text")
						  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
						  .attr("dy", ".35em")
						  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
						  .text(function(d) { return d.name; })
						  .style("fill-opacity", 1e-6);


	// Transition nodes to their new position.
	var nodeUpdate = node.transition()
		  		    	 .duration(duration)
				    	 .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle").attr("r", 10).style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text").style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
	  					   .duration(duration)
	  					   .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  					   .remove();

    nodeExit.select("circle").attr("r", 1e-6);
    nodeExit.select("text").style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg2.selectAll("path.link")
	 				.data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
					  .attr("class", "link")
	  				  .attr("d", function(d) {
						var o = {x: source.x0, y: source.y0};
						return diagonal({source: o, target: o});
	  				   });

	// Transition links to their new position.
	link.transition().duration(duration)
		  			  .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
  	link.exit().transition()
			  .duration(duration)
			  .attr("d", function(d) {
				var o = {x: source.x, y: source.y};
				return diagonal({source: o, target: o});
	  		   })
	  		  .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
			   d.x0 = d.x;
			   d.y0 = d.y;});


}; // end updateVis


// Toggle children on click.
function click(d) {
  	if (d.children) {
		d._children = d.children;
		d.children = null;
  	} else {
		d.children = d._children;
		d._children = null;
  	}
  updateVis2(d);
}



