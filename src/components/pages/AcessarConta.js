import React from 'react';
import LoginForm from '../forms/LoginForm';


//declarando o componente como função
export default function AcessarConta(){
  //funcão para reinderizar o componente html do componente
  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-4 offset-md-4'>
            <div className='card'>
                <div className='card-body'>
                    <div className='text-center'>
                       <img src='https://www.cotiinformatica.com.br/imagens/logo-coti-informatica.png' className='img-fluid' />
                       <h5 className='card-title'>Acessar Conta</h5>
                       <p className='card-text'>Informe sua credenciais de acesso para entrar na Agenda</p>
                    </div>
                    <LoginForm/>

                </div>
            </div>

        </div>
      </div>
    </div>
  )
}