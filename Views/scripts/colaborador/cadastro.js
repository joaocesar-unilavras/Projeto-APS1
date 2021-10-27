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

    var id;
    var url;
    var metodo;
    if ($('#salvar').html() == 'Editar'){
        id = $('#id').val();
        metodo = 'PUT';
        url = 'https://localhost:5001/Colaborador/Alterar';
    }
    else{
        id = 0;
        metodo = 'POST';
        url = 'https://localhost:5001/Colaborador/Cadastrar';
    }
    
    var colaborador = {
        id: parseInt(id),
        nome: nome,
        salario: parseFloat(salario),
        idCargo: parseInt(idCargo)
    };

    

    $.ajax({
        type: metodo,
        url: url,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(colaborador),
        success: function(resposta) { 
            listarGrid();

            $('#id').val(0);
            $('#nome').val('');
            $('#salario').val('');
            $('#cargo').val(0);
            $('#salvar').html('Salvar')

            alert(resposta);
        },
        error: function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        }
    });
}