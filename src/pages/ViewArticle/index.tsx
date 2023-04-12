import {
  Badge,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";
import {
  ArticleResponse,
  DEFAULT_ARTICLE_RESPONSE,
} from "../../models/article";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFeed } from "../../apis/articles";
import Loading from "../../components/web/Loading";
import { UserProfile } from "../../components/profile/UserProfile";
import { AuthContext } from "../../context/auth";
import Comment from "../../components/comments/Comment";
import { convertLineToBr } from "../../Helper/TextFormat";

export default function ViewArticle() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  
  const { postId } = useParams<{ postId: string }>();
  const [article, setArticle] = useState<ArticleResponse>(
    DEFAULT_ARTICLE_RESPONSE
  );

  const [loading, setLoading] = useState<boolean>(true);

  document.title = article.title;

  useEffect(() => {
    setLoading(true);
    const getArticle = async () => {
      try {
        const response: any = await getFeed(postId || "");
        setArticle(response.data.article);
      } catch (error) {
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [navigate, postId]);

  return (
    <>
      <Container size={1400} bg="#333">
        {loading ? (
          <Loading heightValue="200px" sizeValue="md" />
        ) : (
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
            <UserProfile article={article} setArticle={setArticle} />
          </Container>
        )}
      </Container>
      {loading ? (
        <Loading heightValue="350px" sizeValue="md" />
      ) : (
        <Container size={1400}>
          <Container size={1200} p="2rem" pb="0">
            <Text size="1.2rem">{convertLineToBr(article.body)}</Text>
            <Group mt="32px">
              {article.tagList.map((tag, index) => (
                <Badge
                  key={index}
                  size="lg"
                  color="gray"
                  variant="outline"
                  style={{ textTransform: "lowercase", color: "#aaa" }}
                >
                  {tag}
                </Badge>
              ))}
            </Group>
          </Container>
          <Comment article={article} setArticle={setArticle}/>
        </Container>
      )}
    </>
  );
}
