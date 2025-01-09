//document.addEventListener("DOMContentLoaded", initializeSlider);

let slidesdiv = document.querySelector(".slides");

let slides;
const fragment = document.createDocumentFragment();
let slideIndex = 0;

const prevbutton = document.querySelector(".prev");
prevbutton.addEventListener("click", prevSlide);
const nextbutton = document.querySelector(".next");
nextbutton.addEventListener("click", nextSlide);


function loadSlider(imagelist){
  slidesdiv.innerHTML = "";
  slideIndex = 0;

  imagelist.forEach((image) => {
    const img = document.createElement("img");
    img.setAttribute("src", image);
    img.classList.add("slide");
    fragment.appendChild(img);
  });

  slidesdiv.appendChild(fragment);

  slides = document.querySelectorAll(".slides img");

  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
  }
}

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

window.loadSlider = loadSlider;