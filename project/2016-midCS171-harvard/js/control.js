
// this js is about controling and communication between JS and HTML.

ExecuteIntro()
bootstrapBTEvent();
ThridChartEvent();
// first vis interaction
function bootstrapBTEvent(){
	$("#selection_01").on("change", function(d) {
		var selBox = document.getElementById('selection_01');
		var selValue = selBox.options[selBox.selectedIndex].value;
		sortingkeyword = selValue;
		visUpdate(sortingkeyword)
	});
};

// thrid vis interaction
function ThridChartEvent(){
	Fundtype();
	startTimeBTEvent();
	endTimeBTEvent();
}

function Fundtype(){
	$("#popUp2").on("change", function(d) {
		var selBox = document.getElementById('popUp2');
		var selValue = selBox.options[selBox.selectedIndex].value;
		fundtype = selValue;
		updateDataThird()
	});

};

function startTimeBTEvent(){
	$("#startTime").on("change", function(d) {
		var selBox = document.getElementById('startTime');
		var selValue = selBox.options[selBox.selectedIndex].value;
		startTime = +selValue;
		updateDataThird()
	});

};

function endTimeBTEvent(){
	$("#endTime").on("change", function(d) {
		var selBox = document.getElementById('endTime');
		var selValue = selBox.options[selBox.selectedIndex].value;
		endTime = +selValue;
		updateDataThird()
	});

};

// remove the first image slider div
var removeSl = function(){
	var item = document.getElementById('intro')
	var bg = document.getElementById('bg')
	if (!item) return;
	item.parentNode.removeChild(item);
	if (!bg) return;
	bg.parentNode.removeChild(bg);
	$("body").css("overflow", "visible");
};

// execute intro slider, based on the window size
function ExecuteIntro()
{
	var intro = document.getElementById('intro');
	var container = document.getElementById('titleDiv')
	var theTop = (window.innerHeight / 2) - 300;
	var theLeft = (window.innerWidth / 2) - 400;
	intro.style.top = theTop + "px"
	intro.style.left = theLeft + "px"
	$("body").css("overflow", "hidden");
}

window.addEventListener("resize", function(){
	ExecuteIntro()
});

