import express from 'express';
import SocketIO from 'socket.io';
import http from 'http';
import path from 'path';

import config from './config';
import setRouters from './routers/';

const port = config.port();


const app = express();
/*
 ** config Mongodb
 */
let mongoConf;
console.log("---------------------------------");
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
    const webpackMiddware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config');

    app.use(webpackMiddware(webpack(webpackConfig)));
    mongoConf = 'mongodb://localhost/doantn';
} else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
    mongoConf = process.env.MONGO_URL;
}
config.dbconfig(mongoConf);
/*
 ** app config middleware
 */
config.middleware(app);

// app.get("/", (req, res) => {
//     io.emit('connection');
//     res.status(200).sendFile()

// })
setRouters(app); // set up router cho app

const server = http.Server(app);
const io = new SocketIO(server);


// io.on("connection",(socket)=>{
//     console.log("co ket noi den" +socket);
// });

server.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
app.io = io.on('connection', (socket) => {
    console.log("co ket noi " + socket)
})



