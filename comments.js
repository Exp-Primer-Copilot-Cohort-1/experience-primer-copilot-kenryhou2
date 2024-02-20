//create a web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments.json');

app.use(bodyParser.json());

//serve up the comments page
app.get('/comments', (req, res) => {
  res.json(comments);
});

//create a comment
app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  if (name && comment) {
    comments.push({ name, comment });
    res.json({ name, comment });
  } else {
    res.status(400).json({ message: 'Name and comment are required.' });
  }
});

//start server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});