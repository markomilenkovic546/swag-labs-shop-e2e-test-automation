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

Cypress.Commands.add("login", (username, password) => {
  loginPage.typeUsername(username);
  loginPage.typePassword(password);
  loginPage.clickOnLoginBtn();
});

Cypress.Commands.add("proceedToCheckout", () => {
  plp.clickOnAddToCartBtn(0);
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
});
