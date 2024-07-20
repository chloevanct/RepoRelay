import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFilteredProjects } from "../../utils/selectors";
import { getProjectsAsync } from "../../redux/projects/projectCardThunks";
import { REQUEST_STATE } from "../../redux/requestState";
import ProjectCard from "./ProjectCard";

import {
  UnorderedList,
  ListItem,
  Flex,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";

const CARDS_PER_PAGE = 5;

// **PROBABLY ADD SORTING LOGIC HERE**

// Page navigation logic adapted from Google Gemini code (June 6, 2024).
// Query: how do I adjust my project cards to display 5 at a time with
//        multiple pages to scroll through if there's more than 5?
export default function ProjectCards() {
  const dispatch = useDispatch();
  const displayedCards = useSelector(selectFilteredProjects);
  const getProjectsStatus = useSelector((state) => state.projects.getProjects);
  const error = useSelector((state) => state.projects.error);

  const hasResults = displayedCards.length > 0;
  const maxPage = Math.ceil(displayedCards.length / CARDS_PER_PAGE);

  const [currPage, setCurrPage] = useState(1);
  const currPageCards = displayedCards.slice(
    (currPage - 1) * CARDS_PER_PAGE,
    currPage * CARDS_PER_PAGE
  );

  const pageChange = (pageNumber) => {
    setCurrPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProjectsAsync());
  }, [dispatch]);

  if (getProjectsStatus === REQUEST_STATE.PENDING) {
    return <Spinner />;
  }

  if (getProjectsStatus === REQUEST_STATE.REJECTED) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <>
      {currPageCards.length === 0 ? (
        currPage === 1 ? (
          <Text pt="20px">
            Oops! We don't have any projects matching those filters.
          </Text>
        ) : (
          setCurrPage(1)
        )
      ) : (
        <UnorderedList listStyleType="none">
          {currPageCards.map((card, index) => (
            <ListItem key={index}>
              <ProjectCard project={card} />
            </ListItem>
          ))}
        </UnorderedList>
      )}

      {hasResults && (
        <Flex align="center" justify="center">
          <Button
            variant="link"
            size="sm"
            _hover={{ textDecoration: "none" }}
            color="blue"
            padding="10px"
            fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
            onClick={() => pageChange(currPage - 1)}
            disabled={currPage <= 1}
            opacity={currPage <= 1 ? 0 : 1}
            pointerEvents={currPage <= 1 ? "none" : "auto"}
          >
            PREVIOUS
          </Button>

          <Text>
            Page {currPage} of {maxPage}
          </Text>

          <Button
            variant="link"
            size="sm"
            _hover={{ textDecoration: "none" }}
            color="blue"
            padding={["5px", "10px"]}
            fontSize={['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']}
            onClick={() => pageChange(currPage + 1)}
            disabled={currPage >= maxPage}
            opacity={currPage >= maxPage ? 0 : 1}
            pointerEvents={currPage >= maxPage ? "none" : "auto"}
          >
            NEXT
          </Button>
        </Flex>
      )}
    </>
  );
}
