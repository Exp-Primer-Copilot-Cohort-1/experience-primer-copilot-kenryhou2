//create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const filePath = path.join(__dirname, pathname);
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
  stream.on('error', (err) => {
    res.writeHead(404);
    res.end('Not Found');
  });
});

server.listen(3000, () => {
  console.log('server is listening on port 3000');
});
```

## 5.3.4. Serving Static Files with Express

```javascript
// Path: comments.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
```

## 5.3.5. Serving Static Files with Connect

```javascript
// Path: comments.js
const connect = require('connect');
const serveStatic = require('serve-static');
const app = connect();

app.use(serveStatic(__dirname + '/public'));
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
```

# 5.4. RESTful Web Services

## 5.4.1. Creating a Simple RESTful Web Service

```javascript
// Path: comments.js
const http = require('http');
const url = require('url');
const items = [];

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'POST':
      let item = '';
      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        item += chunk;
      });
      req.on('end', () => {
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'GET':
      let body = items.map((item, i) => {
        return `${i}) ${item}`;
      }).join('\n');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
    case 'DELETE':
      let