class ProductDetailsPage {
    // Elements
    elements = {
      productName: () => cy.get(".inventory_details_name "),
      productDescription: () => cy.get('.inventory_details_desc'),
      productPrice: () => cy.get('.inventory_details_price'),
      productImage: () => cy.get('.inventory_details_img_container > img'),
      addToCartBtn: () => cy.get('button').contans('Add to cart'),
      backToProductsBtn: () => cy.get('[data-test="back-to-products"]')
    }
  
    // Actions
    clickOnBackToProductsBtn() {
      this.elements.backToProductsBtn().click();
    }
    
  }
  export default ProductDetailsPage;