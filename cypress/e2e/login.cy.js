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
  it("User should succesfully login with valid credentials", function () {
    loginPage.typeUsername(this.standard_user.username);
    loginPage.typePassword(this.standard_user.password);
    loginPage.clickOnLoginBtn();
    plp.elements.title().should('be.visible')
    cy.url().should("include", "inventory.html");
  });

  it("Locked_out user should not be able to login", function () {
    loginPage.typeUsername(this.locked_out_user.username);
    loginPage.typePassword(this.locked_out_user.password);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Sorry, this user has been locked out.");
    cy.url().should("not.include", "inventory.html");
  });

  it("User should not be able to login if the password is incorrect", function () {
    loginPage.typeUsername(this.standard_user.username);
    loginPage.typePassword(this.standard_user.password + "1");
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Username and password do not match any user in this service");
    cy.url().should("not.include", "inventory.html");
  });

  it("User should not be able to login if the username is not registered", function () {
    loginPage.typeUsername(this.standard_user.username + "r");
    loginPage.typePassword(this.standard_user.password);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Username and password do not match any user in this service");
    cy.url().should("not.include", "inventory.html");
  });

  it("User should not be able to login if the email field is empty", function () {
    loginPage.typePassword(this.standard_user.password);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Username is required");
    cy.url().should("not.include", "inventory.html");
  });

  it("User should not be able to login if the email field is empty", function () {
    loginPage.typeUsername(this.standard_user.username);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Password is required");
    cy.url().should("not.include", "inventory.html");
  });

  it("User should not be able to login if the space key is typed before valid email", function () {
    loginPage.typeUsername(" " + this.standard_user.username );
    loginPage.typePassword(this.standard_user.password);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Username and password do not match any user in this service");
    cy.url().should("not.include", "inventory.html");
  });


  it("User should not be able to login if the space key is typed before valid password", function () {
    loginPage.typeUsername(this.standard_user.username );
    loginPage.typePassword(" " + this.standard_user.password);
    loginPage.clickOnLoginBtn();
    loginPage.elements.errorMessage()
    .should("have.text", "Epic sadface: Username and password do not match any user in this service");
    cy.url().should("not.include", "inventory.html");
  });

});
