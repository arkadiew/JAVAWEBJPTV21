import {productModule} from './ProductModule.js';
class AuthorModule{
    async printCreateAuthor(){
         document.getElementById('content').innerHTML=
        `<h1  class="w-100 d-flex justify-content-center">Новый автор:</h1>
        <div class="w-100 d-flex justify-content-center">
            <div class="card border-0" style="width: 25rem;">
                <div class="card-body">
                <form method="POST" action="createAuthor">
                    <div class="mb-2 row">
                        <label for="firstName" class="col-sm-3 col-form-label">Имя:</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" id="firstName" name="firstname" value="">
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label for="lastName" class="col-sm-3 col-form-label">Фамилия:</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" id="lastName" name="lastname" value="">
                        </div>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" id="btnAddAuthor" class="btn btn-primary me-md-2">Добавить</button>
                    </div>
                </form>
            </div>
        </div>`;
        const btnAddAuthor = document.getElementById('btnAddAuthor');
        btnAddAuthor.addEventListener('click',e=>{
            e.preventDefault();
            const createAuthorObject = {
                 'firstname': document.getElementById('firstName').value,
                 'lastname': document.getElementById('lastName').value,
            };
            authorModule.createNewAuthor(createAuthorObject);
        });
    }
    
    async createNewAuthor(createAuthorObject){
       
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(createAuthorObject)
        };
        await fetch('createAuthor',requestOptions)
                .then(response => response.json())
                .then(response => {
                    document.getElementById('info').innerHTML=response.info;
                    authorModule.printCreateAuthor();
                })
                .catch(error=>console.log('error: '+error));
    }  
    
    async printListAuthors(){
       
       await fetch('listAuthors',{
           method: 'GET',
           headers: {'Content-Type': 'application/json'},
           credentials: 'include',
       })
               .then(response=>response.json())
               .then(response => {
                    //console.log(JSON.stringify(response));
                    let content = document.getElementById('content');
                    content.innerHTML = '';
                    let html = `
                    <h3 class="w-100 mt-5 d-flex justify-content-center">Список авторов</h3>
                    <div id="box_listAuthors" class="w-100 d-flex justify-content-center p-5">

                    </div>`;
                    content.insertAdjacentHTML("beforeend", html);
                    let table = document.createElement('table');
                    table.setAttribute('class','table w-50');
                    let headers = ["№", "Автор", "Книги автора"];
                    let thead = table.createTHead();
                    let row = thead.insertRow();
                    for(let i = 0; i < headers.length;i++){
                        let th = document.createElement("th");
                        th.setAttribute('class','text-start');
                        let text = document.createTextNode(headers[i]);
                        th.appendChild(text);
                        row.appendChild(th);
                    }
                    let tbody = table.createTBody();
                    for(let i = 0;i< response.length;i++){
                        let entry = response[i];
                        let tr = tbody.insertRow();
                        let td1 = tr.insertCell();
                        td1.innerHTML = i+1;
                        let td2 = tr.insertCell();
                        td2.innerHTML = entry.key.firstname+' '+entry.key.lastname;
                        let td3 = tr.insertCell();
                        td3.innerHTML = '';
                        for(let j = 0;j< entry.value.length;j++){
                            let book = entry.value[j];
                            tr = tbody.insertRow();
                            td1 = tr.insertCell();
                            td1.innerHTML = '';
                            let td2 = tr.insertCell();
                            td2.innerHTML = '';
                            let td3 = tr.insertCell();
                            let a = document.createElement('a');
                            a.setAttribute('class','btn btn-outline-dark w-100 border-0 bg-white text-primary text-start');
                            a.innerHTML=book.bookName;
                            td3.appendChild(a);
                            a.addEventListener('click',e=>{
                                productModule.printBook(book.id);
                            })
                        }
                    };
                    let box_listAuhtors = document.getElementById('box_listAuthors');
                    box_listAuthors.appendChild(table);
                        
                })
               .catch(error => "error: "+error);
    }
}
const authorModule = new AuthorModule();
export {authorModule};
