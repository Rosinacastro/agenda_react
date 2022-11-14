import React from 'react';
import Header from './components/Header';   
import Main from './components/Main';

//declarando o componente como função
export default function App(){
  //funcão para reinderizar o componente html do componente
  return (
    <div>
      <Header/>
      <Main/>
    </div>
  )
}

