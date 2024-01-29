import { Theme } from "@radix-ui/themes";
import { mount } from "cypress/react18";
import { VoteThumbUpDown } from "./VoteThumbUpDown";

describe("<VoteThumbUpDown />", () => {
  it("renders", () => {
    mount(
      <Theme radius="none" accentColor="teal">
        <VoteThumbUpDown onClick={() => {}} />
      </Theme>
    );
    cy.get('[aria-label="Vote Button Positive"]').click();
    cy.get('[aria-label="Vote Button Positive"]').should(
      "have.css",
      "border",
      "2px solid rgb(255, 255, 255)"
    );
    cy.get('[aria-label="Vote Button Negative"]').click();

    cy.get('[aria-label="Vote Button Negative"]').should(
      "have.css",
      "border",
      "2px solid rgb(255, 255, 255)"
    );
    cy.get('[aria-label="Vote Button Positive"]').should(
      "have.css",
      "border",
      "0px none rgb(255, 255, 255)"
    );
  });
});
