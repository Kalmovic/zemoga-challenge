describe("Voting", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    // await url to include /weather/London
    // Intercept the network request and wait for it to complete
    cy.intercept(
      "GET",
      "https://zemoga-rule-of-thumb-default-rtdb.firebaseio.com/data.json",
      {
        fixture: "data.json",
      }
    );
  });
  it("voting flow", () => {
    const currentPositive = cy.get("span[aria-label='Positive Percentage']");
    const currentNegative = cy.get("span[aria-label='Negative Percentage']");
    cy.get("button[aria-label='Vote Now']").eq(0).should("be.disabled");

    // Positive vote
    cy.get("button[aria-label='Vote Button Positive']").eq(0).click();
    cy.get("button[aria-label='Vote Now']").eq(0).should("be.enabled");

    cy.get("button[aria-label='Vote Now']").eq(0).click();
    cy.get("span[aria-label='Positive Percentage']")
      .eq(0)
      .should("not.eq", currentPositive);
    cy.get("span[aria-label='info']")
      .eq(0)
      .should("have.text", "Thank you for your vote!");

    // Vote again
    cy.get("button[aria-label='Vote Again']").eq(0).click();
    cy.get("button[aria-label='Vote Now']").eq(0).should("be.disabled");

    // Negative vote
    cy.get("button[aria-label='Vote Button Negative']").eq(0).click();
    cy.get("button[aria-label='Vote Now']").eq(0).click();
    cy.get("span[aria-label='Negative Percentage']")
      .eq(0)
      .should("not.eq", currentNegative);
  });
});
