
var riepilogo = [];

function risposte(risposta,idDomanda){

    jQuery.each( risposta, function( i, val ) {

        console.log('idNoconformita : ',val);
        console.log('iddddddd : ',val.split(',')[0]);
        console.log('resppppp : ',val.split(',')[1]);
        // risposte2.push({
            
        //     idDomande: idDomanda,
        //     idNoconformita: val.split(',')[0],
        //     risposta: val.split(',')[1]
        // });
        var id_Noconformita = "";
        var risposta_string = "";

        id_Noconformita = val.split(',')[0];
        risposta_string = val.split(',')[1];

        riepilogo.push({
            idDomande: idDomanda,
            idNoconformita: id_Noconformita,
            risposta: risposta_string
        });
    });
	// return noconformita;
}


function save_data_server(jsonArray){

	var results = JSON.parse(jsonArray);

	var save_data = {}

    var paziente = [];
	
	var checklist = [];

    paziente.push({ nome : results.paziente_nome,
                    cognome : results.paziente_cognome,
                    datanascita : results.paziente_data_nascita,
                    codicefiscale: results.paziente_codicefiscale
                     });

	checklist.push({ signinInit : results.signin_ora_inizio,
                    signinEnd : results.signin_ora_fine,
                    timeoutInit : results.timeout_ora_inizio,
                    timeoutEnd : results.timeout_ora_fine,
                    signoutInit : results.signout_ora_inizio,
                    signoutEnd : results.signout_ora_fine,
                    diagnosi : results.paziente_diagnosi,
                    percorso : results.paziente_percorso });

    risposte(results.risposta1,results.idDomande1);
    risposte(results.risposta2,results.idDomande2);
    risposte(results.risposta3,results.idDomande3);
    risposte(results.risposta4,results.idDomande4);
    risposte(results.risposta5,results.idDomande5);
    risposte(results.risposta6,results.idDomande6);
    risposte(results.risposta7,results.idDomande7);
    risposte(results.risposta8,results.idDomande8);
    risposte(results.risposta9,results.idDomande9);
    risposte(results.risposta10,results.idDomande10);
    risposte(results.risposta11,results.idDomande11);
    risposte(results.risposta12,results.idDomande12);
    risposte(results.risposta13,results.idDomande13);
    risposte(results.risposta14,results.idDomande14);
    risposte(results.risposta15,results.idDomande15);
    risposte(results.risposta16,results.idDomande16);
    risposte(results.risposta17,results.idDomande17);
    risposte(results.risposta18,results.idDomande18);
    risposte(results.risposta19,results.idDomande19);
    risposte(results.risposta20,results.idDomande20);
    risposte(results.risposta21,results.idDomande21);
    risposte(results.risposta22,results.idDomande22);
    risposte(results.risposta23,results.idDomande23);
    risposte(results.risposta24,results.idDomande24);

    save_data ["paziente"] = paziente;
    save_data ["checklist"] = checklist;
    save_data ["riepilogo"] = riepilogo;

	console.log('111111111 :',save_data);

	//var jsonSerialize = $(riepilogo).serializeObject();
    var jsonString = JSON.stringify(save_data);

    console.log('22222222 :',jsonString);

	return jsonString;
}

$(document).ready(function(){

    $("#top").click(function(){
		alert('top');
	});

	$("#up").click(function(){
		alert('up');
	});

    // if($.trim($('#idelement').val()).lenght==0)

    $("#button-fasi-terminate").click(function(){
        validateForm();
    });

    $("#button-fasi-terminate").mouseenter(function(){
        validateForm();
    });

    function validateForm(){

        Notiflix.Loading.Hourglass('Generando riepilogo della checklist...');

        //$('.titolo-checklist').text('Riepilogo della Checklist Fase Sign In');

        var form = $('#form-checklist');

        // var jsonArray = $('#form-checklist').serializeArray();
        // var jsonArraySerialize = JSON.stringify(jsonArray);
        // console.log('jsonArraySerialize: ',jsonArraySerialize);

        var jsonSerialize = $('#form-checklist').serializeJSON();
        var jsonString = JSON.stringify(jsonSerialize);

        console.log('jsonSerialize :',jsonSerialize);

        console.log('stringify :',jsonString);

        var saveDataServer = save_data_server(jsonString);
        console.log('saveDataServer :',saveDataServer);

        $.ajax({
            'url': ''+url+'/check/save',
            //'url':'https://localhost:44366/check/save',
            'method':'POST',
            'dataType': 'json',
             //processData: false,
            'contentType': 'application/json',
            'data': saveDataServer,
            success: function (data) {
                
                var answer_server = JSON.parse(data);

                $('#data').empty();

                $("#data").load("riepilogo.html", function( response, status, xhr ) {
                    if ( status === "error" ) {
                        var msg = "Sorry but there was an error: ";
                        //$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
                        alert(msg + xhr.status + " " + xhr.statusText);
                    }
                    
                    Notiflix.Loading.Remove();
                    
                    var parent = $(this);
                    parent.fadeIn();

                    //aggiungiamo una classe al button che torna alla home, serve x verficare il 
                    //messaggio della popup quando l'utente vuole tornare al menu principale
                    $("#button-back-home").addClass("riepilogo");
                    //facciamo apparire la bara nav-bar (titolo e pulsante esci) impostata 
                    //in index.html
                    $("#icon-back-home").removeClass("fa-times").addClass("fa-home");
                    $(".titolo-checklist").html("Riepilogo Checklist in Sala Operatoria");

                    creare_riepilogo(jsonString);
                });


            },
            error: function (xhRequest, ErrorText, thrownError) {
                //alert("Errore al caricare la telecamera");
                console.log('xhRequest: ' + xhRequest + "\n");
                console.log('ErrorText: ' + ErrorText + "\n");
                console.log('thrownError: ' + thrownError + "\n");
            }
        });


        
    }

});

// Aggiungo al div nascosto i checboxes della modal popup faccendo il clone degli elementi
// serve a racogliere i dati di questi checkboxes al form della checklist quando si fa 
// serialize dei dati
function validatecheckbox(div_hide, checkmodal){
    $('#'+ div_hide).empty();
    $('#'+ checkmodal +' input[type=checkbox]:checked').clone().appendTo( $('#'+ div_hide));
}