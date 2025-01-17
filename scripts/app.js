import { dados } from "./data.js";

initEventListeners();

window.searchPlant = searchPlant;
window.abrirNoMapa = abrirNoMapa;

function menuShow() {
  let menuMobile = document.querySelector(".mobile-menu");
  let menuimg = document.querySelector(".icon");

  if (!menuMobile.classList.contains("open")) {
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

  const searchBox = document.getElementById("search-box");
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 1027) {
      searchBox.value = "";
    }
  });

  const mobileSearchBox = document.getElementById("mobile-search-box");
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1027) {
      mobileSearchBox.value = "";
    }
  });
}

function searchPlant() {
  console.log("entrou em buscarPlanta");
  //const urlParams = new URLSearchParams(window.location.search);
  //const texttosearch = parseInt(urlParams.get("texttosearch"));

  var searchTerm;
  if (window.innerWidth > 1027) {
    searchTerm = document.getElementById("search-box").value.trim();
  } else {
    searchTerm = document.getElementById("mobile-search-box").value.trim();
  }

  const result = dados.find(
    (item) =>
      item.id === parseInt(searchTerm) ||
      item.vernacular === searchTerm ||
      item.nomecientifico === searchTerm
  );

  console.log(result);
  fillPageData(result);
}

function abrirNoMapa() {
  var markers = "";
  dados.forEach(function (arvore) {
    if (arvore.nomecientifico === "Euterpe precatoria") {
      markers += arvore.lat + "," + arvore.long + "+";
    }
  });

  // Remover o último "+" da string
  markers = markers.slice(0, -1);

  // Construir a URL com marcadores
  var url = "https://www.google.com/maps/search/?api=1&query=" + markers;

  // Abrir a URL em uma nova janela/aba
  window.open(url, "_blank");
}

function createOpenStreetMap(arvoreBuscada) {
  //Centraliza o mapa no bosque da ciencia
  var map = L.map("map-container").setView([-3.096667, -59.986389], 17);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  adicionarMarcadores(arvoreBuscada, map);
}
function adicionarMarcadores(arvoreBuscada, map) {
  dados.forEach((arvore) => {
    if (arvore.nomecientifico === arvoreBuscada.nomecientifico) {
      var marker = L.marker([arvore.lat, arvore.long]).addTo(map);

      // Define a cor do marcador (vermelho para a árvore buscada, azul para outras)
      var cor = arvore.id === arvoreBuscada.id ? "red" : "blue";

      // Cria o ícone do marcador com a cor definida
      var icone = L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${cor}.png`,
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      marker.setIcon(icone);
      marker.bindPopup(
        `<b>${arvore.nomecientifico}</b><br>Código: ${arvore.codigo}`
      );
    }
  });
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

  createOpenStreetMap(planta);
}
