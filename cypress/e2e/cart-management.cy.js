import LoginPage from "../pom-classes/Login-page";
import ProductListPage from "../pom-classes/Product-list-page";
import Header from "../pom-classes/Header";
import CartPage from "../pom-classes/Cart-page";

const loginPage = new LoginPage();
const plp = new ProductListPage();
const header = new Header();
const cart = new CartPage();

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

describe("Tests which cover functionalites realated to cart management ", () => {
  it("User can add a single item into the cart", function () {
    // Add first item into the cart
    plp.clickOnAddToCartBtn(0);
    // Open the "Cart" page
    header.clickOnTheCartIcon();
    //Verify that correct item is in the cart
    cart.elements.itemName(0).should("have.text", this.products[0].name);
    cart.elements.itemDescription(0).should("have.text", this.products[0].description);
    cart.elements.itemPrice(0).should("have.text", "$" + this.products[0].price);
    // Verify that only 1 item is in the cart
    cart.elements.cartItems().should("have.length", 1);
  });

  it("User can add multiple items into the cart", function () {
    // Add first 2 item into the cart
    plp.clickOnAddToCartBtn(0);
    plp.clickOnAddToCartBtn(1);
    // Open the "Cart" page
    header.clickOnTheCartIcon();
    //Verify that correct first item is in the cart
    cart.elements.itemName(0).should("have.text", this.products[0].name);
    cart.elements.itemDescription(0).should("have.text", this.products[0].description);
    cart.elements.itemPrice(0).should("have.text", "$" + this.products[0].price);
    //Verify that correct second item is in the cart
    cart.elements.itemName(1).should("have.text", this.products[1].name);
    cart.elements.itemDescription(1).should("have.text", this.products[1].description);
    cart.elements.itemPrice(1).should("have.text", "$" + this.products[1].price);
    // Verify that 2 items are in the cart
    cart.elements.cartItems().should("have.length", 2);
  });

  it("User can remove a single item from the cart ", function () {
    // Add first item into the cart
    plp.clickOnAddToCartBtn(0);
    // Open the "Cart" page
    header.clickOnTheCartIcon();
    cart.clickOnRemoveBtn(0);
    // Verify that carti is empty
    cart.elements.cartItems().should("not.exist");
  });

  it("User can remove the item from the cart when multiple items are in the cart", function () {
    // Add first 2 item into the cart
    plp.clickOnAddToCartBtn(0);
    plp.clickOnAddToCartBtn(1);
    // Open the "Cart" page
    header.clickOnTheCartIcon();
    cart.clickOnRemoveBtn(0);
    //Verify thatsecond item is still in the cart
    cart.elements.itemName(0).should("have.text", this.products[1].name);
    cart.elements.itemDescription(0).should("have.text", this.products[1].description);
    cart.elements.itemPrice(0).should("have.text", "$" + this.products[1].price);
    // Verify that only 1 item is in the cart
    cart.elements.cartItems().should("have.length", 1);
  });

  it("User can remove multiple items from the cart", function () {
    // Add first 2 item into the cart
    plp.clickOnAddToCartBtn(0);
    plp.clickOnAddToCartBtn(1);
    // Open the "Cart" page
    header.clickOnTheCartIcon();
    cart.clickOnRemoveBtn(0);
    cart.clickOnRemoveBtn(0);
    // Verify that cart is empty
    cart.elements.cartItems().should("not.exist");
  });

  it("User can remove single item from the cart from PLP ", function () {
    // Add first item into the cart
    plp.clickOnAddToCartBtn(0);
    plp.clickOnRemoveBtn(0);
    // Open the "Cart" page
    header.clickOnTheCartIcon();
    // Verify that cart is empty
    cart.elements.cartItems().should("not.exist");
  });

  it("User can remove single item from the Cart from PLP when multiple Items are in the cart", function () {
    // Add first item into the cart
    plp.clickOnAddToCartBtn(0);
    plp.clickOnAddToCartBtn(1);
    plp.clickOnRemoveBtn(0);
    // Open the "Cart" page
    header.clickOnTheCartIcon();
    //Verify thatsecond item is still in the cart
    cart.elements.itemName(0).should("have.text", this.products[1].name);
    cart.elements.itemDescription(0).should("have.text", this.products[1].description);
    cart.elements.itemPrice(0).should("have.text", "$" + this.products[1].price);
    // Verify that only 1 item is in the cart
    cart.elements.cartItems().should("have.length", 1);
  });

  it("Cart icon value is correctly updated when user adds an item to the cart ", function () {
    // Add first item into the cart
    plp.clickOnAddToCartBtn(0);
    header.elements.cartIconValue().should("have.text", "1");
  });

  it("Cart icon value removes when user removes a last item from the cart ", function () {
    // Add first item into the cart
    plp.clickOnAddToCartBtn(0);
    // Open the "Cart" page
    header.clickOnTheCartIcon();
    cart.clickOnRemoveBtn(0);
    header.elements.cartIconValue().should("not.exist");
  });

  it("Cart icon value is correctly updated when user removes a single item from the cart ", function () {
    // Add first item into the cart
    plp.clickOnAddToCartBtn(0);
    plp.clickOnAddToCartBtn(1);
    header.elements.cartIconValue().should("have.text", "2");
    // Open the "Cart" page
    header.clickOnTheCartIcon();
    cart.clickOnRemoveBtn(0);
    header.elements.cartIconValue().should("have.text", "1");
  });

  it("User can navigate from Cart page to PLP", function () {
    header.clickOnTheCartIcon();
    cart.clickOnContinueShopingBtn();
    cy.url().should("include", "inventory.html");
  });



});
