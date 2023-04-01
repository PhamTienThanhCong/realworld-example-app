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

function EditProfile() {
  return (
    <Container size={1100} mt="1rem">
      <Flex direction="column" align="center">
        <Title order={1} size="2.5rem" weight={400} mb="0.5rem">
          Your Settings
        </Title>
        <form
          action=""
          style={{
            width: "100%",
            maxWidth: "540px",
            marginBottom: "1rem",
          }}
        >
          <TextInput
            mb={"16px"}
            placeholder="URL of profile picture"
            name="avatar"
            withAsterisk
            required
          />
          <TextInput
            mb={"16px"}
            placeholder="Your Name"
            name="username"
            size="lg"
            withAsterisk
            required
          />
          <Textarea
            placeholder="Short bio about you"
            name="bio"
            mb={"16px"}
            size="lg"
            minRows={8}
            withAsterisk
          />
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
            placeholder="New Password"
            name="password"
            size="lg"
            withAsterisk
            required
          />
          <Box>
            <Button
              bg={process.env.REACT_APP_MAIN_COLOR}
              size="lg"
              style={{ float: "right" }}
            >
              Update Setting
            </Button>
          </Box>
        </form>
        <Box 
            w={"100%"}
            maw={"540px"}
            mb={"3rem"}
            pt={"1rem"}
            style={{ borderTop: "1px solid #e1e1e1" }}
        >
        <Button variant="outline" color="red" style={{ float: "left" }}>
            Or click here to logout.
        </Button>
        </Box>
      </Flex>
    </Container>
  );
}

export default EditProfile;
