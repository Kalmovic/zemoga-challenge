import { Theme } from "@radix-ui/themes";
import { mount } from "cypress/react18";
import { ViewSelector } from "./ViewSelector";

describe("<ViewSelector />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <Theme radius="none" accentColor="teal">
        <ViewSelector />
      </Theme>
    );
    cy.get("button[role='combobox'").click();
    cy.get("div[data-state='checked']").should("have.text", "List");
    cy.get("div[role='option']").last().click();
    cy.get("button[role='combobox'").should("have.text", "Grid");
  });
});
