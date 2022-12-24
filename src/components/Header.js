import React, { useState,  useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as helpers from '../helpers/auth-helper';
import { useEffect, useState } from 'react';

//declarando o componente como função
export default function Header(){

  //declarando as variáveis do componente
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  //função para fazer o logout do usuário
  const sair = () => {
    if(window.confirm('Deseja realmente sair sdo sistema?')) {
      helpers.signOut();
      window.location.href = '/';
    }
  }

  //função executada quando o componente é carregado
  useEffect(
    () => {
      //verificar se o usuário está logado
      if(helpers.isLoggedIn()) {

        setAutenticado(true);

        //capturar o nome e o email do usuário
        setNomeUsuario(helpers.getNomeUsuario);
        setEmailUsuario(helpers.getEmailUsuario);

      }

    }, []
  )

  //funcão para reinderizar o componente html do componente
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Projeto React Agenda</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {
            !autenticado && (
              <NavLink className="nav-link active" aria-current="page" to="/">Acessar Conta</NavLink>
            )
          }
        </li>
        <li className="nav-item">
         {
          !autenticado && (
            <NavLink className="nav-link active" aria-current="page" to="/crie-sua-conta">Crie sua Conta</NavLink>
          )
         }
        </li>
        {
          autenticado && (
            <li className='nav-item dropdown'>
          <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
            Gerenciar Contatos
             </a>
             <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <li>
                <NavLink className="dropdown-item"
                  to="/cadastrar-contatos">
                  Cadastrar Contatos
                </NavLink>
              </li>
              <li>
              <NavLink className="dropdown-item"
                  to="/consultar-contatos">
                  Consultar Contatos
                </NavLink> 
              </li>
             </ul>
        </li>
        
        
          )
        }
      </ul>
      {
        autenticado && (
          <form className='d-flex'>
            <div className='text-white'>
              <small>{nomeUsuario} ({emailUsuario})</small>&nbsp;&nbsp;
              <a href='#' className='btn btn-outline-light btn-sm'
              onClick={
                () => sair()

              }>
                Sair
              </a>

            </div>

          </form>
        )
      }
     
    </div>
  </div>
</nav>
  )
}

