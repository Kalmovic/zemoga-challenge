import { Button, Flex } from "@radix-ui/themes";
import React from "react";
import { VoteThumbUpDown } from "@/components/atoms/VoteThumbUpDown";
import { useVoteMutation } from "@/mutations/useVote";
import { useGetPreviousRullings } from "@/queries/useGetPreviousRulings";

const VoteActions = ({
  cardId,
  onVote,
  hasVoted,
}: {
  cardId: string;
  onVote: (vote: boolean) => void;
  hasVoted: boolean;
}) => {
  const { data: previousRullings } = useGetPreviousRullings();
  const [selectedVote, setSelectedVote] = React.useState<"up" | "down" | null>(
    null
  );
  const { mutate, isPending, isSuccess, isError, isPaused, reset } =
    useVoteMutation();

  React.useEffect(() => {
    if ((isSuccess || isPending || isPaused) && !hasVoted) {
      onVote(true);
      reset();
      return;
    }
    if (isError && hasVoted) {
      onVote(false);
      reset();

      return;
    }
  }, [isPending, isSuccess, isError, isPaused, hasVoted]);

  const handleVote = () => {
    if (hasVoted) {
      onVote(false);
      return;
    }
    const itemId = previousRullings?.findIndex(
      (rulling) => rulling.id === cardId
    );
    mutate({
      itemId: itemId!,
      selectedVote: selectedVote!,
    });
  };

  return (
    <Flex gap="3" justify="center" align="center">
      {!hasVoted && <VoteThumbUpDown onClick={setSelectedVote} />}
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
        {hasVoted ? "Vote Again" : "Vote Now"}
      </Button>
    </Flex>
  );
};

export default React.memo(VoteActions);
