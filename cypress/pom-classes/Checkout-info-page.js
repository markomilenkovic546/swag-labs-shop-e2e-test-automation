class CheckOutInfoPage {
    // Elements
    elements = {
      firstNameField: () => cy.get('[data-test="firstName"]'),
      lastNameField: () => cy.get('[data-test="lastName"]'),
      zipField: () => cy.get('[data-test="postalCode"]'),
      cancelBtn: () => cy.get('[data-test="cancel"]'),
      continueBtn: () => cy.get('[data-test="continue"]'),
      errorMessage: () => cy.get('[data-test="error"]'),
      hideErrorMessageBtn: function () {
        return this.errorMessage().find(".error-button");
      }
    }

    // Actions
    typeFirstName(firstName) {
      this.elements.firstNameField().type(firstName);
    }
    typeLastName(lastName) {
        this.elements.lastNameField().type(lastName);
      }
      typeZip(zip) {
        this.elements.zipField().type(zip);
      }
      clickOnCancelBtn() {
        this.elements.cancelBtn().click();
      }
      clickOnContinueBtn() {
        this.elements.continueBtn().click();
      }
      clickOnHideErrorMessageBtn() {
        this.elements.hideErrorMessageBtn().click();
      }
  }
  export default CheckOutInfoPage;