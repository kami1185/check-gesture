$(document).ready(function(){

    $("#edit-pazienti").mouseenter(function( event ){

        //$("#div-checklist").removeClass('show-content').addClass('hide-content');

        $(".menu-init").removeClass('show-content').addClass('hide-content');
        
        $("#data").load("inserire_paziente.html", function( response, status, xhr ) {
            if ( status === "error" ) {
                var msg = "Sorry but there was an error: ";
                //$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
                alert(msg + xhr.status + " " + xhr.statusText);
            }	
            var parent = $(this);
            parent.fadeIn();
            
        });
        
    });

    $("#lista-pazienti").mouseenter(function( event ){
        
        //$("#div-checklist").removeClass('hide-content').addClass('show-content');

        $(".menu-init").removeClass('show-content').addClass('hide-content');

        $("#data").load("checklist.html", function( response, status, xhr ) {
            if ( status === "error" ) {
                var msg = "Sorry but there was an error: ";
                alert(msg + xhr.status + " " + xhr.statusText);
            }	
            var parent = $(this);
            parent.fadeIn();
            
        });

        
    });

    

});