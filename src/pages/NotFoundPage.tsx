import React from "react";
import { Container, Text, Button, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Flex
      h="83vh"
      align="center"
    >
      <Container size="xl">
        <Text size="xl" weight={700}>
          404 - Page not found
        </Text>
        <Text mt="xs">
          The page you are looking for could not be found.
        </Text>
        <Button
          size="lg"
          style={{ marginTop: "2rem" }}
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Go to Home
        </Button>
      </Container>
    </Flex>
  );
};

export default NotFoundPage;
