let selectedBg = undefined;

$('#new-block-btn').click(() => {
    $('#new-block-wrapper').fadeIn(100);
});

$('#new-block-main #footer #cancel-btn').click(() => {
    $('#new-block-wrapper').fadeOut(100);
});

$('#settings-btn').click(() => {
    $('#settings-wrapper').fadeIn(100);
});

$('#settings-main #footer #cancel-btn').click(() => {
    $('#settings-wrapper').fadeOut(100);
});

$('#new-block-wrapper #submit-btn').click(() => {
    const value = $('#new-block-text').val();
    const link = $('#new-block-link').val();
    const transperent = $('#new-block-transperent').val();
    const icon = $('#new-block-icon').val();

    $.post("new-block", { value, link, transperent, icon }, (data) => {
        location.reload();
        // $('#new-block-wrapper').fadeOut(100);
    });
});

$('#settings-wrapper #submit-btn').click(() => {
    const bg = $('#settings-bg').val();
    const theme = $('#settings-theme').val();
    const blocksWrapperTop = $('#settings-blocksWrapperTop').val();
    const blocksWrapperDirection = $('#settings-blocksWrapperDirection').val();
    const iconSize = $('#settings-iconSize').val();
    const fontSize = $('#settings-fontSize').val();

    $.post("settings", { bg, theme, blocksWrapperTop, blocksWrapperDirection, iconSize, fontSize }, (data) => {
        location.reload();
    });
});

$('#wallpapers-wrapper #submit-btn').click(() => {
    // const selectedBg = $('.wallpapers-single .active').val();

    $.post("change-wallpaper", { selectedBg }, (data) => {
        location.reload();
    });
});

function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

function openWallpaperChooser() {
    $('#settings-wrapper').fadeOut(100);
    $('#wallpapers-wrapper').fadeIn(100);
}

function pressWallpaper(id) {
    $('.wallpapers-single').removeClass('active')
    $('#' + id).addClass('active');
    selectedBg = id;
}
