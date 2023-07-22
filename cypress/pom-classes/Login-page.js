class LoginPage {
  // Elements
  elements = {
    usernameInputField: () => cy.get('[data-test="username"]'),
    passwordInputField: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
  };

  // Actions
  visitLoginPage() {
    cy.visit('/')
}
  typeUsername(username) {
    this.elements.usernameInputField().type(username);
  }

  typePassword(password) {
    this.elements.passwordInputField().type(password);
  }

  clickOnLoginBtn() {
    this.elements.loginButton().click();
  }
}
export default LoginPage;
