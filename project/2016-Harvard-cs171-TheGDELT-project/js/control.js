

var p1 = d3.select("#left").append("h2")

// p1.text("content")
//    .style("color" , "white")
//    .style("font-size", "12px")
//    .style("text-align", "center")
//    .on("click", function(){
//    		console.log("dddd!!!!d");
//    		newDiv();
//    });





function newDiv(){
	$('#window1').animate({
	  //top:200,
	  //left:500
	  //opacity:1.0;
	  // z-index: 10;
	});
}


var removeSl = function(){
	var item = document.getElementById('introBG')

	if (!item) return;
	item.parentNode.removeChild(item);

	// console.log(item);
	// item.onmouseclick = function(){
	// 	console.log("dd");
	// };
};




var bgContent = function(){
	$('#window1').animate({
	  top:200,
	  left:500
	  //opacity:1.0;
	  // z-index: 10;
	});
}




function KTown() {
    map.fitBounds([[ -73.986776, 40.747711 ], 
    		       [ -73.98856038387356, 40.74848702392311 ]]);
}

function CTown() {
    map.fitBounds([[ -73.999400, 40.717580 ], 
    			   [ -73.99026077805598, 40.714412378493556 ]]);
}

function LittleItaly() {
    map.fitBounds([[ -73.997363, 40.719340 ], 
                   [ -73.98856038387356, 40.74848702392311 ]]);
    			   //[ -73.99026077805598, 40.714412378493556 ]]);
}

function LePetitSenegal() {
    map.fitBounds([[ -73.952585, 40.803251 ], 
                   [ -73.952220, 40.803061 ]]);
}