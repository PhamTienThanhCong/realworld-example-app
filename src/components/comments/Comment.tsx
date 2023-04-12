import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Textarea,
} from "@mantine/core";
import { UserProfile } from "../profile/UserProfile";
import { ArticleResponse } from "../../models/article";
import { useContext, useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { postComment } from "../../apis/comment";
import { AuthContext } from "../../context/auth";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import { CommentForm, DEFAULT_COMMENT_VALUES } from "../../models/comment";

export default function Comment({
  article,
  setArticle,
}: {
  article: ArticleResponse;
  setArticle: (article: ArticleResponse) => void;
}) {
  const auth = useContext(AuthContext);
  const { postId } = useParams<{ postId: string }>();
  const [postCommentLoading, setPostCommentLoading] = useState<boolean>(false);

  const form = useForm<CommentForm>({
    initialValues: DEFAULT_COMMENT_VALUES,
    validate: {
      body: isNotEmpty("Enter your current job"),
    },
  });

  const handleComment = async (formData: CommentForm) => {
    setPostCommentLoading(true);
    try {
      await postComment(postId || "", formData.body);
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setPostCommentLoading(false);
    }
  };

  return (
    <Container size={1200} p="2rem">
      <Divider />
      <Flex
        align="center"
        direction="column"
        wrap="wrap"
        className="user-profile-body"
      >
        <UserProfile article={article} setArticle={setArticle} />
        <Box
          mt="30px"
          component="form"
          w="100%"
          maw="500px"
          style={{ border: "1px solid #dadada", borderRadius: "5px" }}
          onSubmit={form.onSubmit(handleComment)}
        >
          <Textarea
            placeholder="Your comment"
            minRows={4}
            variant="unstyled"
            p="20px"
            pt="10px"
            size="lg"
            required
            {...form.getInputProps("body")}
            readOnly={postCommentLoading}
          />
          <Flex
            justify="space-between"
            style={{ padding: "12px 20px" }}
            bg="#f3efef"
          >
            <Avatar radius="xl" size="30px" src={auth.auth.user.image} />
            <Button
              type="submit"
              style={{ backgroundColor: "#5cb85c" }}
              size="xs"
              loading={postCommentLoading}
            >
              Post Comment
            </Button>
          </Flex>
        </Box>

        <CommentList />
      </Flex>
    </Container>
  );
}
