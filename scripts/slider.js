const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
  const prevbutton = document.querySelector(".prev");
  prevbutton.addEventListener("click", prevSlide);
  const nextbutton = document.querySelector(".next");
  nextbutton.addEventListener("click", nextSlide);

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
