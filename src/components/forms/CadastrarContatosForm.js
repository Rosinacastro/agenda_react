import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import textValidation from "../../validations/text-validation";
import emailValidation from "../../validations/email-validation";
import * as contatosServices from "../../services/contatos-services";
import InputMask from 'react-input-mask';

export default function CadastrarContatosForm() {

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

  //função para executar o submit do formulário
  const onSubmit = (data) => {
    setMensagemSucesso("");
    setMensagemErro("");

    contatosServices.postContatos(data)
    .then(
      result => {
        setMensagemSucesso(result.message);
        reset({
          nome: "", email: "", telefone: "",
        })

      }

    )
    .catch(
      e => {
        console.log(e.response);
        setMensagemErro("Não foi possível realizar o cadastro do contato.")
      }

    )
  };

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
            value="Cadastrar contato"
            className="btn btn-sucess"
          />
        </div>
       </div>
      </div>

    </form>
  );
}
