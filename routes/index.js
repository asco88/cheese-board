var express = require('express');
var router = express.Router();
const fs = require('fs');
const config = require('../config');
const sharp = require('sharp');


router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(config.data));
    const settings = JSON.parse(fs.readFileSync(config.settings));

    const bg = settings.bg ? settings.bg : '/images/bg1.jpg';
    const bgUrl = `url('${bg}')`;

    const blocks = JSON.parse(JSON.stringify(data.blocks));

    fs.readdirSync(config.userIcons).forEach(file => {
        console.log(file);

        fs.copyFile(`${config.userIcons}/${file}`, `./public/images/icons/${file}`, (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
        });
    });

    fs.readdirSync(config.userWallpapers).forEach(file => {
        console.log(file);

        fs.copyFile(`${config.userWallpapers}/${file}`, `./public/images/wallpapers/${file}`, (err) => {
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

    const thumbnails = fs.readdirSync('./public/images/thumbnails').map(item => {return {path: `/images/thumbnails/${item}`, id: item.split('.')[0], func: `pressWallpaper("${item.split('.')[0]}")`}});

    res.render('index', { blocks, bgUrl, ...settings, wallpapers: [], thumbnails });
});

router.get('/editor', (req, res) => {
    const data = JSON.parse(fs.readFileSync(config.data));
    const settings = JSON.parse(fs.readFileSync(config.settings));

    const bg = settings.bg ? settings.bg : '/images/bg1.jpg';
    const bgUrl = `url('${bg}')`;

    const blocks = JSON.parse(JSON.stringify(data.blocks));

    fs.readdirSync(config.userIcons).forEach(file => {
        console.log(file);

        fs.copyFile(`${config.userIcons}/${file}`, `./public/images/icons/${file}`, (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
        });
    });

    fs.readdirSync(config.userWallpapers).forEach(file => {
        console.log(file);

        fs.copyFile(`${config.userWallpapers}/${file}`, `./public/images/wallpapers/${file}`, (err) => {
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

    const thumbnails = fs.readdirSync('./public/images/thumbnails').map(item => {return {path: `/images/thumbnails/${item}`, id: item.split('.')[0], func: `pressWallpaper("${item.split('.')[0]}")`}});

    res.render('editor', { blocks, bgUrl, ...settings, wallpapers: [], thumbnails });
});

router.post('/new-block', (req, res) => {
    console.log(req.body);

    const { value, link, transperent, icon } = req.body;

    const data = JSON.parse(fs.readFileSync(config.data));
    const blocks = JSON.parse(JSON.stringify(data.blocks));
    blocks.push({
        "name": value,
        "text": "",
        "link": link,
        "icon": `/images/icons/${icon}.png`,
        "transperent": transperent
    });

    data.blocks = blocks;

    fs.writeFileSync(config.data, JSON.stringify(data));

    res.status(200).json({}).send();
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

    res.status(200).json({}).send();
});

router.post('/change-wallpaper', (req, res) => {
    console.log(req.body);

    const { selectedBg } = req.body;
    const settings = JSON.parse(fs.readFileSync(config.settings));

    settings.bg = `/images/wallpapers/${selectedBg}.jpg`;

    fs.writeFileSync(config.settings, JSON.stringify(settings));

    res.status(200).json({}).send();
});

router.get('/all-wallpapers', (req, res) => {

    // copy all user wallpapers
    fs.readdirSync(config.userWallpapers).forEach(file => {
        console.log(file);

        fs.copyFile(`${config.userWallpapers}/${file}`, `./public/images/wallpapers/${file}`, (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
        });
    });

    // convert wallpapers to thumbnails
    fs.readdirSync('./public/images/wallpapers').forEach(file => {
        sharp(`./public/images/wallpapers/${file}`).resize(150, 150).toFile(`./public/images/thumbnails/${file}`, (err, resizeImage) => {
            if (err) {
                console.log(err);
            } else {
                console.log(resizeImage);
            }
        });
    });

    res.status(200).send();
})


module.exports = router;
