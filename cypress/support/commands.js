import LoginPage from "../pom-classes/Login-page";
import ProductListPage from "../pom-classes/Product-list-page";
import Header from "../pom-classes/Header";
import CartPage from "../pom-classes/Cart-page";
import CheckOutInfoPage from "../pom-classes/Checkout-info-page";

const loginPage = new LoginPage();
const plp = new ProductListPage();
const header = new Header();
const cart = new CartPage();
const checkoutInfoPage = new CheckOutInfoPage();

Cypress.Commands.add("login", (username, password) => {
  loginPage.typeUsername(username);
  loginPage.typePassword(password);
  loginPage.clickOnLoginBtn();
});

/* Because FE of this demo webshop doesn't fetch product data from backend,
product test data will be extracted from HTML and written into fixture file
*/
Cypress.Commands.add("writeProductDataIntoFixtureFile", () => {
  let products = [];
  plp.elements.products().each(($product, index, $list) => {
    let product = {
      name: null,
      description: null,
      price: null,
    };
    const productName = $product.find(".inventory_item_name").text();
    const productDescription = $product.find(".inventory_item_desc").text();
    cy.wrap($product)
      .find(".inventory_item_price")
      .invoke("text")
      .then((productPriceText) => {
        const productPrice = productPriceText.match(/\d+\.*\d*/g);
        product.name = productName;
        product.description = productDescription;
        product.price = productPrice[0];
        products.push(product);
      });
  });
  console.log(products);
  cy.writeFile("cypress/fixtures/products.js", products);
});

Cypress.Commands.add("proceedToCheckout", () => {
  plp.clickOnAddToCartBtn(0);
  header.clickOnTheCartIcon();
  cart.clickOnCheckoutBtn();
});

Cypress.Commands.add("submitCheckoutInfoForm", () => {
  cy.fixture("checkout-info").then((checkoutInfo) => {
    checkoutInfoPage.typeFirstName(checkoutInfo.firstName);
    checkoutInfoPage.typeLastName(checkoutInfo.lastName);
    checkoutInfoPage.typeZip(checkoutInfo.zip);
    checkoutInfoPage.clickOnContinueBtn();
  });
});


Cypress.Commands.add("writeProductDataIntoFixtureFile", () => {
  let products = [];
  plp.elements.products().each(($product, index, $list) => {
    let product = {
      name: null,
      description: null,
      price: null,
    };
    const productName = $product.find(".inventory_item_name").text();
    const productDescription = $product.find(".inventory_item_desc").text();
    cy.wrap($product)
      .find(".inventory_item_price")
      .invoke('text').then((productPriceText) => {
        const productPrice = productPriceText.match(/\d+\.*\d*/g)
        product.name = productName
        product.description = productDescription
        product.price = productPrice[0]
        products.push(product)
  });
});
  console.log(products)
  cy.writeFile('cypress/fixtures/products.js', products)
});

