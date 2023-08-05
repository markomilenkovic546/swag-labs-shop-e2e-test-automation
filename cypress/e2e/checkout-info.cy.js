import LoginPage from "../pom-classes/Login-page";
import ProductListPage from "../pom-classes/Product-list-page";
import Header from "../pom-classes/Header";
import CartPage from "../pom-classes/Cart-page";
import CheckOutInfoPage from "../pom-classes/Checkout-info-page";

const loginPage = new LoginPage();
const plp = new ProductListPage();
const header = new Header();
const cart = new CartPage();
const checkoutInfo = new CheckOutInfoPage();

beforeEach(function () {
  loginPage.visitLoginPage();
  cy.fixture("users").then((loginData) => {
    this.standard_user = loginData[0];
    cy.login(this.standard_user.username, this.standard_user.password);
  });
  cy.fixture("products").then((productData) => {
    this.products = productData;
  });
});

afterEach(function () {
  header.openBurgerMenu();
  header.clickOnResetAppStateLinkFromBurger();
});

