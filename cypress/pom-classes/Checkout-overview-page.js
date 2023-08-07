class CheckoutOverviewPage {
    // Elements
    elements = {
      title: () => cy.get(".title"),
      cartItems: () => cy.get(".cart_item"),
      cartItem: (index) => cy.get(".cart_item").eq(index),
      itemName: function (index) {
        return this.cartItem(index).find(".inventory_item_name");
      },
      itemDescription: function (index) {
        return this.cartItem(index).find(".inventory_item_desc");
      },
      itemPrice: function (index) {
        return this.cartItem(index).find(".inventory_item_price");
      },
      cancelBtn: () => cy.get('[data-test="cancel"]'),
      finishBtn: () => cy.get('[data-test="finish"]'),
      paymentInformation: () => cy.get(".summary_value_label").eq(0),
      shippingInformation: () => cy.get(".summary_value_label").eq(1),
      itemTotal: () => cy.get(".summary_subtotal_label"),
      tax: () => cy.get(".summary_tax_label"),
      total: () => cy.get(".summary_total_label"),
    };
  
    // Actions
    typeFirstName(firstName) {
      this.elements.firstNameField().type(firstName);
    }
    clickOnCancelBtn() {
      this.elements.cancelBtn().click();
    }
    clickOnFinishBtn() {
      this.elements.finishBtn().click();
    }

  // Elements
  elements = {
    title: () => cy.get(".title"),
    cartItems: () => cy.get(".cart_item"),
    cartItem: (index) => cy.get(".cart_item").eq(index),
    itemName: function (index) {
      return this.cartItem(index).find(".inventory_item_name");
    },
    itemDescription: function (index) {
      return this.cartItem(index).find(".inventory_item_desc");
    },
    itemPrice: function (index) {
      return this.cartItem(index).find(".inventory_item_price");
    },
    cancelBtn: () => cy.get('[data-test="cancel"]'),
    finishBtn: () => cy.get('[data-test="finish"]'),
    paymentInformation: () => cy.get(".summary_value_label").eq(0),
    shippingInformation: () => cy.get(".summary_value_label").eq(1),
    itemTotal: () => cy.get(".summary_subtotal_label"),
    tax: () => cy.get(".summary_tax_label"),
    total: () => cy.get(".summary_total_label"),
  };

  // Actions
  typeFirstName(firstName) {
    this.elements.firstNameField().type(firstName);
  }
  clickOnCancelBtn() {
    this.elements.cancelBtn().click();
  }
  clickOnFinishBtn() {
    this.elements.finishBtn().click();
  }
}
export default CheckoutOverviewPage;
