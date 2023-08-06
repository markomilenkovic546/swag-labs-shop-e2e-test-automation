class CheckOutOverviewPage {
    // Elements
    elements = {
      title: () => cy.get('.title'),
     
    }

    // Actions
    typeFirstName(firstName) {
      this.elements.firstNameField().type(firstName);
    }

  }
  export default CheckOutOverviewPage;