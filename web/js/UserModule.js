
class UserModule{
    printFormNewUser(){
        document.getElementById('content').innerHTML= 
`       <h1 class="w-100 d-flex justify-content-center">Новый читатель:</h1>
         <div class="w-100 d-flex justify-content-center my-3">
             <div class="card border-0" style="width: 35rem;">
                 <div class="card-body">
                     <form id="userForm" method="POST">
                         <div class="mb-2 row">
                             <label for="firstName" class="col-sm-3 col-form-label">Имя:</label>
                             <div class="col-sm-9">
                               <input type="text" class="form-control" id="firstName" name="firstname">
                             </div>
                         </div>
                         <div class="mb-2 row">
                             <label for="lastName" class="col-sm-3 col-form-label">Фамилия:</label>
                             <div class="col-sm-9">
                               <input type="text" class="form-control" id="lastName" name="lastname">
                             </div>
                         </div>
                         <div class="mb-2 row">
                             <label for="phone" class="col-sm-3 col-form-label">Телефон:</label>
                             <div class="col-sm-9">
                               <input type="text" class="form-control" id="phone" name="phone">
                             </div>
                         </div>
                         <div class="mb-2 row">
                             <label for="login" class="col-sm-3 col-form-label">Логин:</label>
                             <div class="col-sm-9">
                               <input type="text" class="form-control" id="login" name="login">
                             </div>
                         </div>
                         <div class="mb-2 row">
                             <label for="password" class="col-sm-3 col-form-label">Пароль:</label>
                             <div class="col-sm-9">
                               <input type="password" class="form-control" id="password" name="password">
                             </div>
                         </div>
                         <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                             <input id="btnAddUser" type="button" class="btn btn-primary me-md-2" value="Добавить">
                         </div>
                     </form>
                 </div>
             </div>
         </div>`;
        document.getElementById("btnAddUser").addEventListener('click',e=>{
            
            userModule.sendUserRegistration();
        });
    }
    async sendUserRegistration(){
        const userForm = {
            "firstname": document.getElementById('firstName').value,
            "lastname": document.getElementById('lastName').value,
            "phone": document.getElementById('phone').value,
            "login": document.getElementById('login').value,
            "password": document.getElementById('password').value,
        }
        
        console.log(JSON.stringify(userForm));
       
         console.log(JSON.stringify(userForm));
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userForm)
        };
        await fetch('userRegistration',requestOptions)
                .then(response => response.json())
                .then(response => {
                    document.getElementById('info').innerHTML= response.info;
                })
                .catch(error => console.log('Ошибка сервера: '+error))
    }
    printListUsers(){
        fetch('listUsers',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credential: "include"
        })
        .then(response=>response.json())
        .then(response=>{
            if(!response.status){
                document.getElementById('info').innerHTML=response.info;
                return;
            }
            document.getElementById('content').innerHTML=
                `<h3 class="w-100 d-flex justify-content-center mt-5">Список пользователей</h3>
                   <div class="w-100 p-3 d-flex justify-content-center">
                        <div class="card m-2 border-0" style="width: 45rem;">
                            <div class="card-body">
                                <div class="container text-center">
                                    <table class="table" id="table">
                                        <thead>
                                        <tr><th scope="col">№</th><th scope="col" class="text-start">Пользователь</th></tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                         </div>
                   </div>`;
            let table = document.getElementById('table');
            let tbody = document.createElement("tbody");
            for (let i = 0; i < response.users.length; i++) {
                let user = response.users[i];
                let row = document.createElement("tr");
                let cell1 = document.createElement("td");
                cell1.textContent = i+1;
                let cell2 = document.createElement("td");
                cell2.setAttribute("class","text-start");
                cell2.textContent = `${user.firstname} ${user.lastname} (${user.login})`;
                row.appendChild(cell1);
                row.appendChild(cell2);
                tbody.appendChild(row);
                
            }
            table.appendChild(tbody);
        })
        .catch(error=>{
            console.log(error)
        });
    }
    
    
    
  printFormtakeOnProduct(){
        document.getElementById('content').innerHTML = 
        `<h1 class="w-100 d-flex justify-content-center">Выдача товаров</h1>
<div class="w-100 d-flex justify-content-center">
    <div class="card border-0" style="width: 25rem;">
      <div class="card-body">
        <h5 class="card-title w-100">Список товаров</h5>
        <form action="" method="POST">
            <p class="card-text w-100">
                <select id="selectPurchase" name="purchaseId" class="w-100">
                    <option selected disabled>Выберите товар</option>
                        <option selected disabled>Choose</option>                          
                        <input type="number" value="1" min="1" max="100" class="form-control" id="quantity" name="quantity" value=""> 
                       
                </select>
                    
            </p>
            
        
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button id="btnTakeOnPurchase" type="button" class="btn btn-primary me-md-2">купить</button>
            </div>
        </form>
           
      </div>
    </div>
</div>`;
        fetch('listProducts', {
           method: 'GET',
           credentials: 'include',
           headers: {'Content-Type': 'application/json'}
        })
                .then(response => response.json())
                .then(response => {
                    let selectPurchase = document.getElementById('selectPurchase');
                    for(let i = 0; i < response.length; i++){
                        let option = document.createElement('option');
                        option.text = response[i].name+'. cost: '+response[i].cost+'€'+' quantity:'+response[i].quantity;
                        option.value = response[i].id;
                        selectPurchase.appendChild(option);
                    }
                })
                .catch(error => console.log('Ошибка сервера: '+error));
        const btnTakeOnPurchase = document.getElementById('btnTakeOnPurchase');
        btnTakeOnPurchase.addEventListener('click',e=>{
            e.preventDefault();
            userModule.takeOnProduct();
        });
    }
    takeOnProduct(){
        let data = {
            purchaseId: document.getElementById('selectPurchase').value,
            quantity: document.getElementById('quantity').value
        };
        if(data.purchaseId === '#'){
            document.getElementById('info').innerHTML = 'Выберите'
            return;
        }
         if(data.quantity === '#'){
            document.getElementById('info').innerHTML = 'Выберите'
            return;
        }
        fetch('createPurchase',{
          method: 'POST',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }).then(response => response.json())
                .then(response => {
                    userModule.printFormtakeOnProduct();
                    document.getElementById('info').innerHTML = response.info;
                })
                .catch(error => console.log('Ошибка сервера: '+error));
    }
    
    
    
    duMoney(){
        document.getElementById('content').innerHTML=
                `<h1 class="w-100 d-flex justify-content-center">Пополнить баланс</h1>
<div class="w-100 d-flex justify-content-center">
    <div class="card border-0" style="width: 25rem;">
      <div class="card-body">
        
        <form action="" method="POST">
            <p class="card-text w-100">
                 
                    <option  id="moneySelect"  value="#" selected readonly>Выберите сколько хотите пополнить</option>  
                        <input type="number" value="0" min="1"  class="form-control" id="moneyQo" name="moneyQo" value=""> 
                 
               
            
            </p>
             <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button id="btnAddMoney" type="button" class="btn btn-primary me-md-2">пополнить</button>
            </div>
        </form>
           
      </div>
    </div>
</div>`;
        
       const btnAddMoney = document.getElementById('btnAddMoney');
        btnAddMoney.addEventListener('click',e=>{
            e.preventDefault();
            userModule.addMoneyUser();
        });
    
    
    
    }
    addMoneyUser(){
        let data = {
            moneyQo: document.getElementById('moneyQo').value
        };
        if(data.moneyQo === '#'){
            document.getElementById('info').innerHTML = 'moneyQo'
            return;
        }
        fetch('addMoney',{
          method: 'POST',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }).then(response => response.json())
                .then(response => {
                    userModule.duMoney();
                    document.getElementById('info').innerHTML = response.info;
                })
                .catch(error => console.log('Ошибка сервера: '+error));
    }
};
const userModule = new UserModule();
export {userModule};


