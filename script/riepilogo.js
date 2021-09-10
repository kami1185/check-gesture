function creare_riepilogo(jsonArray){

	// $("#button-back-home").click(function(){
    //     window.location.reload('true');
    // });

    // $("#button-back-home").on("mouseover", function () {
    //     window.location.reload('true');
    // });
	
	//$("#json").append(jsonArray);

	var div_fase1 ="fase_signin";
	var div_fase2 ="fase_timeout";
	var div_fase3 ="fase_signout";
	
	var results = JSON.parse(jsonArray);

	// console.log(results.paziente_nome);
	// console.log(results.paziente_eta);
	// console.log(results.paziente_sesso);
	// console.log(results.paziente_cartella);
	// console.log(results.paziente_conformita);

	$('#paziente-nome').text(results.paziente_nome);
	$('#paziente-cognome').text(results.paziente_cognome);
	$('#paziente-eta').text(results.paziente_data_nascita);
	$('#paziente-codicefiscale').text(results.paziente_codicefiscale);
	$('#paziente-percorso').text(results.paziente_percorso);
	$('#paziente-diagnosi').text(results.paziente_diagnosi);

	// $(results.sede).each(function( i, val ) {
	// 	console.log('i: ',+i+ 'val: ',+val);
	// });

	$('#signin-inizio').text(results.signin_ora_inizio);
	$('#signin-fine').text(results.signin_ora_fine);

	// jQuery.each( results.consensi, function( i, val ) {
	// 	console.log('CONSENSIII ID : ',val.split(',')[0]);
	// 	console.log('CONSENSIII RI : ',val.split(',')[1]);
	// });

	generareFasi(results.paziente_domanda, results.risposta1,results.sede_domanda, results.risposta2, div_fase1 );

	generareFasi(results.procedura_domanda, results.risposta3,results.consensi_domanda, results.risposta4, div_fase1 );
	
	generareFasi(results.marcatura_domanda, results.risposta5,results.anestesia_domanda, results.risposta6, div_fase1 );

	generareFasi(results.pulsossimentro_domanda, results.risposta7,results.allergia_domanda, results.risposta8, div_fase1 );

	generareFasi(results.rischi_domanda, results.risposta9,results.ematica_domanda, results.risposta10, div_fase1 );

	generareFasi(results.asa_domanda, results.risposta11, null,  null, div_fase1);

	////// fase time out

	$('#timeout-inizio').text(results.timeout_ora_inizio);
	$('#timeout-fine').text(results.timeout_ora_fine);

	generareFasi(results.componentiequipe_domanda, results.risposta12, results.equipe_domanda,  results.risposta13, div_fase2);
	
	generareFasi(results.chirurgo_domanda, results.risposta14, results.asa_timeout_domanda,  results.risposta15, div_fase2);

	generareFasi(results.infermiere_domanda, results.risposta16, results.profilassi_domanda, results.risposta17, div_fase2);

	generareFasi(results.immagini_domanda, results.risposta18, null, null, div_fase2);

	////// fase sign out

	$('#signout-inizio').text(results.signout_ora_inizio);
	$('#signout-fine').text(results.signout_ora_fine);

	generareFasi(results.infermiere_conferma_domanda, results.risposta19, results.conta_domanda, results.risposta20, div_fase3);
	
	generareFasi(results.etichettatura_domanda, results.risposta21, results.dispositivi_domanda,  results.risposta22, div_fase3);

	generareFasi(results.team_medical_domanda, results.risposta23, results.tromboembolismo_domanda, results.risposta24, div_fase3);
}

function generareFasi(domanda1,conformita1,domanda2,conformita2, div_fase){

	var $dom_row = "";

	$dom_row += '<div class="row">';

	if(domanda1 !== null && conformita1 !== null){
		$colum1 = generareFase_li(domanda1, conformita1);
		//console.log('check1-1 : ',$colum1);
		$dom_row += $colum1;
	}
	if(domanda2 !== null && conformita2 !== null){
		$colum2 = generareFase_li(domanda2, conformita2);
		//console.log('check2 : ',$colum2);
		$dom_row += $colum2;
	}

	$dom_row += '</div>';

	//$fasi = generareRiepilogo_ol_li($colum1,$colum2);
	$("#"+div_fase+"").append($dom_row);
	//console.log('fasi : ',$dom_row);
	
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
	var risposta = "";
	jQuery.each( conformita, function( i, val ) {
		//console.log('iddddddd : ',val.split(',')[0]);
		//console.log('risposta : ',val.split(',')[1]);
		risposta = val.split(',')[1];

	});
	
	//console.log('length: '+ conformita.lenght);
	console.log('RISPOSTA: '+ risposta);
	
	tmpl += '<li class="col-6 colum">';
		tmpl += '<div class="riepilogo-domanda">';
			tmpl += '<div class="row">';
				tmpl += '<div class="col-11"><span class="title">'+domanda+'</span></div>';
				
					// if(risposta == 'Si' || risposta == 'No')
					// 	tmpl += '<div class="col riepilogo-buttons"><i class="fas fa-check-circle"></i> Verificato</div>';
					
				// if(conformita == 'noapplicabile')
				// 	tmpl += '<div class="col riepilogo-buttons"><i class="fas fa-check-circle"></i> Non Applicabile</div>';
				// if(conformita == 'true' || conformita == 'noapplicabile')
					// if(risposta == 'Si' || risposta == 'No')
					// 	tmpl += verifica_fase(conformita);

			tmpl += '</div>';		
		tmpl += '</div>';
		tmpl += '<hr>';		
		tmpl += '<div class="riepilogo-conformita">';		
			tmpl += '<div class="row">';
				tmpl += '<div class="col-9 riepilogo-buttons">';
					//tmpl += '<i class="fas fa-exclamation-triangle"></i> Hai rilevato delle non conformità:';
				
					if(risposta == 'No')
						tmpl += '<div class="button-non-conformita"><span class="si">No</span></div>';
					if(risposta == 'Si')
						tmpl += '<div class="button-non-conformita"><span class="si">Si</span></div>';
					else{
						tmpl += non_conformita(conformita);
					}

				tmpl += '</div>';
				tmpl += '<div class="col-1">';

					
					if(risposta == 'Si' || risposta == 'No')
						tmpl += '<div class="col riepilogo-buttons"><i class="fas fa-check-circle"></i> Verificato</div>';
					else
						tmpl += '<div class="col riepilogo-buttons"><i class="fas fa-exclamation-triangle"></i></div>';


					// if(risposta == 'No')
					// 	tmpl += '<div class="button-non-conformita"><span class="si">No</span></div>';
					// if(risposta == 'Si')
					// 	tmpl += '<div class="button-non-conformita"><span class="si">Si</span></div>';


				tmpl += '</div>';
			tmpl += '</div>';

			// if(risposta != 'No' || risposta != 'Si'){
			// 	tmpl += non_conformita(conformita);
			// }

		tmpl += '</div>';
	tmpl += '</li>';
	
	return tmpl;     
}

function verifica_fase(verifica){

	var check ="";

	if(verifica == 'Si' || verifica == 'No')
		check += '<div class="col riepilogo-buttons"><i class="fas fa-check-circle"></i> Verificato</div>';
		
	if(verifica == 'noapplicabile')
		check += '<div class="col riepilogo-buttons"><i class="fas fa-check-circle"></i> Non Applicabile</div>';
	
	return check;
}

function non_conformita(conformita){

	var dom ="";
	
	//dom += '<div class="row">';
		dom += '<ol>';
			jQuery.each( conformita, function( i, val ) {

				//console.log('iddddddd : ',val.split(',')[0]);
				//console.log('risposta : ',val.split(',')[1]);
				dom += '<li>'+val.split(',')[1]+'</li>';

			});
		dom += '</ol>';
	//dom += '</div>';
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

});


	