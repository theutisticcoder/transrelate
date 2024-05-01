const ocrSpaceApi = require('ocr-space-api');
var fs = require('fs');
var lang = "eng";
var options =  { 
    apikey: "K88662476688957"
  };
 const express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.use(express.static(__dirname));
io.on("connect", (socket)=> {
  socket.on("lang", l=> {
    lang = l;
    console.log(l);
  })
  socket.on("image",async (link)=> {
      const api = require('api_ocr_space');
      
      try {
        fs.writeFile("main.png", Buffer.from(link), async()=> {
          
          const apiKey = "K88662476688957";
          const options = {
              file: "main.png",
              filetype: "PNG",
              language: lang,
              OCREngine: "3"
          };
          const res = await api.sendRequest(options, apiKey);
          console.log(res.data.ParsedResults[0].ParsedText);
          socket.emit("data", res.data.ParsedResults[0].ParsedText)
        });
      } catch (error) {
          console.log(error);
      }
  })
})
server.listen(3000, ()=> {
  console.log("listening on 3000")
});
