import axios from "axios";

// criando a classe de api, que vai ser responsavel por fazer as requisições pro backend
export default class api {
    constructor() {
        // criando a api 'publica', ela sera usada pra quando forem feitas requisições
        // que não dependam do usuário
        // exemplo: consultar uma api de CEP da internet, fazer login no sistema
        this.public = axios.create({
            baseURL: "http://localhost:5028/",
            timeout: 5000
        });

        // essa é a api 'privada', ela será usada dentro do sistema a partir do momento que o usuário estiver logado
        // isso previne que outros sites façam requisição pra dentro do sistema e tenham acesso a dados dos clientes
        // as requisições por essa api só serão concluidas se a autorização bater
        this.private = axios.create({
            baseURL: "http://localhost:5028/",
            timeout: 5000
        });
    }
}