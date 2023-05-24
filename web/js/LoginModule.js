/*  fetch немножко параноик и по умолчанию не 
*   передаёт куки от сайта, на который 
*   отправляется запрос (а идентификатор 
*   сессии хранится в куке PHPSESSID). 
*   За передачу кук и заголовков авторизации 
*   отвечает опция credentials, которая может 
*   иметь одно из следующих значений:
*     'omit' (по умолчанию) — не передавать куки и заголовки авторизации;
*     'same-origin' — передавать, только если домен, на который 
*       отправляется запрос, совпадает с доменом текущего сайта 
*       (точнее, origin; сложный случай, но текущего вопроса не касается, 
*       так что не буду его подробно описывать);
*     'include' — передавать.
*/
import {productModule} from './ProductModule.js';
import {checkAuthUser} from './main.js';
class LoginModule{
    async printFormLogin(){
        // const add_book = document.getElementById('add_book');
         document.getElementById('content').innerHTML=
        `<h2 class="w-100 d-flex justify-content-center mt-5">Вход в систему</h2>
            <div class="w-100 d-flex justify-content-center mt-5">
                <div class="card p-2" style="width: 35rem;">
                  <div class="card-body">
                    <form action="enter" method="POST">
                      <div class="my-2 row">
                        <label for="inputLogin" class="col-sm-4 col-form-label d-flex justify-content-end">Логин</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="login" id="inputLogin" value="">
                        </div>
                      </div>
                      <div class="mb-2 row">
                        <label for="inputPassword" class="col-sm-4 col-form-label d-flex justify-content-end">Password</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" name="password" id="inputPassword">
                        </div>
                      </div>
                      <div class="mt-3 p-2 row d-flex justify-content-end">
                        <input type="button" class="btn btn-secondary col-sm-4" value="Войти" id="btnInputEnter">
                      </div>
                    </form>
                      <div class="mb-2 row">
                          <p class="text-info w-100 d-flex justify-content-end"><a id="registration" href="#">Зарегистрироваться</a></p>
                      </div>
                  </div>
                </div>
            </div>`;
        const btnInputEnter = document.getElementById('btnInputEnter');
        btnInputEnter.addEventListener('click',e=>{
            e.preventDefault();
            const loginObject = {
                 'login': document.getElementById('inputLogin').value,
                 'password': document.getElementById('inputPassword').value,
            };
            loginModule.login(loginObject);
        });
    }
    
    async login(loginObject){
       
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(loginObject)
        };
        await fetch('login',requestOptions)
                .then(response => response.json())
                .then(response => {
                    document.getElementById('info').innerHTML=response.info;
                    sessionStorage.setItem('authUser',JSON.stringify(response.authUser));
                    productModule.printListProducts();
                    checkAuthUser();
                })
                .catch(error=>console.log('error: '+error));
    }  
    logout(){
        let promise = fetch('logout',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        promise.then(response => response.json());
        promise.then(response => {
                    document.getElementById('info').innerHTML=response.info;
                    if(sessionStorage.getItem('authUser')!== null){
                        sessionStorage.removeItem('authUser');
                    };
                    document.getElementById('info').innerHTML=response.info;
                    productModule.printListProducts();
                    checkAuthUser();
                })
                .catch(error=>console.log('error: '+error));
    }

}
const loginModule = new LoginModule();
export {loginModule};
