
var img_per_row = 32;
var opacity = 0.25;

function highlightDot(idInfo){

    function setParent(el, newParent) {
        newParent.appendChild(el);
    }

    index_viz_data.forEach(function(d) {
        if (idInfo==d["guid"]) {
            svg.select('#dot_'+d["guid"])
            .style("fill", function(d) { return d3.rgb(255, 0, 0); })
            .style("opacity", 1.0)
            .attr("r", 10);
            
            var dot = document.getElementById('dot_'+d["guid"] );
            if (dot!=null){
                setParent(dot, document.getElementById('svg_dots_front'));
            }
        } else {
            svg.select('#dot_'+d["guid"])
            .style("fill", function(d) { return d3.rgb(0, 0, 0); })
            .style("opacity", opacity)
            .attr("r", radius);
            
            var dot = document.getElementById('dot_'+d["guid"] ); 
            if (dot!=null){
                setParent(dot, document.getElementById('svg_dots_back')); 
            }            
        }
    });
    

    
    
    /*
    svg.selectAll("svg_dots").sort(function (a, b) { // select the parent and sort the path's
      if (a.id != idInfo) return -1;               // a is not the hovered element, send "a" to the back
      else return 1;                             // a is the hovered element, bring "a" to the front
  });*/
}



function showDiv(idInfo) {
    //alert(idInfo);
    var sel = document.getElementById('large_wrapper').getElementsByTagName('div');
    for (var i=0; i<sel.length; i++) {sel[i].style.display = 'none'; }
    document.getElementById('large_image_'+idInfo).style.display = 'block';
}


// SELECT
var selNodeY = document.createElement('select');
selNodeY.id = 'y_axis_select'; selNodeY.name = 'y_axis_select'; 
var selNodeX = document.createElement('select');
selNodeX.id = 'x_axis_select'; selNodeX.name = 'x_axis_select'; 

var n = 0;
index_viz_meta['plot_keys'].forEach(function(d) {  
    var optionNode = document.createElement("option");
    optionNode.setAttribute("value", d);
    optionNode.innerHTML = d;
    selNodeX.appendChild(optionNode);
    
    var optionNode = document.createElement("option");
    optionNode.setAttribute("value", d);
    optionNode.innerHTML = d;
    if (n==1){optionNode.selected = true;}
    selNodeY.appendChild(optionNode);
    n = n+1;
});

document.getElementById('y_axis_drop_wrapper').appendChild(selNodeY);
document.getElementById('x_axis_drop_wrapper').appendChild(selNodeX);



var thumbWrapNode = document.getElementById('thumb_wrapper');
var largeWrapNode = document.getElementById('large_wrapper');
var rowdivNode = document.createElement("div");
rowdivNode.className = "row";
var n = 0;
index_viz_data.forEach(function(d) {

    //THUMB
    var anchorNode = document.createElement('a');
    anchorNode.onclick = function(){showDiv(d["guid"])};
    anchorNode.onmouseover = function(){highlightDot(d["guid"])};
    
    var imgNode = document.createElement("img");
    imgNode.src = "../img_1024/"+d['filename_th'];
    imgNode.className = "thumb";
    anchorNode.appendChild(imgNode);
    
    anchorNode.title = "title";
    anchorNode.href = "#";
    rowdivNode.appendChild(anchorNode);
    
    if ((n>0)&&(n%img_per_row==0)){
        thumbWrapNode.appendChild(rowdivNode);
        rowdivNode = document.createElement("div");
        rowdivNode.className = "row";
    }
    
    
    //LARGE
    var divNode = document.createElement("div");
    divNode.id = "large_image_"+d["guid"];
    divNode.style.display = "none";

    var imgNode = document.createElement("img");
    imgNode.src = "../img_1024/"+d['filename'];
    imgNode.className = "large_image";
    divNode.appendChild(imgNode);
        
    var tableNode = document.createElement("table");
    for (var key in d) {
        var tr = document.createElement('tr');   

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        var text1 = document.createTextNode(key);
        var text2 = document.createTextNode(d[key]);
        
        if (key=="other-tags"){
            if (typeof d[key] !== "undefined"){
                //d[key].replace(","," ", -1)
                text2.data = ( text2.data.replace(/,/g ," ") );
            }
        }
        
        td1.appendChild(text1);
        td2.appendChild(text2);
        tr.appendChild(td1);
        tr.appendChild(td2);

        tableNode.appendChild(tr);        
    }
    divNode.appendChild(tableNode);
    
    largeWrapNode.appendChild(divNode);
    
    n = n+1;
});

/*

<select id="y_axis_select" name="y_axis_select">
    <option value ="sepalWidth" selected>s width</option>
    <option value ="sepalLength">s length</option>
    <option value ="petalLength">p length</option>
</select>​


<a href="#" onclick="showDiv('00000');return false">
<img class="thumb" src="img_1024/00000_th.jpg">
</a>
    

    
    
<div id="large_image_00000" style="display:none;">
<img class="large_image" src="img_1024/00000.jpg">

<table>
<tr>
<td></td>
<td>
<a class="img_id_link" href="http://iconosquare.com/p/911769247024270180_236415113" target="_blank">00000</a>
</td>
</tr>

<tr><td>keyword</td><td>coffeecup</td></tr>
<tr><td>retrieved</td><td>Mon, 02 Feb 2015 21:23:04 +0000</td></tr>
<tr><td>tags</td><td>life, cupoftea, bigalowe, tea, kingandprince, coffeecup, goldenisles, shell, ssi, collection, home, teatime, island, destination, vacation, afternoon</td></tr>
<tr><td>post-date</td><td>1.09 pm 2/2/2015</td></tr>
<tr><td>type</td><td>Instagram</td></tr>
<tr><td>rgb-avg</td><td>[122, 108, 105]</td></tr>

</table>

</div>
    
    */
    
    