import { useState } from "react";
import HeaderProfile from "../../components/profile/HeaderProfile";
import { Box, Container, Flex, Text } from "@mantine/core";
import MainFeed from "../../components/Feeds/MainFeed";
import { useParams } from "react-router-dom";

function Profile() {
  const { username } = useParams<{ username?: string }>();
  const [title, setTitle] = useState<string>("My Articles");

  const handleTitle = (title: string) => {
    setTitle(title);
  };

  const getTitleProps = (page: string) => ({
    children: page,
    className: title === page ? "Text-header header-active" : "Text-header",
    onClick: () => {
      handleTitle(page);
    },
  });

  return (
    <Box>
      <HeaderProfile />
      <Container size={1100} mt="1rem">
        <Flex
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Box className="Box-news" w="100%" p="15px" pl={0} miw="300px">
            <Flex
              w="100%"
              gap="md"
              style={{ borderBottom: "1px solid #e6e6e6" }}
              justify="flex-start"
            >
              {/* header-active */}
              <Text {...getTitleProps(`My Articles`)} />
              <Text {...getTitleProps("Favorited Articles")} />
            </Flex>
            <MainFeed 
                currentTitle={title}
                currentAuthor={title === "My Articles" ? username : ""}
                currentFavorited={title === "Favorited Articles" ? username : ""}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Profile;
