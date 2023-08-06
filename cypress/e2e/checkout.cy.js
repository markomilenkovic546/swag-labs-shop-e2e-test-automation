import LoginPage from "../pom-classes/Login-page";
import ProductListPage from "../pom-classes/Product-list-page";
import Header from "../pom-classes/Header";
import CartPage from "../pom-classes/Cart-page";
import CheckOutInfoPage from "../pom-classes/Checkout-info-page";
import CheckOutOverviewPage from "../pom-classes/Checkout-overview-page";

const loginPage = new LoginPage();
const plp = new ProductListPage();
const header = new Header();
const cart = new CartPage();
const checkoutInfoPage = new CheckOutInfoPage();
const checkoutOverviewPage = new CheckOutOverviewPage();

beforeEach(function () {
  loginPage.visitLoginPage();
  cy.fixture("users").then((loginData) => {
    this.standard_user = loginData[0];
    cy.login(this.standard_user.username, this.standard_user.password);
  });
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

it("User can proceed to checkout", function () {
  // Add first item into the cart
  plp.clickOnAddToCartBtn(0);
  // Open the "Cart" page
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
  cy.url().should("include", "checkout-step-one.html");
});

it("User cannot proceed to checkout if the cart is empty", function () {
  header.clickOnTheCartIcon();
  cart.elements.checkoutBtn().should("be.disabled");
});

it("User can continue to Checkout-overview page with correctly filled form ", function () {
  cy.proceedToCheckout();
  checkoutInfoPage.typeFirstName(this.checkoutInfo.firstName);
  checkoutInfoPage.typeLastName(this.checkoutInfo.lastName);
  checkoutInfoPage.typeZip(this.checkoutInfo.zip);
  checkoutInfoPage.clickOnContinueBtn();
  cy.url().should("include", "checkout-step-two.html");
  checkoutOverviewPage.elements.title().should("have.text", "Checkout: Overview");
});

it("User cannot continue to Checkout-overview page with First Name field empty ", function () {
  cy.proceedToCheckout();
  checkoutInfoPage.typeLastName(this.checkoutInfo.lastName);
  checkoutInfoPage.typeZip(this.checkoutInfo.zip);
  checkoutInfoPage.clickOnContinueBtn();
  checkoutInfoPage.elements.errorMessage().should('have.text', 'Error: First Name is required')
  cy.url().should("not.include", "checkout-step-two.html");
});

it("User cannot continue to Checkout-overview page with Last Name field empty ", function () {
  cy.proceedToCheckout();
  checkoutInfoPage.typeFirstName(this.checkoutInfo.firstName);
  checkoutInfoPage.typeZip(this.checkoutInfo.zip);
  checkoutInfoPage.clickOnContinueBtn();
  checkoutInfoPage.elements.errorMessage().should('have.text', 'Error: Last Name is required')
  cy.url().should("not.include", "checkout-step-two.html");
});

it("User cannot continue to Checkout-overview page with letters in Zip Code Field", function () {
  cy.proceedToCheckout();
  checkoutInfoPage.typeFirstName(this.checkoutInfo.firstName);
  checkoutInfoPage.typeLastName(this.checkoutInfo.lastName);
  checkoutInfoPage.typeZip("asdfghjk");
  checkoutInfoPage.clickOnContinueBtn();
  cy.url().should("not.include", "checkout-step-two.html");
});

it("User cannot continue to Checkout-overview page with letters and numbers in Zip Code Field", function () {
  cy.proceedToCheckout();
  checkoutInfoPage.typeFirstName(this.checkoutInfo.firstName);
  checkoutInfoPage.typeLastName(this.checkoutInfo.lastName);
  checkoutInfoPage.typeZip("asd123");
  checkoutInfoPage.clickOnContinueBtn();
  cy.url().should("not.include", "checkout-step-two.html");
});

it("User cannot continue to Checkout-overview page with all fields empty ", function () {
  cy.proceedToCheckout();
  checkoutInfoPage.clickOnContinueBtn();
  checkoutInfoPage.elements.errorMessage().should('have.text', 'Error: Last Name is required')
  cy.url().should("not.include", "checkout-step-two.html");
});

it("User can hide error message ", function () {
  cy.proceedToCheckout();
  checkoutInfoPage.clickOnContinueBtn();
  checkoutInfoPage.clickOnHideErrorMessageBtn()
  checkoutInfoPage.elements.errorMessage().should('not.be','visible')
});

