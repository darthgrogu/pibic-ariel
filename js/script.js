import { dados } from "./data.js";

const urlParams = new URLSearchParams(window.location.search);
const nome = urlParams.get("nome");

let vernacular = document.querySelector(".vernacular");
let nomecientifico = document.querySelector(".nome-cientifico");
let cpf = document.querySelector(".cpf");

const result = dados.find((item) => item.nome === nome);

vernacular.textContent = result.nome;
nomecientifico.textContent = result.sobrenome;
cpf.textContent = result.cpf;

let conteudo = document.querySelector(".conteudo");

function menuShow() {
  let menuMobile = document.querySelector(".mobile-menu");
  let menuimg = document.querySelector(".icon");

  if (!menuMobile.classList.contains("open")) {
    console.log("entrei aqui");
    menuMobile.classList.add("open");
    menuimg.src = "./assets/img/close_white_36dp (1).svg";
  } else {
    menuMobile.classList.remove("open");
    menuimg.src = "./assets/img/menu_white_36dp.svg";
  }
}
