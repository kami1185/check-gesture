/*$(function () {

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#form-checklist').validator();


    // when the form is submitted
    $('#form-checklist').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});*/
$(document).ready(function(){

    $("#top").click(function(){
		alert('top');
	});

	$("#up").click(function(){
		alert('up');
	});

    // if($.trim($('#idelement').val()).lenght==0)

    function ajaxCallRequest(f_method, f_url, f_data) {

        $.ajax({
            url: '',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                var jsonResult = JSON.stringify(data);
                //$('#target').html(data.msg);
            }
            //data: JSON.stringify(person)
        });

        $("#dataSent").val(unescape(f_data));
        var f_contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        $.ajax({
          url: f_url,
          type: f_method,
          contentType: f_contentType, //'application/json'
          dataType: 'json',
          data: f_data,
          success: function(data) {
            var jsonResult = JSON.stringify(data);
            $("#results").val(unescape(jsonResult));
            
          }
          
        });
      }

    $("#button-fasi-terminate").click(function(){
        validateForm();
    });

    $("#button-fasi-terminate").mouseenter(function(){
        validateForm();
    });

    function validateForm(){

        $('.titolo-checklist').text('Riepilogo della Checklist Fase Sign In');

        var form = $('#form-checklist');

        var data = $(form).serialize();

        var data2 = $(form).serializeArray();

        var jsonArray = $('#form-checklist').serializeJSON();
        var jsonString = JSON.stringify(jsonArray);

        console.log('stringify-array: ',JSON.stringify(data2));

        //console.log('serialize: ',data);

        console.log('serializeArray :',data2);

        console.log('serializeJSON :',jsonArray);

        console.log('stringify :',jsonString);

        $('#data').empty();

        $("#data").load("riepilogo.html", function( response, status, xhr ) {
            if ( status === "error" ) {
                var msg = "Sorry but there was an error: ";
                //$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
                alert(msg + xhr.status + " " + xhr.statusText);
            }				
            var parent = $(this);
            parent.fadeIn();

            creare_riepilogo(jsonString);
            
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