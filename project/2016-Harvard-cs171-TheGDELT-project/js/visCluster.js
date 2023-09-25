
var maxval = -1;
var cnmargin = {top: 20, right: 10, bottom: 20, left: 10};
var cnwidth = 900 - cnmargin.left - cnmargin.right,
    cnheight = 480 - cnmargin.top - cnmargin.bottom;

var cncolor = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .size([cnwidth, cnheight]);

force.linkStrength(function(link) {
	//console.log((link.value/maxval));
	return Math.pow(link.value/maxval,2);
});

var cnsvg = d3.select("#cn_render").append("svg")
    .attr("width", cnwidth + cnmargin.left + cnmargin.right)
    .attr("height", cnheight + cnmargin.left + cnmargin.right)
    .append("g")
    .attr("transform", "translate(" + cnmargin.left + "," + cnmargin.top + ")");

var cnCountryCodes;
var ddata;

function loadDData() {
	d3.json("data/data.json", function(error, d) {
		if(error) throw error;
		ddata = d;
		//console.log(ddata);
		d3.csv("data/xcodes.csv", function(error,d){
			if(error) throw error;
			cnCountrycodes = d;
			//console.log(cnCountrycodes)
			var agent = d3.select('#cn_agents')
			agent.selectAll('option')
				.data(cnCountrycodes)
				.enter()
				.append('option')
				.attr('value', function(d){
					return d["ISO 3166-1 3 Letter Code"];
				})
				.html(function(d){
					return d["Common Name"];
				});
			createClusternet();
		});
	});
}
function getCountryName(countryCode) {
	return cnCountrycodes.find(function(d){return d["ISO 3166-1 3 Letter Code"] == countryCode;})["Common Name"];
}
function getCountryShortCode(countryCode) {
	return cnCountrycodes.find(function(d){return d["ISO 3166-1 3 Letter Code"] == countryCode;})["ISO 3166-1 2 Letter Code"];
}
function createClusternet() {
	cnsvg.selectAll("*").remove();
	maxval = -1;
	var cvals;
	if ($('#cn_agents').val() == null){
		cvals = ["AUS","AUT","BEL","CAN","CHL","CZE","DNK","EST","FIN","FRA","DEU","GRC","HUN","ISL","IRL","ISR","ITA","JPN","KOR","LUX","MEX","NLD","NZL","NOR","POL","PRT","SVK","SVN","ESP","SWE","CHE","TUR","GBR","USA","ARG","BRA","CHN","IND","IDN","RUS","SAU","ZAF"];
	} else {
		cvals = $('#cn_agents').val();
	}
	console.log(cvals);

	var ndata = {};
	ndata.nodes=[];
	ndata.links=[];
	var carr = [];
	var ddic = {};
	
	//==================
	
	for(var i = 0; i < ddata.length; i++) {
		ddatum = ddata[i];
		if(cvals.indexOf(ddatum["from_code"])<0 || cvals.indexOf(ddatum["to_code"])<0) { 
			continue;
		}
		//console.log(ddatum);
		var cf = carr.indexOf(ddatum["from_code"]);
		var ct = carr.indexOf(ddatum["to_code"]);
		if(cf<0) {
			carr.push(ddatum["from_code"]);
			ndata.nodes.push({"name":ddatum["from_code"]});
			cf = carr.length-1;
		}
		if(ct<0) {
			carr.push(ddatum["to_code"]);
			ndata.nodes.push({"name":ddatum["to_code"]});
			ct = carr.length-1;
		}
		if(cf < ct) {
			ca = ""+cf;
			cb = ""+ct;	
		} else {
			ca = ""+ct;
			cb = ""+cf;
		}
		if(ca in ddic) {
			if(cb in ddic[ca]) {
				ddic[ca][cb] = ddic[ca][cb] * ddatum["count_actions"];
			} else {
				ddic[ca][cb] = ddatum["count_actions"];
			}
		} else {
			ddic[ca] = {};
			ddic[ca][cb] = ddatum["count_actions"];
		}
	}
	console.log(ndata.nodes)
	for(var ca in ddic) {
		for(var cb in ddic[ca]) {
			ndata.links.push({"source":parseInt(ca),"target":parseInt(cb),"value":ddic[ca][cb]});
			if(ddic[ca][cb] > maxval) {
				maxval = ddic[ca][cb];
			}
		}
	}
	console.log(ndata.links)
	
	
	//==================

  force
      .nodes(ndata.nodes)
      .links(ndata.links)
      .start();

  var link = cnsvg.selectAll(".cnlink").data(ndata.links)
  link.exit().remove();
  link.enter().append("line")
      .attr("class", "cnlink")
      .style("stroke-width", function(d) { return 10*d.value/maxval; });
  link.append("title")
      .text(function(d) { return Math.round(d.value*10000/maxval)/100+"%"; });

  var node = cnsvg.selectAll(".cnnode").data(ndata.nodes)
  node.exit().remove();
  node.enter().append("g")
      .attr("class", "cnnode")
      .call(force.drag);
  node.append("circle")
      .attr("r", 10)
      .attr("x", 0)
      .attr("y", 0)
      .style("fill", "#9EAEB3");
  node.append("image")
      .attr("xlink:href", function(d) { return "flags/"+getCountryShortCode(d.name).toLowerCase()+".png";})
      .attr("x", -11)
      .attr("y", -7)
      .attr("width", 22)
      .attr("height", 14);
/*  node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; })*/

  node.append("title")
      .text(function(d) { return getCountryName(d.name); });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
}

loadDData();
