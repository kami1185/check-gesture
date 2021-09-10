
url = "http://147.163.72.162";
//url = "http://192.168.1.117";
//url = "http://checklist";
//url = "https://localhost:44366";

// si fa una richiesta al server per creare gli elementi con i dati
// delle domande e riposte
// rettore massimo midile, direzione sanitaria
// erasmo.delucca@policlinico.pa.it

$(document).ready(function(){

    alert("La resolución de tu pantalla es: " + screen.width + " x " + screen.height)

    var datajson;
    $.ajax({
        url: ''+url+'/check/create',
        //url: 'https://localhost:44366/check/create', // richiesta con checklist web api
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    })
    .done(function (data) {
        if(data.successful == "false"){
            alert(data.messagge);
        }else{
            datajson = data;
            insertDataChecklist(data);
        }
    })
    .fail(function ( jqXHR, textStatus, errorThrown ) {
        var errorMessage = jqXHR.status + ': ' + jqXHR.statusText
        alert('Error - ' + errorMessage +  jqXHR + textStatus, errorThrown);
    });


    Notiflix.Loading.Init({clickToClose:false,});

    // button per tornare al menu principale
    $("#button-back-home").click(function(){
        var msg="";
        if($(this).hasClass('check'))
            msg="Vuole abbandonare la checklist?";

        if($(this).hasClass('riepilogo') || $(this).hasClass('insert'))
            msg="Vuole tornare al menu principale?";

        confirm_popup(msg);
    });
    // button per tornare al menu principale
    $("#button-back-home").on("mouseover", function () {
        var msg="";
        if($(this).hasClass('check'))
            msg="Vuole abbandonare la checklist?";

        if($(this).hasClass('riepilogo') || $(this).hasClass('insert'))
            msg="Vuole tornare al menu principale?";

        confirm_popup(msg);
    });
    // mostra la popup x uscire della checklist
    function confirm_popup(msg){
        Notiflix.Confirm.Show(
			'CheckList Sala Operatoria',msg,'Si','No',
			function(){
                //alert('aa');
				//window.location.reload('true');
			},
			function(){
				var cancelButton = window.document.getElementById('NXConfirmButtonCancel');
				$(cancelButton).addClass('back-cancel');
            }
        );
    }


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
                });
            }
            $("#checkbox-"+checklist[i].id+"").append($tmpl_elements);
        }
    }

    // apre la lista dei pazienti
    // comprobiamo
    $("#lista-pazienti").click(function(){
    //$("#lista-pazienti").mouseenter(function( event ){

        $("#menu-main").removeClass('show-content').addClass('hide-content');

        $("#data").load("checklist.html", function( response, status, xhr ) {
            if ( status === "error" ) {
                var msg = "Sorry but there was an error: ";
                alert(msg + xhr.status + " " + xhr.statusText);
            }
            var parent = $(this);
            parent.fadeIn();

            //aggiungiamo una classe al button che torna alla home, serve x verficare il
            //messaggio della popup quando l'utente vuole tornare al menu principale
            $("#button-back-home").addClass("check");
            //facciamo apparire la bara nav-bar (titolo e pulsante esci) impostata
            //in index.html
            $(".titolo-checklist").html("Checklist per la sicurezza in sala operatoria");
            $(".nav-bar-checklist").removeClass("hide-content").addClass("show-content");

            //getDataChecklist();
            insertDataChecklist(datajson);

        });

        // $.ajax({
        //     url: 'http://127.0.0.1:8080/devices/start/?id=6&streamsName=SKELETON&mode=SHARED',
        //     dataType: "json",
        //     type: "GET",
        //     contentType: "application/json",

        //     success: function (data) {

        //         $.each(data, function(i, dev){

        //             if(dev.BusStatus == true){

        //                 $("#menu-main").removeClass('show-content').addClass('hide-content');

        //                 $("#data").load("checklist.html", function( response, status, xhr ) {
        //                     if ( status === "error" ) {
        //                         var msg = "Sorry but there was an error: ";
        //                         alert(msg + xhr.status + " " + xhr.statusText);
        //                     }

        //                     var parent = $(this);
        //                     parent.fadeIn();
        //                 });
        //             }
        //             else{
        //                 alert("Errore al caricare la telecamera");
        //             }
        //         });

        //     },
        //     error: function (xhRequest, ErrorText, thrownError) {

        //         $("#menu-main").removeClass('show-content').addClass('hide-content');

        //         $("#data").load("checklist.html", function( response, status, xhr ) {
        //             if ( status === "error" ) {
        //                 var msg = "Sorry but there was an error: ";
        //                 alert(msg + xhr.status + " " + xhr.statusText);
        //             }
        //             var parent = $(this);
        //             parent.fadeIn();

        //             //aggiungiamo una classe al button che torna alla home, serve x verficare il
        //             //messaggio della popup quando l'utente vuole tornare al menu principale
        //             $("#button-back-home").addClass("check");
        //             //facciamo apparire la bara nav-bar (titolo e pulsante esci) impostata
        //             //in index.html
        //             $(".titolo-checklist").html("Checklist per la sicurezza in sala operatoria");
        //             $(".nav-bar-checklist").removeClass("hide-content").addClass("show-content");

        //             //getDataChecklist();
        //             insertDataChecklist(datajson);

        //         });

        //         // alert("Errore al caricare la telecamera");
        //         // console.log('xhRequest: ' + xhRequest + "\n");
        //         // console.log('ErrorText: ' + ErrorText + "\n");
        //         // console.log('thrownError: ' + thrownError + "\n");
        //     }
        // });
    });

    $("#edit-pazienti").click(function(){
        // $("#edit-pazienti").mouseenter(function( event ){
        $("#menu-main").removeClass('show-content').addClass('hide-content');
        $("#data").load("inserire_paziente.html", function( response, status, xhr ) {
            if ( status === "error" ) {
                var msg = "Sorry but there was an error: ";
                //$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
                alert(msg + xhr.status + " " + xhr.statusText);
            }
            var parent = $(this);
            parent.fadeIn();
            //aggiungiamo una classe al button che torna alla home, serve x verficare il
            //messaggio della popup quando l'utente vuole tornare al menu principale
            $("#button-back-home").addClass("insert");
            //facciamo apparire la bara nav-bar (titolo e pulsante esci) impostata
            //in index.html
            $(".titolo-checklist").html("Inserire Paziente");
            $(".nav-bar-checklist").removeClass("hide-content").addClass("show-content");
        });
    });

    // apriamo la lista di tutti riepiloghi dei paziente che hanno fatto una checklist
    $("#lista-riepilogo").click(function(){
        $("#menu-main").removeClass('show-content').addClass('hide-content');
        $("#data").load("lista_riepilogo.html", function( response, status, xhr ) {
            if ( status === "error" ) {
                var msg = "Sorry but there was an error: ";
                alert(msg + xhr.status + " " + xhr.statusText);
            }
            var parent = $(this);
            parent.fadeIn();
            //aggiungiamo una classe al button che torna alla home, serve x verficare il
            //messaggio della popup quando l'utente vuole tornare al menu principale
            $("#button-back-home").addClass("riepilogo");
            //facciamo apparire la bara nav-bar (titolo e pulsante esci) impostata
            //in index.html
            $(".titolo-checklist").html("Riepiloghi Checklist in Sala Operatoria");
            $(".nav-bar-checklist").removeClass("hide-content").addClass("show-content");
        });
    });

    $("#lista-temporal").click(function(){
        $("#menu-main").removeClass('show-content').addClass('hide-content');
        $("#data").load("lista_pazienti.html", function( response, status, xhr ) {
            if ( status === "error" ) {
                var msg = "Sorry but there was an error: ";
                alert(msg + xhr.status + " " + xhr.statusText);
            }
            var parent = $(this);
            parent.fadeIn();
        });
    });

});