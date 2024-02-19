const { ocrSpace } = require('ocr-space-api-wrapper');
const express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.use(express.static(__dirname));
io.on("connect", (socket)=> {
  socket.on("image",  async (link)=> {
    const res = await ocrSpace(link);
    console.log(res);
  })
})
server.listen(3000, ()=> {
  console.log("listening on 3000")
});
