import { Text } from "@mantine/core";
import Loading from "../web/Loading";
import FullFeed from "./FullFeed";
import { useEffect, useState } from "react";
import { FEED_DEFAULT, Feeds, Params } from "../../pages/Home/defaultValue";
import { getFeeds, getYourFeed } from "../../apis/articles";

interface MainFeedProps {
  currentTitle: string;
  currentTag?: string;
  currentAuthor?: string;
  currentFavorited?: string;
}

function MainFeed({
  currentTitle,
  currentTag,
  currentAuthor,
  currentFavorited,
}: MainFeedProps) {
  const [listFeeds, setlistFeeds] = useState<Feeds>(FEED_DEFAULT);
  const [loadingFeed, setLoadingFeed] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setLoadingFeed(true);
    const getTagNames = async () => {
      let params: Params = {
        limit: 10,
        offset: (page - 1) * 10,
      };
      try {
        let res: any;
        if (currentTitle === "Your Feed") {
          res = await getYourFeed(page, params);
        } else {
          if (currentTag) {
            params = { ...params, tag: currentTag };
          }else if (currentAuthor) {
            params = { ...params, author: currentAuthor };
          } else if (currentFavorited) {
            params = { ...params, favorited: currentFavorited };
          }
          res = await getFeeds(page, params);
        }
        setlistFeeds(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingFeed(false);
      }
    };
    getTagNames();
  }, [page, currentTag, currentTitle, currentAuthor, currentFavorited]);
  
  return (
    <>
      {loadingFeed ? (
        <Loading heightValue="50vh" sizeValue="lg" />
      ) : // check xem có feed nào không
      listFeeds.articles?.length > 0 ? (
        <FullFeed
          data={listFeeds}
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
      )}
    </>
  );
}

export default MainFeed;
