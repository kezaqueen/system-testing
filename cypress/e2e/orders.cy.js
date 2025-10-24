describe("Existing Pages", () => {
  it("shows loading state on dashboard", () => {
    cy.visit("https://craftcrest.vercel.app/dashboard", { timeout: 120000 })
    cy.contains("Loading dashboard data...").should("be.visible")
  });

  it("shows loading state on orders page", () => {
    cy.visit("https://craftcrest.vercel.app/orders", { timeout: 120000 })
    cy.contains("Loading...").should("be.visible")
  });
});
