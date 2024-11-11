import { dados } from "./data.js";

initEventListeners();
fillPageData();

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

function initEventListeners() {
  const botao = document.getElementById("menu-mobile-button");
  botao.addEventListener("click", menuShow);
}

function fillPageData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));

  let vernacular = document.querySelector(".vernacular");
  let nomecientifico = document.querySelector(".nome-cientifico");
  let autor = document.querySelector(".autor");
  let familia = document.querySelector(".familia");
  let descricao = document.querySelector(".descricao");
  let distribuicao = document.querySelector(".distribuicao");

  const result = dados.find((item) => item.id === id);
  console.log(result);

  vernacular.textContent = result.vernacular;
  nomecientifico.textContent = result.nomecientifico;
  autor.textContent = result.autor;
  familia.textContent = result.familia;
  descricao.textContent = result.descricao;
  distribuicao.textContent = result.distribuicao;

  let conteudo = document.querySelector(".conteudo");
}
