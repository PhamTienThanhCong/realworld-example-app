import {
    Flex,
    Container,
    Title,
    Text,
  } from "@mantine/core";
  import { useEffect, useState } from "react";
  import { Article, DEFAULT_ARTICLE } from "../../models/article";
  import { createArticle } from "../../apis/articles";
import FormArticle from "../../components/FormArticle";
  
  function NewArticle() {
    document.title = "New Article";
    const [noti, setNoti] = useState<string>('');
    const [onSubmit, setOnSubmit] = useState(false);
    const [article, setArticle] = useState<Article>(DEFAULT_ARTICLE);

    const handleSubmit = async (formData:Article) => {
      setOnSubmit(true);
      try {
        await createArticle(formData);
        setNoti('Create article success');
      } catch (error) {
        console.log(error);
      } finally {
        setOnSubmit(false);
      }
    };

    // đợi 5s thì xóa noti
    useEffect(() => {
      if (noti) {
        setTimeout(() => {
          setNoti('');
        }, 5000);
      }
    }, [noti]);
  
    return (
      <Container mt="1rem">
        <Flex direction="column" align="center">
        <Title order={1} size="2.5rem" weight={400} mb="0.5rem">
          New Article
        </Title>
        <Text size="lg" mb="1rem" color="green">
          {noti}
        </Text>
        <FormArticle article={article} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
        </Flex>
      </Container>
    );
  }
  
  export default NewArticle;
  