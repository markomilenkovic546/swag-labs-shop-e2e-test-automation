class CheckoutCompletePage {
  // Elements
  elements = {
    completitionMessage: () => cy.get("h2"),
    backHomeBtn: () => cy.get('[data-test="back-to-products"]'),
  };

  // Actions
  clickOnBackHomeBtn() {
    this.elements.backHomeBtn().click();
  }
  
}
export default CheckoutCompletePage;
