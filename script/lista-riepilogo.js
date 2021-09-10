$(document).ready(function(){
    
    //GetDatePatient(null,'https://localhost:44366/riepilogo/getpatient');

    $('#table-riepilogo').DataTable({
        // DataTable solo usa POST come metodo x inviare i parametri
        //"paging": false,
        //"searching": false,
        "destroy": true,
        // "searching": false,
        "processing": true,
        "serverSide": true,
        "filter": true,
        
        "language": {
            "paginate": {
                "previous": "indietro",
                "next": "avanti"
            },
            "search": "Cerca Paziente per Nome o Cognome o Codice Fiscale:",
            "show": "Numero di registri",
            "emptyTable": "Non ci sono dati disponibili per questa data"
        },
        "ajax": {
            "url": ''+url+'/riepilogo/getpatient',
            //"url": 'https://localhost:44366/riepilogo/getpatient',
            "type": "POST",
            "dataType": "JSON",
            // passiamo i parametri x la query 
            // "data": { "dateinit": "01/05/2021", 
            //           "dateend":"05/05/2021"
            "data": { "dateinit": null
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
        "columns": [
            //{ "data": "id","name": "Id", "autoWidth": true },
            { "data": "nome", "name": "Nome", "autoWidth": true },
            { "data": "cognome", "name": "Cognome", "autoWidth": true },
            { "data": "codiceFiscale", "name": "Codice Fiscale", "autoWidth": true },
            { "data": "data", "name": "Data Intervento", "autoWidth": true },
            {
                // prendiamo il valore id dell'oggetto data impostato in columns 
                // { "data": "id","name": "Id", "autoWidth": true } passando il 
                // valore dell'id al metodo ViewRiepilogo
                // con render impostiamo un button con l'id 
                "data": 'id',
                "render": function (data, type, row, meta) { return "<a href='#' class='btn btn-success button-lista' onclick=ViewRiepilogo('" + data + "'); >Visualizza</a>";   }
            },
        ]
    } );

    $('#sandbox-container1 .input-group.date').datepicker({
        format: "dd/mm/yyyy",
        todayBtn: "linked",
        clearBtn: true,
        language: "it",
        multidate: false,
        //toggleActive: true,
        autoclose: true,
        todayHighlight: true
    });

    // $('#sandbox-container2 .input-group.date').datepicker({
    //     todayBtn: "linked",
    //     clearBtn: true,
    //     language: "it",
    //     multidate: false,
    //     toggleActive: true
    // });

    $("#data1").on("change", function(e) {
        var lastValue = null;
        if(lastValue !== e.target.value){
            lastValue = e.target.value;
            GetDatePatient(lastValue,''+url+'/riepilogo/getpatient');
            //GetDatePatient(lastValue,'https://localhost:44366/riepilogo/getpatient');
        }
    })

    // var date = "23/04/2021";
    // var myJSON = JSON.stringify(date);

    function GetDatePatient(data,url){

        $('#table-riepilogo').DataTable({
            // DataTable solo usa POST come metodo x inviare i parametri
            //"paging": false,
            //"searching": false,
            "destroy": true,
            // "searching": false,
            "processing": true,
            "serverSide": true,
            "filter": true,
            
            "language": {
                "paginate": {
                    "previous": "indietro",
                    "next": "avanti"
                },
                "search": "Cerca Paziente per Nome o Cognome o Codice Fiscale:",
                "show": "Numero di registri",
                "emptyTable": "Non ci sono dati disponibili per questa data"
            },
            "ajax": {
                "url": url,
                "type": "POST",
                "dataType": "JSON",
                // passiamo i parametri x la query 
                // "data": { "dateinit": "01/05/2021", 
                //           "dateend":"05/05/2021"
                "data": { "dateinit": data
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
            "columns": [
                // { "data": "id","name": "Id", "autoWidth": true },
                { "data": "nome", "name": "Nome", "autoWidth": true },
                { "data": "cognome", "name": "Cognome", "autoWidth": true },
                { "data": "codiceFiscale", "name": "Codice Fiscale", "autoWidth": true },
                { "data": "data", "name": "Data Intervento", "autoWidth": true },
                {
                    // prendiamo il valore id dell'oggetto data impostato in columns 
                    // { "data": "id","name": "Id", "autoWidth": true } passando il 
                    // valore dell'id al metodo ViewRiepilogo
                    // con render impostiamo un button con l'id 
                    //"data": 'id',
                    "data": 'idchecklist',
                    "render": function (data, type, row, meta) { return "<a href='#' class='btn btn-success button-lista' onclick=ViewRiepilogo('"+data+"'); >Visualizza</a>";   }
                },
            ]
        } );

    }

});

function ViewRiepilogo(id){
    var request = new XMLHttpRequest(), file, fileURL;
    request.open("POST", ''+url+'/riepilogo/getsummarypatient');
    //request.open("POST", 'https://localhost:44366/riepilogo/getsummarypatient');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = "arraybuffer";
    request.send(id);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            file = new Blob([request.response], { type: 'application/pdf' });
            if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
                window.navigator.msSaveOrOpenBlob(file);
            } else {
                fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            }
        }
    };
}