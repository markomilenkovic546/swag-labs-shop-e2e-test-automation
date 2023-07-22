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
  };

  
}
export default ProductListPage;
