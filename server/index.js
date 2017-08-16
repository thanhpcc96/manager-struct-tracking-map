import express from 'express';
import SocketIO from 'socket.io';
import http from 'http';
import path from 'path';

import dbConfig from './config/dbconfig';
import middlewaresConfig from './config/middlewares';

const PORT= process.env.PORT || 3000;


const app= express();
/*
** config Mongodb
*/
let mongoConf;
if(process.env.NODE_ENV !== 'production'){
    const webpackMiddware = require('webpack-dev-middleware');
    const webpack= require('webpack');
    const webpackConfig= require('../webpack.config');
    
    app.use(webpackMiddware(webpack(webpackConfig)));
    mongoConf='mongodb://localhost/doantn';
}else{
    app.use(express.static(path.join(__dirname,'dist')));
    app.get('/',(req, res)=>{
        res.sendFile(path.join(__dirname,'dist/index.html'));
    });
    mongoConf= process.env.MONGO_URL;
}
dbConfig(mongoConf);
/*
** app config middleware
*/
middlewaresConfig(app);

app.get("/", (req,res)=>{
    io.emit('connection');
    res.status(200).send("are you ok?")
    
})
const server= http.Server(app);
const io= new SocketIO(server);


// io.on("connection",(socket)=>{
//     console.log("co ket noi den" +socket);
// });

server.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
});
app.io=io.on('connection',(socket)=>{
    console.log("co ket noi "+ socket)
})



