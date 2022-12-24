import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as accountServices from "../../services/account-services";
import emailValidation from "../../validations/email-validation";
import passwordValidation from "../../validations/password-validation";
import textValidation from "../../validations/text-validation";

export default function RegisterForm() {
  //declarando as variáveis do componente (REACT HOOKS)
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  //declarando os objetos para a criação do formulário(REACT HOOK FORM)
  const {
    control, //captura o valor de cada campo no formulário
    handleSubmit, //capturar o vento submit do formulário
    formState: {
      errors, // capturar os erros de validação dos campos
    },
    reset, //modificar o valor dos campos
  } = useForm();

  //função executada no evento submit do formulário
  const onSubmit = (data) => {

     //limpar as mensagens
     setMensagemSucesso('');
     setMensagemErro('');

     //executando o serviço da API
     accountServices.postRegister(data)
        .then (//call back de sucesso
        result => {
          console.log(result);
          setMensagemSucesso(result.message);
          reset({
            nome: '',
            email: '',
            senha: '',
            senhaConfirmacao: '',
          })
        }

        )
        .catch (//call back de erro
        e => {
          console.log(e.response)
          switch (e.response.status) {

            case 400:
                setMensagemErro(e.response.data.errors.SenhaConfirmacao[0]);
                break;
            case 422:
                setMensagemErro(e.response.data);
                break;
                default:
                setMensagemErro("Não foi possível realizar a operação");
                break;


          }

          
        }

        )
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      {mensagemSucesso && (
        <div className="alert alert-success">
          <strong>Sucesso!</strong> {mensagemSucesso}
        </div>
      )}

      {mensagemErro && (
        <div className="alert alert-danger">
          <strong>Erro!</strong> {mensagemErro}
        </div>
      )}

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Nome do Usuário:</label>
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
                placeholder="Digite aqui"
                className="form-control"
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

        <div className="col-md-6">
          <label>Email do Usuário:</label>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              validate: emailValidation,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="email"
                placeholder="Digite aqui"
                className="form-control"
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
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Crie sua Senha:</label>
          <Controller
            control={control}
            name="senha"
            defaultValue=""
            rules={{
              validate: passwordValidation,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="password"
                placeholder="Digite aqui"
                className="form-control"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.senha && (
            <div className="text-danger">{errors.senha.message}</div>
          )}
        </div>

        <div className="col-md-6">
          <label>Confirme sua Senha:</label>
          <Controller
            control={control}
            name="senhaConfirmacao"
            defaultValue=""
            rules={{
              validate: passwordValidation,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="password"
                placeholder="Digite aqui"
                className="form-control"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.senhaConfirmacao && (
            <div className="text-danger">{errors.senhaConfirmacao.message}</div>
          )}
        </div>
        </div>

        <div className="row mb-3">
            <div className="col-md-12">
                <input type='submit' value='Realizar Cadastro'
                className="btn btn-success" />
            </div>    

        </div>

    </form>
  );
}
