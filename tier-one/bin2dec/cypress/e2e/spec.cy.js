describe("binary to decimal converter", () => {
  it("converts a binary number to a decimal number", () => {
    cy.visit("http://127.0.0.1:5500");
    cy.get("#binary").type("111");
    cy.get("#output").contains("7");
  });

  it("fails to convert the input", () => {
    cy.visit("http://127.0.0.1:5500");
    cy.get("#binary").type("111a");
    cy.get("#output").should("be.empty");
  });
});
