var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;


$(document).ready(function (){

	$('#btn_iniciar_jogo').click(function(){
		// Valida a digitação dos nomes do jogador

		if($('#entrada_apelido_jogador1').val() == ''){
			alert('Nome não informado do jogador 1');
			return false;
		}

		if($('#entrada_apelido_jogador2').val() == ''){
			alert('Nome não informado do jogador 2');
			return false;
		}

		//Exibir os apelidos
		$('#nome_jogador1').html($('#entrada_apelido_jogador1').val());
		$('#nome_jogador2').html($('#entrada_apelido_jogador2').val());

		// defina a tela do jogo
		$('#pagina_inicial').hide();
		$('#palco_jogo').show();

	})


	$('.jogada').click(function(){

		var id_campo_clicado = this.id;
		// limpando o click do objeto clicado
		$('#'+id_campo_clicado).off();

		//chama a função de jogada
		jogada(id_campo_clicado);


	})


	function jogada(id){
		var icone = '';
		var ponto = 0;


		if((rodada % 2) == 1){
			ponto = -1;
			icone = 'url("imagens/marcacao_1.png")';
		} else {
			ponto = 1;
			icone = 'url("imagens/marcacao_2.png")';
		}

		rodada++;

		$('#'+id).css('background-image', icone);

		var linha_coluna = id.split('-');

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifica_combinacao();
	}

	function verifica_combinacao(){

		// verifica na horizontal
		var pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['a'][i];
	    }

	    ganhador(pontos);
	    pontos = 0;
	    for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['b'][i];
	    }

		ganhador(pontos);

	   	pontos = 0;
	    for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['c'][i];
	    }

	    ganhador(pontos);

	    // verificação na vertical
	    for(var l = 1; l <=3; l++){

	    	pontos = 0;
	    	pontos += matriz_jogo['a'][l];
	    	pontos += matriz_jogo['b'][l];
	    	pontos += matriz_jogo['c'][l];

	    	ganhador(pontos);
	    }

	    // verificando na diagonal
	    pontos = 0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];

		ganhador(pontos);

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];

		ganhador(pontos);



	}

	function ganhador(pontos){

		if(pontos == -3){
			var jogador_1 = $('#entrada_apelido_jogador1').val();
			alert(jogador_1 + ' é o vencedor');
			$('.jogada').off();
		}else if(pontos == 3){
			var jogador_2 = $('#entrada_apelido_jogador2').val();
			alert(jogador_2 + ' é o vencedor');
			$('.jogada').off();
		}
	}


});