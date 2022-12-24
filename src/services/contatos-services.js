import axios from "axios";
import * as config from '../config/api-config';
import * as helpers from "../helpers/auth-helper";

//função para fazer uma requisição para o endpoint de Contato

export const postContatos = (data) => {
    //utilizando o Axios para fazer uma requisição para a API
    return axios.post(
        `${config.getApiUrl()}/Contatos`,
    data
    ).then(
        response => {
            return response.data;
        }
    )

}

export const putContatos = (data) => {
    return axios.put(`${config.getApiUrl()}/Contatos`, data)
    .then(
        response => {
            return response.data;
        }
    )
}

export const deleteContatos = (idContato) => {
    return axios.delete(`${config.getApiUrl()}/Contatos/${idContato}`)
    .then(
        response => {
            return response.data;
        }
    )
}

export const getContatos = () => {
    return axios.get(`${config.getApiUrl()}/Contatos`)
    .then(
        response => {
            return response.data;
        }
    )
}

export const getContatosById = (idContato) => {
    return axios.get(`${config.getApiUrl()}/Contatos/${idContato}`)
    .then(
        response => {
            return response.data;
        }
    )
}


//Interceptador para fazer o envio do TOKEN
axios.interceptors.request.use(
    config => {
        //verificar se a requisição é para o endpoint /api/contatos
        if(config.url.includes('/api/Contatos')) {
            //obter o TOKEN gravado na LOCALSTORAGE
            var accessToken = helpers.getAccessToken();

            //enviando o TOKEN no cabeçalho da requisição
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },

    error => {
        Promise.reject(error);
    }
)