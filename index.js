const ocrSpaceApi = require('ocr-space-api');
var fs = require('fs');
var lang = "eng";
var options =  { 
    apikey: "K88662476688957"
  };
  var tesseract = require('node-tesseract');
 
// Set default values. 

 const express = require("express");
var app = express();
var text;
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.use(express.static(__dirname));
io.on("connect", (socket)=> {
  socket.on("lang", l=> {
    lang = l;
    console.log(l);
  })
  socket.on("image",async (link)=> {
      
      try {
        fs.writeFile("main.png", Buffer.from(link), async()=> {
          tesseract.process('main.png',function(err, t) {
            if(err) {
                console.error(err);
            } else {
                console.log(t);
                text = t;
            }
        });
          socket.emit("data", text)
        });
      } catch (error) {
          console.log(error);
      }
  })
})
server.listen(3000, ()=> {
  console.log("listening on 3000")
});
