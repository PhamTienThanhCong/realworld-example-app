import { Container, Title } from "@mantine/core";
import { ArticleResponse, DEFAULT_ARTICLE_RESPONSE } from "../../models/article";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFeed } from "../../apis/articles";
import Loading from "../../components/web/Loading";

export default function ViewArticle() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleResponse>(DEFAULT_ARTICLE_RESPONSE)
  const [loading, setLoading] = useState<boolean>(true);
  document.title = article.title;

  useEffect(() => {
    setLoading(true);
    const getArticle = async () => {
      try {
        const response:any = await getFeed(postId || "");
        setArticle(response.data.article);
      } catch (error) {
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    }
    getArticle();
  }, [navigate, postId])

  return (
    <>
      <Container size={1400} bg="#333">
        {loading? (
          <Loading heightValue="200px" sizeValue="md"/>
        ):(
          <Container size={1200} p="2rem">
            <Title
              order={2}
              weight={500}
              size="2.8rem"
              style={{ lineHeight: "1.1" }}
              color="white"
              align="left"
            >
              {article.title}
            </Title>

          </Container>
        )}
      </Container>
    </>
  );
}
