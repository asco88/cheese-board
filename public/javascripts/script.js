$('#new-block-btn').click(function(){
    $('#new-block-wrapper').fadeIn(100);
    // $('#new-block-btn').fadeOut(400);
    // $.get( "new-block", function( data ) {
    //     location.reload();
    // });
});

$('#submit-btn').click(function(){
    // $('#new-block-btn').fadeOut(400);
    $.get( "new-block", function( data ) {
        location.reload();
        // $('#new-block-wrapper').fadeOut(100);
    });
});

