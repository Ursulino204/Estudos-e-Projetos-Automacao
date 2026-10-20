import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';


test('Login', async({page}) => {
  const Login = new LoginPage(page);
  await Login.abrePagina();
  await Login.login('standard_user', 'secret_sauce');
 
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html/');
});
test('Login_errado', async({page}) => {
  const Login = new LoginPage(page);
  await Login.abrePagina();
  await Login.login('usuario-errado', 'senha-errada');
   await expect(page).toHaveURL('https://www.saucedemo.com/');

});