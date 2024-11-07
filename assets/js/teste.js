import {dados} from "./data.js"

const urlParams = new URLSearchParams(window.location.search);
const nome = urlParams.get('nome');

let vernacular = document.querySelector('.vernacular');
let nomecientifico = document.querySelector('.nome-cientifico');
let cpf = document.querySelector('.cpf');

const result = dados.find(item => item.nome === nome);

vernacular.textContent = result.nome;
nomecientifico.textContent = result.sobrenome;
cpf.textContent = result.cpf;


let conteudo = document.querySelector('.conteudo');


