import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import emailValidation from '../../validations/email-validation';
import passwordValidation from '../../validations/password-validation';
import * as services from '../../services/account-services';
import * as helper from '../../helpers/auth-helper';

export default function LoginForm(){

    const [mensagemErro, setMensagemErro] = useState("");

    const {
        control,
        handleSubmit,

        formState: {
            errors
        },
        reset

    } = useForm();


    const onSubmit = (data) => {
   
        //fazendo o envio dos dados para API
        services.postLogin(data)
        .then(
            result => {//retorno de sucesso

                //gravar os dados m LOCAL STORAGE
                helper.signIn(result);

                //redirecionar o usuário para a página de consulta de contatos
                window.location.href = '/consultar-contatos';

            }

        )
        .catch(
            e => {
                console.log(e.response)

               /* switch(e.response.status) {
                       case 401:
                       setMensagemErro(e.response.data);
                        break;

                        default:
                       setMensagemErro('Operação não pôde ser realizada');
                        break;
                }*/

               
            }
        ) 
    }
    
    return(
        
        <form onSubmit={handleSubmit(onSubmit)}>

            {
                mensagemErro && <div className='alert alert-danger mt-2'>
                    <strong>{mensagemErro}</strong>
                </div>
            }

            <div className='mb-3'>
                <label>Email de Acesso:</label>
                <Controller
                control={control}
                name='email'
                defaultValue=''
                rules={{
                    validate: emailValidation
                }}
                render={
                    ({field: { onChange, onBlur, value}}) => (
                        <input type='email' className='form-control'
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        />
                    )
                }
                />
                {
                    errors.email && 
                    <div className='text-danger'>
                    {errors.email.message} 
                    </div>

                }
            
            </div>
            <div className='mb-3'>
                <label>Senha de Acesso:</label>
                <Controller
                control={control}
                name='senha'
                defaultValue=''
                rules={{
                    validate: passwordValidation
                }}
                render={
                    ({field: { onChange, onBlur, value}}) => (
                        <input type='password' className='form-control'
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        />
                    )
                }
                />
                 {
                    errors.senha && 
                    <div className='text-danger'>
                    {errors.senha.message} 
                    </div>

                }
                
            </div>
            <div className='mb-3'>
               <div className='d-grid'>
                <input type='submit' value='Acessar Agenda'  
                className='btn btn-dark'/>     
               </div>
            </div>



        </form>
    )
}