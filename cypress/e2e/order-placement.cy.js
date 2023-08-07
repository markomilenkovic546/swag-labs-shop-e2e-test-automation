import LoginPage from "../pom-classes/Login-page";
import ProductListPage from "../pom-classes/Product-list-page";
import Header from "../pom-classes/Header";
import CartPage from "../pom-classes/Cart-page";
import CheckoutInfoPage from "../pom-classes/Checkout-info-page";
import CheckoutOverviewPage from "../pom-classes/Checkout-overview-page";
import CheckoutCompletePage from "../pom-classes/Checkout-complete-page";

const loginPage = new LoginPage();
const plp = new ProductListPage();
const header = new Header();
const cart = new CartPage();
const checkoutInfoPage = new CheckoutInfoPage();
const checkoutOverviewPage = new CheckoutOverviewPage();
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

describe("Tests which cover functionalites related to Order-placement ", () => {

it("User can successfully place an order ", function () {
  // Add first item into the cart
  plp.clickOnAddToCartBtn(0);
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
  cy.fixture("checkout-info").then((checkoutInfo) => {
    checkoutInfoPage.typeFirstName(checkoutInfo.firstName);
    checkoutInfoPage.typeLastName(checkoutInfo.lastName);
    checkoutInfoPage.typeZip(checkoutInfo.zip);
    checkoutInfoPage.clickOnContinueBtn();
    checkoutOverviewPage.clickOnFinishBtn();
    cy.url().should("include", "checkout-complete.html");
    checkoutCompletePage.elements.completitionMessage().should("have.text", "Thank you for your order!");
    checkoutCompletePage.clickOnBackHomeBtn();
    cy.url().should("include", "inventory.html");
  });
});

it("User can cancel the order ", function () {
  // Add first item into the cart
  plp.clickOnAddToCartBtn(0);
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
  cy.fixture("checkout-info").then((checkoutInfo) => {
    checkoutInfoPage.typeFirstName(checkoutInfo.firstName);
    checkoutInfoPage.typeLastName(checkoutInfo.lastName);
    checkoutInfoPage.typeZip(checkoutInfo.zip);
    checkoutInfoPage.clickOnContinueBtn();
    checkoutOverviewPage.clickOnCancelBtn();
    cy.url().should("include", "inventory.html");
  });
});

it("Once the user place the order cart should be cleared", function () {
  // Add first item into the cart
  plp.clickOnAddToCartBtn(0);
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
  cy.fixture("checkout-info").then((checkoutInfo) => {
    checkoutInfoPage.typeFirstName(checkoutInfo.firstName);
    checkoutInfoPage.typeLastName(checkoutInfo.lastName);
    checkoutInfoPage.typeZip(checkoutInfo.zip);
    checkoutInfoPage.clickOnContinueBtn();
    checkoutOverviewPage.clickOnFinishBtn();
    header.elements.cartIconValue().should("not.exist");
    header.clickOnTheCartIcon();
    cart.elements.cartItems().should("not.exist");
  });
});

it("Once the user cancel the order cart should not be cleared", function () {
  // Add first item into the cart
  plp.clickOnAddToCartBtn(0);
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
  cy.fixture("checkout-info").then((checkoutInfo) => {
    checkoutInfoPage.typeFirstName(checkoutInfo.firstName);
    checkoutInfoPage.typeLastName(checkoutInfo.lastName);
    checkoutInfoPage.typeZip(checkoutInfo.zip);
    checkoutInfoPage.clickOnContinueBtn();
    checkoutOverviewPage.clickOnCancelBtn();
    header.clickOnTheCartIcon();
    //Verify that correct item is in the cart
    cart.elements.itemName(0).should("have.text", this.products[0].name);
    cart.elements.itemDescription(0).should("have.text", this.products[0].description);
    cart.elements.itemPrice(0).should("have.text", "$" + this.products[0].price);
    // Verify that only 1 item is in the cart
    cart.elements.cartItems().should("have.length", 1);
  });
});
})
