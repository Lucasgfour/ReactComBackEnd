// Atributos
var tabela = document.getElementById("tabDados");
var codigo = 0;

// Arranque Formulário
$(document).ready(function(){
    $('.modal').modal();
    $('.dropdown-trigger').dropdown();
    atualizar();
});

// Botão novo
$("#btnOpenCadastro").click(function (e) { 
    setCodigo();
    $("#txtNome").val("");
    $("#txtSerie").val("");
    $("#txtEstadio").val("");
    $("#txtTecnico").val("");
    $("#txtEstado").val("");
    $("#modalDescricao").modal("open");
});

function setCodigo() {
    this.codigo = 0;
}

function atualizar() {
    $("#tabDados").html("");
    fetch('/clube', {method:'GET'})
    .then(response => response.json())
    .then(data => {
        for(const registro of data) {
            var row = this.tabela.insertRow(-1);
            row.insertCell(-1).innerHTML = registro.nome;
            row.insertCell(-1).innerHTML = registro.serie;
            row.insertCell(-1).innerHTML = registro.estadio;
            row.insertCell(-1).innerHTML = registro.tecnico;
            row.insertCell(-1).innerHTML = registro.estado;
            row.insertCell(-1).innerHTML = '<a class="bn-tools" onclick="editar(' + registro.codigo + ')" href="#">Editar</a> / ' + '<a class="bn-tools" onclick="confirmaExcluir(' + registro.codigo + ')" href="#">Excluir</a>';
        }
    });
}


function editar(id) {
    this.codigo = id;
    fetch('/clube/' + id, {method:'GET'})
    .then(response => response.json())
    .then(data => {
        try {
            $("#txtNome").val(data[0].nome);
            $("#txtSerie").val(data[0].serie);
            $("#txtEstadio").val(data[0].estadio);
            $("#txtTecnico").val(data[0].tecnico);
            $("#txtEstado").val(data[0].estado);
            $("#modalDescricao").modal("open");
        } catch (error) {
            M.toast({html: 'Erro : ' + error})
        }
    });
}

function salvar() {
    meth = "";

    if(this.codigo == 0) {
        meth = "POST";
    } else {
        meth = "PUT";
    }

    corpo = JSON.stringify({
        codigo: this.codigo,
        nome: $("#txtNome").val(),
        serie: $("#txtSerie").val(),
        estadio: $("#txtEstadio").val(),
        tecnico: $("#txtTecnico").val(),
        estado: $("#txtEstado").val()
    });

    fetch('/clube', {method: meth, body: corpo})
    .then(response => response.json())
    .then(data => {
        M.toast({html: "Inserido com sucesso !"});
        atualizar();
        $("#modalDescricao").modal("close");
    });
}

function confirmaExcluir(id) {
    this.codigo = id;
    $("#modalExclusao").modal("open");
}

function excluir() {
    if(this.codigo > 0) {
        fetch('/clube/' + this.codigo, {method: "DELETE"})
        .then(response => response.json())
        .then(data => {
            M.toast({html: "Deletado com sucesso !"});
            atualizar();
            $("#modalExclusao").modal("close");
        });
        this.codigo = 0;
    }
}