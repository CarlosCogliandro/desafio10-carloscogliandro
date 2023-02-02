
// PRUEBAAAAAAA
import express from "express";

// let express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

// PRUEBAAAAAAA
import serverRoutes from './src/routes/index.js'

// let serverRoutes = require('./src/routes');

// Socket

// PRUEBAAAAAAA
import path from "path";
// import HttpServer from 'http'
import Socket from "./src/utils/sockets/index.js";

// let path = require("path");
// let {Server: HttpServer} = require("http");
// let Socket = require("./src/utils/sockets");



// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// Engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

serverRoutes(app);

// let httpServer = new HttpServer(app);

// let socket = new Socket(httpServer);
// socket.init();

const connectedServer = app.listen(PORT, ()=> console.log(`Server ON By Carlos Cogliandro------> http://localhost:${PORT}`));
connectedServer.on('Error al conectar ----->', (error) => {console.log(error)});