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
import { LOGIN } from "../../apis/user";
import { useState } from "react";

function SignIn() {
  const [onSubmit, setOnSubmit] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [formDatas, setFormDatas] = useState({
    email: "",
    password: "",
  });

  // console.log(loginError);

  // change the value of the input
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });
  };

  // submit the form
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoginError("");
    let error = "";
    if (formDatas.email.trim() === "") error = "Email is not blank";
    if (formDatas.password.trim() === "") error = "Password is not blank";
    if (!formDatas.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      error = "Invalid email";
    }
    setLoginError(error);
    if (!error){
      setOnSubmit(true);

      try {
        const res:any = await LOGIN(formDatas);
        localStorage.setItem("token", res.data.token);
      } catch (error) {
        setLoginError("Invalid email or password");
      } finally {
        setOnSubmit(false);
      }
    }
  };

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

        {loginError && (
          <Text mb="1rem" color="#b85c5c" weight={500}>
            {loginError}
          </Text>
        )}

        <form
          action=""
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "540px",
          }}
          method="POST"
        >
          <TextInput
            mb={"16px"}
            placeholder="Email"
            name="email"
            size="lg"
            withAsterisk
            required
            value={formDatas.email}
            onChange={handleChange}
            disabled={onSubmit}
          />
          <PasswordInput
            mb={"16px"}
            placeholder="Password"
            name="password"
            size="lg"
            withAsterisk
            required
            value={formDatas.password}
            onChange={handleChange}
            disabled={onSubmit}
          />
          <Button
            bg={process.env.REACT_APP_MAIN_COLOR}
            size="lg"
            style={{ float: "right" }}
            disabled={onSubmit}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </form>
      </Flex>
    </Container>
  );
}

export default SignIn;
