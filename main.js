import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo , updateTitle } from "./js/ui.js";

//* Apı clasının bir örneğini oluştur
const api = new API();

elements.form.addEventListener("submit",(e)=>{
    //* form gönderildiği anda sayfanın yenilenmesini engeller
    e.preventDefault();
    //* Inputun içerisindeki değere event üzerinden erişip değişkene aktardık
    const query = e.target[0].value ;
    

  //* Inputun içerisinde herhangi bir veri yoksa ekrana bir alet bas
  //* ve fonksiyonu burda durdur
    if  (!query) {alert ("Lütfen bir müzik ismi giriniz!");
    return;
    }
    //* ınputa girilen parametreyi updateTitle fonksiyonuna gönderir ve günceller
    updateTitle(`${query} için sonuçlar`);

    api.searchMusic(query);

});
//* Sayfa yüklendiği anda popüler müzikleri aktarır
document.addEventListener("DOMContentLoaded", async () => {
  await api.topPopular();
});

const playMusic = (url) =>{
  //*müziğin urlsini htmle aktarma
   elements.audioSource.src = url;
   //* audio elementinin müziği yüklenmesini sağladık
   elements.audio.load()
   //* audio elementinin mziği oynatmasını sağlar
   elements.audio.play()
};

const handleClick =(e)=>{
  //* Tıkladığımız etiketin idsi play-btn ise bu blok çalışır
  if(e.target.id==="play-btn"){
    const parent =e.target.closest(".card"); // parentElement yerine kkullanırız en yakın parenta götürür
    renderPlayingInfo(parent. dataset);
    //* müziği çalar
    playMusic(parent.dataset.url);
}
};
//* fotoğrafa animate clasını ekler
const animatePhoto = () =>{
  const img = document.querySelector(".info img");
  img.className = "animate";
};
const stopAnimation = () =>{
  const img = document.querySelector(".info img");
  img.classList.remove = "animate";
};


//* sayfada tıklanma olaylarını izler
document.addEventListener("click",handleClick);
//* Müziğin çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause",stopAnimation);