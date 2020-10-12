$(document).ready(function(){

    var titolo_Signin = "Sign In";

    $('.titolo-fase').text(titolo_Signin);

    // $('#getval').on('click', function() { 
    //     var array = []; 
    //     $("input:checkbox[name=asa]:checked").each(function() {
    //         if($(this).val() == "Rischio3" || $(this).val() == "Rischio4"){ 
    //             array.push($(this).val()); 
    //             alert($(this).val());
    //         }
    //     }); 
    // }); 

    var current_fs, next_fs, previous_fs;
    var cont_field = 2;
    var cont_timeout = 0;
    var cont_signout = 0;
    var current = 1;
    var id_fase;
    var fase_element;
    var fase_terminata =0;
    
    var first_hide_element;
    var first_show_element;
    var init_fase;
    var prev_fase;

    // $(".asa4").on("mouseover",".asa4", function () {
    //     this.checked = ! this.checked;
    //     $(this).prop("checked", !$(this).prop("checked"));
    //     alert('si');
    // });

    // $(".asa4").mouseenter(function( event ) {
    //     this.checked = ! this.checked;
    //     $(this).prop("checked", !$(this).prop("checked"));
    //     alert('siiii');
    // });

    // $(".asa4").hover(function() {
    $(".asa4").on("mouseover", function () {
        this.checked = ! this.checked;
        //$(this).prop("checked", !$(this).prop("checked"));
        //alert('hover');
    });

    // $("#button-fasi-terminate").click(function(){
    //     finishcheck();
    // });

    // $("#button-fasi-terminate").mouseenter(function( event ){
    //     finishcheck();
    // });

    $(".button-init-fase").click(function(){
        var id = $(this).attr('id');
        initcheck(id);
    });

    $(".button-init-fase").mouseenter(function( event ){
        var id = $(this).attr('id');
        initcheck(id);
    });


    // button x aprire la popup del paziente
    $("#modal_popup_paziente").mouseenter(function( event ){
        $("#non-conformita-paziente").modal('show');
    });

    $("#modal_popup_sensi").mouseenter(function( event ){
        $("#non-conformita-sensi").modal('show');
    });

    $("#modal_popup_conta").mouseenter(function( event ){
        $("#non-conformita-conta").modal('show');
    });

    // button x chiudere tutte le popup
    $('.close_popup').mouseenter(function( event ){

        if($(this).attr('id') == "close_popup_paziente"){
            $('input[name=paziente]').prop('checked', false);
            $("#non-conformita-paziente").modal('hide');
        }
        if($(this).attr('id') == "close_popup_sensi"){
            $('input[name=consensi]').prop('checked', false);
            $("#non-conformita-sensi").modal('hide');
        }

        if($(this).attr('id') == "close_popup_conta"){
            $('input[name=conta]').prop('checked', false);
            $("#non-conformita-conta").modal('hide');
        }
    });

    $('.salva-dati').mouseenter(function( event ){

        if($(this).attr('id') == "salva-dati-paziente"){
            validatecheckbox('div-hide-paziente','checkbox-modal-paziente');
            $("#non-conformita-paziente").modal('hide');
        }
        if($(this).attr('id') == "salva-dati-consensi"){
            validatecheckbox('div-hide-consensi','checkbox-modal-consensi');
            $("#non-conformita-sensi").modal('hide');
        }

        if($(this).attr('id') == "salva-dati-conta"){
            validatecheckbox('div-hide-conta','checkbox-modal-conta');
            $("#non-conformita-conta").modal('hide');
        }
    });

    //$(".next").click(function(){
    $(".next").mouseenter(function( event ){

        //var cont = 0;
        //cont = cont_field -1;

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

        if(id_fase == "SignIn"){
            cont_field ++;
            setProgressBar(cont_field, numItems);
        }

        if(id_fase == "TimeOut"){
            cont_timeout++;
            setProgressBar(cont_timeout, numItems);
        }

        if(id_fase == "SignOut"){
            cont_signout++;
            setProgressBar(cont_signout, numItems);
        }

        $('.'+id_fase).each(function(){

            first_hide_element = $(this).find('.show-content:first');

            first_show_element = first_hide_element.next();
            
            first_hide_element.removeClass("show-content").addClass("hide-content");
            // first_hide_element.fadeOut( 500, function() {
            //    first_hide_element.removeClass("show-content").addClass("hide-content");
            // });
            console.log("first::::::::: ",first_hide_element.attr("id"));
            
            first_show_element.removeClass("hide-content").addClass("show-content");
            console.log("next:::::::::: ",first_show_element.attr("id"));

            // si è inserito una classe checkboxes in un div in cui ci sono tutti 
            // i checkbox, in cui si fa una ricerca di questa classe e si ottiene l'id 
            // del div. con l'id del div si verifica ogni checkbox se sono stati selezionate 
            // delle non conformità se non sono state selezionate asegno como checked al 
            // checkbox nascosto che vuol dire che non sono stati selezionate le non conformità
            var check ="";
            check = first_hide_element.find('.checkboxes').attr('id');
            console.log('checkkkkkkkk: ', check);

            // var a = first_hide_element.find(".checkboxes input[type=checkbox]:checked")
            // console.log('vale: ', a.length);

            if(check != undefined || check != null){
                var checked1 = $("#"+check+" input[type=checkbox]:checked").length;
                if (checked1 > 0) {
                    console.log(checked1 + " CheckBoxe(s) are checked. vane");
                    $("#"+check+"").find('.check-true').prop('checked', false);
                } 
                else {
                    $("#"+check+"").find('.check-true').prop('checked', true);
                }
            }

            if(first_show_element.hasClass('alert-asa'))
                alert_asa();

            // ultima fase quando completa tutta la checklist 
            // nascondo i buttons back and next 
            // e mostro il button per iniziare nuovamente la checklist
            // aggiungo la classe show-home al button #button-init-fase
            // lo verifico se contiene la classe per ricaricare la pagina
            if(first_show_element.hasClass('last-fase'))
                $(".actions").removeClass("show-content").addClass("hide-content");

            if(first_show_element.hasClass("fase_completata")){

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
                
                // aggiungiamo la classe active 
                progress_fase.addClass("active");
                progress_fase.addClass("fase-terminata");

                if(progress_fase.next().hasClass('ultima-fase')){
                    progress_fase.next().addClass('active');
                    progress_fase.next().addClass('show-content');
                    progress_fase.addClass("fase-terminata");
                }

                // aggiungiamo la classe inactive, per cercare l'ultima classe inactive nuovamente 
                // e poter attivarla 
                progress_fase.next().addClass("inactive");
                
            }

            // mostro il button dopo la seconda domanda
            // nella prima domanda il button si mantiene nascosto
            if(first_show_element.hasClass('activate-prev'))
                $('.prev').show();

            if(first_hide_element.hasClass('fase-init'))
                setOraFase(first_hide_element.attr("setora"));

        });

        // cerco il primo div che contiene la classe primocheck e hide-content
        // quando si inizia una nuova fase Time Out e Sign Out
        init_fase = $(fase_element).children('.primocheck:first-child');
        if(init_fase.hasClass('primocheck') && init_fase.hasClass('hide-content')){


            //alert(fase_element.attr('id'));
            // impostiamo il titolo x una nuova fase
            setTitiloFase(fase_element.attr('id'));
            
            init_fase.removeClass("primocheck");
            
            init_fase.removeClass("hide-content").addClass("show-content");

            $('.actions').removeClass('hide-content').addClass('show-content');

            // si nasconde il button prev quando si completa una fase e quando 
            // si inizia una fase, non c'è bisogno del button prev 
            $('.prev').hide();
           
        }
        
    });
    
    $(".prev").mouseenter(function( event ){
    //$(".prev").click(function(){

        id_fase = $('#content_fasi').children('.fase_active').attr('id');
        console.log("id_fase::::::: ", id_fase);

        var numItems = $('#'+id_fase).children().length;

        if(id_fase == "SignIn"){
            cont_field --;
            setProgressBar(cont_field, numItems);
        }

        if(id_fase == "TimeOut"){
            cont_timeout --;
            setProgressBar(cont_timeout, numItems);
        }

        if(id_fase == "SignOut"){
            cont_signout --;
            setProgressBar(cont_signout, numItems);
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

        //$("#fieldset"+cont_hide).css('display', 'none');
        //$("#fieldset"+cont_field).css('display', 'block');

        //setProgressBar(cont_field);
    
    //     current_fs = $(this).parent().parent();
    //     previous_fs = $(this).parent().parent().prev();
        
    //     $(current_fs).removeClass("show");
    //     $(previous_fs).addClass("show");
        
    //     current_fs.animate({}, {
    //         step: function() {
            
    //             current_fs.css({
    //             'display': 'none',
    //             'position': 'relative'
    //             });
                
    //             previous_fs.css({
    //             'display': 'block'
    //             });
    //         }
    //     });
    });
    
    function finishcheck(){
        // $('input[type="checkbox"]:checked').prop('checked',false);
        // location.reload(true);
    } 
    
    function initcheck(fase){
        
        // cerco il div che contiene la prima fase SignIn attraverso la classe
        // fase_active e poi cerco il div che fa iniziare la checklist
        // con la classe show-content
        if(fase == 'button-signin'){

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

            var array = [];
            // $("input:checkbox[name=1asa:checked").each(function() {
            $("input[name='asa[]']:checked").each(function () {
                if($(this).val() == "ASA3" || $(this).val() == "ASA4"){ 
                    array.push($(this).val());
                }
            });

            if (array && array.length > 0)
                $('#div-alert-asa-image').addClass("hide-content");

            $.each(array, function (index, value)  
            {  
                $('#div-alert-asa').append("<label class='text-center alert-messaggio ' for='paziente_id' ><i class='fas fa-exclamation-triangle fa-2x icon-alert'></i> Atenzione nella fase Sign In il paziente è un "+value+" </label>" ); 
            }); 

            console.log('array::: ',array);

            $('#div-alert-asa-image').addClass('asa-selezionati');
        }
    }

    function setOraFase(fase_set_ora){

        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " ora: "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

        $('#'+fase_set_ora+'').val(datetime);

        // if(fase_set_ora == 'SignIn_inizio')
        //     $('#signin-ora-inizio').val(datetime);

        // if(fase_set_ora == 'signin-ora-fine')
        //     $('#signin-ora-fine').val(datetime);

        // if(fase_set_ora == 'timeout-ora-fine')
        //     $('#timeout-ora-fine').val(datetime)

        // if(fase_set_ora == 'signout-ora-fine')
        //     $('#signout-ora-fine').val(datetime)
        
        
    }


});