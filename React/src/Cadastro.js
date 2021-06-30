import react, {Component} from 'react';

export default class Cadastro extends Component {
    state = {
        nome: "",
        serie: "",
        estadio: "",
        tecnico: "",
        estado: ""
    }
    
    salvar() {
        fetch("http://127.0.0.1:5000/clube", {method: "POST", body: JSON.stringify(this.state)})
        .then(resultado => resultado.json())
        .then(resultado => {
            alert("Adicionado com sucesso !");
            this.setState({
                nome: "",
                serie: "",
                estadio: "",
                tecnico: "",
                estado: ""
            });
        })
        .catch(Erro => {
            alert("Erro : " + Erro);
        })
        ;
    }

    render() {
        return(
            <div class="row">
                 <div class="col s12">
                    <h6>Cadastro / Edição de Times</h6>
                </div>
                <div class="input-field col s12 m6">
                    <input id="nome" type="text" class="validate"
                        onChange={this.handleInput.bind(this)}
                        value={this.state.nome}
                    />
                    <label htmlFor="nome">Nome</label>
                </div>
                <div class="input-field col s6 m4">
                    <input id="serie" type="text" class="validate"
                        onChange={this.handleInput.bind(this)}
                        value={this.state.serie}
                    />
                    <label htmlFor="serie">Série</label>
                </div>
                <div class="input-field col s6 m2">
                    <input id="estado" maxlength="2" type="text" class="validate"
                        onChange={this.handleInput.bind(this)}
                        value={this.state.estado}
                    />
                    <label htmlFor="estado">UF</label>
                </div>
                <div class="input-field col s12 m6">
                    <input id="estadio" type="text" class="validate"
                        onChange={this.handleInput.bind(this)}
                        value={this.state.estadio}
                    />
                    <label htmlFor="estadio">Estádio</label>
                </div>
                <div class="input-field col s12 m6">
                    <input id="tecnico" type="text" class="validate"
                        onChange={this.handleInput.bind(this)}
                        value={this.state.tecnico}
                    />
                    <label htmlFor="tecnico">Técnico</label>
                </div>  
                <div class="col s12 right-align">
                <a class="waves-effect waves-light btn" onClick={this.salvar.bind(this)}><i class="material-icons left">check</i>Salvar</a>
                </div>
            </div>
        )
    }

    handleInput(e) {
        this.setState ({
            [e.target.id]: e.target.value
        });
    }
}