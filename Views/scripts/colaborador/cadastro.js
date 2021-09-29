$(document).ready(function() {
    listarCargo();
    $('#salvar').click(salvar);
});

function listarCargo(){
    $.get('https://localhost:5001/Cargo/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {
                $('#cargo').append($('<option></option>').val(resposta[i].id).html(resposta[i].nome));
                $('#cargoFiltro').append($('<option></option>').val(resposta[i].id).html(resposta[i].nome));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

function salvar(){
    var nome = $('#nome').val();
    var salario = $('#salario').val();
    var idCargo = $('#cargo').val();

    var colaborador = {
        nome: nome,
        salario: parseFloat(salario),
        idCargo: parseInt(idCargo)
    };

    $.ajax({
        type: 'POST',
        url: 'https://localhost:5001/Colaborador/Cadastrar',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(colaborador),
        success: function(resposta) { 
            listarGrid();
            alert(resposta);
        },
        error: function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        }
    });
}