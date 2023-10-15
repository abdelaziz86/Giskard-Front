describe("Availability Page", () => {
 

  it("should display availabilities", () => {
    cy.visit("http://127.0.0.1:5173/availability");
    cy.get(".availability-card").should("have.length.gt", 0);
  });

   
});
