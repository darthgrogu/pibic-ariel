import { dados } from "./data.js";

initEventListeners();

window.searchPlant = searchPlant;
var map;

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
  const treepagebutton = document.getElementById("tree-page-button");
  treepagebutton.addEventListener("click", mostrarTelaArvore);

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

  if (result !== undefined) {
    console.log(result);
    fillPageData(result);
  } else {
    mostrarTelaArvoreNotFound();
  }
}
function criarLinkMapa(latitude, longitude) {
  var url =
    "https://www.google.com/maps/search/?api=1&query=" +
    latitude +
    "," +
    longitude;
  return '<a href="' + url + '" target="_blank">Abrir no Mapa</a>';
}
function createOpenStreetMap(arvoreBuscada) {
  // Cria o mapa apenas se ele ainda não existir

  if (!map) {
    map = L.map("map-container").setView([-3.096667, -59.986389], 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }

  // Remove os marcadores antigos (se houver)
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

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
        `<b>${arvore.nomecientifico}</b><br>Código: ${arvore.codigo}<br>` +
          criarLinkMapa(arvore.lat, arvore.long)
      );
    }
  });
}
function gerarCuriosidades(curiosidades) {
  const curiosidadesContainer = document.querySelector(".curiosidades");
  curiosidadesContainer.innerHTML = ""; // Limpa o container antes de adicionar novas curiosidades

  curiosidades.forEach((curiosidade, index) => {
    // Cria os elementos HTML
    const divCuriosidade = document.createElement("div");
    const titulo = document.createElement("h2");
    const paragrafo = document.createElement("p");
    const imagem = document.createElement("img");

    // Define o conteúdo dos elementos
    titulo.textContent = curiosidade.titulo;
    paragrafo.textContent = curiosidade.texto;
    imagem.src = curiosidade.imagem;
    imagem.alt = curiosidade.titulo; // Define o atributo alt da imagem

    // Adiciona os elementos à divCuriosidade
    divCuriosidade.appendChild(titulo);
    divCuriosidade.appendChild(paragrafo);
    divCuriosidade.appendChild(imagem);

    // Adiciona a divCuriosidade ao container
    curiosidadesContainer.appendChild(divCuriosidade);
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

  loadSlider(planta.imagelist);

  vernacular.textContent = planta.vernacular;
  nomecientifico.textContent = planta.nomecientifico;
  autor.textContent = planta.autor;
  familia.textContent = planta.familia;
  codigo.textContent = "Código: " + planta.codigo;

  //createOpenStreetMap(planta);

  //curiosidades inicio
  gerarCuriosidades(planta.curiosidades);
  //curiosidades fim

  //quiz inicio
  const perguntaContainer = document.getElementById("pergunta");
  const opcoesContainer = document.getElementById("opcoes");
  const responderBtn = document.getElementById("responder");
  const resultadoContainer = document.getElementById("resultado");

  perguntaContainer.innerHTML = "";
  opcoesContainer.innerHTML = "";
  resultadoContainer.innerHTML = "";

  perguntaContainer.textContent = planta.pergunta;

  planta.opcoes.forEach((opcao) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "resposta";
    radio.value = opcao.texto;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(opcao.texto));
    opcoesContainer.appendChild(label);
  });

  responderBtn.addEventListener("click", () => {
    const respostaSelecionada = document.querySelector(
      'input[name="resposta"]:checked'
    );

    if (respostaSelecionada) {
      const resposta = respostaSelecionada.value;
      const opcaoCorreta = planta.opcoes.find((opcao) => opcao.correta).texto;

      if (resposta === opcaoCorreta) {
        resultadoContainer.textContent =
          "Parabéns!! Frase secreta: " + planta.frasesecreta;
        console.log(resultadoContainer.textContent);
        resultadoContainer.classList.add("resultado-correto");
        resultadoContainer.classList.remove("resultado-incorreto");
      } else {
        resultadoContainer.textContent = "Resposta incorreta";
        resultadoContainer.classList.add("resultado-incorreto");
        resultadoContainer.classList.remove("resultado-correto");
      }
    } else {
      resultadoContainer.textContent = "Selecione uma opção!";
    }
  });

  //quiz fim

  mostrarTelaArvorePlantInfo();
}

function mostrarTelaArvore() {
  document.getElementById("homepage").style.display = "none";
  document.getElementById("tela-arvore").style.display = "block";
  document.getElementById("mobile-search-container").style.display = "flex";
  mostrarTelaArvoreFirstPage();
}

function mostrarHomepage() {
  document.getElementById("tela-arvore").style.display = "none";
  document.getElementById("homepage").style.display = "block";
}

function mostrarTelaArvoreFirstPage() {
  document.getElementById("tela-arvore-first-page").style.display = "block";
  document.getElementById("tela-arvore-notfound").style.display = "none";
  document.getElementById("tela-arvore-plantinfo").style.display = "none";
  document.getElementById("tela-arvore-unknown").style.display = "none";
}

function mostrarTelaArvoreNotFound() {
  document.getElementById("tela-arvore-first-page").style.display = "none";
  document.getElementById("tela-arvore-notfound").style.display = "block";
  document.getElementById("tela-arvore-plantinfo").style.display = "none";
  document.getElementById("tela-arvore-unknown").style.display = "none";
}

function mostrarTelaArvorePlantInfo() {
  document.getElementById("tela-arvore-first-page").style.display = "none";
  document.getElementById("tela-arvore-notfound").style.display = "none";
  document.getElementById("tela-arvore-plantinfo").style.display = "block";
  document.getElementById("tela-arvore-unknown").style.display = "none";
}
