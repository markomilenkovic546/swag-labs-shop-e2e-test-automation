import LoginPage from "../pom-classes/Login-page";
import ProductListPage from "../pom-classes/Product-list-page";

const loginPage = new LoginPage();
const plp = new ProductListPage();

beforeEach(function () {
  loginPage.visitLoginPage();
  cy.fixture("users").then((data) => {
    this.standard_user = data[0];
    this.locked_out_user = data[1];
    this.problem_user_user = data[2];
    this.performance_glitch_user = data[3];
  });
});
describe("Login functionalites ", () => {
  it("User can login with valid credentials", function () {
    loginPage.typeUsername(this.standard_user.username);
    loginPage.typePassword(this.standard_user.password);
    loginPage.clickOnLoginBtn();
    plp.elements.title().should('be.visible')
    cy.url().should("include", "inventory.html");
  });

  it("Lockedout user cannot login", function () {
    loginPage.typeUsername(this.locked_out_user.username);
    loginPage.typePassword(this.locked_out_user.password);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Sorry, this user has been locked out.");
    cy.url().should("not.include", "inventory.html");
  });

  it("User cannot login with incorrect password", function () {
    loginPage.typeUsername(this.standard_user.username);
    loginPage.typePassword(this.standard_user.password + "1");
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Username and password do not match any user in this service");
    cy.url().should("not.include", "inventory.html");
  });

  it("User cannot login with unregistered username", function () {
    loginPage.typeUsername(this.standard_user.username + "r");
    loginPage.typePassword(this.standard_user.password);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Username and password do not match any user in this service");
    cy.url().should("not.include", "inventory.html");
  });

  it("User cannot login with empty username field", function () {
    loginPage.typePassword(this.standard_user.password);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Username is required");
    cy.url().should("not.include", "inventory.html");
  });

  it("User cannot login with empty password field", function () {
    loginPage.typeUsername(this.standard_user.username);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Password is required");
    cy.url().should("not.include", "inventory.html");
  });

  it("User cannot login when space key is typed before valid username", function () {
    loginPage.typeUsername(" " + this.standard_user.username );
    loginPage.typePassword(this.standard_user.password);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Username and password do not match any user in this service");
    cy.url().should("not.include", "inventory.html");
  });


  it("User cannot login when space key is typed before valid password", function () {
    loginPage.typeUsername(this.standard_user.username );
    loginPage.typePassword(" " + this.standard_user.password);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Username and password do not match any user in this service");
    cy.url().should("not.include", "inventory.html");
  });

});
