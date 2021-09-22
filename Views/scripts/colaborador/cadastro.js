$(document).ready(function() {
    listarCargo();
});

function listarCargo(){
    $.get('https://localhost:5001/Cargo/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {
                $('#cargo').append($('<option></option>').val(resposta[i].id).html(resposta[i].nome));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}