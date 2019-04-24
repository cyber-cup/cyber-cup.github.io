const http = require("http");
const url = require("url");
const fs = require('fs');
const path = require('path');

const server = http.createServer(function(req,res){

    var filename = path.join(process.cwd(), url.parse(req.url).pathname);

    if(!fs.existsSync(filename)){
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.write('404 Not Found \n');
        res.end();
        return;
    }

    if (fs.statSync(filename).isDirectory()) {
        filename += 'index.html';
    }

    fs.readFile(filename, function(err, file) {
        if(err) throw err;
        res.writeHead(200, {});
        res.write(file);
        res.end();
    });

});

server.listen(8080);

console.log("Http server listening http://localhost:8080/");