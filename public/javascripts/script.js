$('#newblock').click(function(){
    $('#newblockblock').fadeIn(400);
    $('#newblock').fadeOut(400);
    $.get( "new-block", function( data ) {
        location.reload();
    });
});