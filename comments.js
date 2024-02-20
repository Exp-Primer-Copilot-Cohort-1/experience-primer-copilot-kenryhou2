//create a web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
//create a server object:
http.createServer(function (req, res) {
    //parse the url
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    if (req.method === 'GET') {
        if (filename === './comments') {
            //read the file
            fs.readFile('comments.txt', function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            });
        } else {
            //read the file
            fs.readFile(filename, function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            });
        }
    } else if (req.method === 'POST') {
        if (filename === './comments') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var post = querystring.parse(body);
                fs.appendFile('comments.txt', post['comment'] + '\n', function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
                res.writeHead(302, { 'Location': '/comments' });
                res.end();
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("404 Not Found");
        }
    }
}).listen(8080); //the server object listens on port 8080
console.log('Server running at http://