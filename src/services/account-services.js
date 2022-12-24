import axios from "axios";
import * as config from '../config/api-config';

//função para fazer uma requisição para o endpoint de Login

export const postLogin = (data) => {
    //utilizando o Axios para fazer uma requisição para a API
    return axios.post(
        `${config.getApiUrl()}/api/login`,
    data
    ).then(
        response => {
            return response.data;
        }
    )

}

//função para fazer uma requisição para o endpoint de registro

export const postRegister = (data) => {
    //utilizando o Axios para fazer uma requisição para a API
    return axios.post(
        `${config.getApiUrl()}/api/register`,
    data
    ).then(
        response => {
            return response.data;
        }
    )

}