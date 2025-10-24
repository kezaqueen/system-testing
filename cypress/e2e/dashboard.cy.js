describe("Dashboard Component", () => {
  it("shows loading state on initial load", () => {
    cy.visit("https://craftcrest.vercel.app/dashboard");
    cy.contains("Loading dashboard data...").should("be.visible");
  });
});