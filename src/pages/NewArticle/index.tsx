import {
    Flex,
    Container,
    Title,
    TextInput,
    Button,
    Textarea,
    Box,
    MultiSelect,
    Text,
  } from "@mantine/core";
  import { useEffect, useState } from "react";
  import { useForm, isNotEmpty } from '@mantine/form';
  import { Article, DEFAULT_ARTICLE } from "../../models/article";
  import { getTags } from "../../apis/tags";
  import { createArticle } from "../../apis/articles";
  
  function NewArticle() {
    const [dataTag, setDataTag] = useState([]);
    const [loadingTags, setLoadingTags] = useState<boolean>(true);
    const [noti, setNoti] = useState<string>('');
    const [onSubmit, setOnSubmit] = useState(false);

    const form = useForm<Article>({
      initialValues: {...DEFAULT_ARTICLE},
      validate: {
        title: isNotEmpty('Title is required'),
        description: isNotEmpty('Description is required'),
        body: isNotEmpty('Body is required'),
        tagList: isNotEmpty('Tag is required'),
      }
    });

    // use effect
    useEffect(() => {
      const fetchData = async () => {
        const data:any = await getTags();
        setDataTag(data.data.tags);
        setLoadingTags(false);
      };
      fetchData();
    }, []);

    const getInputProps = (name: keyof Article) => ({
      ...form.getInputProps(name),
      mb:"16px",
      name:name,
      size:name==="description" ? "sm" : "lg",
      required: true,
      disabled: onSubmit,
    });

    const handleSubmit = async (formData:Article) => {
      setOnSubmit(true);
      try {
        await createArticle(formData);
        setNoti('Create article success');
        form.reset();
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
          <Box
            component="form"
            style={{
              width: "100%",
              maxWidth: "740px",
              marginBottom: "2rem",
            }}
            onSubmit={form.onSubmit((data) => {
              handleSubmit(data);
            })}
          >
            <TextInput
              {...getInputProps('title')}
              placeholder="Article Title"
            />
            <TextInput
              {...getInputProps('description')}
              placeholder="what's this article about?"
            />
            <Textarea
              minRows={8}
              {...getInputProps('body')}
              placeholder="Write your article (in markdown)"
            />
             <MultiSelect
              {...form.getInputProps('tagList')}
              data={dataTag}
              searchable
              disabled={loadingTags}
              placeholder="Enter tags"
              mb={"16px"}
            />
            
            <Box>
              <Button
                bg={process.env.REACT_APP_MAIN_COLOR}
                size="lg"
                style={{ float: "right" }}
                type="submit"
                disabled={onSubmit}
              >
                Push Article
              </Button>
            </Box>
          </Box>
        </Flex>
      </Container>
    );
  }
  
  export default NewArticle;
  