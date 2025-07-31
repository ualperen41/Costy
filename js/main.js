import fetchProducts from "./api.js";
import { addToCart } from "./cart.js";
import { getFromLocale } from "./helpers.js";
import { renderCartItems, renderProduct, uiElements } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  // menuBtn'e tıklanınca nav kısmını aç-kapa yap
  uiElements.menuBtn.addEventListener("click", () => {
    // uiElements içerisindeki nav elemanına class ekle çıkar
    uiElements.nav.classList.toggle("open");
  });

// LocalStorage dan sepete eklenen ürünleri al
let cart = getFromLocale("cart");

  // Hangi sayfadayız? Eğer ana sayfadaysak api'dan ürünleri al ve arayüzde render et; eğer sepet sayfasındaysak bu durumdada sepete eklenen ürünleri render et
  if (window.location.pathname.includes("/index.html")) {
    // Api'dan ürünleri aldıktan sonra her bir ürün elemanı için arayüze bir html render et
    const products = await fetchProducts();

    renderProduct(products, (e) => {
      addToCart(e,products);
    });
  } else {
// sepette ürün yoksa not-found içeriğini renderla,sepette ürünler varsa bu ürünleri renderla
 if ( cart.length > 0) {
 renderCartItems(cart);
 console.log(cart)
 } else {
  console.log(`Sepette elemanlar bulunmamakta`);
 }
  }
});
