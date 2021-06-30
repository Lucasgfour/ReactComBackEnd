import React, {Component} from 'react';

export default class Tabela extends Component {

    state = {
        dados: []
    }

    componentDidMount() {
        fetch("http://127.0.0.1:5000/clube")
        .then(resultado => resultado.json())
        .then(resultado => {
            this.setState({
                dados: resultado
            })
        });
    }


    render() {
        return (
                <div class="row">
                    <table class="table table-sm table-striped">
                        <thead>
                            <tr>
                                <th>Clube</th>
                                <th>Série</th>
                                <th>Estádio</th>
                                <th>Técnico</th>
                                <th>UF</th>
                            </tr>
                        </thead>
                        <tbody class="center-align">
                        {(this.state.dados !== undefined) ?
                            this.state.dados.map((obj, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{obj.nome}</td>
                                        <td>{obj.serie}</td>
                                        <td>{obj.estadio}</td>
                                        <td>{obj.tecnico}</td>
                                        <td>{obj.estado}</td>
                                    </tr>
                                )
                            }) : null
                        }
                        </tbody>
                    </table>
                </div>
                )
        
    }


}