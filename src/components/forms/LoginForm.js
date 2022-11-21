import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import emailValidation from '../../validations/email-validation';
import passwordValidation from '../../validations/password-validation';
import * as services from '../../services/account-services';

export default function LoginForm(){

    const {
        control,
        handleSubmit,

        formState: {
            errors
        },
        reset

    } = useForm();

    const onSubmit = (data) => {

        services.postLogin(data)
        .then(
            result => {
                console.log(result);

            }

        )
        .catch(
            e => {
                console.log(e.response);
            }
        ) 
    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
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