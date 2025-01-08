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
  const fragment = document.createDocumentFragment();

  let slides = document.querySelector(".slides");
  let vernacular = document.querySelector(".vernacular");
  let nomecientifico = document.querySelector(".nome-cientifico");
  let autor = document.querySelector(".autor");
  let familia = document.querySelector(".familia");
  let codigo = document.querySelector(".codigo-indv");
  let data_plantio = document.querySelector(".data-plantio-indv");
  let coletas = document.querySelector(".coletas-indv");
  let descricao = document.querySelector(".descricao");
  let distribuicao = document.querySelector(".distribuicao");

  const result = dados.find((item) => item.id === id);
  console.log(result);

  result.imagelist.forEach((image) => {
    const img = document.createElement("img");
    img.setAttribute("src", image);
    img.classList.add("slide");
    fragment.appendChild(img);
  });

  slides.appendChild(fragment);

  vernacular.textContent = result.vernacular;
  nomecientifico.textContent = result.nomecientifico;
  autor.textContent = result.autor;
  familia.textContent = result.familia;
  codigo.textContent = "Código: " + result.codigo;
  data_plantio.textContent = "Data de plantio: " + result.data_plantio;
  coletas.textContent = "Coletas: " + result.coletas;

  descricao.textContent = result.descricao;
  distribuicao.textContent = result.distribuicao;

  const mapa_container = document.querySelector(".mapa-container");
  const fragment2 = document.createDocumentFragment();
  const img = document.createElement("img");
  console.log(result.distribuicao_mapa);
  img.setAttribute("src", result.distribuicao_mapa);
  img.classList.add("mapa-distribuicao");
  fragment2.appendChild(img);

  mapa_container.appendChild(fragment2);
}
