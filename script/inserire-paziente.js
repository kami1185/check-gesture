$(document).ready(function(){

    $('#paziente-nascita-div .input-group.date').datepicker({
        format: "dd/mm/yyyy",
        todayBtn: "linked",
        clearBtn: true,
        language: "it",
        multidate: false,
        //toggleActive: true,
        autoclose: true,
        todayHighlight: true
    });

    $('#paziente-ricovero-div .input-group.date').datepicker({
        format: "dd/mm/yyyy",
        todayBtn: "linked",
        clearBtn: true,
        language: "it",
        multidate: false,
        //toggleActive: true,
        autoclose: true,
        todayHighlight: true
    });

    $("#button-inserire-paziente").click(function(){

        // $(document).on('click', '#button-inserire-paziente', function(event) {
        // $("#container-formulario").removeClass('show-content').addClass('hide-content');
        // $("#menu-main").removeClass('hide-content').addClass('show-content');

        var form = $('#form-dati-pazienti');

        // var jsonArray = $('#form-checklist').serializeArray();
        // var jsonArraySerialize = JSON.stringify(jsonArray);
        // console.log('jsonArraySerialize: ',jsonArraySerialize);

        var jsonSerialize = $('#form-dati-pazienti').serializeJSON();
        var jsonString = JSON.stringify(jsonSerialize);

        console.log('jsonSerialize :',jsonSerialize);

        console.log('stringify :',jsonString);

        $.ajax({
            'url': 'https://localhost:44366/check/savepaziente',
            'method':'POST',
            'dataType': 'json',
             //processData: false,
            'contentType': 'application/json',
            'data': jsonString,
            success: function (data) {
                
                var answer_server = JSON.parse(data);

                //Notiflix.Loading.Remove();

            },
            error: function (xhRequest, ErrorText, thrownError) {
                //alert("Errore al caricare la telecamera");
                console.log('xhRequest: ' + xhRequest + "\n");
                console.log('ErrorText: ' + ErrorText + "\n");
                console.log('thrownError: ' + thrownError + "\n");
            }
        });

    });

    
});