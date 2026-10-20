import { Page, Locator } from '@playwright/test';

export class LoginPage {
   readonly page: Page;
   readonly username: Locator;
   readonly password: Locator;
   readonly loginButton: Locator;

constructor(page: Page) {
  this.page = page;
  this.username = page.locator('[data-test = "username"]');
  this.password = page.locator('[data-test = "password"]');
  this.loginButton = page.locator('[data-test = "login-button"]');


}
async abrePagina() {
    await this.page.goto('https://www.saucedemo.com/')
}
async login(user: string, pass: string){
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
}
}