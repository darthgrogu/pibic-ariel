function menuShow(){
    let menuMobile = document.querySelector('.mobile-menu');
    let menuimg = document.querySelector('.icon');

    if(!menuMobile.classList.contains('open')){
        console.log("entrei aqui")
        menuMobile.classList.add('open');
        menuimg.src = "./assets/img/close_white_36dp (1).svg";
    }else{
        menuMobile.classList.remove('open');
        menuimg.src = './assets/img/menu_white_36dp.svg';
    }
}