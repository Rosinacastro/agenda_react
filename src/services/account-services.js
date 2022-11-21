import axios from "axios";

//função para fazer uma requisição para o endpoint de Login

export const postLogin = (data) => {
    //utilizando o Axios para fazer uma requisição para a API
    return axios.post('http://projetocontatos1-01-site1.itempurl.com/api/Account/Login',
    data
    ).then(
        response => {
            return response.data;
        }
    )

}