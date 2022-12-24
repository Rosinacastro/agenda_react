import React from "react";
import ConsultarContatosGrid from "../grids/ConsultarContatosGrid";

export default function ConsultarContatos() {
    return (
        <div className="container mt-3">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Consulta de Contatos</h5>
                        <p className="card-text">Listagem de Contatos Cadastrados.</p>
                        <hr/>
                        <ConsultarContatosGrid/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}