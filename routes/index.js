var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json'));
  const blocks = JSON.parse(JSON.stringify(data.blocks));

  blocks.forEach(block => {
    block.link = block.link ? `openInNewTab(\'${block.link}\')` : '' ;
    if (block.transperent && block.transperent === 'true') {
      block.border = 'none';
      block.boxshadow = 'none';
      block.background = 'none';

      // block.width = 'none';
      // block.height = 'none';
    }
  });

  res.render('index', { blocks: blocks });
});

router.post('/new-block', (req, res) => {
  console.log(req.body);

  const {value, link, transperent, icon} = req.body;

  const data = JSON.parse(fs.readFileSync('./data.json'));
  const blocks = JSON.parse(JSON.stringify(data.blocks));
  blocks.push({
    "name": value,
    "width": 100,
    "height": 100,
    "text": "",
    "link": link,
    "icon": `/images/${icon}.png`,
    "transperent": transperent
  });

  data.blocks = blocks;

  fs.writeFileSync('./data.json', JSON.stringify(data));

  res.status(200).send();
});

module.exports = router;


//onclick='window.location.href="new-block"'