$(document).ready(function(){

    $('.datepicker').datepicker({
        clearBtn: true,
        format: "dd/mm/yyyy",
        language: "it",
        todayHighlight: true
    });


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
        startDate: "today",
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
        
        var form = $('#form-dati-pazienti');

        if (form[0].checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.addClass('was-validated')

        if (form[0].checkValidity() === true) {

            Notiflix.Loading.Hourglass('Salvando paziente...');
            
            var jsonSerialize = $('#form-dati-pazienti').serializeJSON();
            var jsonString = JSON.stringify(jsonSerialize);

            console.log('jsonSerialize :',jsonSerialize);

            console.log('stringify :',jsonString);

            $.ajax({
                'url': ''+url+'/check/savepaziente',
                //'url': 'https://localhost:44366/savepaziente',
                'method':'POST',
                'dataType': 'json',
                //processData: false,
                'contentType': 'application/json',
                'data': jsonString,
                success: function (data) {
                    
                    Notiflix.Loading.Remove();
                    //var answer_server = JSON.parse(data);
                    if(data.successful == "true"){
                        //document.getElementById("#form-dati-pazienti").reset();
                        $("#form-dati-pazienti").trigger("reset");
                        Notiflix.Report.Success('Operazione riuscita',
                        ''+ data.messagge +'','Ok');

                        form.removeClass('was-validated')
                    }

                    if(data.successful == "false"){
                        Notiflix.Report.Failure('Attenzione',
                        ''+ data.messagge +'','Ok');
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
    });
    
});