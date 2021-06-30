import React, {Component} from 'react';
import Tabela from './Tabela';
import Cadastro from './Cadastro';

export default class App extends Component {

  state = {
    menu: 1
  }

  menuAdd() {
    this.setState({
      menu: 0
    });
  }

  menuListar() {
    this.setState({
      menu: 1
    });
  }

  render() {
    return(
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-image">
            <img src="card.jpg"/>
            <span class="card-title">Times de Futebol</span>
          </div>
          <div class="card-content">
            <div class="row">
              <nav>
                <div class="nav-wrapper teal lighten-2 center-align">
                  <a href="#!" class="modal-close waves-effect white-text waves-green btn-flat" onClick={this.menuAdd.bind(this)}>Adicionar</a>
                  <a href="#!" class="modal-close waves-effect white-text waves-green btn-flat" onClick={this.menuListar.bind(this)}>Listar</a>
                </div>
              </nav>
            </div>
              {(this.state.menu === 0) ? <Cadastro /> : null}
              {(this.state.menu === 1) ? <Tabela /> : null}
          </div>
        </div>
      </div>
    </div>
    )
  }
}