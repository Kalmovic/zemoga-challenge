describe("template spec", () => {
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
  it("should render cards with respective card titles", () => {
    cy.get(".radix-themes > :nth-child(1) > :nth-child(1) > .rt-Text").should(
      "have.text",
      "Previous Rullings"
    );
    cy.get("span[aria-label='Card Name'").should("have.lengthOf", 6);
    cy.get("span[aria-label='Card Name'")
      .eq(0)
      .should("have.text", "Kanye West");
    cy.get("span[aria-label='Card Name'")
      .eq(1)
      .should("have.text", "Mark Zuckerberg");
    cy.get("span[aria-label='Card Name'")
      .eq(2)
      .should("have.text", "Cristina Fernández de Kirchner");
    cy.get("span[aria-label='Card Name'")
      .eq(3)
      .should("have.text", "Malala Yousafzai");
    cy.get("span[aria-label='Card Name'")
      .eq(4)
      .should("have.text", "Elon Musk");
    cy.get("span[aria-label='Card Name'")
      .eq(5)
      .should("have.text", "Greta Thumberg");
  });
});
