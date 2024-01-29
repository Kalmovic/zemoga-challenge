import { mount } from "cypress/react18";
import { Theme } from "@radix-ui/themes";
import Card from "./Card";
import kanye from "../../assets/img/kanye.png";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("<Cards />", () => {
  it("renders", () => {
    mount(
      <QueryClientProvider client={new QueryClient()}>
        <Theme radius="none" accentColor="teal">
          <Card
            id="1"
            mode="grid"
            name="Kanye West"
            description="Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero."
            category="Entertainment"
            lastUpdated="2020-11-06T23:08:57.892Z"
            votes={{
              positive: 12,
              negative: 12,
            }}
            picture={kanye}
          />
        </Theme>
      </QueryClientProvider>
    );
    cy.get('[aria-label="Vote Now"]').should("be.disabled");
    cy.get("span[aria-label='Positive Percentage']").should("have.text", "50%");
    cy.get('button[aria-label="Vote Button Positive"]').click();
    cy.get('[aria-label="Vote Now"]').should("be.enabled");

    cy.get('[aria-label="Vote Now"]').click();
  });
});
