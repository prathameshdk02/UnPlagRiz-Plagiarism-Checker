const preloader = document.getElementById('preloader');
const html = document.getElementById('html');

const delay = ms => new Promise((resolve) =>{
    setTimeout(() => {
        resolve();
    },ms);
});

document.addEventListener("DOMContentLoaded", function () {
    const type = new TypeIt("#preloader-text", {
      speed:80,
      afterComplete: () => {
        type.reset().go();
      }
    })
    .type("Loading...")
    .pause(1000)
    .delete()
    .type("Its UnPlagRiz!")
    .pause(1000)
    .delete()
    .go();
});

window.addEventListener('load',async ()=>{
    html.style.overflow = 'hidden';
    await delay(1000);
    html.style.overflow = 'auto';
    preloader.style.display = 'none';
});