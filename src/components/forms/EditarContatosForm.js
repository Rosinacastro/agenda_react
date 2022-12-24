import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import textValidation from "../../validations/text-validation";
import emailValidation from "../../validations/email-validation";
import * as contatosServices from "../../services/contatos-services";
import InputMask from 'react-input-mask';

export default function EditarContatosForm() {

  //declarando variáveis do componente usando REACT HOOKS
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  //criando os objetos do formulário
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //função para obter os dados do contato por id
  const obterContato = (idContato) => {

    contatosServices.getContatosById(idContato)
    .then(
        result => {
          //preenchendo o formulário com os dados do contato
            reset ({

                idContato: result.idContato,
                nome: result.nome,
                email: result.email,
                telefone: result.telefone,

            })
        }

    )
    .catch(
        e => {
            console.log(e);
        }

    )

  }

  //função para executar o submit do formulário
  const onSubmit = (data) => {
    //limpando as mensagens de sucesso e erro
    setMensagemSucesso('');
    setMensagemErro('');

    //realizando a edição do contato
    contatosServices.putContatos(data)
    .then(
      (result) => {
        setMensagemSucesso(result.message);
      }

    )
    .catch(
      e => {
        console.log(e.response);

        setMensagemErro('Não foi possível realizar a edição do contato.');
      }
    )
   
  };
//função do REACT HOOKS executada ao abrir o componente
  useEffect(
    () => {
      //ler o ID enviado pela URL
        const url = window.location.href;
        const idContato = url.substring(url.lastIndexOf('?id=') + 4);

        //carregar os dados do contato
        obterContato(idContato);

    }, []
  )
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {mensagemSucesso && (
        <div className="alert alert-success">
          <strong>Sucesso!</strong>
          {mensagemSucesso}
        </div>
      )}

      {mensagemErro && (
        <div className="alert alert-danger">
          <strong>Erro!</strong>
          {mensagemErro}
        </div>
      )}

      <div className="row">

      {/*campo oculto para o id do contato */}
      <Controller
            control={control}
            name="idContato"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="hidden"
                id="idContato"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
        />
         

        
        {/*campo 'nome */}
        <div className="col-md-6">
          <label>Nome do Contato:</label>
          <Controller
            control={control}
            name="nome"
            defaultValue=""
            rules={{
              validate: textValidation,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                id="nome"
                className="form-control"
                placeholder="Ex: João dos Santos"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.nome && (
            <div className="text-danger">{errors.nome.message}</div>
          )}
        </div>

        {/*campo 'email */}
        <div className="col-md-4">
          <label>Email do Contato:</label>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              validate: emailValidation,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Ex: joao@gmail.com"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>

        {/*campo 'telefone */}
        <div className="col-md-2">
          <label>Telefone do Contato:</label>
          <Controller
            control={control}
            name="telefone"
            defaultValue=""
            rules={{
              validate: textValidation,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputMask
              id="telefone"
              className="form-control"
              mask="(99) 99999-9999"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              />
            )}
          />

          {errors.telefone && (
            <div className="text-danger">{errors.telefone.message}</div>
          )}
        </div>
      

       <div className="row">
        <div className="col-md-6 mt-3">
          <input
            type="submit"
            value="Salvar Alterações"
            className="btn btn-primary"
          />
        </div>
       </div>
      </div>

    </form>
  );
}
