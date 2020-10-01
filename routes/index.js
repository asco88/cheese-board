var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json'));
  const blocks = JSON.parse(JSON.stringify(data.blocks));

  res.render('index', { title: 'Hey', message: 'Hello there!', blocks: blocks});
});

router.get('/new-block', (req, res) => {
  console.log('new block');

  const data = JSON.parse(fs.readFileSync('./data.json'));
  const blocks = JSON.parse(JSON.stringify(data.blocks));
  blocks.push({
      "name": "example",
      "width": 100,
      "height": 100,
      "background": "#ffffff",
      "text": "this is some example block"
  });

  data.blocks = blocks;

  fs.writeFileSync('./data.json', JSON.stringify(data));

  res.status(200).send();
});

module.exports = router;


//onclick='window.location.href="new-block"'