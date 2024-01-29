import { Theme } from "@radix-ui/themes";
import { mount } from "cypress/react18";
import { Button } from "./Button";

describe("<Button />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <Theme radius="none" accentColor="teal">
        <Button onClick={() => {}}>Button</Button>
      </Theme>
    );
  });
});
