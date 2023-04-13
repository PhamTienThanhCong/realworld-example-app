import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  Textarea,
} from "@mantine/core";
import { UserProfile } from "../profile/UserProfile";
import { ArticleResponse } from "../../models/article";
import { useContext, useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { postComment } from "../../apis/comment";
import { AuthContext } from "../../context/auth";
import CommentList from "./CommentList";
import { Link, useParams } from "react-router-dom";
import {
  CommentForm,
  CommentResponse,
  DEFAULT_COMMENT_RESPONSE,
  DEFAULT_COMMENT_VALUES,
} from "../../models/comment";

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
  const [newComment, setNewComment] = useState<CommentResponse>(
    DEFAULT_COMMENT_RESPONSE
  );

  const form = useForm<CommentForm>({
    initialValues: DEFAULT_COMMENT_VALUES,
    validate: {
      body: isNotEmpty("Enter your current job"),
    },
  });

  const handleComment = async (formData: CommentForm) => {
    setPostCommentLoading(true);
    try {
      const newComment: any = await postComment(postId || "", formData.body);
      setNewComment(newComment.data.comment);
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

        {auth.auth.logged ? (
          <>
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

            <CommentList newComment={newComment} />
          </>
        ) : (
          <Box>
            <Text size="1rem" weight={400} mt="20px">
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: process.env.REACT_APP_MAIN_COLOR,
                }}
              >
                Sign in
              </Link>{" "}
              or{" "}
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: process.env.REACT_APP_MAIN_COLOR,
                }}
              >
                Sign up
              </Link>{" "}
              to add comments on this article.
            </Text>
          </Box>
        )}
      </Flex>
    </Container>
  );
}
