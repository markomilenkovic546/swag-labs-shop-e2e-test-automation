class ProductListPage {
  // Elements
  elements = {
    title: () => cy.get(".title"),
    productItemDiv: (index) => cy.get(".inventory_item").eq(index),
    productImage: function (index) {
      return this.productItemDiv(index).find(".inventory_item_img");
    },
    productName: function (index) {
      return this.productItemDiv(index).find(".inventory_item_name");
    },
    productDescription: function (index) {
      return this.productItemDiv(index).find(".inventory_item_desc");
    },
    productPrice: function (index) {
      return this.productItemDiv(index).find(".inventory_item_desc");
    },
    addToCartButton: function (index) {
      return this.productItemDiv(index).find('button').contains('Add to cart');
    },
    removeButton: function (index) {
      return this.productItemDiv(index).find('button').contains('Remove');
    },
    productSortDropDown: () => cy.get('[data-test="product_sort_container"]'),
  };

  // Actions
  clickOnAddToCartBtn(index) {
    this.elements.addToCartButton(index).click();
  }

  clickOnRemoveBtn(index) {
    this.elements.removeButton(index).click();
  }

  selectSortOption(option) {
    this.elements.productDescription().select(option);
  }
}
export default ProductListPage;
