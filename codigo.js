//Inicio
$(function () {
	//Construccion de tablero
	for (var i = 0; i< 8;i++ ){
		for (var j = 0; j < 8; j++) {
			//def de var y const
			var fila = i;
			var columna = j;
			// evaluo si la fila es par
			if(fila % 2 == 0 ){
				//evaluo si la columna es impar o par
				if(columna % 2 == 1){
					//agrego casillero negro
					$('.grilla').append('<div data-columna="'+columna+'" data-fila="'+fila+'" class="column bg-dark" id="casillero-fila'+fila+'-columna-'+columna+'"></div>');
				}else{
					//agrego casillero blanco
					$('.grilla').append('<div data-columna="'+columna+'" data-fila="'+fila+'" class="column" id="casillero-fila'+fila+'-columna-'+columna+'"></div>');
				}
			//evaluo si la fila es impar
			}else if(fila % 2 == 1){
				//si la columna es par
				if(columna % 2 == 0){
					//agrego casillero negro
					$('.grilla').append('<div data-columna="'+columna+'" data-fila="'+fila+'" class="column bg-dark" id="casillero-fila'+fila+'-columna-'+columna+'"></div>');
				}else{
					//agrego casillero blanco
					$('.grilla').append('<div data-columna="'+columna+'" data-fila="'+fila+'" class="column" id="casillero-fila'+fila+'-columna-'+columna+'"></div>');
				}
			}
		}
	}//.fin de recorrido tablero

	//recorrido de grilla
	var casillas = $('.grilla').children();

	//colocar fichas rojas
	for (var i = 0; i <24; i++) {
		if ($(casillas[i]).attr('class') == 'column bg-dark') {
			$(casillas[i]).append('<div class="roja" id="ficha-n-'+i+'-'+$(casillas[i]).attr('id')+'"></div>');
		}
	}
	//colocar fichas negras
	for (var i = casillas.length -1 ; i >=40; i--) {
		if ($(casillas[i]).attr('class') == 'column bg-dark') {
			$(casillas[i]).append('<div class="negra" id="ficha-n-'+i+'-'+$(casillas[i]).attr('id')+'"></div>');
		}
	}

	$('.negra, .roja').draggable({revert: 'invalid'});

	$('.column').droppable({
			
			accept:function (fichaSeleccionada) {
				//declaracion de variables
				var filaActual = parseInt($(fichaSeleccionada.parent()).attr('data-fila'));
				var colActual =	parseInt($(fichaSeleccionada.parent()).attr('data-columna'));	
				var filaDrop = $(this).attr('data-fila');
				var colDrop = $(this).attr('data-columna');
				var dropHTML = $(this).html();

				//evalua si la ficha seleccionada es roja
				if($(fichaSeleccionada).hasClass('roja')){

					//evalua si la ficha se va a dejar en la siguiente fila
					if(filaDrop == filaActual +1 ){

						//evalua si se deja en uno de los tres lugares permitidos y si el lugar esta vacio
						if((colDrop == colActual || colDrop == (colActual+1) || colDrop == (colActual-1))&& dropHTML == ''){
							return true;
						}else{
							return false;
						}

					//evalua si la ficha se va a dejar 2 filas mas adelante
					}else if(filaDrop == filaActual + 2){

						//definicion de variables						
						var fichaMuerta = $('#casillero-fila'+(filaActual + 1)+'-columna-'+(colActual + 1)).children();
						var fichaMuerta2 = $('#casillero-fila'+(filaActual + 1)+'-columna-'+(colActual - 1)).children();						

						//evalua si se va a dejar en la diagonal uno y si el espacio esta vacio
						if( (colDrop == (colActual+2)) && dropHTML == '' ){
							// evalua si en el medio hay una ficha negra
							if($(fichaMuerta).hasClass('negra')){
								return true;
							}
						//evalua si se va a dejar en la diagonal dos y si el espacio esta vacio							
						}else if( (colDrop == (colActual-2)) && dropHTML == '' ){
							// evalua si en el medio hay una ficha negra
							if($(fichaMuerta2).hasClass('negra')){
								return true;
							}
						}
					}else{
						return false;
					}

				//evalua si la ficha seleccionada es negra
				}else if($(fichaSeleccionada).hasClass('negra')){

					//evalua si la ficha se va a dejar en la fila anterior
					if(filaDrop == filaActual -1 ){

						//evalua si se deja en uno de los tres lugares permitidos y si el lugar esta vacio
						if((colDrop == colActual || colDrop == (colActual+1) || colDrop == (colActual-1))&& dropHTML == ''){
							return true;
						}else{
							return false;
						}

					//evalua si la ficha se va a dejar 2 filas mas atras
					}else if(filaDrop == filaActual -2){

						//Definicion de variables
						var casilleroFichaMuerta = '#casillero-fila'+(filaActual - 1)+'-columna-'+(colActual + 1);
						var casilleroFichaMuerta2 = '#casillero-fila'+(filaActual - 1)+'-columna-'+(colActual - 1);
						var fichaMuerta = $('#casillero-fila'+(filaActual - 1)+'-columna-'+(colActual + 1)).children();
						var fichaMuerta2 = $('#casillero-fila'+(filaActual - 1)+'-columna-'+(colActual - 1)).children();

						//evalua si se va a dejar en la diagonal uno y si el espacio esta vacio	
						if( (colDrop == (colActual+2)) && dropHTML == '' ){
							//evalua si la ficha en medio es roja
							if($(fichaMuerta).hasClass('roja')){
								return true;
							}
						//evalua si se va a dejar en la diagonal dos y si el espacio esta vacio								
						}else if( (colDrop == (colActual-2)) && dropHTML == '' ){
							//evalua si la ficha en medio es roja
							if($(fichaMuerta2).hasClass('roja')){
								return true;
							}
						}
					}else{
						return false;
					}					
				}else{
					return false;
				}
			},
			drop: function( event, ui ) {
				//declaracion de variables
				var fichaMovida = $(ui.draggable).attr('id');
				var filaAnterior = parseInt( ($('#'+fichaMovida).parent()).attr('data-fila') );
				var colAnterior = parseInt( ($('#'+fichaMovida).parent()).attr('data-columna') );
				var colDroped =	parseInt($(this).attr('data-columna'));	
				var filaDroped =  parseInt($(this).attr('data-fila'));

				//evalua si la ficha seleccionada es roja
				if($('#'+fichaMovida).hasClass('roja')){
					//declaracion de variables
					var casilleroFichaMuerta = '#casillero-fila'+(filaDroped - 1)+'-columna-'+(colDroped + 1);
					var casilleroFichaMuerta2 = '#casillero-fila'+(filaDroped - 1)+'-columna-'+(colDroped - 1);
					var fichaMuerta = $('#casillero-fila'+(filaDroped - 1)+'-columna-'+(colDroped + 1)).children();
					var fichaMuerta2 = $('#casillero-fila'+(filaDroped - 1)+'-columna-'+(colDroped - 1)).children();

					//evalua si se movio dos casilleros
					if(filaDroped == filaAnterior+2){
						//evalua si se movio a la diagonal uno
						if(colAnterior + 2 == colDroped) {

							//si la ficha muerta tiene la clase negra muere 
							if( $(casilleroFichaMuerta2).html() != '' && $(fichaMuerta2).hasClass('negra') ){
						 		$(casilleroFichaMuerta2).html('')
							}
						//evalua si se movio a la diagonal dos
						}else if(colAnterior - 2 == colDroped){
							//si la ficha muerta tiene la clase negra muere 
							if( $(casilleroFichaMuerta).html() != '' && $(fichaMuerta).hasClass('negra') ){
						 		$(casilleroFichaMuerta).html('')
							}
						}
					}
					//bloquea de movimiento de rojas
					$('.roja').draggable('disable');
					//permite el movimiento de las negras
					$('.negra').draggable('enable');

				//evalua si la ficha movida es negra
				}else if($('#'+fichaMovida).hasClass('negra')){
					//declaracion de variables
					var casilleroFichaMuerta = '#casillero-fila'+(filaDroped + 1)+'-columna-'+(colDroped + 1);
					var casilleroFichaMuerta2 = '#casillero-fila'+(filaDroped + 1)+'-columna-'+(colDroped - 1);
					var fichaMuerta = $('#casillero-fila'+(filaDroped + 1)+'-columna-'+(colDroped + 1)).children();
					var fichaMuerta2 = $('#casillero-fila'+(filaDroped + 1)+'-columna-'+(colDroped - 1)).children();

					//evalua si se movio dos filas 
					if(filaDroped == filaAnterior-2){
						//evalua si se movio a la diagonal uno
						if(colAnterior + 2 == colDroped) {

							//si la ficha muerta tiene la clase roja muere 
							if( $(casilleroFichaMuerta2).html() != '' && $(fichaMuerta2).hasClass('roja') ){
						 		$(casilleroFichaMuerta2).html('')
							}
						//evalua si se movio a la diagonal dos
						}else if(colAnterior - 2 == colDroped){

							//si la ficha muerta tiene la clase roja muere 
							if( $(casilleroFichaMuerta).html() != '' && $(fichaMuerta).hasClass('roja') ){
						 		$(casilleroFichaMuerta).html('')
							}
						}
					}
					//bloquea las fichas negras
					$('.negra').draggable('disable');
					//desbloquea las fichas rojas
					$('.roja').draggable('enable');
				}else{
					//permite el movimiento de las fichas rojas y negras
					$('.negra, .roja').draggable('enable');
				}
				//Incerta la ficha movida dentro del casillero nuevo
				$(this).append(ui.draggable);
				//centra la ficha movida en el casillero
				$(ui.draggable).css({left:0, right:0, bottom:0, top:0});
	        }
		});
});