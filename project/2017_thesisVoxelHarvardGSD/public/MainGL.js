

DropFileInit()




var myCanvas = new GLWindow("div3d");
var t = 0;
var fileLoad = true;


myCanvas.Update = function(){
    if(t == 0) myCanvas.Setup();
    else myCanvas.Render();
    t++;
}

myCanvas.Setup = function(){
    console.log("webDrawing init!!!");
    ////////////////////////////////////////////// setup here

    var cubegeometry = new THREE.BoxGeometry(5.2,10,0.02);
    var cubematerial = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0xffffff, shininess: 30, shading: THREE.FlatShading } );

    var mouseCube = new THREE.Mesh( cubegeometry, cubematerial );
    this.Add(mouseCube)




}
myCanvas.Render = function(){
    let self = this
    this.RemoveAll(); // this.RemoveAllEntity();
    // console.log("webDrawing Render!!!");
    ////////////////////////////////////////////// render here



    var cubegeometry = new THREE.BoxGeometry(5.2 ,10 / (t * 0.01), t * 0.1);
    var cubematerial = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0xffffff, shininess: 30, shading: THREE.FlatShading } );

    var mouseCube = new THREE.Mesh( cubegeometry, cubematerial );
    // mouseCube.name = "dd"
    mouseCube.position.set( t * 0.1 , t * 0.1 , 0);

    // mouseCube.postion = vec;
    this.Add(mouseCube);

    // console.log(mouseCube.name)
    // this.Remove(mouseCube);


    // this.RemoveAll();



    // var pl = new NPolyline();
    // pl.Add(0,0,0)
    // pl.Add(0,0,3)
    // pl.Add(0,1,1)
    // pl.Add(5,0,0)
    // this.Add(pl.AddToLocalScene());



    // var scale = 0.002 * t;
    // console.log(scale);
    // var np01 = new NPolyline();
    //   np01.Add(new NVector(0,0,0));
    //   np01.Add(new NVector(10,20,0));
    //   np01.Add(new NVector(0.1 * t,10,0));
    //   np01.Add(new NVector(5,20,0));
    //   np01.Add(new NVector(9,9,0));

    //   np01.opacity = scale;
    //   np01.color = 0xff0000 


    // this.Add(np01.AddToLocalScene());


    // var np02 = new NPolyline();
    //   np02.Add(new NVector(0, * 5,0));
    //   np02.Add(new NVector(10,scale* 5,0));
    //   np02.Add(new NVector(10,scale* 5,10));
    //   np02.Add(new NVector(0,scale* 5,10));

    // this.Add(np02.AddToLocalScene());




    // var p = new NVector(5,0,0)
    // this.Add(p.AddToLocalScene());

    // var pts = [];
    // var x = 5
    // var y = 5
    // for (var j = 0 ; j < y; ++j) {
    //     for (var i = 0 ; i < x; ++i) {
    //         // pts.push(modeling.entities.point([i *spacingX, j * spacingY, 0 ]) );
    //         var p = new NVector(i,0,j)
    //         this.Add(p.AddToLocalScene());
    //     };
    // };
    // return pts;


    //var theTest = new UmiBuilding();
    //theTest.Build();

    // var pcRegular = generateRegularPointcloud( new THREE.Color( 1,0,1 ), 10, 10 );
    // pcRegular.scale.set( 10,10,10 );
    // pcRegular.position.set( -5,0,-5 );
    // this.Add( pcRegular );

    // console.log(this.objects.length)

    // console.log(t);
    // if(t > 100 & fileLoad){

    // console.log("this is the line");
    // console.log(this);
    //    var theModel =  new ModelJson("/chair.json", self);
    //    fileLoad = false
    //    console.log(theModel);
    //    this.Add(theModel.GetMesh());
    // }
    //ModelJson

}











// var ddd = document.getElementById('GLWindow'); 
// console.log(ddd);
// ddd.addEventListener('dragover', handleDragOver, false);
// ddd.addEventListener('drop', handleFileSelect, false);
// function handleDragOver(evt) {
//     evt.stopPropagation();
//     evt.preventDefault();
//     evt.dataTransfer.dropEffect = 'copy';
// }
// function handleFileSelect(evt){ 
//     evt.stopPropagation();
//     evt.preventDefault();

    // var file = evt.target.files;
    // // console.log(JSON.stringify(evt))

    // var obj = evt.dataTransfer.files[0].name;
    //       console.log("------------------------------------------------------------"); 
    // console.log(file)

    //   console.log("------------------------------------------------------------"); 
    // $.getJSON( obj , function( result ){
    //     alert(result.start.count);
    // });

     //  var file = evt.dataTransfer.files[0],
     //  reader = new FileReader();
     //  reader.onload = function (event) {
     //  console.log(event.target);
     // //holder.style.background = 'url(' + event.target.result + ') no-repeat center';
     //  };
     //  console.log(file);
     //  var aa = JSON.stringify(reader.readAsBinaryString(file));
     //  console.log(aa);
     //  console.log("------------------------------------------------------------"); 


    // var new_zip = new JSZip();
    // new_zip.loadAsync(file[0]).then(function (zip) {
    //     zip.files["sdl-common/project.json"].async('string').then(function (fileData) {
    //         var obj = JSON.parse(fileData)
    //         data.push(obj) // These are your file contents
    //         designs.push(obj.projectName)
    //         output.innerHTML = String(designs);

    //         // web gl
    //         DrawBuilding(obj);

    //         makeChart()
    //         })
    //     })


//}   

// ddd.addEventListener( 'drop', onWindowResize, false);



