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
import { useState } from "react";
import { REGISTER } from "../../apis/user";

function SignUp() {
  const initRegister = {
    username: "",
    email: "",
    password: "",
  };
  const [onSubmit, setOnSubmit] = useState(false);
  const [formDatas, setFormDatas] = useState(initRegister);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    setOnSubmit(true);
      try {
        const res:any = await REGISTER(formDatas)
        console.log(res);
      } catch (error:any) {
        console.log(error);
      } finally {
        setOnSubmit(false);
      }
  };

  return (
    <Container size={1100} mt="1rem" style={{ height: "calc(100vh - 132px)" }}>
      <Flex direction="column" align="center">
        <Title order={1} size="2.5rem" weight={400} mb="0.5rem">
          Sign up
        </Title>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Text mb="1rem" color={process.env.REACT_APP_MAIN_COLOR}>
            Have an account?
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
            placeholder="Username"
            name="username"
            size="lg"
            withAsterisk
            required
            disabled={onSubmit}
            value={formDatas.username}
            onChange={handleChange}
          />
          <TextInput
            mb={"16px"}
            placeholder="Email"
            name="email"
            size="lg"
            withAsterisk
            required
            disabled={onSubmit}
            value={formDatas.email}
            onChange={handleChange}
          />
          <PasswordInput
            mb={"16px"}
            placeholder="Password"
            name="password"
            size="lg"
            withAsterisk
            required
            disabled={onSubmit}
            value={formDatas.password}
            onChange={handleChange}
          />
          <Button
            bg={process.env.REACT_APP_MAIN_COLOR}
            size="lg"
            style={{ float: "right" }}
            disabled={onSubmit}
            onClick={handleSubmit}
          >
            Sign up
          </Button>
        </form>
      </Flex>
    </Container>
  );
}

export default SignUp;
