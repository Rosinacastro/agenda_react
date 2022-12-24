import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AcessarConta from './pages/AcessarConta';    
import CrieSuaConta from './pages/CrieSuaConta';    
import ConsultarContatos from './pages/ConsultarContatos';
import CadastrarContatos from './pages/CadastrarContatos';
import EditarContatos from './pages/EditarContatos';
//declarando o componente como função
export default function Main(){
  //funcão para reinderizar o componente html do componente
  return (
    <Routes>
        <Route
        path="/"
        exact
        element={<AcessarConta/>}
        />
        <Route
        path="/crie-sua-conta"
        element={<CrieSuaConta/>}
        />
         <Route
        path="/consultar-contatos"
        element={<ConsultarContatos/>}
        />
         <Route
        path="/cadastrar-contatos"
        element={<CadastrarContatos/>}
        />
         <Route
        path="/editar-contatos"
        element={<EditarContatos/>}
        />
    </Routes>
  )
}

