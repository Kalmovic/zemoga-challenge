import { IconButton, Button, Box, Text, Flex } from "@radix-ui/themes";
import Card from "@/components/molecules/card";
import { useGetPreviousRullings } from "./queries/useGetPreviousRulings";

function App() {
  const { data: previousRullings, isLoading } = useGetPreviousRullings({
    staleTime: 1000 * 60,
  });

  return (
    <Flex direction="column" gap="3">
      <Text
        size="5"
        weight="light"
        style={{
          color: "var(--color-dark-gray)",
        }}
      >
        Previous Rullings
      </Text>
      {isLoading && <Text>Loading...</Text>}
      <Flex
        gap="3"
        style={{
          overflowX: "scroll",
          width: "100%",
        }}
      >
        {previousRullings?.map((rulling) => (
          <Card key={rulling.id} {...rulling} />
        ))}
      </Flex>
    </Flex>
  );
}

export default App;
