import { dados } from "./data.js";

initEventListeners();

window.searchPlant = searchPlant;

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

function searchPlant(){
  console.log("entrou em buscarPlanta");
  //const urlParams = new URLSearchParams(window.location.search);
  //const texttosearch = parseInt(urlParams.get("texttosearch"));
  
  const query = document.getElementById("searchBox").value.trim().toLowerCase();
  console.log(query);

  const result = dados.find((item) => item.id === parseInt(query) || item.vernacular === query || item.nomecientifico === query);
  
  console.log(result);
  fillPageData(result);
}


function fillPageData(planta) {
  
  console.log("entrou no fillPageData");

  let vernacular = document.querySelector(".vernacular");
  let nomecientifico = document.querySelector(".nome-cientifico");
  let autor = document.querySelector(".autor");
  let familia = document.querySelector(".familia");
  let codigo = document.querySelector(".codigo-indv");
  let data_plantio = document.querySelector(".data-plantio-indv");
  let coletas = document.querySelector(".coletas-indv");
  let descricao = document.querySelector(".descricao");
  let distribuicao = document.querySelector(".distribuicao");

  loadSlider(planta.imagelist);

  vernacular.textContent = planta.vernacular;
  nomecientifico.textContent = planta.nomecientifico;
  autor.textContent = planta.autor;
  familia.textContent = planta.familia;
  codigo.textContent = "Código: " + planta.codigo;
  data_plantio.textContent = "Data de plantio: " + planta.data_plantio;
  coletas.textContent = "Coletas: " + planta.coletas;

  descricao.textContent = planta.descricao;
  distribuicao.textContent = planta.distribuicao;

  const mapa_container = document.querySelector(".mapa-container");
  mapa_container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const img = document.createElement("img");

  img.setAttribute("src", planta.distribuicao_mapa);
  img.classList.add("mapa-distribuicao");
  fragment.appendChild(img);

  mapa_container.appendChild(fragment);
}
