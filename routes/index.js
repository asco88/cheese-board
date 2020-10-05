var express = require('express');
var router = express.Router();
const fs = require('fs');
const config = require('../config');

router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(config.data));
    const settings = JSON.parse(fs.readFileSync(config.settings));

    const bg = settings.bg ? settings.bg : '/images/bg1.jpg';
    const bgUrl = `url('${bg}')`;

    const blocks = JSON.parse(JSON.stringify(data.blocks));

    fs.readdirSync(config.userImages).forEach(file => {
        console.log(file);

        fs.copyFile(`${config.userImages}/${file}`, `./public/images/${file}`, (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
        });
    });

    blocks.forEach(block => {
        block.link = block.link ? `openInNewTab(\'${block.link}\')` : '';
        if (block.transperent && block.transperent === 'true') {
            block.border = 'none';
            block.boxshadow = 'none';
            block.background = 'none';
        }
    });

    res.render('index', { blocks, bgUrl, ...settings });
});

router.post('/new-block', (req, res) => {
    console.log(req.body);

    const { value, link, transperent, icon } = req.body;

    const data = JSON.parse(fs.readFileSync(config.data));
    const blocks = JSON.parse(JSON.stringify(data.blocks));
    blocks.push({
        "name": value,
        // "width": 100,
        // "height": 100,
        "text": "",
        "link": link,
        "icon": `/images/${icon}.png`,
        "transperent": transperent
    });

    data.blocks = blocks;

    fs.writeFileSync(config.data, JSON.stringify(data));

    res.status(200).send();
});

router.post('/settings', (req, res) => {
    console.log(req.body);

    const { bg, theme, blocksWrapperTop, blocksWrapperDirection, iconSize, fontSize } = req.body;
    const settings = JSON.parse(fs.readFileSync(config.settings));

    settings.bg = bg;
    settings.theme = theme;
    settings.blocksWrapperTop = blocksWrapperTop;
    settings.blocksWrapperDirection = blocksWrapperDirection;
    settings.iconSize = iconSize;
    settings.fontSize = fontSize;

    fs.writeFileSync(config.settings, JSON.stringify(settings));

    res.status(200).send();
});

module.exports = router;
