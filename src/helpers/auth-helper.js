/*
Função para gravar dados na LOCAL STORAGE do navegador
*/
export const signIn = (data) => {

    localStorage.setItem(

        "USER_AUTH",

        JSON.stringify(data)
    );
}
/*
Função para retornar os dados gravados
 */
export const getNomeUsuario = () => {
    return JSON.parse(localStorage.getItem("USER_AUTH")).usuario;
}

export const getEmailUsuario = () => {
    return JSON.parse(localStorage.getItem("USER_AUTH")).email;
}

export const getAccessToken = () => {
    return JSON.parse(localStorage.getItem("USER_AUTH")).accessToken;
}

export const signOut = () => {
    return localStorage.removeItem("USER_AUTH");
}

/*
funcão para verificar se o usuário está autenticado na API
 */
export const isLoggedIn = () => {
    return localStorage.getItem("USER_AUTH") != null;
}

