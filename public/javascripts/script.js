let selectedBg = undefined;
let selectedIcon = undefined;

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

const checked = async (selector) => {
    return document.querySelector(selector).checked;
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

onClick('#wallpapers-btn', () => {
    show('#wallpapers-wrapper');
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

onClick('#icons-main #footer #cancel-btn', () => {
    hide('#icons-wrapper');
});


onClick('#new-block-wrapper #submit-btn', async () => {
    const name = await value('#new-block-text');
    const link = await value('#new-block-link');
    const transperent = await checked('#new-block-transperent');
    const icon = await value('#new-block-icon');

    postData('new-block', { value: name, link, transperent, icon })
        .then(() => {
            location.reload();
        });
});

onClick('#settings-wrapper #submit-btn', async () => {
    const theme = await value('#settings-theme');
    const blocksWrapperTop = await value('#settings-blocksWrapperTop');
    const blocksWrapperDirection = await value('#settings-blocksWrapperDirection');
    const iconSize = await value('#settings-iconSize');
    const fontSize = await value('#settings-fontSize');

    postData('settings', { theme, blocksWrapperTop, blocksWrapperDirection, iconSize, fontSize })
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

    for (i = 0; i < els.length; i++) {
        els[i].classList.remove('active')
    }

    addClass('#' + id, 'active');
    selectedBg = id;
}

const getIcons = async () => {
    const response = await fetch('all-icons');

    response.json().then(data => {
        show('#icons-wrapper');

        data.forEach(item => {
            const path = `/images/icons/${item}`;
            console.log(path);

            const node = document.createElement('div');
            node.classList.add('icons-single');
            node.onclick = () => selectIcon(item.split('.')[0]);
            node.id = item.split('.')[0];

            const imageNode = document.createElement('img')
            imageNode.src = path;
            node.appendChild(imageNode);

            document.querySelector('#icons-wrapper #body').appendChild(node);
        })
    })

}

const selectIcon = (id) => {
    const els = document.querySelectorAll('.icons-single');

    // clean previous active icon
    for (i = 0; i < els.length; i++) {
        els[i].classList.remove('active')
    }

    // make selcted icon active
    addClass('#' + id, 'active');
    selectedIcon = id;
}

onClick('#icons-wrapper #submit-btn', () => {
    document.querySelector('#new-block-wrapper #new-block-icon').value = selectedIcon;
    hide('#icons-wrapper');
});

// drag blocks-main component
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    // set new location
    postData('change-location/icons', { iconsLocation: ev.target.id })
        .then(() => {
            // location.reload();
        });
}

// function dragover(e) {
//     cancelDefault(e);
//     this.classList.add("hover");
// }

const changeBlocksLocation = async () => {
    const response = await fetch("location/icons");

    response.json().then(({iconsLocation}) => {
        const blocks = document.querySelector("#blocks-wrapper");
        blocks.style.display = "block";
        document.querySelector("#" + iconsLocation).appendChild(blocks);
    })
}

window.addEventListener('load', function () {
    changeBlocksLocation();
})