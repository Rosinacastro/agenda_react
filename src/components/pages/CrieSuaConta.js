import React from "react";
import RegisterForm from "../forms/RegisterForm";

//declarando o componente como função
export default function CrieSuaConta() {
  //funcão para reinderizar o componente html do componente
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Crie sua Conta</h5>
              <p className="card-text">
               Preencha os campos para criar sua credencial de usuário
              </p>
              <RegisterForm/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
