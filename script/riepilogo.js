
function creare_riepilogo(jsonArray){

	//$("#json").append(jsonArray);

	var verificare="";
	var $colum1 ="";
	var $colum2 ="";
	var div_fase1 ="fase_signin";
	var div_fase2 ="fase_timeout";
	var div_fase3 ="fase_signout";
	
	var results = JSON.parse(jsonArray);

	console.log(results.paziente_nome);
	console.log(results.paziente_eta);
	console.log(results.paziente_sesso);
	console.log(results.paziente_cartella);
	console.log(results.paziente_conformita);

	$('#paziente-nome').text(results.paziente_nome);
	$('#paziente-eta').text(results.paziente_eta);
	$('#paziente-sesso').text(results.paziente_sesso);
	$('#num-cartella').text(results.paziente_cartella);

	// $(results.sede).each(function( i, val ) {
	// 	console.log('i: ',+i+ 'val: ',+val);
	// });

	$('#signin-inizio').text(results.signin_ora_inizio);
	$('#signin-fine').text(results.signin_ora_fine);

	generareFasi(results.paziente_domanda, results.paziente_conformita,results.sede_domanda, results.sede, div_fase1 );

	generareFasi(results.procedura_domanda, results.procedura,results.consensi_domanda, results.consensi_conformita, div_fase1 );
	
	generareFasi(results.marcatura_domanda, results.marcatura,results.anestesia_domanda, results.anestesia, div_fase1 );

	generareFasi(results.pulsossimentro_domanda, results.pulsossimentro,results.allergia_domanda, results.allergia, div_fase1 );

	generareFasi(results.rischi_domanda, results.rischi,results.ematica_domanda, results.ematica, div_fase1 );

	generareFasi(results.asa_domanda, results.asa, null,  null, div_fase1);

	////// fase time out

	$('#timeout-inizio').text(results.timeout_ora_inizio);
	$('#timeout-fine').text(results.timeout_ora_fine);

	generareFasi(results.componentiequipe_domanda, results.componentiequipe, results.equipe_domanda,  results.equipe, div_fase2);
	
	generareFasi(results.chirurgo_domanda, results.chirurgo, results.asa_timeout_domanda,  results.asa_timeout, div_fase2);

	generareFasi(results.infermiere_domanda, results.infermiere_criticita, results.profilassi_domanda, results.profilassi, div_fase2);

	generareFasi(results.immagini_domanda, results.immagini, null, null, div_fase2);

	////// fase sign out

	$('#signout-inizio').text(results.signout_ora_inizio);
	$('#signout-fine').text(results.signout_ora_fine);

	generareFasi(results.infermiere_conferma_domanda, results.infermiere_conferma, results.conta_domanda, results.conta, div_fase3);
	
	generareFasi(results.etichettatura_domanda, results.etichettatura, results.dispositivi_domanda,  results.dispositivi, div_fase3);

	generareFasi(results.team_medical_domanda, results.team_medical, results.tromboembolismo_domanda, results.tromboembolismo, div_fase3);
}

function generareFasi(domanda1,conformita1,domanda2,conformita2, div_fase){

	var $dom_row = "";

	$dom_row += '<div class="row">';

	if(domanda1 !== null && conformita1 !== null){
		$colum1 = generareFase_li(domanda1, conformita1);
		console.log('check1-1 : ',$colum1);
		$dom_row += $colum1;
	}
	if(domanda2 !== null && conformita2 !== null){
		$colum2 = generareFase_li(domanda2, conformita2);
		console.log('check2 : ',$colum2);
		$dom_row += $colum2;
	}

	$dom_row += '</div>';

	//$fasi = generareRiepilogo_ol_li($colum1,$colum2);
	$("#"+div_fase+"").append($dom_row);
	console.log('fasi : ',$dom_row);
	
}


// function generareRiepilogo_ol_li(colum1,colum2){
// 	var dom_row = "";
// 	dom_row += '<div class="row">';
// 		dom_row += colum1;
// 		dom_row += colum2;
// 	dom_row += '</div>';
// 	return dom_row;
// }

function generareFase_li(domanda, conformita ){

	var tmpl = "";
	
	tmpl += '<li class="col-6 colum">';
		tmpl += '<div class="riepilogo-domanda">';
			tmpl += '<div class="row">';
				tmpl += '<div class="col-9"><span class="title">'+domanda+'</span></div>';
				// if(conformita == 'true')
				// 	tmpl += '<div class="col riepilogo-buttons"><i class="fas fa-check-circle"></i> Verificato</div>';
					
				// if(conformita == 'noapplicabile')
				// 	tmpl += '<div class="col riepilogo-buttons"><i class="fas fa-check-circle"></i> Non Applicabile</div>';
				if(conformita == 'true' || conformita == 'noapplicabile')
					tmpl += verifica_fase(conformita);

			tmpl += '</div>';		
		tmpl += '</div>';
		tmpl += '<hr>';		
		tmpl += '<div class="riepilogo-conformita">';		
			tmpl += '<div class="row">';
				tmpl += '<div class="col-9 riepilogo-buttons">';
					tmpl += '<i class="fas fa-exclamation-triangle"></i> Hai rilevato delle non conformità:';
				tmpl += '</div>';
				tmpl += '<div class="col-1">';
					if(conformita == 'true')
						tmpl += '<div class="button-non-conformita"><span class="si">No</span></div>';
					else
						tmpl += '<div class="button-non-conformita"><span class="si">Si</span></div>';
				tmpl += '</div>';
			tmpl += '</div>';
			if(conformita != 'true'){

				tmpl += non_conformita(conformita);
				
			}
		tmpl += '</div>';
	tmpl += '</li>';
	
	return tmpl;     
}

function verifica_fase(verifica){

	var check ="";

	if(verifica == 'true')
		check += '<div class="col riepilogo-buttons"><i class="fas fa-check-circle"></i> Verificato</div>';
		
	if(verifica == 'noapplicabile')
		check += '<div class="col riepilogo-buttons"><i class="fas fa-check-circle"></i> Non Applicabile</div>';
	
	return check;
}

function non_conformita(conformita){

	var dom ="";
	
	dom += '<div class="row">';
		dom += '<ol>';
		jQuery.each( conformita, function( i, val ) {
			dom += '<li>'+val+'</li>';
		});
		dom += '</ol>';
	dom += '</div>';
	return dom;
}

function animateContent(direction) {  
    var animationOffset = $('.container').height() - $('.content').height();
    if (direction == 'up') {
        animationOffset = 0;
    }
    
    $('.content').animate({ "marginTop": animationOffset + "px" }, "fast");
}

$(document).ready(function(){

	var step = 25;
	var scrolling = false;

	// Wire up events for the 'scrollUp' link:
	$("#up").on("click", function(event) {
		event.preventDefault();
		// Animates the scrollTop property by the specified
		// step.
		$("#content").animate({
			scrollTop: "-=" + step + "px"
		});
	}).on("mouseover", function(event) {
		scrolling = true;
		scrollContent("up");
	}).on("mouseout", function(event) {
		scrolling = false;
	});


	$("#down").on("click", function(event) {
		event.preventDefault();
		
		$("#content").animate({
			scrollTop: "+=" + step + "px"
		});
	}).on("mouseover", function(event) {
		scrolling = true;
		scrollContent("down");
	}).on("mouseout", function(event) {
		scrolling = false;
	});

	function scrollContent(direction) {
		var amount = (direction === "up" ? "-=2px" : "+=2px");
		$("#content").animate({
			scrollTop: amount
		}, 1, function() {
			if (scrolling) {
				scrollContent(direction);
			}
		});
	}

	// function animateContent(direction) {  
	// 	var animationOffset = $('html, body').height() - $('html, body').height();
	// 	if (direction == 'up') {
	// 		animationOffset = 0;
	// 	}
	
	// 	$('html, body').animate({ "marginTop": animationOffset + "px" }, "fast");
	// }

    // //$(document).on('mouseenter', '.ca-top', function() {
	// $(document).on('mouseover', '.button-top', function() {
		
    // 	//debugger;
	// 	//var div = $('#container-riepilogo');
	// 	var div = $('.box');

    //     interval = setInterval(function(){
    //         count = count || 1;
    //         var pos = div.scrollTop();
    //         div.scrollTop(pos + count);
	// 	}, 10);
		
	// 	console.log('interval', interval);

    // }).click(function() {
    //     if (count < 6) {
    //          count = count+1;
    //     }
    // }).on('mouseout', function() {
    //     // Uncomment this line if you want to reset the speed on out
    //     // count = 0;
    //     clearInterval(interval);
    // });
    
    // //$(document).on('mouseover', '.ca-bottom', function() {
	// $(document).on('mouseover', '.button-bottom', function() {
		
	// 	//var div = $('#container-riepilogo');
	// 	var div = $('.box');

    //     interval = setInterval(function(){
    //         count = count || 1;
    //         var pos = div.scrollTop();
    //         div.scrollTop(pos - count);
	// 	}, 10);
	// 	console.log('interval', interval);
    // }).click(function() {
    //     if (count < 6) {
    //          count = count+1;
    //     }
    // }).on('mouseout', function() {
    //     // Uncomment this line if you want to reset the speed on out
    //     // count = 0;
    //     clearInterval(interval);
    // });

});


	