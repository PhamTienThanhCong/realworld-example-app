import {
  Flex,
  Container,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <Container size={1100} mt="1rem" style={{ height: "calc(100vh - 132px)" }}>
      <Flex direction="column" align="center">
        <Title order={1} size="2.5rem" weight={400} mb="0.5rem">
          Sign in
        </Title>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Text mb="1rem" color={process.env.REACT_APP_MAIN_COLOR}>
            Need an account?
          </Text>
        </Link>
        <form
          action=""
          style={{
            width: "100%",
            maxWidth: "540px",
          }}
        >
          <TextInput
            mb={"16px"}
            placeholder="Email"
            name="email"
            size="lg"
            withAsterisk
            required
          />
          <PasswordInput
            mb={"16px"}
            placeholder="Password"
            name="password"
            size="lg"
            withAsterisk
            required
          />
          <Button
            bg={process.env.REACT_APP_MAIN_COLOR}
            size="lg"
            style={{ float: "right" }}
          >
            Sign in
          </Button>
        </form>
      </Flex>
    </Container>
  );
}

export default SignIn;
