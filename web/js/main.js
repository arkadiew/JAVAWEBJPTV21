export{checkAuthUser};
import{productModule} from './ProductModule.js';

import{userModule} from './UserModule.js';
import{loginModule} from './LoginModule.js';
import{adminModule} from './AdminModule.js';


const newProduct = document.getElementById('newProduct');
    newProduct.addEventListener('click', e=>{
        productModule.printCreateProduct();
});
const listProducts = document.getElementById('listProducts');
    listProducts.addEventListener('click',e=>{
        productModule.printListProducts();
});

const takeOnPurchase = document.getElementById('takeOnPurchase');
    takeOnPurchase.addEventListener('click',e=>{
        userModule.printFormtakeOnProduct();
});
const addMoney = document.getElementById('addMoney');
    addMoney.addEventListener('click',e=>{
        userModule.duMoney();
});




const newUser = document.getElementById('newUser');
    newUser.addEventListener('click', e=>{
        userModule.printFormNewUser();
    });
const listUsers = document.getElementById('listUsers');
    listUsers.addEventListener('click', e=>{
        userModule.printListUsers();
    });
const logIn = document.getElementById('logIn');
    logIn.addEventListener('click', e=>{
        e.preventDefault();
        loginModule.printFormLogin();
    });
const logOut = document.getElementById('logout');
    logOut.addEventListener('click', e=>{
        e.preventDefault();
        loginModule.logout();
    });
const changeRole = document.getElementById('changeRole');
    changeRole.addEventListener('click', e=>{
        e.preventDefault();
        adminModule.printFormChangeRole();
    });
const statisticForm = document.getElementById('statisticForm');
    statisticForm.addEventListener('click', e=>{
        e.preventDefault();
        adminModule.printStatisticForm();
    });    

function checkAuthUser(){
    let authUser = JSON.parse(sessionStorage.getItem('authUser'));
    if(authUser === null){
        logIn.hidden = false;
        newUser.hidden = false;
        newProduct.hidden = true;
        listUsers.hidden = true;
        logOut.hidden = true;
        document.getElementById('takeOnPurchase').hidden = true;
        document.getElementById('addMoney').hidden = true;
        document.getElementById('liAdministrator').hidden = true;
        document.getElementById('liPurchase').hidden = true;
       
        return;
    }
    document.getElementById('userLogin').innerHTML = authUser.login; 
    let USER = false;
    let EMPLOYEE = false;
    let ADMINISTRATOR = false;
    for(let key in authUser.roles){
        if(authUser.roles[key] === "USER"){
            USER = true;
        }
        if(authUser.roles[key] === "EMPLOYEE"){
            EMPLOYEE = true;
        }
        if(authUser.roles[key] === "ADMINISTRATOR"){
            ADMINISTRATOR = true;
        }
    }
    if(USER){
        logOut.hidden = false;
        logIn.hidden = true;
        document.getElementById('takeOnPurchase').hidden = false;
        document.getElementById('addMoney').hidden = false;
        document.getElementById('liPurchase').hidden = false;
        
    }
    if(EMPLOYEE){
        newProduct.hidden = false;
       
    }
    if(ADMINISTRATOR){
        listUsers.hidden = false;
        document.getElementById('liAdministrator').hidden = false;
    }
    
}
//function checkAuthUser() {
//  let user = JSON.parse(sessionStorage.getItem('authUser'));
//  if (!user) {
//    logIn.hidden = false;
//    newUser.hidden = false;
//    newProduct.hidden = true;
//    listUsers.hidden = true;
//    logOut.hidden = true;
//    document.getElementById('takeOnPurchase').hidden = true;
//    document.getElementById('addMoney').hidden = true;
//    document.getElementById('liAdministrator').hidden = true;
//    document.getElementById('liPurchase').hidden = true;
//    return;
//  }
//  if (user.role === 'ADMINISTRATOR') {
//    document.getElementById('liAdministrator').hidden = false;
//  } else {
//    document.getElementById('liAdministrator').hidden = true;
//  }
//  if (user.canPurchase) {
//    document.getElementById('liPurchase').hidden = false;
//
//  } else {
//    document.getElementById('liPurchase').hidden = true;
//  }
//  document.getElementById('username').textContent = user.name;
//  logOut.hidden = false;
//  logIn.hidden = true;
//  newUser.hidden = true;
//  newProduct.hidden = false;
//  listUsers.hidden = false;
//  document.getElementById('takeOnPurchase').hidden = false;
//  document.getElementById('addMoney').hidden = false;
//}

checkAuthUser();


 

