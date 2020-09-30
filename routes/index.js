var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json'));
  const blocks = JSON.parse(JSON.stringify(data.blocks));

  const parsedBlocks = [];
  blocks.forEach(block => {
    parsedBlocks.push({
      name: block.name,
      width: block.width,
      height: block.height,
      text: block.text
    });
  });

  res.render('index', { title: 'Hey', message: 'Hello there!', blocks: blocks, values: [1, 2, 3] });
});

module.exports = router;
