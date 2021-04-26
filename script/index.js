$(document).ready(function(){

    function insertDataChecklist(jsonString){
    
        var checklist = JSON.parse(jsonString);
        //var checklist = JSON.parse(JSON.stringify(jsonString));
        console.log("Response: ",checklist);
        
        for (var i = 0; i < checklist.length; ++i) {            
    
            //console.log("id-domanda: "+ checklist[i].id + " length: "+ checklist[i].risposte.length+ " dom: "+ checklist[i].domanda);

            var $tmpl = "";

            $tmpl += '<h3>'+checklist[i].domanda+'</h3>';
            $tmpl += '<input type="text" class="hide-content form-control" name="idDomande'+checklist[i].id+'" value="'+checklist[i].id+'"/>';

            $("#domanda"+checklist[i].id+"").append($tmpl);

            var $tmpl_elements = "";

            // if(checklist[i].risposte.length === 0){
            //     $tmpl_elements += '<input type="checkbox" name="risposta'+checklist[i].id+'[]" class="hide-content check-true" value="true"></input>';
            //     //$tmpl_elements += '<input type="checkbox" name="risposta[]" class="hide-content check-true" value="true"></input>';  
            // }

            if(checklist[i].risposte.length == 1 ){
                $.each(checklist[i].risposte, function(index, elem) {
                    if(elem.level === 2){
                        $tmpl_elements += '<input type="checkbox" name="risposta'+checklist[i].id+'[]" idnnc="'+checklist[i].id+'" class="form-check-input verify asa4" id="risposta'+elem.id+'" value="'+ elem.id +','+ elem.testo +'">';
                    }
                    else{
                        $tmpl_elements += '<input type="checkbox" name="risposta'+checklist[i].id+'[]" idnnc="'+checklist[i].id+'" class="form-check-input nnc asa4" id="risposta'+elem.id+'" value="'+ elem.id +','+ elem.testo +'">';
                    }
                        $tmpl_elements += '<label class="form-check-label" for="risposta'+elem.id+'">'+ elem.testo+'</label>';
                    //$tmpl_elements += '<input type="checkbox" name="risposta'+checklist[i].id+'[]" class="hide-content check-true" value="true"></input>';
                });
            }

            if(checklist[i].risposte.length > 1 ){
                
                $.each(checklist[i].risposte, function(index, elem) {
                    
                    $tmpl_elements += '<div class="form-check row">';
                    if(elem.level === 2){
                        $tmpl_elements += '<input type="checkbox" name="risposta'+checklist[i].id+'[]" idnnc="'+checklist[i].id+'" class="form-check-input verify'+checklist[i].id+' asa4" id="risposta'+elem.id+'" value="'+ elem.id +','+ elem.testo +'">';
                    }
                    else{
                        $tmpl_elements += '<input type="checkbox" name="risposta'+checklist[i].id+'[]" idnnc="'+checklist[i].id+'" class="form-check-input nnc'+checklist[i].id+' asa4" id="risposta'+elem.id+'" value="'+ elem.id +','+ elem.testo +'">';
                    }
                    $tmpl_elements += '    <label class="form-check-label" for="risposta'+elem.id+'">'+ elem.testo+'</label>';
                    $tmpl_elements += '</div>';

                    // $tmpl_elements += '<div class="form-check row">';
                    // $tmpl_elements += '    <input type="checkbox" name="risposta[]" class="form-check-input asa4" id="risposta'+elem.id+'" value="'+ elem.id +','+ elem.testo +'">';
                    // $tmpl_elements += '    <label class="form-check-label" for="risposta'+elem.id+'">'+ elem.testo+'</label>';
                    // $tmpl_elements += '</div>';
                });

                //$tmpl_elements += '<input type="checkbox" name="risposta'+checklist[i].id+'[]" class="hide-content check-true" value="true"></input>';
                //$tmpl_elements += '<input type="checkbox" name="risposta[]" class="hide-content check-true" value="true"></input>';
            }
            
            $("#checkbox-"+checklist[i].id+"").append($tmpl_elements);
                
        }
    }

    // si fa una richiesta al server per creare gli elementi con i dati 
    // delle domande e riposte 
    var datajson;

    $.ajax({
        //url: 'http://127.0.0.1:8080/crud/create', // richiesta con GestureInteractionServer
        url: 'https://localhost:44366/check/create', // richiesta con checklist web api
        dataType: "json",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            datajson = data;
            //var datajson = JSON.stringify(data);
            //console.log(datajson);
        },
        error: function (xhRequest, ErrorText, thrownError) {
            //alert("Errore al caricare la telecamera");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
        }
    });

    $("#edit-pazienti").mouseenter(function( event ){

        //$("#div-checklist").removeClass('show-content').addClass('hide-content');

        $("#menu-main").removeClass('show-content').addClass('hide-content');
        
        $("#data").load("inserire_paziente.html", function( response, status, xhr ) {
            if ( status === "error" ) {
                var msg = "Sorry but there was an error: ";
                //$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
                alert(msg + xhr.status + " " + xhr.statusText);
            }	
            var parent = $(this);
            parent.fadeIn();
        });
        

        $.ajax({
            'url':'http://127.0.0.1:8080/crud/save',
            'method':'POST',
            'dataType': 'json',
             //processData: false,
            'contentType': 'application/json',
            'data': jsondata,
            success: function (data) {
                alert(data);
            },
            error: function (xhRequest, ErrorText, thrownError) {
                //alert("Errore al caricare la telecamera");
                console.log('xhRequest: ' + xhRequest + "\n");
                console.log('ErrorText: ' + ErrorText + "\n");
                console.log('thrownError: ' + thrownError + "\n");
            }
        });
        
    });

    // apre la lista dei pazienti
    // comprobiamo 
    $("#lista-pazienti").mouseenter(function( event ){

        $.ajax({
            
            url: 'http://127.0.0.1:8080/devices/start/?id=6&streamsName=SKELETON&mode=SHARED',
            dataType: "json",
            type: "GET",
            contentType: "application/json",
            //data: personJSONString,
            // crossDomain: true,
            // headers: {
            //     'Access-Control-Allow-Origin': '*'
            // },
            success: function (data) {
                
                $.each(data, function(i, dev){

                    if(dev.BusStatus == true){

                        $("#menu-main").removeClass('show-content').addClass('hide-content');

                        $("#data").load("checklist.html", function( response, status, xhr ) {
                            if ( status === "error" ) {
                                var msg = "Sorry but there was an error: ";
                                alert(msg + xhr.status + " " + xhr.statusText);
                            }

                            var parent = $(this);
                            parent.fadeIn();
                            
                        });
                    }
                    else{
                        alert("Errore al caricare la telecamera");
                    }
                });
                							
            },
            error: function (xhRequest, ErrorText, thrownError) {

                $("#menu-main").removeClass('show-content').addClass('hide-content');

                $("#data").load("checklist.html", function( response, status, xhr ) {
                    if ( status === "error" ) {
                        var msg = "Sorry but there was an error: ";
                        alert(msg + xhr.status + " " + xhr.statusText);
                    }	
                    var parent = $(this);
                    parent.fadeIn();

                    insertDataChecklist(datajson);
                    
                });

                // alert("Errore al caricare la telecamera");
                // console.log('xhRequest: ' + xhRequest + "\n");
                // console.log('ErrorText: ' + ErrorText + "\n");
                // console.log('thrownError: ' + thrownError + "\n");
            }
        });
        //$("#div-checklist").removeClass('hide-content').addClass('show-content');
    });

});