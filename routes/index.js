var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json'));
  const blocks = JSON.parse(JSON.stringify(data.blocks));

  blocks.forEach(block => block.link ? block.link = `openInNewTab(\'${block.link}\')` : '');

  res.render('index', { blocks: blocks});
});

router.post('/new-block', (req, res) => {
  console.log(req.body);

  const data = JSON.parse(fs.readFileSync('./data.json'));
  const blocks = JSON.parse(JSON.stringify(data.blocks));
  blocks.push({
      "name": "",
      "width": 100,
      "height": 100,
      // "background": "#ffffff",
      "text": req.body.value,
      "link": req.body.link,
      // "opacity": 0
      "background": "none",
      "icon": "/images/jellyfin.png",
      "border": "none",
      "boxshadow": "none"
  });

  data.blocks = blocks;

  fs.writeFileSync('./data.json', JSON.stringify(data));

  res.status(200).send();
});

module.exports = router;


//onclick='window.location.href="new-block"'