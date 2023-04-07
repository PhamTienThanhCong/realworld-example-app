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
  interface Params {
    limit: number;
    offset: number;
    tag?: string;
  }

  interface Feeds {
    articles: any[];
    articlesCount: number;
  }

  const auth = useContext(AuthContext);

  const [Tags, setTags] = useState([]);
  const [Feeds, setFeeds] = useState<Feeds>({
    articles: [],
    articlesCount: 0,
  });
  const [page, setPage] = useState<number>(1);
  const [title, setTitle] = useState(
    auth.auth.logged ? "Your Feed" : "Global Feed"
  );
  const [tag, setTag] = useState<string>("");
  const [loadingTag, setLoadingTag] = useState<boolean>(true);
  const [loadingFeed, setLoadingFeed] = useState<boolean>(true);

  useEffect(() => {
    const getTagNames = async () => {
      try {
        const res: any = await getTags();
        setTags(res.data.tags);
      } catch (error) {
        // console.log(error);
      } finally {
        setLoadingTag(false);
      }
    };
    getTagNames();
  }, []);

  useEffect(() => {
    setLoadingFeed(true);
    const getTagNames = async () => {
      
      let params: Params = {
        limit: 10,
        offset: (page - 1) * 10,
      };
      try {
        let res: any;
        if (title === "Your Feed") {
          res = await getYourFeed(page, params);
        } else {
          // nếu có tag thì thêm trường tag vào params
          if (tag) {
            params = { ...params, tag };
          }
          res = await getFeeds(page, params);
        }
        setFeeds(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingFeed(false);
      }
    };
    getTagNames();
  }, [page, title]);

  const handleTitle = (title: string, tag?: string) => {
    setTitle(title);
    setTag(tag || "");
    setPage(1);
  };

  const getTitleProps = (page: string) => ({
    children: page,
    className: title === page ? "Text-header header-active" : "Text-header",
    onClick: () => {
      handleTitle(page);
    },
  });

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
              {/* header-active */}
              <Text
                {...getTitleProps("Your Feed")}
                style={{
                  display: auth.auth.logged === true ? "block" : "none",
                }}
              />
              <Text {...getTitleProps("Global Feed")} />
              <Text
                style={{ display: tag !== "" ? "block" : "none" }}
                {...getTitleProps(`#${tag}`)}
              />
            </Flex>
            {loadingFeed ? (
              <Loading heightValue="50vh" sizeValue="lg" />
            ) : (
              // check xem có feed nào không
              Feeds.articles.length > 0 ? (
                <FullFeed
                data={Feeds}
                setCurrentPage={setPage}
                currentPage={page}
              />
              ) : (
                <Text
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  No articles are here... yet.
                </Text>
              )
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
                    <li
                      key={`tag-${index}`}
                      className={tag === item ? "tag tag-active" : "tag"}
                      onClick={() => {
                        handleTitle(`#${item}`, item);
                      }}
                    >
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
