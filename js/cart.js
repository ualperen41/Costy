import { getFromLocale, saveToLocale } from "./helpers.js";

// LocaleStorage'dan sepete eklenen ürünleri al
 let cart = getFromLocale("cart");
// Sepete ürün ekleyecek fonksiyon

const addToCart = (e,products) => {
    // Bu fonksiyondan beklentimiz ne? İlk olarak sepete eklemek istediğimiz ürünü tespit etsin sonrasında bu ürünün sepette olup olmadığını kontrol etsin.Eğer ürün sepette varsa o ürünün miktarını bir arttırsın eğer ürün sepete ilk defa eklenecekse ürünü sepete eklesin.Sepete eklenen ürünler sayfa yenilendiğinde kapbolmasın diye localStorage'da eklenen ürünleri tutsun.
     // Sepete eklenen ürünü tespi edebilmek için hangi elemana tıklandığını tespit et ve bu elemana eklenen id değerine eriş

 const productId =+e.target.dataset.id;

 // products dizisi içeriisnde id si eşit olan elemanı bul
  const foundedProduct =products.find((product)=> product.id === productId );

// Sepğete eklenecek ürün öncesinde sepete eklendimi eğer öncesinde sepete eklendiyse yeniden ekleme miktarını 1 artır ama ürün öncesinde eklenmediyse bu ürürünün verileri üzerine quantity değeri ekleyerek sıfırdan  sepete ekleme işlemi yap

 const exitingProduct = cart.find((item) => item.id ===productId);

if(exitingProduct){
    // ürün eklediyse değerini 1 artırır
    exitingProduct.quantity++
} else {
    // speete eklenecek ürün için ürün objesi oluştur
    const cartItem = {
        id:foundedProduct.id,
        title:foundedProduct.title,
        price:foundedProduct.price,
        image:foundedProduct.image,
        quantity:1,
    };
cart.push(cartItem)

}


saveToLocale("cart",cart);

 // Sepete ekle butonunun içeriğini "Added olarak güncelle"
 e.target.textContent="Added";

 // 2s sonra sepete kel butonu içeriğini add to cart oalrak güncelle
 setTimeout(() => {
    e.target.textContent="Add to cart";
 }, 2000);
};



export {addToCart};