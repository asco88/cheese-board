$('#new-block-btn').click(() => {
    $('#new-block-wrapper').fadeIn(100);
    // $('#new-block-btn').fadeOut(400);
    // $.get( "new-block", function( data ) {
    //     location.reload();
    // });
});

$('#submit-btn').click(() => {
    // $('#new-block-btn').fadeOut(400);
    const value = $('#new-block-text').val();

    $.post( "new-block", {value}, ( data ) => {
        location.reload();
        // $('#new-block-wrapper').fadeOut(100);
    });
});

