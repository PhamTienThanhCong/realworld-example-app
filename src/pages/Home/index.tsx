import { Container, Title, Text, Box, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import FullFeed from "../../components/Feeds/FullFeed";
import Loading from "../../components/web/Loading";
import { getTags } from "../../apis/tags";
import { getFeeds, getYourFeed } from "../../apis/feeds";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

import "./style.css";

export default function Home() {
  const auth = useContext(AuthContext);

  const actionInit = [
    {
      view: auth.auth.logged,
      title: "Your Feed",
      action: auth.auth.logged,
    },
    {
      view: true,
      title: "Global Feed",
      action: !auth.auth.logged,
    },
    {
      view: false,
      title: "# implementations",
      action: false,
    },
  ];

  const [action, setAction] = useState(actionInit);
  const [Tags, setTags] = useState([]);
  const [Feeds, setFeeds] = useState([]);
  const [page, setPage] = useState<number>(1);

  const [loadingTag, setLoadingTag] = useState<boolean>(true);
  const [loadingFeed, setLoadingFeed] = useState<boolean>(true);

  
  useEffect(() => {
    const getTagNames = async () => {
      try {
        const res: any = await getTags();
        setTags(res.data.tags);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingTag(false);
      }
    };
    getTagNames();
  }, []);

  useEffect(() => {
    setLoadingFeed(true);
    const getTagNames = async () => {
      try {
        let res: any;
        if (action[0].action) { 
          res = await getYourFeed(page);
        } else if (action[2].action) {
          res = await getFeeds(page);
        } else{
          res = await getFeeds(page);
        }
        setFeeds(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingFeed(false);
      }
    };
    getTagNames();
  }, [page, action]);

  const handleAction = (index: number) => {
    setPage(1);
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
          <Box className="Box-news" w="73%" p="15px" pl={0} miw="300px">
            <Flex
              w="100%"
              gap="md"
              style={{ borderBottom: "1px solid #e6e6e6" }}
              justify="flex-start"
            >
              {action.map(
                (item, index) =>
                  item.view && (
                    <Text
                      key={`header-${index}`}
                      className={
                        item.action
                          ? "Text-header header-active"
                          : "Text-header"
                      }
                      onClick={() => handleAction(index)}
                    >
                      {item.title}
                    </Text>
                  )
              )}
            </Flex>
            {loadingFeed ? (
              <Loading heightValue="50vh" sizeValue="lg" />
            ) : (
              <FullFeed
                data={Feeds}
                setCurrentPage={setPage}
                currentPage={page}
              />
            )}
          </Box>
          <Box className="Box-tags" w="25%" p="15px" miw="150px">
            <div className="PopularTags">
              <Text color="#373a3c" size="1rem">
                Popular Tags
              </Text>
              <ul className="list-tag">
                {loadingTag ? (
                  <Loading heightValue="30vh" sizeValue="lg" />
                ) : (
                  Tags.map((item, index) => (
                    <li key={`tag-${index}`} className="tag">
                      <Text>{item}</Text>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
