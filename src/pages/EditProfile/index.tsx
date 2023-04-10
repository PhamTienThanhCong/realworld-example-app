import {
  Flex,
  Container,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Textarea,
  Box,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { User } from "../../models/user";
import { updateCurrentUser } from "../../apis/user";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  document.title = "Edit Profile";
  const auth = useContext(AuthContext);
  const [ onSubmit, setOnSubmit ] = useState(false);
  const navigate = useNavigate();
  const form = useForm<User>({
    initialValues: {...auth.auth.user, password: '',
    bio: auth.auth.user.bio || ''
  },
    
    validate: {
      email: isEmail('Invalid email'),
      password: isNotEmpty('Password is required'),
    },
  });

  const getInputProps = (name: keyof User) => ({
    ...form.getInputProps(name),
    mb:"16px",
    name:name,
    size:name==="image" ? "sm" : "lg",
    required: true,
    disabled: onSubmit,
  });

  const handleSubmit = async (formData:User) => {
    setOnSubmit(true);
    try {
      const newdata:any = await updateCurrentUser(formData);
      auth.changeProfile(newdata.data.user);
    } catch (error) {
      
    } finally {
      setOnSubmit(false);
    }
  }

  const onLogout = () => {
    auth.logout();
    navigate("/");
  }

  return (
    <Container size={1100} mt="1rem">
      <Flex direction="column" align="center">
        <Title order={1} size="2.5rem" weight={400} mb="0.5rem">
          Your Settings
        </Title>
        <Box
          component="form"
          style={{
            width: "100%",
            maxWidth: "540px",
            marginBottom: "1rem",
          }}
          onSubmit={form.onSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <TextInput
            {...getInputProps('image')}
            placeholder="URL of profile picture"
          />
          <TextInput
            {...getInputProps('username')}
            placeholder="Username"
          />
          <Textarea
            minRows={8}
            {...getInputProps('bio')}
            placeholder="Short bio about you"
          />
          <TextInput
            {...getInputProps('email')}
            placeholder="Email"
          />
          <PasswordInput
            {...getInputProps('password')}
            placeholder="New Password"
          />
          <Box>
            <Button
              bg={process.env.REACT_APP_MAIN_COLOR}
              size="lg"
              style={{ float: "right" }}
              type="submit"
              disabled={onSubmit}
            >
              Update Setting
            </Button>
          </Box>
        </Box>
        <Box 
            w={"100%"}
            maw={"540px"}
            mb={"3rem"}
            pt={"1rem"}
            style={{ borderTop: "1px solid #e1e1e1" }}
        >
        <Button variant="outline" color="red" style={{ float: "left" }} disabled={onSubmit} onClick={()=>{ onLogout() }} >
            Or click here to logout.
        </Button>
        </Box>
      </Flex>
    </Container>
  );
}

export default EditProfile;
