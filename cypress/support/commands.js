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
      image: null,
    };
    const productName = $product.find(".inventory_item_name").text();
    const productDescription = $product.find(".inventory_item_desc").text();
    cy.wrap($product)
      .find(".inventory_item_price")
      .invoke("text")
      .then((productPriceText) => {
        const productPrice = productPriceText.match(/\d+\.*\d*/g);
        cy.wrap($product)
          .find("img")
          .invoke("attr", "src")
          .then((src) => {
            product.name = productName;
            product.description = productDescription;
            product.price = productPrice[0];
            product.image = src;
            products.push(product);
          });
      });
  });
  console.log(products);
  cy.writeFile("cypress/fixtures/products.js", products);
});

Cypress.Commands.add("sortExpectedProductsByPriceAscending", (products) => {
   function orderByPriceDescending(products) {
     return products.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
   }
 
   const expectedSortedProducts = orderByPriceDescending(products);
   return expectedSortedProducts
 });

 Cypress.Commands.add("sortExpectedProductsByPriceDESC", (products) => {
   function orderByPriceDescending(products) {
     return products.slice().sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
   }
 
   const expectedSortedProducts = orderByPriceDescending(products);
   return expectedSortedProducts
 });


 Cypress.Commands.add("sortExpectedProductsByNameAZ", (products) => {
   function orderByNameAscending(products) {
      return products.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    
    const expectedSortedProductsByNameAscending = orderByNameAscending(products);
    return expectedSortedProductsByNameAscending;
    
 });

 Cypress.Commands.add("sortExpectedProductsByNameZA", (products) => {
   function orderByNameDescending(products) {
      return products.slice().sort((a, b) => b.name.localeCompare(a.name));
    }
    
    const expectedSortedProductsByNameDescending = orderByNameDescending(products);
    return expectedSortedProductsByNameDescending;
    
    
 });
 Cypress.Commands.add("compareProductListWithTestData", (expectedSortedProducts) => {
   for (let i = 0; i < expectedSortedProducts.length; i++) {
      plp.elements.productName(i).should('have.text', expectedSortedProducts[i].name);
      plp.elements.productDescription(i).should('have.text', expectedSortedProducts[i].description);
      plp.elements.productPrice(i).invoke("text").then((productPriceText) => {
           const productPrice = productPriceText.match(/\d+\.*\d*/g)[0];
           console.log(productPrice)
           expect(productPrice).to.eq(expectedSortedProducts[i].price)
           plp.elements.productImage(i)
             .should('have.attr', 'src', expectedSortedProducts[i].image)
             });
            }
 });
 