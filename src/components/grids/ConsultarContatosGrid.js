import React, { useState, useEffect } from "react";
import * as contatosServices from "../../services/contatos-services";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';

export default function ConsultarContatosGrid() {
  //declarando variáveis no componente
  const [contatos, setContatos] = useState([]);

  //função para consultar os Contatos na API
  const consultarContatos = () => {
    contatosServices
      .getContatos()
      .then((result) => {
        //inicializando o datatables
        $ (document).ready(function(){
            $("#tabela").DataTable({
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.10.24i18n/Portuguese-Brasil.json'
                }
            })
        });
        setContatos(result);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  //função para excluir um contato
  const excluirContato = (idContato) => {
    if(window.confirm('Deseja realmente excluir o contato?')){
      contatosServices.deleteContatos(idContato)
      .then(
        result => {
          alert(result.message);
          window.location.reload();
        }

      )
      .catch(
        e => {
          console.log(e);
        }
      )

    }
  }

  //evento do React Hooks para execução
  //no momento do carregamento do componente
  useEffect(() => {
    consultarContatos();
  }, []);

  return (
    <div>
      <table id="tabela" className="table table-hover table-sm">
        <thead>
          <tr>
            <th>Nome do Contato</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          {contatos.map(function (contatos, i) {
            return (
              <tr key={i}>
                <td>{contatos.nome}</td>
                <td>{contatos.email}</td>
                <td>{contatos.telefone}</td>
                <td>
                  <a href="#" className="btn btn-primary btn-sm"
                  onClick={
                    () => window.location.href = `/editar-contatos?= ${contatos.idContato}`
                  }>
                    Alterar
                  </a>
                  &nbsp;
                  <a href="#" className="btn btn-danger btn-sm"
                  onClick={
                    () => excluirContato(contatos.idContato)
                  }>
                    Excluir
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Quantidade de Registros: 0</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
