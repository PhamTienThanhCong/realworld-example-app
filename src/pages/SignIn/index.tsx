import {
  Flex,
  Container,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Box,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../apis/user";
import { useState } from "react";
import { LoginUser, DEFAULT_LOGIN_USER } from "../../models/user";
import { useForm, isNotEmpty, isEmail, hasLength } from '@mantine/form';

function SignIn() {
  const [onSubmit, setOnSubmit] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();
  const form = useForm<LoginUser>({
    initialValues: DEFAULT_LOGIN_USER,

    validate: {
      email: isEmail('Invalid email'),
      password: isNotEmpty('Password is required'),
    },
  });

  // submit the form
  const handleSubmit = async (formData:LoginUser) => {
      setOnSubmit(true);
      try {
        const res:any = await login(formData);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } catch (error) {
      } finally {
        setOnSubmit(false);
      }
  };

  const getInputProps = (name: keyof LoginUser) => ({
    ...form.getInputProps(name),
    mb:"16px",
    placeholder:name,
    name:name,
    size:"lg",
    required: true,
    disabled: onSubmit,
  });

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
        <Text mb="1rem" color="green">
          {location.state?.message}
        </Text>
        <Box
          component="form"
          style={{
            width: "100%",
            maxWidth: "540px",
          }}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            {...getInputProps('email')}
          />
          <PasswordInput
            {...getInputProps('email')}
          />
          <Button
            bg={process.env.REACT_APP_MAIN_COLOR}
            size="lg"
            style={{ float: "right" }}
            disabled={onSubmit}
          >
            Sign in
          </Button>
        </Box>
      </Flex>
    </Container>
  );
}

export default SignIn;
