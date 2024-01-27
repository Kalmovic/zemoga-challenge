import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ref, runTransaction } from "firebase/database";
import { database } from "@/firebase"; // your Firebase configuration
import { VoteVariant } from "@/components/atoms/voteThumbUpDown";
import { PreviousRullingType } from "@/queries/useGetPreviousRulings";

const incrementPositiveVote = async (
  itemId: number,
  selectedVote: VoteVariant
) => {
  const voteRef = ref(database, `data/${itemId}/votes`);
  await runTransaction(voteRef, (currentVotes) => {
    if (currentVotes) {
      return {
        ...currentVotes,
        positive:
          selectedVote === "up"
            ? currentVotes.positive + 1
            : currentVotes.positive,
        negative:
          selectedVote === "down"
            ? currentVotes.negative + 1
            : currentVotes.negative,
      };
    } else {
      return {
        positive: selectedVote === "up" ? 1 : 0,
        negative: selectedVote === "down" ? 1 : 0,
      };
    }
  });
};

export const useVoteMutation = (
  options?: Partial<
    UseMutationOptions<
      void,
      Error,
      {
        itemId: number;
        selectedVote: VoteVariant;
      }
    >
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, selectedVote }) =>
      incrementPositiveVote(itemId, selectedVote),
    ...options,
    onMutate: async ({ itemId, selectedVote }) => {
      console.log("onMutate", itemId, selectedVote);
      await queryClient.cancelQueries({
        queryKey: ["previousRullings"],
      });
      const previousRullings = queryClient.getQueryData(["previousRullings"]);
      queryClient.setQueryData(
        ["previousRullings"],
        (old: PreviousRullingType) => {
          old[itemId] = {
            ...old[itemId],
            votes: {
              ...old[itemId].votes,
              positive:
                selectedVote === "up"
                  ? old[itemId].votes.positive + 100
                  : old[itemId].votes.positive,
              negative:
                selectedVote === "down"
                  ? old[itemId].votes.negative + 100
                  : old[itemId].votes.negative,
            },
          };
          return old;
        }
      );

      return { previousRullings };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["previousRullings"], context?.previousRullings);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["previousRullings"],
      });
    },
  });
};
