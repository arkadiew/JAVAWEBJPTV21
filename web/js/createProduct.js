const debug = false;
//alert("JavaScript подлючен!");
const addProduct = document.getElementById('addProduct');
if(debug) console.log("addProduct = "+addProduct.innerHTML);
//JavaScript Object
const createProductData = {
    'productName':'',
    'brand':'',
    'cost':'',
    'quantity':'',
    'razmer':'',
    'coverId':''
};
if(debug) console.log("addProduct = "+addProduct.innerHTML);
addProduct.addEventListener('click',e=>{
    if(debug)console.log("Кнопка работает.");
    const productName = document.getElementById('productName');
    if(debug)console.log("productName="+productName.value);
    createProductData.productName = productName.value;
    productName.value='';
    
    const brand = document.getElementById('brand');
    if(debug)console.log("brand="+brand.value);
    createProductData.brand=brand.value;
    brand.value='';
    
    const cost = document.getElementById('cost');
    if(debug)console.log("cost="+cost.value);
    createProductData.cost=cost.value;
    cost.value='';
    
    const quantity = document.getElementById('quantity');
    if(debug)console.log("quantity="+quantity.value);
    createProductData.quantity=quantity.value;
    quantity.value='';
    
    const razmer = document.getElementById('razmer');
    if(debug)console.log("razmer="+razmer.value);
    createProductData.razmer=razmer.value;
    razmer.value='';
    
    const coversSelect = document.getElementById('coverSelect');
    if(debug)console.log("coversSelect="+coversSelect.value);
    createProductData.coverId=coversSelect.value;
    coversSelect.value='';
    
    //Вывод объекта js, преобразованного в JSON формат (строку)
    console.log(JSON.stringify(createProductData));
    createProductToDB(createProductData);
});
async function createProductToDB(createProductData){
    console.log('createProductToDB запущена');
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify(createProductData)
    };
    
    await fetch('createProduct',requestOptions)
            .then(response => response.json())
            .then(response => console.log(response.info))
            .catch(error => console.log('Произошла ошибка: '+error));
}