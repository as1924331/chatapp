// ################ SARE MODULE KO EXTRACT KIYA HAI #################################
const path = require('path')
const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app); 
const {Server} = require('socket.io');
const { Socket } = require('dgram');
const io = new Server (server);

// ######################GIVEN THE DIRECTRY TO HTML AND CSSS####################################################
const staticPath = path.join(__dirname, '/public' )

//#########################AND HERE WEEE CALLED THAT DIRECTORY ################################################
app.use(express.static(staticPath))

// #####################################UP TO HERE ############################################################


// #############################WE CREATED THE EMPTY VARIABLES OF USER########################################
const users ={}
// ########################ESTABLISHED THE CONNECTION OF SOCKET IO WITH SERVER###############################

// #############AND ALSO WHAT IF NEW USER JOINED THE SERVER######################################################
io.on("connection",socket=>{
    socket.on('new-user-joined', name=>{ 
    // console.log('New user',name);
    users[socket.id]= name;
    socket.broadcast.emit('user-joined', name);
    
    })
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message:message , name: users[socket.id]});
    })


    
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })


})
// ###########################HERE WE CALLED THE SERVER ON THE DESIRE PORT#########################
server.listen(8000,()=>{
    console.log(" serever started at port 8000");
})
