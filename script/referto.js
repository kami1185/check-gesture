// $(document).on('submit', '#addressform', function (e) {
//     $.ajax({
//       type: 'post',
//       url: 'data/process.php',
//       data: $(this).serialize(), // <----serialize with "this"
//       success: function () {
//           feedbar.innerHTML='<div class="text-success">New Addressed Saved Successfully</div>';
//       },
//       error: function () { //<----use error function instead
//           feedbar.innerHTML='<div class="text-danger">Error Saving New Address</div>';
//       }
//     });
//     e.preventDefault();
// });


function ViewReferto(id_referto){

    Notiflix.Loading.Hourglass('Visualizzando il referto...');
    
    var request = new XMLHttpRequest(), file, fileURL;
    request.open("POST", ''+url+'/referti/viewpdf');
    //request.open("POST", 'https://localhost:44366/referti/viewpdf');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = "arraybuffer";
    request.send(id_referto);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            Notiflix.Loading.Remove();
            file = new Blob([request.response], { type: 'application/pdf' });
            if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
                window.navigator.msSaveOrOpenBlob(file);
            } else {
                var file = window.URL.createObjectURL(file);
                document.querySelector("iframe").src = file;
                //fileURL = URL.createObjectURL(file);
                //window.open(fileURL);
            }
        }
        else{
            Notiflix.Loading.Remove();
        }
    };
        
    // $.ajax({
    //     'url': 'https://localhost:44366/referti/viewpdf',
    //     'method':'POST',
    //     'dataType': 'json',
    //     'contentType': 'application/json',
    //     'data': id_referto,
    //     success: function (data) {

    //         Notiflix.Loading.Remove();

    //         if(data.successful == "false"){
    //             Notiflix.Report.Failure('Attenzione',
    //             ''+ data.messagge +'','Ok');
    //         }
    //     },
    //     error: function (xhRequest, ErrorText, thrownError) {
    //         console.log('xhRequest: ' + xhRequest + "\n");
    //         console.log('ErrorText: ' + ErrorText + "\n");
    //         console.log('thrownError: ' + thrownError + "\n");
    //         Notiflix.Loading.Remove();
    //     }
    // });
}



$(document).on('mouseenter', '#table-referti', function (e) {
        
    if(e.target && e.target.tagName === "BUTTON")
    {
       

            var id_referto = "";
            id_referto = $("#"+e.target.id).attr('idreferto')
            console.log(id_referto)
            ViewReferto(id_referto)
        
    // Notiflix.Loading.Hourglass('Visualizzando il referto...');
    
    // var request = new XMLHttpRequest(), file, fileURL;
    // request.open("POST", ''+url+'/referti/viewpdf');
    // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // request.responseType = "arraybuffer";
    // request.send(id_referto);
    // request.onreadystatechange = function () {
    //     if (request.readyState === 4 && request.status === 200) {
    //         Notiflix.Loading.Remove();
    //         file = new Blob([request.response], { type: 'application/pdf' });
    //         if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
    //             window.navigator.msSaveOrOpenBlob(file);
    //         } else {
    //             var file = window.URL.createObjectURL(file);
    //             document.querySelector("iframe").src = file;
    //         }
    //     }
    //     else{
    //         Notiflix.Loading.Remove();
    //     }
    // };
        
    }
});


$(document).ready(function(){

    function CreateTableReferti(data){

        $("#table-referti tbody").empty();
        
        for (var i = 0; i < data.length; ++i) { 
            // <button type='button' id='button-referto' class='btn btn-success' onclick=ViewReferto(" + data[i].idReferto + ")>Referti <i class='fas fa-clipboard-check'></i> </button>                  
            // var addRowTable = "<tr><td>"+data[i].dataRicezione+"</td><td>"+data[i].laboratorio+"</td><td><a href='#' class='btn btn-success' onclick=ViewReferto(" + data[i].idReferto + "); >Inizia Checklist</a></td></tr>"
            var addRowTable = "<tr><td class='table-spacing'>"+data[i].dataRicezione+"</td><td class='table-spacing'>"+data[i].laboratorio+"</td><td class='table-spacing'><button type='button' id='button-viewreferto"+i+"' class='btn btn-success button-lista' idreferto="+data[i].idReferto+" onclick=ViewReferto(" + data[i].idReferto + ")>Visualizza <i class='fas fa-clipboard-check'></i></button></td></tr>"
            $("#table-referti tbody").append(addRowTable);
            console.log(data[i].idReferto + " " + data[i].dataRicezione);
        }

        // for (var i = 0; i < 30; ++i) { 
        //     var addRowTable = "<tr><td class='table-spacing'>"+i+"</td><td class='table-spacing'>"+i+"</td><td class='table-spacing'><button type='button' id='button-viewreferto' class='btn btn-success' >Visualizza <i class='fas fa-clipboard-check'></i></button></td></tr>"
        //     $("#table-referti tbody").append(addRowTable);
        // }

    }

    // button x aprire la popup del paziente
    $("#button-referto").mouseenter(function( event ){

        var pazienteid = $.trim($("#paziente_id").val());

        if(pazienteid != "")
        {
            Notiflix.Loading.Hourglass('Caricando i referti...');
            
            $.ajax({
                'url': ''+url+'/referti/lista',
                //'url': 'https://localhost:44366/referti/lista',
                'method':'POST',
                'dataType': 'json',
                //processData: false,
                'contentType': 'application/json',
                'data': pazienteid,
                success: function (data) {

                    if(data.successful == "false"){
                        Notiflix.Loading.Remove();
                        Notiflix.Report.Failure('Attenzione',''+ data.messagge +'','Ok');
                    }
                    else{
                        CreateTableReferti(data);
                        Notiflix.Loading.Remove();
                        $("#paziente-referti").modal('show');
                    }
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
        else{
            Notiflix.Report.Failure('Attenzione','Non ci sono referti nel sistema Intranet','Ok');
            //CreateTableReferti(data);
            //$("#paziente-referti").modal('show');
        }

    });

    // $("#modal_popup_sensi").mouseenter(function( event ){
    //     $("#non-conformita-sensi").modal('show');
    // });

    // $("#modal_popup_conta").mouseenter(function( event ){
    //     $("#non-conformita-conta").modal('show');
    // });

    // button x chiudere tutte le popup
    $('.close_popup').mouseenter(function( event ){

        if($(this).attr('id') == "close_popup_paziente"){
            $("#paziente-referti").modal('hide');
        }
        
        // if($(this).attr('id') == "close_popup_conta"){
        //     $('input[name=conta]').prop('checked', false);
        //     $("#non-conformita-conta").modal('hide');
        // }
    });

    // $('.salva-dati').mouseenter(function( event ){

    //     if($(this).attr('id') == "salva-dati-paziente"){
    //         validatecheckbox('div-hide-paziente','checkbox-modal-paziente');
    //         $("#non-conformita-paziente").modal('hide');
    //     }
    //     if($(this).attr('id') == "salva-dati-consensi"){
    //         validatecheckbox('div-hide-consensi','checkbox-modal-consensi');
    //         $("#non-conformita-sensi").modal('hide');
    //     }

    //     if($(this).attr('id') == "salva-dati-conta"){
    //         validatecheckbox('div-hide-conta','checkbox-modal-conta');
    //         $("#non-conformita-conta").modal('hide');
    //     }
    // });
});