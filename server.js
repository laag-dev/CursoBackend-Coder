import express from "express";

const server = express();

const PORT = 8080;
const ready = ()=> console.log("server ready on port: "+PORT);

server.listen(PORT, ready)