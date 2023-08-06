class CartPage {
  // Elements
  elements = {
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
    removeButton: function (index) {
      return this.cartItem(index).find('button').contains("Remove");
    },
    continueShopingBtn: () => cy.get('[data-test="continue-shopping"]'),
    checkoutBtn: () => cy.get('[data-test="checkout"]'),
  };

  
  // Actions
  clickOnRemoveBtn(index) {
    this.elements.removeButton(index).click();
  }
  clickOnContinueShopingBtn() {
    this.elements.continueShopingBtn().click();
  }
  clickOnCheckoutBtn() {
    this.elements.checkoutBtn().click();
  }
}
export default CartPage;
