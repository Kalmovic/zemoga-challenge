import { Button, Flex } from "@radix-ui/themes";
import React from "react";
import { VoteThumbUpDown } from "../atoms/voteThumbUpDown";

export const VoteActions = () => {
  const [selectedVote, setSelectedVote] = React.useState<"up" | "down" | null>(
    null
  );

  const handleVote = () => {};

  return (
    <Flex gap="3" justify="center" align="center">
      <VoteThumbUpDown onClick={setSelectedVote} />
      <Button
        disabled={!selectedVote}
        onClick={handleVote}
        style={{
          backgroundColor: "var(--color-dark-background)",
          color: "var(--color-light-gray)",
          border: "1px solid var(--color-light-gray)",
          padding: "18px 20px",
          fontSize: "15px",
          lineHeight: "normal",
        }}
      >
        Vote Now
      </Button>
    </Flex>
  );
};
