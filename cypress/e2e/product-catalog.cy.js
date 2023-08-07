import LoginPage from "../pom-classes/Login-page";
import ProductListPage from "../pom-classes/Product-list-page";
import ProductDetailsPage from "../pom-classes/Product-details-page";
import Header from "../pom-classes/Header";
import CartPage from "../pom-classes/Cart-page";
import CheckOutInfoPage from "../pom-classes/Checkout-info-page";
import CheckOutOverviewPage from "../pom-classes/Checkout-overview-page";
import CheckoutCompletePage from "../pom-classes/Checkout-complete-page";

const loginPage = new LoginPage();
const plp = new ProductListPage();
const pdp = new ProductDetailsPage();
const header = new Header();
const cart = new CartPage();
const checkoutInfoPage = new CheckOutInfoPage();
const checkoutOverviewPage = new CheckOutOverviewPage();
const checkoutCompletePage = new CheckoutCompletePage();

beforeEach(function () {
  loginPage.visitLoginPage();
  cy.fixture("users").then((loginData) => {
    this.standard_user = loginData[0];
    cy.login(this.standard_user.username, this.standard_user.password);
  });
  cy.writeProductDataIntoFixtureFile();
  cy.fixture("products").then((productData) => {
    this.products = productData;
  });

  cy.fixture("checkout-info").then((checkoutInfoData) => {
    this.checkoutInfo = checkoutInfoData;
  });
});

afterEach(function () {
  header.openBurgerMenu();
  header.clickOnResetAppStateLinkFromBurger();
});

it("User can navigate from PLP to corresponding Product-details-page", function () {
  for (let i = 0; i < this.products.length; i++) {
    plp.elements.productName(i).click();
    pdp.elements.productName().should("have.text", this.products[i].name);
    pdp.elements.productDescription().should("have.text", this.products[i].description);
    pdp.elements.productPrice().should("have.text", "$" + this.products[i].price);
    pdp.elements.productImage()
      .invoke("attr", "src")
      .then((src) => {
        expect(src).to.eq(this.products[i].image);
        cy.wait(500);
      });
    pdp.clickOnBackToProductsBtn();
  }
});

it("User can navigate back from PDP to PLP", function () {
  plp.elements.productName(0).click();
  pdp.clickOnBackToProductsBtn();
  cy.url().should("include", "inventory.html");
});
