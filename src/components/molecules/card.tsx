import React from "react";
import { formatDistance } from "date-fns";
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
import VoteActions from "@/components/molecules/VoteActions";
import { ThumbUpDown } from "@/components/atoms/VoteThumbUpDown";
import { useMediaQuery } from "usehooks-ts";

type StyledCardProps = {
  picture: string;
  mode?: "grid" | "list";
};

const StyledCard = styled(RadixCard)<StyledCardProps>`
  background-image: url(${(props) => props.mode === "grid" && props.picture});
  background-size: cover;
  background-position: center;
  min-width: 300px;
  max-width: 300px;
  height: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  aspect-ratio: ${(props) => (props.mode === "grid" ? 1 / 1 : null)};
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;

const Name = styled(Text)`
  font-size: 30px;
  color: var(--color-white);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  @media (min-width: 767px) {
    -webkit-line-clamp: 1;
  }
`;

function timeSince(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  return formatDistance(past, now, { addSuffix: true });
}

type CardPropsType = {
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: { positive: number; negative: number };
  id: string;
  mode?: "grid" | "list";
};

const Card = ({
  name,
  description,
  category,
  picture,
  lastUpdated,
  votes,
  id,
  mode,
}: CardPropsType) => {
  const [hasVoted, setHasVoted] = React.useState(false);
  const totalVotes = votes.positive + votes.negative;
  const positivePercentage = (votes.positive / totalVotes) * 100;
  const negativePercentage = (votes.negative / totalVotes) * 100;
  const winningVote = positivePercentage > negativePercentage ? "up" : "down";
  const srcSet = `src/assets/img/${picture}.png 750w, src/assets/img/${picture}@2x.png 1440w`;
  const isTablet = useMediaQuery("(max-width: 880px) and (min-width: 768px)");

  return (
    <StyledCard picture={`src/assets/img/${picture}.png`} mode={mode}>
      {mode === "list" && (
        <img
          srcSet={srcSet}
          alt=""
          style={{
            height: "100%",
            transform: "scale(1.2)",
            objectFit: "contain",
            objectPosition: "end",
            position: "absolute",
            backgroundColor: "black",
            top: "0",
            left: "0",
          }}
        />
      )}
      <Flex
        direction="column"
        gap={mode === "list" ? "0" : "3"}
        justify="end"
        height="100%"
        style={{
          position: "relative",
          background:
            mode === "list"
              ? `linear-gradient(to right, rgba(0, 0, 0, 0.00) ${
                  isTablet ? 0 : 4
                }%, #888 ${
                  isTablet ? 18 : 14
                }.79%, #666 50%, rgba(51, 51, 51, 0.60) 71.88%)`
              : "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
        }}
      >
        <Flex direction={mode === "list" ? "row" : "column"}>
          {mode === "list" ? (
            <Flex>
              <ThumbUpDown variant={winningVote} />
              <Flex
                direction="column"
                gap={mode === "list" ? "4" : "1"}
                justify="start"
                align="start"
                pr="6"
                style={{
                  marginLeft: mode === "list" ? "150px" : "0",
                }}
              >
                <Name mb="-1" aria-label="Card Name">
                  {name}
                </Name>
                <Description aria-label="Card Description">
                  {description}
                </Description>
              </Flex>
            </Flex>
          ) : (
            <Flex direction="column">
              <Flex align="end">
                <ThumbUpDown
                  variant={winningVote}
                  style={{
                    marginBottom: "4px",
                  }}
                />
                <Name mb="-1" aria-label="Card Name">
                  {name}
                </Name>
              </Flex>
              <Flex px="6">
                <Description aria-label="Card Description">
                  {description}
                </Description>
              </Flex>
            </Flex>
          )}
          <Flex
            direction="column"
            gap="3"
            align="end"
            px="6"
            mt="2"
            style={{
              justifyContent: mode === "list" ? "space-between" : "initial",
            }}
          >
            <Text
              size="1"
              weight="medium"
              style={{
                color: "var(--color-white)",
                textTransform: "capitalize",
                marginLeft: "0.5rem",
                minWidth: "150px",
              }}
              aria-label="info"
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
            marginTop: mode === "list" ? "20px" : "0",
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
            aria-label="Positive Percentage"
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
              <img src={thumbsUpSvg} alt="thumb-up" />
            </IconButton>
            {positivePercentage.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
            %
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
            aria-label="Negative Percentage"
          >
            {negativePercentage.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
            %
            <IconButton
              style={{
                position: "relative",
                left: "0",
                width: "30px",
                height: "30px",
                backgroundColor: "transparent",
              }}
            >
              <img src={thumbsDownSvg} alt="thumb-down" />
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
