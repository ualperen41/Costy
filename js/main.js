import fetchProducts from "./api.js";
import { uiElements } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
      // menuBtn'e tıklanınca nav kısmını aç-kapa yap
      uiElements.menuBtn.addEventListener("click",()=> {
        // uiElements içerisindeki nav elemanına class ekle çıkar
        uiElements.nav.classList.toggle("open");
      });

      // Hangi sayfadayız? Eğer ana sayfadaysak api'dan ürünleri al ve arayüzde render et; eğer sepet sayfasındaysak bu durumdada sepete eklenen ürünleri render et
 if (window.location.pathname.includes("../index.html")) {
    const products = await fetchProducts();

    console.log(products);
 } else {
    console.log(`Sepet Sayfası`);
 }
});

