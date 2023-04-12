import { ActionIcon, Avatar, Box, Flex, Text } from "@mantine/core";
import { convertLineToBr, formatDate } from "../../Helper/TextFormat";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { CommentResponse } from "../../models/comment";

export default function CommentItem({ comment }: { comment: CommentResponse }) {
  return (
    <Box
      mt="30px"
      component="form"
      w="100%"
      maw="500px"
      style={{ border: "1px solid #dadada", borderRadius: "5px" }}
    >
      <Text p="20px">{convertLineToBr(comment.body)}</Text>
      <Flex
        justify="space-between"
        style={{ padding: "12px 20px" }}
        bg="#f3efef"
      >
        <Flex align="center">
          <Link to={`/profile/`+comment.author.username}>
            <Avatar radius="xl" display="inlineBlock" size="20px" src={comment.author.image} />
          </Link>
          <Text size=".8rem" color="#bbb" ml="3px">
            <Link
              to={`/profile/`+comment.author.username}
              style={{ textDecoration: "none", color: "#bbb" }}
            >
              user name
            </Link>{" "}
            {formatDate(new Date(comment.createdAt))}
          </Text>
        </Flex>
        <ActionIcon size="20px" variant="transparent">
          <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: "0.8rem" }} />
        </ActionIcon>
      </Flex>
    </Box>
  );
}
