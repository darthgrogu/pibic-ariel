import { dados } from "./data.js";

function searchPlant() {
    const query = document.getElementById("searchBox").value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    
    if(query === ""){
        resultDiv.innerHTML = "Insira um termo para pesquisa";
        return
    }

    const foundPLants = dados.filter(
        plant => 
        plant.codigo.toLowerCase().includes(query) ||
        plant.vernacular.toLowerCase().includes(query) ||
        plant.nomecientifico.toLowerCase().includes(query)
    );

    if(foundPLants.length > 0) {
        foundPLants.forEach(plant => {
            resultDiv.innerHTML +=
            `
            <p><strong>Codigo:</strong> ${plant.codigo}</p>
            <p><strong>Vernacular:</strong> ${plant.vernacular}</p>
            <p><strong>Nome Cientifico:</strong> ${plant.nomecientifico}</p>
            `;

            
        });

    }
    else{
        resultDiv.innerHTML = "Nenhuma planta encontrada";
    }
}

window.searchPlant = searchPlant;