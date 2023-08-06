import LoginPage from "../pom-classes/Login-page";
import ProductListPage from "../pom-classes/Product-list-page";

const loginPage = new LoginPage();
const plp = new ProductListPage();

beforeEach(function () {
    loginPage.visitLoginPage();
    cy.fixture("users").then((loginData) => {
      this.standard_user = loginData[0];
      cy.login(this.standard_user.username, this.standard_user.password);
    });
    
  });

  it("hi", function () {
    cy.writeProductDataIntoFixtureFile()
  });