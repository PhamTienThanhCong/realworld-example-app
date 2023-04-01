import { Container, Title, Text, Box, Flex } from "@mantine/core";
import { useState } from "react";
import ItemPost from "./components/ItemPost";

import "./style.css";

export default function Home() {
  const actionInit = [
    {
      view: false,
      title: "Your Feed",
      action: false,
    },
    {
      view: true,
      title: "Global Feed",
      action: true,
    },
    {
      view: false,
      title: "# implementations",
      action: false,
    },
  ];
  const [action, setAction] = useState(actionInit);
  const handleAction = (index: number) => {
    const newAction = action.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          action: true,
        };
      } else {
        return {
          ...item,
          action: false,
        };
      }
    });
    setAction(newAction);
  };
  return (
    <>
      <Container size={1400} bg={process.env.REACT_APP_MAIN_COLOR} p="2rem">
        <Title
          order={1}
          weight={700}
          size="3.5rem"
          color="white"
          align="center"
        >
          conduit
        </Title>
        <Text size="1.5rem" color="white" align="center" weight={200}>
          A place to share your knowledge.
        </Text>
      </Container>

      <Container size={1100} mt="1rem">
        <Flex
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Box className="Box-news" w="75%" p="15px" pl={0} miw="300px">
            <Flex w="100%" gap="md"
              style={{ borderBottom: "1px solid #e6e6e6" }}
              justify="flex-start"
            >
              {action.map(
                (item, index) => item.view && (
                    <Text key={`header-${index}`}
                      className={item.action ? "Text-header header-active" : "Text-header"}
                      onClick={() => handleAction(index)}
                    >
                      {item.title}
                    </Text>
                  )
              )}
            </Flex>

            <ul className="list" >
              <ItemPost />
              <ItemPost />
              <ItemPost />
            </ul>
            <ul className="Pagination">
                {/* for 1 to 20 */}
                {Array.from({ length: 20 }, (_, i) => i + 1).map((item, index) => (
                    <li key={`pagination-${index}`} className={index === 0 ? "page page-focus":"page"}>
                        {index + 1}
                    </li>
                ))}

            </ul>

          </Box>
          <Box className="Box-tags" w="25%" p="15px" miw="150px"></Box>
        </Flex>
      </Container>
    </>
  );
}
