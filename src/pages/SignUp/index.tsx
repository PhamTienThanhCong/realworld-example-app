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
import { useForm, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../apis/user";
import { RegisterUser, DEFAULT_REGISTER_USER } from "../../models/user";

function SignUp() {
  document.title = "Sign up";
  const [onSubmit, setOnSubmit] = useState(false);
  const navigate = useNavigate();
  const form = useForm<RegisterUser>({
    initialValues: DEFAULT_REGISTER_USER,

    validate: {
      username: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
      email: isEmail('Invalid email'),
      password: isNotEmpty('Password is required'),
    },
  });

  const handleSubmit = async (data:RegisterUser) => {
    
    setOnSubmit(true);
    try {
      await register(data);
      navigate("/login", { state: { message: "register success, please login to continue" } });
    } catch (error:any) {
      console.log(error);
      Object.keys(error.response.data.errors).forEach((key) => {
        form.setFieldError(key, error.response.data.errors[key][0]);
      });
    } finally {
      setOnSubmit(false);
    }
  };

  const getInputProps = (name: keyof RegisterUser) => ({
    ...form.getInputProps(name),
    mb:"16px",
    placeholder:name,
    name:name,
    size:"lg",
    required: true,
    disabled: onSubmit,
  })

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
        
        <Box component="form"
         onSubmit={form.onSubmit(handleSubmit)} 
          style={{
            width: "100%",
            maxWidth: "540px",
          }}
        >
          <TextInput
            {...getInputProps('username')}
          />
          <TextInput
            {...getInputProps('email')}
          />
          <PasswordInput
            {...getInputProps('password')}
          />
          <Button
            bg={process.env.REACT_APP_MAIN_COLOR}
            size="lg"
            style={{ float: "right" }}
            type="submit"
          >
            Sign up
          </Button>
        </Box>
      </Flex>
    </Container>
  );
}

export default SignUp;
