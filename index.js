const ocrSpaceApi = require('ocr-space-api');
var fs = require('fs');
var lang = "eng";
var options =  { 
    apikey: "K88662476688957"
  };
  var ocr = require('ocr');
 
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
          var params = {
            input: 'main.png',
            output: 'test.txt',
            format: 'text'
        };
          ocr.recognize(params, function(err, document){
            if(err)
                console.error(err);
            else{        
                //output the document object: 
                console.log(document.getRegions()[0].text);
                text = document.getRegions()[0].text; 
            }
        });
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
