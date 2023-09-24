//..................initialize required modules
var express = require('express');
var app=express();
var http=require('http');

//map exrress default file folder to the subfolder /public under the folder that contains app.js [__dirname]
app.use(express.static(__dirname + '/public'));


//start the server listening at port 6789 when running locally or to the default remote port when deploying online
var server = app.listen(process.env.PORT || 5555, function() {
    console.log('Listening on port %d', server.address().port);
});

//................................Socket.io
//initialize socket.io to listen to the same server as express
var io = require('socket.io').listen(server);

//create an empty list of objects. Here we will store each 3d object in order for the server to act as a persistent storage. Even if all clients disconnect the server will still have a record of the created geometry
var objects={};
//this is a counter. Each time a new tripod is added to the server it gets this unique id that increases by one. Therefore each tripod has a unique identifying number. The clients receive this number for each object from the server so that for example when a client deletes an object it can ask the server to delete the object with the same id 
var id=1;

//each time a client is connected to socket.io this callback function is run
//within this functio nwe can set up the message listeners for the connections from each client
io.sockets.on('connection', function (socket) {
  console.log("CONNECTION");

  //when a client disconnects this message is received
  socket.on('disconnect', function(){
      console.log("disconnect");
  });

  //......................................................custom messages
  //these are the messages we receive from the clients. For each message we setup a callback function that processes the data of the message and possibly replies to one or all the connected clients

  //a client sends this message when it needs to add a new model
  //the data contain just the transformation matrix of the object that the client wants to add
  socket.on('addTripod', function(data){ 


    console.log("add works");
    socket.emit('hi', data);
    io.sockets.emit('GH1', data); 
    //we attach a unique id to the data
    data.id=id;
    //store the data to our objects storage. We store objects by their id so that we can find them easily later
    objects[id]=data;

    //increase the id. Therefore the next object to be added will get a new unique id number
    id++;

    //emit the data to all connected clients so that they are all notified and create the newly added geometry. these data now contains both the matrix and the id of the newly added element
    io.sockets.emit('addTripod', data);

    //here we can limit the number of elements we store. Each time we add a new object and the object storage has more than 15 elements we remove the earliest added element and notify all clients to remove it too.
    if (Object.keys(objects).length>15) { //check if we have more than 15 elements in the objects storage
      
      var deadid=Object.keys(objects)[0];           //get the id of the first element in the storage
      io.sockets.emit('removeTripod', {id:deadid}); //notify all clients to remove element with id=deadid
      delete objects[deadid];                       //delete the element with id=deadid from the local storage

    }
  });

  //a client sends this message when it needs to remove a model
  socket.on('removeTripod', function(data){   
 
    delete objects[data.id];                //delete the object with the requested id from the storage
    io.sockets.emit('GH2', data); 
    io.sockets.emit('removeTripod', data);  //notify all clients that object was removed
  });

  //a client sends this message when they first connect in order to get all the existing models
  socket.on('getAll', function(data){   
 
    socket.emit('getAll', objects);  //simply send all the stored objects to the client
  });

  socket.on('hi', function(data){   
 
    socket.emit('hi', data);  //simply send all the stored objects to the client
    socket.broadcast.emit('GH3', data);
    console.log("hi works")
  });

  socket.on('FromWebSlider', function(data){   
 
    // socket.emit('hi', data);  //simply send all the stored objects to the client
    socket.broadcast.emit('GH3', data);
    console.log("hi works")
  });

  socket.on('mesh', function(data){   
    // socket.emit('hi', data);  //simply send all the stored objects to the client
    socket.broadcast.emit('mesh', data);
    console.log(data);
    console.log("mesh data")
  });
  socket.on('erroe', function(data){   
    console.log("mozzi in error")
  });

  /////////////////////////////////////////////////////////// python 
  socket.on('py', function(data){   
    console.log("run python from node...")


    client.invoke("hello", data, function(error, res, more) {
      console.log(res);
    });


  });
  socket.on('py1', function(data){   
    console.log("run python2 from node...")


    client.invoke("py1", data, function(error, res, more) {
      console.log(res);
      socket.broadcast.emit('GH3', res);
    });



  });
  socket.on('py2', function(data){   
    console.log("run python2 from node...")


    client.invoke("py2", data, function(error, res, more) {
      console.log(res);
    });


  });
});


var zerorpc = require("zerorpc");

var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");
// data = "ddd"
// client.invoke("hello", data, function(error, res, more) {
