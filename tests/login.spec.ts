import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('logs in with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('shows an error with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid_user', 'invalid_password');

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match any user in this service',
    );
  });

  test('blocks a locked out user', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(page).toHaveURL('/');
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });

  test('requires a username', async () => {
    await loginPage.login('', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('requires a password', async () => {
    await loginPage.login('standard_user', '');

    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
});
