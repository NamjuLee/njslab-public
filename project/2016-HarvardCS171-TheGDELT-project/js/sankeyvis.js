// Sankey library from: 
// https://developers.google.com/chart/interactive/docs/gallery/sankey



// Global chart
var skchart;

// Will be used to the save the loaded JSON data
var skData = [];

// Will be used to the save the loaded JSON data
var skCountrycodes = [];
// Start application by loading the data
loadskData();

function loadskData() {
	d3.json("data/data.json", function(error, jsonData){
		if(!error){
			skData = jsonData;
		}
		d3.csv("data/codes.csv", function(d){
			if(!error){
				skCountrycodes = d;
				
				
			}
			var agent = d3.select('#agent')
			agent.selectAll('option')
				.data(skCountrycodes)
				.enter()
				.append('option')
				.attr('value', function(d){
					return d["CODE"];
				})
				.html(function(d){
					return d['LABEL'];
				});

			
			var recip = d3.select('#recip')
			recip.selectAll('option')
				.data(skCountrycodes)
				.enter()
				.append('option')
				.attr('value', function(d){
					return d["CODE"];
				})
				.html(function(d){
					return d['LABEL'];
				});	
			// console.log(agent);
			createskVis();
		})
	})
	
	

};

function cartesianProductOf() {
  return Array.prototype.reduce.call(arguments, function(a, b) {
    var ret = [];
    a.forEach(function(a) {
      b.forEach(function(b) {
        ret.push(a.concat([b]));
      });
    });
    return ret;
  }, [[]]);
}
console.log($('#agent'));

function createskVis(){
	google.charts.load('current', {'packages':['sankey']});
  	google.charts.setOnLoadCallback(drawskChart);
  
}

function getskRows(){

	if ($('#agent').val() == null ||$('#recip').val() == null ){
		var rows = [['USA', 'IND'], ['USA', 'CHN'], ['USA', 'BRA'],
				['RUS', 'IND'], ['RUS', 'CHN'], ['RUS', 'BRA']];
	}
	else{
		var rows = cartesianProductOf($('#agent').val(), $('#recip').val())
	}
	
	rows.forEach(function(d){
		var src = d[0];
		var trg = d[1];
		var actions = getActions(src, trg);
		d.push(actions);

	})
	return rows;
}

// function getRows(){
// 	var rows = [['United States', 'India'], ['United States', 'China'], ['United States', 'Brazil'],
// 				['Russia', 'India'], ['Russia', 'China'], ['Russia', 'Brazil']];
// 	rows.forEach(function(d){
// 		var src = getCode(d[0]);
// 		var trg = getCode(d[1]);
// 		var actions = getActions(src, trg);
// 		d.push(actions);

// 	})
// 	return rows;
// }

function skredraw(){
	// chart.clearChart();
	drawskChart();
}

function getCode(src){
	var obj = skCountrycodes.filter(function ( obj ) {
    	return  obj['FIELD2']== src;
	})
	return (obj[0]['FIELD1']);
};

function getActions(src, trg){
	if (src == trg){
		return 0;}
	else{
		var obj1 = skData.filter(function (d){
			return d['from_code'] == src;
		})
		
		var obj2 = obj1.filter(function (d){
			return d['to_code'] == trg;
		})
		
		if (obj2.length == 0){
			return 1;
		}
		else{
			return obj2[0]['count_actions'];
		}
	}
}

function drawskChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Actions');
    var rows = getskRows();
    // data.addRows([
    //   [ 'A', 'X', 5 ],
    //   [ 'A', 'Y', 7 ],
    //   [ 'A', 'Z', 6 ],
    //   [ 'B', 'X', 2 ],
    //   [ 'B', 'Y', 9 ],
    //   [ 'B', 'Z', 4 ]
    // ]);
	data.addRows(rows);
    // Sets chart options.
    var options = {
      width: document.getElementById('sankey_multiple').style.width,
    };

    // Instantiates and draws our chart, passing in some options.
    skchart = new google.visualization.Sankey(document.getElementById('sankey_multiple'));
    skchart.draw(data, options);
    
}
