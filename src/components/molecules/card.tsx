import styled from "styled-components";
import {
  Box,
  Flex,
  IconButton,
  Card as RadixCard,
  Text,
} from "@radix-ui/themes";
import thumbsUpSvg from "@/assets/img/thumbs-up.svg";
import thumbsDownSvg from "@/assets/img/thumbs-down.svg";
import VoteActions from "./voteActions";
import { formatDistance } from "date-fns";
import { ThumbUpDown } from "../atoms/voteThumbUpDown";
import React from "react";

type StyledCardProps = {
  picture: string;
};

const StyledCard = styled(RadixCard)<StyledCardProps>`
  background-image: url(${(props) => props.picture});
  background-size: cover;
  background-position: center;
  min-width: 300px;
  max-width: 300px;
  height: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  aspect-ratio: 1 / 1;
  .rt-CardInner {
    padding: 0;
  }
  @media (min-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    height: auto;
  }
`;

const Description = styled(Text)`
  font-size: 15px;
  color: var(--color-white);
  display: -webkit-box;
  -webkit-line-clamp: 2; // Number of lines you want to display
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;

const Name = styled(Text)`
  font-size: 30px;
  color: var(--color-white);
  display: -webkit-box;
  -webkit-line-clamp: 2; // Number of lines you want to display
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;

function timeSince(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  return formatDistance(past, now, { addSuffix: true });
}

const Card = ({
  name,
  description,
  category,
  picture,
  lastUpdated,
  votes,
  id,
}: {
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: { positive: number; negative: number };
  id: string;
}) => {
  const [hasVoted, setHasVoted] = React.useState(false);
  const totalVotes = votes.positive + votes.negative;
  const positivePercentage = (votes.positive / totalVotes) * 100;
  const negativePercentage = (votes.negative / totalVotes) * 100;
  const winningVote = positivePercentage > negativePercentage ? "up" : "down";
  const srcSet = `src/assets/img/${picture}.png 750w, src/assets/img/${picture}@2x.png 1440w`;
  return (
    <StyledCard picture={`src/assets/img/${picture}.png`}>
      <Flex
        direction="column"
        gap="3"
        justify="end"
        height="100%"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
        }}
      >
        <Flex mb="-2" justify="start" align="end" pr="6">
          <ThumbUpDown
            variant={winningVote}
            style={{
              marginBottom: "4px",
            }}
          />
          <Name mb="-1">{name}</Name>
        </Flex>
        <Flex direction="column" gap="3" px="6">
          <Description>{description}</Description>
          <Flex direction="column" gap="3" align="end">
            <Text
              size="1"
              weight="medium"
              style={{
                color: "var(--color-white)",
                textTransform: "capitalize",
                marginLeft: "0.5rem",
              }}
            >
              {!hasVoted
                ? `${timeSince(lastUpdated)} in ${" "}`
                : "Thank you for your vote!"}
              {!hasVoted && <Text weight="bold">{category}</Text>}
            </Text>
            <VoteActions
              cardId={id}
              onVote={(bool) => setHasVoted(bool)}
              hasVoted={hasVoted}
            />
          </Flex>
        </Flex>
        <Flex
          align="center"
          justify="between"
          style={{
            position: "relative",
            bottom: "0",
            width: "100%",
          }}
        >
          <Text
            size="4"
            weight="medium"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-white)",
              textTransform: "capitalize",
              marginLeft: "0.5rem",
              position: "absolute",
              left: "0",
            }}
          >
            <IconButton
              style={{
                position: "relative",
                left: "0",
                width: "30px",
                height: "30px",
                backgroundColor: "transparent",
              }}
            >
              <img src={thumbsUpSvg} />
            </IconButton>
            {positivePercentage.toFixed(2)}%
          </Text>
          <Text
            size="4"
            weight="medium"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-white)",
              textTransform: "capitalize",
              marginRight: "0.5rem",
              position: "absolute",
              right: "0",
            }}
          >
            {negativePercentage.toFixed(2)}%
            <IconButton
              style={{
                position: "relative",
                left: "0",
                width: "30px",
                height: "30px",
                backgroundColor: "transparent",
              }}
            >
              <img src={thumbsDownSvg} />
            </IconButton>
          </Text>
          <Box
            style={{
              width: `${positivePercentage}%`,
              height: "36px",
              backgroundColor: "rgba(var(--color-green-positive), 0.6)",
            }}
          ></Box>
          <Box
            style={{
              width: `${negativePercentage}%`,
              height: "36px",
              backgroundColor: "rgba(var(--color-yellow-negative), 0.6)",
            }}
          ></Box>
        </Flex>
      </Flex>
    </StyledCard>
  );
};

export default Card;
