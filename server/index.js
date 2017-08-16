import express from 'express';
import SocketIO from 'socket.io';
import http from 'http';
import path from 'path';

const PORT= process.env.PORT || 8080;


const app= express();
app.get("/", (req,res)=>{
    io.emit('connection');
    res.status(200).send("are you ok?")
    
})
const server= http.Server(app);
const io= new SocketIO(server);


io.on("connection",(socket)=>{
    console.log("co ket noi den" +socket);
});

// server.listen(PORT,()=>{
//     console.log(`app listening on port ${PORT}`);
// });
io.listen(server.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
}));



