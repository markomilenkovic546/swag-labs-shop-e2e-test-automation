class Header {
  // Elements
  elements = {
    cartIcon: () => cy.get("#shopping_cart_container"),
    burgerMenuButton: () => cy.get("#react-burger-menu-btn"),
    cartIconValue: () => cy.get(".shopping_cart_badge"),
    burgerMenuElements: {
      allItemsListLink: () => cy.get("#inventory_sidebar_link"),
      aboutLink: () => cy.get("#about_sidebar_link"),
      logoutLink: () => cy.get("#logout_sidebar_link"),
      resetAppStateLink: () => cy.get("#reset_sidebar_link"),
      closeBurgerMenuBtn: () => cy.get("#react-burger-cross-btn"),
    },
  };

  // Actions

  clickOnTheCartIcon() {
    this.elements.cartIcon().click();
  }
  openBurgerMenu() {
    this.elements.burgerMenuButton().click();
  }

  clickOnAllItemsListLinkFromBurger() {
    this.elements.burgerMenuElements.allItemsListLink().click();
  }

  clickOnAboutLinkFromBurger() {
    this.elements.burgerMenuElements.aboutLink().click();
  }

  clickOnLogoutLinkFromBurger() {
    this.elements.burgerMenuElements.logoutLink().click();
  }
  clickOnResetAppStateLinkFromBurger() {
    this.elements.burgerMenuElements.resetAppStateLink().click();
  }

  clickOnTheCloseBurgerMenuBtn() {
    this.elements.closeBurgerMenuBtn().click();
  }
}
export default Header;
