import { useMediaQuery, useReadLocalStorage } from "usehooks-ts";
import { Text, Flex } from "@radix-ui/themes";
import styled from "styled-components";
import Card from "@/components/molecules/Card";
import { ViewEnum, ViewSelector } from "@/components/molecules/ViewSelector";
import { useGetPreviousRullings } from "@/queries/useGetPreviousRulings";

export function Cards() {
  const view = useReadLocalStorage("view") as ViewEnum;
  const { data: previousRullings, isLoading } = useGetPreviousRullings({
    staleTime: 1000 * 60,
  });
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Flex direction="column" gap="3">
      <Flex justify="between" align="center">
        <Text
          size="5"
          weight="light"
          style={{
            color: "var(--color-dark-gray)",
          }}
          aria-label="Previous Rullings"
        >
          Previous Rullings
        </Text>
        {!isMobile && !isLoading && <ViewSelector />}
      </Flex>
      {isLoading && (
        <Flex
          justify="center"
          align="center"
          style={{
            backgroundColor: "var(--color-light-gray)",
            animation: "pulse 1s infinite",
            padding: "10px",
            height: "290px",
          }}
        >
          <Text
            size="5"
            weight="light"
            style={{
              color: "var(--color-dark-gray)",
            }}
            aria-label="Loading Previous Rullings"
          >
            Loading Previous Rullings
          </Text>
        </Flex>
      )}
      {isMobile && (
        <Flex
          gap="3"
          style={{
            minWidth: "100%",
            overflowX: "scroll",
          }}
        >
          {previousRullings?.map((rulling) => (
            <Card key={rulling.id} {...rulling} mode="grid" />
          ))}
        </Flex>
      )}
      {!isMobile && (
        <CardsGrid mode={view}>
          {previousRullings?.map((rulling) => (
            <Card key={rulling.id} {...rulling} mode={view} />
          ))}
        </CardsGrid>
      )}
    </Flex>
  );
}

const CardsGrid = styled.div<{
  mode: "list" | "grid";
}>`
  display: grid;
  grid-template-columns: ${({ mode }) =>
    mode === "list" ? "repeat(1, 1fr);" : "repeat(3, 1fr)"};
  gap: 21px;
  @media (max-width: 1099px) and (min-width: 768px) {
    grid-template-columns: ${({ mode }) =>
      mode === "list" ? "repeat(1, 1fr);" : "repeat(2, 1fr)"};
  }
  @media (max-width: 767px) {
    height: max-content;
    grid-template-columns: repeat(1, 1fr);
  }
`;
