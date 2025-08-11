import { calculateTotalPrice, getFromLocale, saveToLocale,calculateTotalQuantity } from "./helpers.js";
import { renderCartItems, renderCartQuantity,   renderNotFound } from "./ui.js";

// LocaleStorage'dan sepete eklenen ürünleri al
let cart = getFromLocale("cart");
// Sepete ürün ekleyecek fonksiyon

const addToCart = (e, products) => {
  // Bu fonksiyondan beklentimiz ne? İlk olarak sepete eklemek istediğimiz ürünü tespit etsin sonrasında bu ürünün sepette olup olmadığını kontrol etsin.Eğer ürün sepette varsa o ürünün miktarını bir arttırsın eğer ürün sepete ilk defa eklenecekse ürünü sepete eklesin.Sepete eklenen ürünler sayfa yenilendiğinde kapbolmasın diye localStorage'da eklenen ürünleri tutsun.
  // Sepete eklenen ürünü tespi edebilmek için hangi elemana tıklandığını tespit et ve bu elemana eklenen id değerine eriş

  const productId = +e.target.dataset.id;

  // products dizisi içeriisnde id si eşit olan elemanı bul
  const foundedProduct = products.find((product) => product.id === productId);

  // Sepğete eklenecek ürün öncesinde sepete eklendimi eğer öncesinde sepete eklendiyse yeniden ekleme miktarını 1 artır ama ürün öncesinde eklenmediyse bu ürürünün verileri üzerine quantity değeri ekleyerek sıfırdan  sepete ekleme işlemi yap

  const exitingProduct = cart.find((item) => item.id === productId);

  if (exitingProduct) {
    // ürün eklediyse değerini 1 artırır
    exitingProduct.quantity++;
  } else {
    // speete eklenecek ürün için ürün objesi oluştur
    const cartItem = {
      id: foundedProduct.id,
      title: foundedProduct.title,
      price: foundedProduct.price,
      image: foundedProduct.image,
      quantity: 1,
    };
    cart.push(cartItem);
  }

  saveToLocale("cart", cart);

  // Sepete ekle butonunun içeriğini "Added olarak güncelle"
  e.target.textContent = "Added";

  // 2s sonra sepete kel butonu içeriğini add to cart oalrak güncelle
  setTimeout(() => {
    e.target.textContent = "Add to cart";
  }, 2000);
  //  Header içerisindeki sepet ikonunun yanındaki miktar değerini güncelle
renderCartQuantity(cart);
};



// Sepetten eleman kaldırıcak fonksiyon
const removeFromCart = (e) => {
  //Kulalnıcıdan silme işlemi için onay al
  const response = confirm("Do you confirm to delete this product?");

  // Eğer kullanıcı silme işlemini onayladıysa
  if (response) {
    // Tıklanılan elemana eriş
    const productId = Number(e.target.dataset.id);

    //Id si bilinen ürünü sepetten kaldır
    cart = cart.filter((item) => item.id !== productId);

    // güncel sepete göre localStorage'ı güncelle
    saveToLocale("cart", cart);

    // Güncellenen sepet'e göre arayüzü renderla.Eğer sepette eleman varsa sepetteki elemanları renderla ama sepette eleman yoksa not found içeriğini renderla
    if (cart.length > 0) {
      renderCartItems(cart);
    } else {
      renderNotFound();
    }

   //  Header içerisindeki sepet ikonunun yanındaki miktar değerini güncelle
renderCartQuantity(cart);
  }
};

const onQuantityChange = (e) => {
   // * Bu fonksiyondan beklentimiz miktarı değişen ürünü bulması ve değişen miktarı ilgili ürünün yeni miktarı olarak belirlemesidir.

  // Güncellenecek elemanın id'sine eriş
const productId = parseInt(e.target.dataset.id)
 // Güncellenecek elemanın güncel değerine eriş
 const newQuantity =parseInt(e.target.value);

  // Yeni miktar 0'dan büyük mü
  if (newQuantity > 0) {
// Güncellenecek elemanı dizi içerisinde bul
 const updateItem =cart.find((item) => item.id === productId);

 // Bulunan ürünün değerini güncelle
 updateItem.quantity = newQuantity;

 // Güncel sepet dizisini localStorage'a aktar
 saveToLocale("cart",cart);
  // Sepetteki ürünlerin toplam fiyatını renderla
   renderCartTotal(cart);
//  Header içerisindeki sepet ikonunun yanındaki miktar değerini güncelle
renderCartQuantity(cart);


  } else {
 // Eğer yeni miktar 0'dan büyük değilse kullanıcıya bir uyarıda bulun
 alert("Plase enter a value grater than 0");

 // Fonksiyonu durdur
 return;
  }
  

}
export { addToCart, removeFromCart, onQuantityChange };
calculateTotalPrice(cart);