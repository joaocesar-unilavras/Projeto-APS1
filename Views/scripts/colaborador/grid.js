$(document).ready(function() {
    listarGrid();
    $('#filtrarSalario').click(filtrarSalario);
    $('#cargoFiltro').change(filtrarCargo);
    $('#limparFiltro').click(limparFiltro);
    $('#orderCrescente').click(listarGridCrescente);
    $('#orderDecrescente').click(listarGridDecrescente);
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
                $('#' + dados.id).append($('<td></td>').html(formatarSalario(dados.salario)));
                $('#' + dados.id).append($('<td></td>').html('<button type=\"button\" onclick=\"visualizar('+ dados.id +')\">Visualizar</button> <button type=\"button\" onclick=\"excluir('+ dados.id +')\">Excluir</button>'));

            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

function listarGridDecrescente(){
    $.get('https://localhost:5001/Colaborador/Listar?order=d')
        .done(function(resposta) { 
            $('#grid tr').remove();
            for(i = 0; i < resposta.length; i++) {
                let dados = resposta[i];
                
                $('#grid').append($('<tr></tr>').attr('id', dados.id));
                
                $('#' + dados.id).append($('<td></td>').html(dados.id));
                $('#' + dados.id).append($('<td></td>').html(dados.nome));
                $('#' + dados.id).append($('<td></td>').html(dados.idCargoNavigation.nome));
                $('#' + dados.id).append($('<td></td>').html(formatarSalario(dados.salario)));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

function listarGridCrescente(){
    $.get('https://localhost:5001/Colaborador/Listar?order=c')
        .done(function(resposta) { 
            $('#grid tr').remove();
            for(i = 0; i < resposta.length; i++) {
                let dados = resposta[i];
                
                $('#grid').append($('<tr></tr>').attr('id', dados.id));
                
                $('#' + dados.id).append($('<td></td>').html(dados.id));
                $('#' + dados.id).append($('<td></td>').html(dados.nome));
                $('#' + dados.id).append($('<td></td>').html(dados.idCargoNavigation.nome));
                $('#' + dados.id).append($('<td></td>').html(formatarSalario(dados.salario)));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

function limparFiltro(){
    document.getElementById('valorInicial').value = "";
    document.getElementById('valorFinal').value = "";
    listarGrid();
}

function filtrarCargo(){
    var element = document.getElementById("cargoFiltro");
    var valueCargo = element.options[element.selectedIndex].value;
    var textCargo = element.options[element.selectedIndex].text;

    if(valueCargo == 0){
        listarGrid();
    }
    else{
        $.get('https://localhost:5001/Colaborador/ListarPorCargo?cargo='+textCargo)
        .done(function(resposta) { 
            $('#grid tr').remove();
            for(i = 0; i < resposta.length; i++) {
                let dados = resposta[i];
                
                $('#grid').append($('<tr></tr>').attr('id', dados.id));
                
                $('#' + dados.id).append($('<td></td>').html(dados.id));
                $('#' + dados.id).append($('<td></td>').html(dados.nome));
                $('#' + dados.id).append($('<td></td>').html(dados.idCargoNavigation.nome));
                $('#' + dados.id).append($('<td></td>').html(formatarSalario(dados.salario)));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
    }
}

function filtrarSalario(){
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
                $('#' + dados.id).append($('<td></td>').html(formatarSalario(dados.salario)));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
    }
}

function excluir(id) {
    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:5001/Colaborador/Excluir',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(id),
        success: function(resposta) { 
            listarGrid();
            alert(resposta);
        },
        error: function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        }
    });
}

function visualizar(id) {
    $.get('https://localhost:5001/Colaborador/Visualizar?id='+id)
        .done(function(resposta) { 
            let visualizacao = resposta.id;
            visualizacao += '\n';
            visualizacao += resposta.nome;
            visualizacao += '\n';
            visualizacao += resposta.idCargoNavigation.nome;
            visualizacao += '\n';
            visualizacao += formatarSalario(resposta.salario);
            alert(visualizacao);
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

function formatarSalario(salario){
    return 'R$ ' + salario.toFixed(2).toString().replace('.', ',');
}