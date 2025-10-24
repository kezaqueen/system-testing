describe("Product Management Page", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("shows loading state initially", () => {
    cy.contains("Loading products...").should("be.visible");
  });

  it("displays main headings and filter controls", () => {
    cy.contains("Product Management").should("be.visible");
    cy.get('input[placeholder="Search by product name or category..."]').should("exist");
    cy.get("select").should("exist");
  });

  it("filters products based on search and category", () => {
    cy.get('input[placeholder="Search by product name or category..."]').type("pottery");
    cy.get("select").select("Pottery");
    cy.get("tbody tr").each(($row) => {
      cy.wrap($row).within(() => {
        cy.get("td").eq(2).invoke("text").should("match", /Pottery/i);
      });
    });
  });

  it("handles pagination", () => {
    cy.get('button').contains("Next").click();
    cy.get('button').contains("Previous").click();
    cy.get("span").contains(/Page \d+ of \d+/).should("exist");
  });

  it("opens and closes product details modal on View button click", () => {
    cy.get("button").contains("View").first().click();
    cy.contains("Product Details").should("be.visible");
    cy.get("button").contains("Close").click();
    cy.contains("Product Details").should("not.exist");
  });
});
