// Api den ürün verilerini alacak fonksion

const fetchProducts = async () => {
  try {
    // Api isteği at
    const response = await fetch("../db.json");

    // Apiden gelen veriyi js nesnesine çevir
    const data = await response.json();

    // Üürnleri fonk çağırıldığında return et

    return data.products;
  } catch (error) {
    // Kullanıcıya hata durumunda bildiiem göste
    alert("Ürünlerin api'dan alınması sırasında bir hata oluştu !!");
  }

  //Hata durumunda boş bir dizi return et
  return [];
};

export default fetchProducts;
