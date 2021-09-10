

function InitChevklist(data){

    Notiflix.Loading.Hourglass('Caricando il paziente...');

    var data_paziente = data.split(',');

    // var nome = data_paziente[0];
    // var cognome = data_paziente[1];
    var codicefiscale = data_paziente[0];
    var data_ricovero = data_paziente[1];

    var paziente = {
        "codicefiscale": codicefiscale,
        "data_ricovero": data_ricovero
      }

    var jsonString = JSON.stringify(paziente);

    $.ajax({
        'url': ''+url+'/lista/paziente',
        //'url': 'https://localhost:44366/lista/paziente', // richiesta con checklist web api
        'dataType': "json",
        'type': "POST",
        'contentType': "application/json",
        'data': jsonString,
        success: function (data) {

            $("#paziente_nome").val(data.nome);
            $("#paziente_cognome").val(data.cognome);
            $("#paziente_data_nascita").val(data.dataNascista);
            $("#paziente_codicefiscale").val(data.codiceFiscale);
            $("#paziente_percorso").val(data.percorso);
            $("#paziente_diagnosi").val(data.diagnosi);
            $("#paziente_id").val(data.idpaziente);

            $("#div-listapazienti").fadeOut();
            $("#div-checklist").fadeIn(1000);

            Notiflix.Loading.Remove();
           
        },
        error: function (xhRequest, ErrorText, thrownError) {
            //alert("Errore al caricare la telecamera");
            console.log('xhRequest: ' + xhRequest + "\n");
            console.log('ErrorText: ' + ErrorText + "\n");
            console.log('thrownError: ' + thrownError + "\n");
            Notiflix.Loading.Remove();
        }
    });

}


$(document).ready(function(){

    // let intViewportHeight = window.innerHeight - 130;
    // console.log("Tamano formulario: " + intViewportHeight +" screen: "+ screen.height);

    // $(".container-formulario").css({'height': intViewportHeight+'px'});

    var cont_field = 0;
    var cont_timeout = 0;
    var cont_signout = 0;
    var id_fase;
    var fase_element;

    var first_hide_element;
    var first_show_element;
    var init_fase;
    var prev_fase;

    // var table = $('#table-lista-paziente').DataTable();
 
    // $('#table-lista-paziente tbody').on( 'click', 'tr', function () {
    //     console.log( table.row( this ).data() );
    // } );

    $('#table-lista-paziente').DataTable({
        // DataTable solo usa POST come metodo x inviare i parametri
        //"paging": false,
        //"searching": false,
        "destroy": true,
        // "searching": false,
        "processing": true,
        "serverSide": true,
        "filter": true,
        "font-size": "2vh",
        
        "language": {
            "loadingRecords": '<span>Caricando dati </span><br> &nbsp;',
            "processing": '<i class="fa fa-spinner fa-spin" style="font-size:24px;color:rgb(75, 183, 245);"></i>',
            "paginate": {
                "previous": "indietro",
                "next": "avanti"
            },
            "search": "Cerca Paziente per Nome o Cognome o Codice Fiscale:",
            "show": "Numero di registri",
            "emptyTable": "Non ci sono dati disponibili per questa data"
        },
        "ajax": {
            "url": ''+url+'/lista/checklist',
            //"url": 'https://localhost:44366/lista/checklist',
            "type": "POST",
            "dataType": "JSON",
            // passiamo i parametri x la query 
            // "data": { "dateinit": "01/05/2021", 
            //           "dateend":"05/05/2021"
            "data": { "dateinit": null },
            "error": function (xhr, error, code)
            {
                alert(xhr);
                alert(code);
            }
        },
        "pageLength": 10,
        "responsivePriority": 1,
        
        //"data": null,
        // "columnDefs": [{
        //     "targets": [0],
        //     "visible": false,
        //     "searchable": true
        // }],
        "columnDefs": [
            { "width": '20%', targets: 0 }
          ],
        "fixedColumns": true,
        "columns": [
            //{ "data": "id","name": "Id", "autoWidth": true },
            { "data": "nome", "name": "Nome", "autoWidth": true },
            { "data": "cognome", "name": "Cognome", "autoWidth": true },
            { "data": "codiceFiscale", "name": "Codice Fiscale", "autoWidth": true },
            { "data": "dataRicovero", "name": "Data Ricovero", "autoWidth": true },
            { "data": "percorso", "name": "Percorso", "autoWidth": true },
            {
                // prendiamo il valore id dell'oggetto data impostato in columns 
                // { "data": "id","name": "Id", "autoWidth": true } passando il 
                // valore dell'id al metodo ViewRiepilogo
                // con render impostiamo un button con l'id 
                "data": 'identifier',
                "render": function (data, type, row, meta) {
                    if(data!='true') 
                        return "<a href='#' class='btn btn-success button-lista' onclick=InitChevklist(\'" + data + "\'); >Inizia Checklist</a>";   
                    else
                        return "<a href='#' class='btn btn-error button-lista'; >Checklist Terminata</a>";
                }
            },
        ]
    } );

    // button per tornare al menu principale 
    // $("#button-back-home").click(function(){
    //     confirm_popup();
    // });
    // // button per tornare al menu principale
    // $("#button-back-home").on("mouseover", function () {
    //     confirm_popup();
    // });

    // function confirm_popup(){
    //     Notiflix.Confirm.Show(
	// 		'CheckList Sala Operatoria','Vuole abbandonare la checklist?','Si','No', 
	// 		function(){
	// 			window.location.reload('true');
	// 		}, 
	// 		function(){
	// 			var cancelButton = window.document.getElementById('NXConfirmButtonCancel');
	// 			$(cancelButton).addClass('back-cancel');
    //         }
    //     );
    // }



    // faccio un select e deselect dei checkbox
    // eccetto uno, quando non trova un problema o non conformità
    $("input[type=checkbox]").mouseenter(function(){

        var id = $(this).attr('idnnc');
        console.log("id ::: "+ id);
        var $this = $(this);

        //if ($this.prop('checked')) {
        if ($this.hasClass('verify'+id)) {
            $('.nnc'+id).each(function() {
                this.checked = false;
            })
        }
        else {
            $('.verify'+id).each(function() {
                this.checked = false;
            })
        }
    });

    var titolo_Signin = "Sign In";

    $('.titolo-fase').text(titolo_Signin);

    // $(".asa4").hover(function() {
    $(".asa4").on("mouseover", function () {
        this.checked = ! this.checked;
    });

    $(".button-init-fase").click(function(){
        var id = $(this).attr('id');
        initcheck(id);
    });

    $(".button-init-fase").mouseenter(function( event ){
        var id = $(this).attr('id');
        initcheck(id);
    });

    $(".next").click(function(){
        next_step_checklist();
    });


    $(".next").mouseenter(function( event ){
        next_step_checklist();
    });

    function next_step_checklist(){

        id_fase = $('#content_fasi').children('.fase_active').attr('id');
        //console.log("id_fase::::::: ", id_fase);
        fase_element = $('#content_fasi').children('.fase_active');

        // cerco l'elemento previo e sulla lista l'ultimo elemento che contiene
        // la classe fase_completata e verifico se ha le classi x
        // nascondere il div (ultima fase)
        prev_fase = fase_element.prev().children('.fase_completata');
        if(prev_fase.hasClass('fase_completata') && prev_fase.hasClass('show-content'))
            prev_fase.removeClass('show-content').addClass('hide-content');

        // conta il numero di div per ogni fase
        var numItems = $('#'+id_fase).children().length;
        //alert(numItems);

        $('.'+id_fase).each(function(){

            first_hide_element = $(this).find('.show-content:first');

            first_show_element = first_hide_element.next();

            console.log("NEXTTTTTTTTTTTT: ",first_show_element.attr("id"));

            // si cerca la classe alert-asa e si chiama alla funzione alert_asa
            // per creare e inserire i checkbox a seconda l'opzioni selezionate 
            // con el alert asa della fase sign in 
            if(first_show_element.hasClass('alert-asa')){
                alert_asa();
            }

            // quando sta per concludere una delle fasi mostro una popup
            // indicando che la fase sta x terminare e chiedo di confermare il passo
            // successivo alla seguente fase  
            if(first_show_element.hasClass("fase_completata")){

                
            }

            // si ha inserito una classe checkboxes in un div in cui ci sono tutti
            // i checkbox, si fa una ricerca di questa classe e si ottiene l'id
            // del div. con l'id del div si verifica ogni checkbox se sono stati selezionati
            // delle non conformità se non sono state selezionate asegno como checked al
            // checkbox nascosto che vuol dire che non sono stati selezionate le non conformità
            var check ="";
            check = first_hide_element.find('.checkboxes').attr('id');
            console.log('checkkkkkkkk: ', check);

            // var a = first_hide_element.find(".checkboxes input[type=checkbox]:checked")
            // console.log('vale: ', a.length);

            if(check != undefined || check != null){

                // cerco dentro nel div i checkbox che sono stati selezionati (checked)
                // verifico con length se qualcuno è stato selezionato
                var checked1 = $("#"+check+" input[type=checkbox]:checked").length;
                // se trova uno o più di uno checkbox > 0

                if (checked1 > 0 || check === 'checkbox-paziente') {

                    if(id_fase == "SignIn"){
                        // quando trova l'id checkbox-paziente dell'elemento che contiene 
                        // la classe checkboxes inizia il contatore a 0
                        if(check === 'checkbox-paziente')
                            cont_field = 0;

                        cont_field ++;
                        setProgressBar(cont_field, 12);
                    }
            
                    if(id_fase == "TimeOut"){
                        cont_timeout++;
                        setProgressBar(cont_timeout, 8);
                    }
            
                    if(id_fase == "SignOut"){
                        cont_signout++;
                        setProgressBar(cont_signout, 7);
                    }

                    console.log(checked1 + " CheckBoxe(s) are checked. vane: "+checked1);
                    // cerco il checkbox creato nell'index con la classe check-true
                    // e con prop('checked', false) lo deseleziono (unchecked)
                    //$("#"+check+"").find('.check-true').prop('checked', false);

                    first_hide_element.removeClass("show-content").addClass("hide-content");
                    // first_hide_element.fadeOut( 500, function() {
                    //    first_hide_element.removeClass("show-content").addClass("hide-content");
                    // });
                    console.log("first::::::::: ",first_hide_element.attr("id"));

                    first_show_element.removeClass("hide-content").addClass("show-content");
                    console.log("next:::::::::: ",first_show_element.attr("id"));

                    // ultima fase quando completa tutta la checklist
                    // nascondo i buttons back and next
                    // e mostro il button per iniziare nuovamente la checklist
                    // aggiungo la classe show-home al button #button-init-fase
                    // lo verifico se contiene la classe per ricaricare la pagina
                    if(first_show_element.hasClass('last-fase'))
                        $(".actions").removeClass("show-content").addClass("hide-content");

                    // questa validazione ci serve a cambiare il progress o le fasi del lato sinistro
                    // a settare l'ora d'inizio di ogni fase
                    // nascondere i button de avanti e indietro
                    if(first_show_element.hasClass("fase_completata")){

                        // nascondo il button-referto, lo mostro 
                        // quando inizio una fase 
                        $("#button-referto").removeClass("show-content").addClass("hide-content");

                        // settare l'inzio di ogni fase con l'ora e data
                        if(id_fase == "SignIn")
                            setOraFase('signin_ora_fine');

                        if(id_fase == "TimeOut")
                            setOraFase('timeout_ora_fine');

                        if(id_fase == "SignOut")
                            setOraFase('signout_ora_fine');

                        //nascondo i buttons avanti e indietro
                        $('.actions').removeClass('show-content').addClass('hide-content');

                        console.log("show next:::: ",first_show_element.attr('id'));
                        // controllo alla seguente fase
                        first_show_element = $(this).next();
                        // togliamo la classe della fase attuale
                        fase_element.removeClass("fase_active");
                        // aggiungiamo la classe per la seguente fase
                        first_show_element.addClass("fase_active");

                        // cerchiamo l'ulitma classe inactive
                        var progress_fase = $("#progressbar").find('.inactive:last');

                        progress_fase.find( "h5" ).addClass('label-phase');

                        // aggiungiamo la classe active
                        progress_fase.addClass("active");

                        //progress_fase.addClass("fase-terminata");

                        if(progress_fase.next().hasClass('ultima-fase')){
                            progress_fase.next().addClass('active');

                            progress_fase.next().find( "h5" ).addClass('label-phase');
                            //progress_fase.next().addClass('show-content');
                            //progress_fase.addClass("fase-terminata");
                        }

                        // aggiungiamo la classe inactive, per cercare l'ultima classe inactive nuovamente
                        // e poter attivarla
                        progress_fase.next().addClass("inactive");

                    }

                    // mostro il button dopo la seconda domanda
                    // nella prima domanda il button si mantiene nascosto
                    if(first_show_element.hasClass('activate-prev'))
                        $('.prev').show();

                    if(first_hide_element.hasClass('fase-init')){
                        // mostro il button-referto quando inizio una fase timeout o signout
                        $("#button-referto").removeClass("hide-content").addClass("show-content");
                        setOraFase(first_hide_element.attr("setora"));
                    }
                    // nascondiamo l'alert lanciato quando non trova nessuno dei checkbox
                    // selezionati
                    toastr.clear()
                }
                else {
                    // se non c'è una non conformita seleziono il checkbox, faccio un checked
                    $("#"+check+"").find('.check-true').prop('checked', true);
                    // se nessuno dei checkbox sono stati selezionati compare un alert
                    // indicando che deveno selezionare una opzione 
                    // usando il plugin toastr
                    toastr["error"]("<p class='alert-messagge'>Selezionare una opzione <i class='fas fa-check-square'></i></p>","<p class='alert-messagge'>'Attenzione!'</p>")
                    // toastr["error"]("Selezionare una opzione <i class='fas fa-check-square'></i>","Attenzione!")
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "9000000",
                        "hideDuration": "100000",
                        "timeOut": "3200",
                        "extendedTimeOut": "500",
                        "showEasing": "linear",
                        "hideEasing": "swing",
                        "showMethod": "show",
                        "hideMethod": "fadeOut"
                      }
                }
            }
        });

        // cerco il primo div che contiene la classe primocheck e hide-content
        // quando si inizia una nuova fase Time Out e Sign Out
        init_fase = $(fase_element).children('.primocheck:first-child');
        if(init_fase.hasClass('primocheck') && init_fase.hasClass('hide-content')){
            // impostiamo il titolo x una nuova fase
            setTitiloFase(fase_element.attr('id'));

            init_fase.removeClass("primocheck");

            init_fase.removeClass("hide-content").addClass("show-content");

            $('.actions').removeClass('hide-content').addClass('show-content');

            // si nasconde il button prev quando si completa una fase e quando
            // si inizia una fase, non c'è bisogno del button prev
            $('.prev').hide();
        }
    }


    $(".prev").mouseenter(function( event ){
    //$(".prev").click(function(){

        id_fase = $('#content_fasi').children('.fase_active').attr('id');
        console.log("id_fase::::::: ", id_fase);

        var numItems = $('#'+id_fase).children().length;

        if(id_fase == "SignIn"){
            cont_field --;
            setProgressBar(cont_field, 11);
        }

        if(id_fase == "TimeOut"){
            cont_timeout --;
            setProgressBar(cont_timeout, 8);
        }

        if(id_fase == "SignOut"){
            cont_signout --;
            setProgressBar(cont_signout, 7);
        }

        $('.'+id_fase).each(function(){

            var first_hide_element = $(this).find('.show-content:first');
            var first_show_element = $(this).find('.show-content:first').prev();

            console.log("first::::::::: ",first_hide_element);
            first_hide_element.removeClass("show-content").addClass("hide-content");

            console.log("last:::::::::: ",first_show_element);
            first_show_element.removeClass("hide-content").addClass("show-content");
            ////////////////////////////////////////////////////////////////////////

            if(first_show_element.hasClass('initcheck')){
                $('.actions').removeClass("show-content").addClass("hide-content");
                cont_field = 2;
            }

            // nascondo il button prev per la prima domanda di ogni fase
            if(first_show_element.hasClass('hide-prev'))
                $('.prev').hide();

        });
        
    });

    function initcheck(fase){

        // cerco il div che contiene la prima fase SignIn attraverso la classe
        // fase_active e poi cerco il div che fa iniziare la checklist
        // con la classe show-content
        if(fase == 'button-signin'){

            //mostro il button referto e lo nascondo quando trovo la classe 
            // fase-completata in ogni fase
            $("#button-referto").removeClass("hide-content").addClass("show-content");

            setOraFase('signin_ora_inizio');

            id_fase = $('#content_fasi').children('.fase_active');
            console.log('id_fase: ',id_fase);
            var init_fase = $(id_fase).children('.show-content:first');
            console.log('init_fase: ',init_fase);

            // nascondo il div che contiene il messaggio e il button che inizia la
            // prima fase:

            init_fase.removeClass("show-content").addClass("hide-content");

            // mostro il primo punto della checklist della fase Sign In (Paziente)
            // anche il buttons (dietro e avanti)

            init_fase.next().removeClass("hide-content").addClass("show-content");
            $(".actions").removeClass("hide-content").addClass("show-content");
        }
    }

    function setProgressBar(curStep,num_passi) {

        console.log(curStep + " "+ num_passi);
        //console.log("curstep: ",curStep);
        var percent = parseFloat(100 / num_passi) * curStep;
        //console.log("%%%%%%%: ",percent);
        var percent_label = 0;

        if(curStep != 1)
            percent_label = Math.floor(percent);

        $('.progress-bar-fase-label').text(percent_label+'%');
        percent = percent.toFixed();
        $(".progress-bar").css("width",percent+"%")
    }

    function setTitiloFase(titolo){
        $('.titolo-fase').text(titolo);
    }

    function alert_asa(){

        if(!$('#div-alert-asa-image').hasClass('asa-selezionati')){

            var asa = "";
            // $("input:checkbox[name=1asa:checked").each(function() {
            $("input[name='risposta11[]']:checked").each(function () {
                if($(this).val() == "32,ASA 1" || $(this).val() == "33,ASA 2" || $(this).val() == "34,ASA 3" || $(this).val() == "35,ASA 4" || $(this).val() == "74,ASA 5"){
                    //array.push($(this).val().split(',')[1]);
                    asa = $(this).val().split(',')[1];
                    $('#div-alert-asa').append("<div><label class='text-center alert-messaggio ' for='paziente_id' ><i class='fas fa-exclamation-triangle fa-2x icon-alert'></i> Attenzione nella fase Sign In il paziente è un "+asa+" </label></div>" );
                    //$('#checkbox-asa').append('<input type="checkbox" name="risposta15[]" class="form-check-input"  checked="true" value="'+ $(this).val() +'"></input>').prop('checked',true);
                }
                // si creano i checkboxes per inviare al database, i checkbox sono nascosti
                $('#checkbox-asa').append('<input type="checkbox" name="risposta15[]" class="form-check-input hide-content"  checked="true" value="'+ $(this).val() +'"></input>').prop('checked',true);
            });

            if(asa.length > 0 ){
                $('#div-alert-asa-image').addClass("hide-content");
            }
            
            // if (array && array.length > 0)
            //     $('#div-alert-asa-image').addClass("hide-content");

            // $.each(array, function (index, value)
            // {
            //     $('#div-alert-asa').append("<label class='text-center alert-messaggio ' for='paziente_id' ><i class='fas fa-exclamation-triangle fa-2x icon-alert'></i> Attenzione nella fase Sign In il paziente è un "+value+" </label>" );
            // });

            $('#div-alert-asa-image').addClass('asa-selezionati');
        }
    }

    function setOraFase(fase_set_ora){

        var currentdate = new Date();
        // var datetime = currentdate.getDate() + "/"
        //     + (currentdate.getMonth()+1)  + "/"
        //     + currentdate.getFullYear() + " ora: "
        //     + currentdate.getHours() + ":"
        //     + currentdate.getMinutes() + ":"
        //     + currentdate.getSeconds();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        $('#'+fase_set_ora+'').val(datetime);
    }

});