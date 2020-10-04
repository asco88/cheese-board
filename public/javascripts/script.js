$('#new-block-btn').click(() => {
    $('#new-block-wrapper').fadeIn(100);
});

$('#submit-btn').click(() => {
    // $('#new-block-btn').fadeOut(400);
    const value = $('#new-block-text').val();
    const link = $('#new-block-link').val();
    const transperent = $('#new-block-transperent').val();
    const icon = $('#new-block-icon').val();

    $.post("new-block", { value, link, transperent, icon }, (data) => {
        location.reload();
        // $('#new-block-wrapper').fadeOut(100);
    });
});

function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}
