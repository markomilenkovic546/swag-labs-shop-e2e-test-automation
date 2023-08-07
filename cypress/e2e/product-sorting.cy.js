import LoginPage from "../pom-classes/Login-page";
import ProductListPage from "../pom-classes/Product-list-page";
import ProductDetailsPage from "../pom-classes/Product-details-page";
import Header from "../pom-classes/Header";
import CartPage from "../pom-classes/Cart-page";
import CheckoutInfoPage from "../pom-classes/Checkout-info-page";
import CheckoutOverviewPage from "../pom-classes/Checkout-overview-page";
import CheckoutCompletePage from "../pom-classes/Checkout-complete-page";

const loginPage = new LoginPage();
const plp = new ProductListPage();
const pdp = new ProductDetailsPage();
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

describe("Tests which cover functionalites related to Product-sorting ", () => {

it("Products should be sorted by name A-Z by default", function () {
    cy.sortExpectedProductsByNameAZ(this.products).then((expectedSortedProducts) => {
      // Verify that products are sorted by name A-Z by default
      cy.compareProductListWithTestData(expectedSortedProducts);
    });
  });

it("User can sort products by price descending", function () {
  cy.sortExpectedProductsByPriceDESC(this.products).then((expectedSortedProducts) => {
    // Select "price (high to low)" option from Sort product DDM
    plp.selectSortOption("hilo");
    // Verify that products are sorted by price descending
    cy.compareProductListWithTestData(expectedSortedProducts);
  });
});

it("User can sort products by price ascending", function () {
  cy.sortExpectedProductsByPriceAscending(this.products).then((expectedSortedProducts) => {
    // Select "price (low to high)" option from Sort products DDM
    plp.selectSortOption("lohi");
    // Verify that products are sorted by price ascending
    cy.compareProductListWithTestData(expectedSortedProducts);
  });
});

it("User can sort products by name A-Z", function () {
  cy.sortExpectedProductsByNameAZ(this.products).then((expectedSortedProducts) => {
    // Select "price (low to high)" option from Sort product DDM
    plp.selectSortOption("lohi");
    // Select "name (A-Z)" option from Sort products DDM
    plp.selectSortOption("az");
    // Verify that products are sorted by name A-Z
    cy.compareProductListWithTestData(expectedSortedProducts);
  });
});

it("User can sort products by name Z-A", function () {
    cy.sortExpectedProductsByNameZA(this.products).then((expectedSortedProducts) => {
        // Select "name (Z-A)" option from Sort products DDM
      plp.selectSortOption("za");
      // Verify that products are sorted by name Z-A
      cy.compareProductListWithTestData(expectedSortedProducts);
    });
  })
})
