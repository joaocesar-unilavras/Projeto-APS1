$(document).ready(function() {
    listarGrid();
    $('#filtrar').click(filtrar);
});

function listarGrid(){
    $.get('https://localhost:5001/Colaborador/Listar')
        .done(function(resposta) { 
            $('#grid tr').remove();
            for(i = 0; i < resposta.length; i++) {
                let dados = resposta[i];
                
                $('#grid').append($('<tr></tr>').attr('id', dados.id));
                
                $('#' + dados.id).append($('<td></td>').html(dados.id));
                $('#' + dados.id).append($('<td></td>').html(dados.nome));
                $('#' + dados.id).append($('<td></td>').html(dados.idCargoNavigation.nome));
                $('#' + dados.id).append($('<td></td>').html('R$ ' + dados.salario.toFixed(2).toString().replace('.', ',')));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

function filtrar(){
    var valorInicial = $('#valorInicial').val();
    var valorFinal = $('#valorFinal').val();

    var erro = false;

    if (valorInicial == '' || valorFinal == '') {
        alert('Preencha os campos!');
        erro = true;
    }

    if (valorInicial >= valorFinal) {
        alert('O valor inicial deve ser menor que o final!');
        erro = true;
    }

    if (!erro) {
        $.get('https://localhost:5001/Colaborador/ListarPorFaixa?valorInicial='+valorInicial+'&valorFinal='+valorFinal)
        .done(function(resposta) { 
            $('#grid tr').remove();
            for(i = 0; i < resposta.length; i++) {
                let dados = resposta[i];
                
                $('#grid').append($('<tr></tr>').attr('id', dados.id));
                
                $('#' + dados.id).append($('<td></td>').html(dados.id));
                $('#' + dados.id).append($('<td></td>').html(dados.nome));
                $('#' + dados.id).append($('<td></td>').html(dados.idCargoNavigation.nome));
                $('#' + dados.id).append($('<td></td>').html('R$ ' + dados.salario.toFixed(2).toString().replace('.', ',')));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
    }
}