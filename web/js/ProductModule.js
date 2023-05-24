import {coverModule} from './CoverModule.js';
class ProductModule{
    async printCreateProduct(){
        // const add_book = document.getElementById('add_book');
         document.getElementById('content').innerHTML=
                 //add_book;
             `<h3 class="w-100 mt-5 d-flex justify-content-center">Новый товар</h3>
             <div class="w-100 d-flex justify-content-center p-5">
                 <div class="card" style="width: 40rem;">
                     <div class="card-body">
                         <p class="w-100 d-flex justify-content-center p-5"><a id="addCover" href="#">Добавить обложку для товара</a></p>
                         <form method="POST" action="createProduct">
                           <div class="mb-3 row">
                             <label for="productName" class="col-sm-5 col-form-label">Название товара:</label>
                             <div class="col-sm-7">
                               <input type="text" class="form-control" id="productName" name="productName" value="">
                             </div>
                           </div>
                           <div class="mb-3 row">
                             <label for="brand" class="col-sm-5 col-form-label">Бренд:</label>
                             <div class="col-sm-7">
                               <input type="text" class="form-control" id="brand" name="brand" value="">
                             </div>
                           </div>
                           <div class="mb-3 row">
                             <label for="quantity" class="col-sm-5 col-form-label">Кол во:</label>
                             <div class="col-sm-7">
                               <input type="text" class="form-control" id="quantity" name="quantity" value="">
                             </div>
                           </div>
                           <div class="mb-3 row">
                             <label for="cost" class="col-sm-5 col-form-label">цена:</label>
                             <div class="col-sm-7">
                                     
                                  <input type="text" class="form-control" id="cost" name="cost" value="">
                             </div>
                           </div>
                            <div class="mb-3 row">
                             <label for="razmer" class="col-sm-5 col-form-label">размер:</label>
                             <div class="col-sm-7">
                                     
                                  <input type="text" class="form-control" id="razmer" name="razmer" value="">
                             </div>
                           </div>
                           <div class="mb-3 row">
                             <label for="coverId" class="col-sm-5 col-form-label justify-content-md-end">Обложки:</label>
                             <div class="col-sm-7">
                                 <select name="coverId" id="coverSelect" class="form-select">

                                 </select>
                             </div>
                           </div>

                           <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                               <button type="button" class="btn btn-primary me-md-2" id="addProduct">Добавить</button>
                           </div>

                         </form>
                     </div>
                 </div>
             </div>
         `;
         await fetch('listCovers',{
             method:'GET',
             credentials: 'include',
             headers: {'Content-Type':'application/json'}
         })
             .then(listCovers=>listCovers.json())
             .then(listCovers => {
                 let coverSelect = document.getElementById('coverSelect');
                 coverSelect.innerHTML = '';
                 for(let i=0;i<listCovers.length;i++){
                     const cover = listCovers[i];
                     console.log(JSON.stringify(cover));
                     let option = document.createElement("option");
                     option.text=cover.description;
                     option.value = cover.id;
                     coverSelect.appendChild(option);
                 };
             })
             .catch(error=>{
                 document.getElementById('info').innerHTML="Ошибка чтения списка обложек";
             });
        

         const addProduct  = document.getElementById('addProduct');
         addProduct.addEventListener('click',e=>{
             const createProductObject = {
                 'productName': document.getElementById('productName').value,
                 'brand': document.getElementById('brand').value,
                 'quantity': document.getElementById('quantity').value,
                 'cost': document.getElementById('cost').value,
                 'razmer': document.getElementById('razmer').value,                            
                 'coverId': document.getElementById('coverSelect').value
             };
             productModule.cretateNewProducts(createProductObject);
         });
         const addCover = document.getElementById('addCover');
         addCover.addEventListener('click',e=>{
             coverModule.printFormAddCover();
         });
    };
    async printListProducts(){
       document.getElementById('content').innerHTML=
               `<h3 class="w-100 mt-5 d-flex justify-content-center">Список shoe</h3>
                   <div id="box_listProducts" class="w-100 d-flex justify-content-center p-5">

                   </div>`;
       await fetch('listProducts',{
           method: 'GET',
           credentials: 'include',
           headers: {'Content-Type': 'application/json'},
       })
               .then(listProducts=>listProducts.json())//преобразовываем полученную строку в которой
       //записан json-массив с книгами в js-массив
               .then(listProducts => {
                   let boxListProducts = document.getElementById('box_listProducts');//сюда будем вставлять карты с книгами
                   for(let i=0;i<listProducts.length;i++){
                       const product = listProducts[i];//получаем книгу из массива и вставляем из нее данные в html с помощью {{...}}
                       let cart = `<div class="card " style="width: 18rem">
                                       <a href="product?id=${product.id}">
                                           <img src="insertFile/${product.cover.url}" class="card-img-top image-size" alt="...">
                                       </a>
                                   </div>`;

                       boxListProducts.insertAdjacentHTML("beforeend", cart);
                   }
                   document.getElementById('info').innerHTML='';
               })
               .catch(error => "error: "+error);
    }
    async printListReadedProduct(){
       document.getElementById('content').innerHTML=
               `<h3 class="w-100 mt-5 d-flex justify-content-center">Список product</h3>
                   <div id="box_listReadedProduct" class="w-100 d-flex justify-content-center p-5">

                   </div>`;
       await fetch('box_listReadedProduct',{
           method: 'GET',
           credentials: 'include',
           headers: {'Content-Type': 'application/json'}
       })
               .then(listProducts=>listProducts.json())//преобразовываем полученную строку в которой
       //записан json-массив с книгами в js-массив
               .then(listProducts => {
                   let boxListProducts = document.getElementById('box_listReadedProduct');//сюда будем вставлять карты с книгами
                   for(let i=0;i<listProducts.length;i++){
                       const product = listProducts[i];//получаем книгу из массива и вставляем из нее данные в html с помощью {{...}}
                       let cart = `<div class="card " style="width: 18rem">
                                       <a href="product?id=${product.id}">
                                           <img src="insertFile/${product.cover.url}" class="card-img-top image-size" alt="...">
                                       </a>
                                   </div>`;

                       boxListBooks.insertAdjacentHTML("beforeend", cart);
                   }
               })
               .catch(error => "error: "+error);
    }
    async cretateNewProducts(createProductObject){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(createProductObject)
        };
        await fetch('createProduct',requestOptions)
                .then(response => response.json())
                .then(response => {
                    document.getElementById('info').innerHTML=response.info;
                    productModule.printListProducts();
                })
                .catch(error=>console.log('error: '+error));
    }
    printProduct(id){
        console.log('Печатается книга с id='+id);
    }
}
const productModule = new ProductModule();
export {productModule};
