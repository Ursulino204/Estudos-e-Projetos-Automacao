<div align="center">

# 🎭 Estudos e Projetos - Automação

**End-to-end UI test automation for the [Sauce Demo](https://www.saucedemo.com/) web app, built with Playwright, TypeScript and the Page Object Model.**

![Playwright](https://img.shields.io/badge/Playwright-1.54-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![POM](https://img.shields.io/badge/Pattern-Page%20Object%20Model-8A2BE2?style=for-the-badge)

</div>

---

## 📌 About the Project

This repository is a hands-on QA automation project where I test the authentication flow of **Swag Labs (Sauce Demo)**, a public e-commerce app built for practicing test automation.

The goal is to show how I approach UI test automation:

- **Readable, maintainable tests** that describe user behavior instead of DOM details
- **Separation of concerns** through the **Page Object Model (POM)**
- **Stable selectors** based on `data-test` attributes, which hold up better than CSS classes or XPath
- **Positive and negative scenarios**, so the tests check both the happy path and invalid input

---

## 🧪 Test Scenarios

| # | Scenario | Type | Input | Expected Result |
|---|----------|------|-------|-----------------|
| 1 | Logs in with valid credentials | ✅ Positive | `standard_user` / `secret_sauce` | Redirected to `/inventory.html` and the **Products** page is shown |
| 2 | Shows an error with invalid credentials | ❌ Negative | Invalid username / password | Stays on login and shows a "do not match" error |
| 3 | Blocks a locked out user | ❌ Negative | `locked_out_user` / `secret_sauce` | Stays on login and shows a "locked out" error |
| 4 | Requires a username | ⚠️ Validation | Empty username | "Username is required" error |
| 5 | Requires a password | ⚠️ Validation | Empty password | "Password is required" error |

```
Running 5 tests using 5 workers
  ✓ Login › logs in with valid credentials
  ✓ Login › shows an error with invalid credentials
  ✓ Login › blocks a locked out user
  ✓ Login › requires a username
  ✓ Login › requires a password

  5 passed
```

---

## 🏗️ Architecture: Page Object Model

The test logic is decoupled from page structure. Each page of the app gets a class that holds its **locators** and **actions**, so tests stay short and a UI change only needs to be fixed in one place.

```
┌──────────────────────┐       uses       ┌──────────────────────┐       drives       ┌──────────────┐
│ tests/login.spec.ts  │ ───────────────▶ │  pages/LoginPage.ts  │ ─────────────────▶ │  Sauce Demo  │
│   (what to test)     │                  │  (how to interact)   │                    │  (browser)   │
└──────────────────────┘                  └──────────────────────┘                    └──────────────┘
```

**Page Object** ([pages/LoginPage.ts](pages/LoginPage.ts)):

```ts
export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async open() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
  }
}
```

**Test** ([tests/login.spec.ts](tests/login.spec.ts)): short, with shared setup in `beforeEach`:

```ts
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
});
```

**Configuration** ([playwright.config.ts](playwright.config.ts)): one place for the base URL, the `data-test` attribute used by `getByTestId`, retries on CI, the HTML reporter, screenshots on failure and traces on retry.

---

## 📂 Project Structure

```
Estudos-e-Projetos-Automacao/
├── pages/
│   └── LoginPage.ts          # Page Object: locators + actions for the login page
├── tests/
│   └── login.spec.ts         # Login suite: positive, negative and validation scenarios
├── playwright.config.ts      # Base URL, test id attribute, reporter, retries, browsers
├── package.json              # npm scripts and dependencies
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Ursulino204/Estudos-e-Projetos-Automacao.git
cd Estudos-e-Projetos-Automacao

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running the tests

```bash
# Run all tests (headless)
npm test

# Run with the browser visible
npm run test:headed

# Open the interactive UI mode
npm run test:ui

# Open the HTML report from the last run
npm run report
```

---

## 🛠️ Skills Demonstrated

- **Test automation with Playwright**: browser control, auto-waiting and web-first assertions (`expect(page).toHaveURL`)
- **TypeScript**: typed page objects using Playwright's `Page` and `Locator` types
- **Design patterns**: Page Object Model for reusable, low-maintenance test code
- **Test design**: positive, negative and field-validation cases for an authentication flow
- **Selector strategy**: `getByTestId` mapped to `data-test` attributes for resilient element targeting
- **Test configuration**: central `playwright.config.ts` with base URL, CI-aware retries, HTML reports, screenshots and traces
- **Debugging**: using Playwright's failure artifacts (screenshots, traces, page snapshots) to investigate failed tests

---

## 🗺️ Roadmap

Next steps planned for this project:

- [x] Central `playwright.config.ts` (base URL, retries, reporters)
- [x] Check the error message shown on invalid login
- [x] Cover the locked-out user and empty-field scenarios
- [ ] Add page objects for Inventory, Cart and Checkout and automate a full purchase flow
- [ ] Run on Firefox and WebKit in addition to Chromium
- [ ] Data-driven tests with parameterized credentials
- [ ] CI pipeline with GitHub Actions running the suite on every push

---

<div align="center">

**Caio Ursulino** · QA Automation

⭐ If you found this project interesting, feel free to star the repository!

</div>
