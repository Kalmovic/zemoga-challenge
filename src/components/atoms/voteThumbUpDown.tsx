import { Flex, IconButton } from "@radix-ui/themes";
import thumbsUpSvg from "@/assets/img/thumbs-up.svg";
import thumbsDownSvg from "@/assets/img/thumbs-down.svg";
import React from "react";

export type VoteVariant = "up" | "down";

export function ThumbUpDown(props: {
  variant: VoteVariant;
  onClick?: (variant: VoteVariant) => void;
  style?: React.CSSProperties;
}) {
  return (
    <IconButton
      variant="solid"
      onClick={() => props.onClick?.(props.variant)}
      style={{
        boxSizing: "content-box",
        width: "30px",
        height: "30px",
        backgroundColor:
          props.variant === "up"
            ? "rgba(var(--color-green-positive), 0.8)"
            : "rgba(var(--color-yellow-negative), 0.8)",
        ...props.style,
      }}
    >
      <img src={props.variant === "up" ? thumbsUpSvg : thumbsDownSvg} />
    </IconButton>
  );
}

export function VoteThumbUpDown(props: {
  onClick: (variant: VoteVariant) => void;
}) {
  const [selectedVote, setSelectedVote] = React.useState<"up" | "down" | null>(
    null
  );
  return (
    <Flex gap="3" justify="center" align="center">
      <ThumbUpDown
        variant="up"
        onClick={() => {
          setSelectedVote("up");
          props.onClick("up");
        }}
        style={{
          border:
            selectedVote === "up" ? "2px solid var(--color-white)" : "none",
        }}
      />
      <ThumbUpDown
        variant="down"
        onClick={() => {
          setSelectedVote("down");
          props.onClick("down");
        }}
        style={{
          border:
            selectedVote === "down" ? "2px solid var(--color-white)" : "none",
        }}
      />
    </Flex>
  );
}
