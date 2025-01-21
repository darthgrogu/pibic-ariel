function verificarVisibilidade() {
  console.log("verificando visibilidade!");
  const curiosidades = document.querySelectorAll(".curiosidades > div"); // Seleciona cada item
  console.log(curiosidades);

  curiosidades.forEach((curiosidade) => {
    const posicaoElemento = curiosidade.getBoundingClientRect();

    if (
      posicaoElemento.top < window.innerHeight &&
      posicaoElemento.bottom >= 0
    ) {
      curiosidade.classList.add(
        "mostrar",
        "animate__animated",
        "animate__fadeInUp"
      );
    }
  });
}

// Chama a função ao carregar a página e ao rolar
window.addEventListener("load", verificarVisibilidade);
window.addEventListener("scroll", verificarVisibilidade);
