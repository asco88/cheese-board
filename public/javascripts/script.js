let selectedBg = undefined;

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const show = (selector) => {
    document.querySelector(selector).style.display = 'block';
}

const hide = (selector) => {
    document.querySelector(selector).style.display = 'none';
}

const onClick = (selector, cb) => {
    document.querySelector(selector).onclick = cb;
}

const value = async (selector) => {
    return document.querySelector(selector).value;
}

const addClass = (selector, clazz) => {
    document.querySelector(selector).classList.add(clazz);
}

// open modals

onClick('#new-block-btn', () => {
    show('#new-block-wrapper');
});

onClick('#settings-btn', () => {
    show('#settings-wrapper');
});

// close modals

onClick('#new-block-main #footer #cancel-btn', () => {
    hide('#new-block-wrapper');
});

onClick('#settings-main #footer #cancel-btn', () => {
    hide('#settings-wrapper');
});

onClick('#wallpapers-main #footer #cancel-btn', () => {
    hide('#wallpapers-wrapper');
});

onClick('#new-block-wrapper #submit-btn', async () => {
    const name = await value('#new-block-text');
    const link = await value('#new-block-link');
    const transperent = await value('#new-block-transperent');
    const icon = await value('#new-block-icon');

    postData('new-block', { value: name, link, transperent, icon })
        .then(() => {
            location.reload();
        });
});

onClick('#settings-wrapper #submit-btn', async () => {
    const bg = await value('#settings-bg');
    const theme = await value('#settings-theme');
    const blocksWrapperTop = await value('#settings-blocksWrapperTop');
    const blocksWrapperDirection = await value('#settings-blocksWrapperDirection');
    const iconSize = await value('#settings-iconSize');
    const fontSize = await value('#settings-fontSize');

    postData('settings', { bg, theme, blocksWrapperTop, blocksWrapperDirection, iconSize, fontSize })
        .then(() => {
            location.reload();
        });
});

onClick('#wallpapers-wrapper #submit-btn', () => {
    postData('change-wallpaper', { selectedBg })
        .then(() => {
            location.reload();
        });
});

function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

function openWallpaperChooser() {
    hide('#settings-wrapper');
    show('#wallpapers-wrapper');
}

function pressWallpaper(id) {
    const els = document.querySelectorAll('.wallpapers-single');

    for(i = 0; i < els.length; i++) {
        els[i].classList.remove('active')
    }

    addClass('#' + id, 'active');
    selectedBg = id;
}
