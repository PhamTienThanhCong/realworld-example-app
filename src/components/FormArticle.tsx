import {
  Box,
  Button,
  MultiSelect,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getTags } from "../apis/tags";
import { isNotEmpty, useForm } from "@mantine/form";
import { Article, DEFAULT_ARTICLE } from "../models/article";

export default function FormArticle({
  article,
  handleSubmit,
  onSubmit,
}: {
  article: Article;
  onSubmit: boolean;
  handleSubmit: (formData: Article) => void;
}) {
  const [dataTag, setDataTag] = useState([]);

  const form = useForm<Article>({
    initialValues: { ...DEFAULT_ARTICLE },
    validate: {
      title: isNotEmpty("Title is required"),
      description: isNotEmpty("Description is required"),
      body: isNotEmpty("Body is required"),
      tagList: isNotEmpty("Tag is required"),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getTags();
      setDataTag(data.data.tags);
    };
    fetchData();
  }, []);

  useEffect(() => {
    form.setValues(article);
  }, [article]);

  const getInputProps = (name: keyof Article) => ({
    ...form.getInputProps(name),
    mb: "16px",
    name: name,
    size: name === "description" ? "sm" : "lg",
    required: true,
    disabled: onSubmit,
  });

  useEffect(() => {
    if (onSubmit === false) {
      if (article === DEFAULT_ARTICLE) {
        console.log("DEFAULT_ARTICLE");
        form.setValues({ ...DEFAULT_ARTICLE, tagList: [] });
      }
    }
  }, [article, onSubmit]);

  return (
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
      <TextInput {...getInputProps("title")} placeholder="Article Title" />
      <TextInput
        {...getInputProps("description")}
        placeholder="what's this article about?"
      />
      <Textarea
        minRows={8}
        {...getInputProps("body")}
        placeholder="Write your article (in markdown)"
      />
      <MultiSelect
        {...form.getInputProps("tagList")}
        data={dataTag}
        searchable
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
  );
}
