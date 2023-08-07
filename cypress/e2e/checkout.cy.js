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
  cy.writeProductDataIntoFixtureFile()
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

it("Products from the cart are shown on the Checkout-overview page ", function () {
  // Add first item into the cart
  plp.clickOnAddToCartBtn(0);
  // Add second item into the cart
  plp.clickOnAddToCartBtn(1);
  // Open the "Cart" page
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
  cy.submitCheckoutInfoForm();
  //Verify that first item is same as in the cart
  checkoutOverviewPage.elements.itemName(0).should("have.text", this.products[0].name);
  checkoutOverviewPage.elements.itemDescription(0).should("have.text", this.products[0].description);
  checkoutOverviewPage.elements.itemPrice(0).should("have.text", "$" + this.products[0].price);
  //Verify that second item is same as in the cart
  checkoutOverviewPage.elements.itemName(1).should("have.text", this.products[1].name);
  checkoutOverviewPage.elements.itemDescription(1).should("have.text", this.products[1].description);
  checkoutOverviewPage.elements.itemPrice(1).should("have.text", "$" + this.products[1].price);
  checkoutOverviewPage.elements.cartItems().should("have.length", 2);
});

it("Correct payment info is shown on the Checkout-overview page", function () {
  // Add first item into the cart
  plp.clickOnAddToCartBtn(0);
  // Add second item into the cart
  plp.clickOnAddToCartBtn(1);
  // Open the "Cart" page
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
  cy.submitCheckoutInfoForm();
  checkoutOverviewPage.elements.paymentInformation().should("have.text", this.checkoutInfo.paymentInformation);
});

it("Correct shiping info is shown on the Checkout-overview page", function () {
  // Add first item into the cart
  plp.clickOnAddToCartBtn(0);
  // Add second item into the cart
  plp.clickOnAddToCartBtn(1);
  // Open the "Cart" page
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
  cy.submitCheckoutInfoForm();
  checkoutOverviewPage.elements.shippingInformation().should("have.text", this.checkoutInfo.shippingInformation);
});

it("Correct item total price is shown on the Checkout-overview page", function () {
  // Add first item into the cart
  plp.clickOnAddToCartBtn(0);
  // Add second item into the cart
  plp.clickOnAddToCartBtn(1);
  // Open the "Cart" page
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
  cy.submitCheckoutInfoForm();
  checkoutOverviewPage.elements.itemTotal().then(($itemTotalPrice) => {
    // Calculate expected total item price
    const expectedItemTotalPrice = Number(this.products[0].price) + Number(this.products[1].price);
    // Verify that total item price calculation is correct
    cy.wrap($itemTotalPrice).should("have.text", `Item total: $${expectedItemTotalPrice}`);
  });
});

it("Correct tax value is shown on the Checkout-overview page", function () {
  // Add first item into the cart
  plp.clickOnAddToCartBtn(0);
  // Add second item into the cart
  plp.clickOnAddToCartBtn(1);
  // Open the "Cart" page
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
  cy.submitCheckoutInfoForm();
  checkoutOverviewPage.elements.tax().then(($taxValue) => {
    // Calculate expected total item price
    const expectedItemTotalPrice = Number(this.products[0].price) + Number(this.products[1].price);
    // Calculate expected tax value when tax rate is 8%
    const expectedTaxValue = expectedItemTotalPrice * 0.08;
    // Verify that tax value calculation is correct
    cy.wrap($taxValue).should("have.text", `Tax: $${expectedTaxValue.toFixed(2)}`);
  });
})

  it("Correct Total price is shown on the Checkout-overview page", function () {
    // Add first item into the cart
    plp.clickOnAddToCartBtn(0);
    // Add second item into the cart
    plp.clickOnAddToCartBtn(1);
    // Open the "Cart" page
    header.clickOnTheCartIcon();
    cart.clickOnCheckoutBtn();
    cy.submitCheckoutInfoForm();
    checkoutOverviewPage.elements.tax().then(($taxValue) => {
      // Calculate expected total item price
      const expectedItemTotalPrice = Number(this.products[0].price) + Number(this.products[1].price);
      // Calculate expected tax value when tax rate is 8%
      const expectedTaxValue = expectedItemTotalPrice * 0.08;
      // Calculate expected tax value when tax rate is 8%
      const expectedTotalPrice = expectedItemTotalPrice + expectedTaxValue
      checkoutOverviewPage.elements.total().then(($totalPrice) => {
      // Verify that Total price calculation is correct
      cy.wrap($totalPrice).should("have.text", `Total: $${expectedTotalPrice.toFixed(2)}`);
    });
  })
});