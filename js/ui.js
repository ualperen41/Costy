// Ui elemanlarını bir arada tutan obje
const uiElements= {
    menuBtn:document.querySelector("#menu-btn"),
    nav:document.querySelector("nav"),
    productsList:document.querySelector("#products-list"),
};

// Api dan alınan ürünler için birer html render eciek fonksiyon

const renderProduct = (products) => {
    // Bu fonksiyon ürünler dizi içerisindeki her bir eleman için html oluştur
   const productsHtml = products.map((product) => ` <div class="product">
          
             <img
            src="${product.image}"
            alt="product-image"
          />
           
            <div class="product-info">
              <h2>${product.title} </h2>
              <p>$${product.price.toFixed(2)}</p>
              <buttonclass="add-to-cart" data-id="${
              product.id}">Add to cart</buttonclass=>
            </div>
         </div>`).join("");

         // Oluşturaln her html işlmeine arayüzde productslist elemanı içerisine ekle 
         uiElements.productsList.innerHTML = productsHtml;

        // ! renderProduct fonksiyonu çalışana kadar arayüzde bir product elemanı bulunmayacak dolayısıyla bir sepete ekle butonuda bulunmayacak.Bu durumda eğer diğer ui elemanlarına erişmeye çalıştığımız gibi bu butonlara erişmeye çalışırsak bu noktada istediğimizi elde edemeyiz.Çözüm olaraksa bu butonlara erişme işlemini renderProduct fonksiyonu içerisinde yapacağız.
  // Sepete ekle butonlarına eriş
 const addToCartButtons = document.querySelectorAll(".add-to-cart");


 // Erişilen sepete ekle butonlarına bir addEventListener ekle.addEventListener tekil elemanlara ekleneceğinden ilk olarak addToCartButtons'ı dön ve içerisindeki her bir elemaan teker teker eriş
 addToCartButtons.forEach((button) => {
    console.log(button);
  
});
};
export {uiElements,renderProduct};