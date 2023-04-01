import { Header, Text, Flex, Container, Title, Group } from "@mantine/core";
import { NavLink, Link } from "react-router-dom";
import "./style.css";

export default function HeaderMenu() {
    
  return (
    <Header height={56}>
      <Container size={1200}>
        <Flex mih={56} justify="space-between" align="center" wrap="wrap" pl={"1.5rem"} pr={"1.5rem"}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Title size="1.5rem" color={process.env.REACT_APP_MAIN_COLOR} style={{ cursor: "pointer" }}>
              conduit
            </Title>
          </Link>
          <Group>
            <NavLink to="/" className="NavLink">
                <Text>Home</Text>
            </NavLink>
            <NavLink to="/login" className="NavLink">
                <Text>Sign in</Text>
            </NavLink>
            <NavLink to="/register" className="NavLink">
                <Text>Sign up</Text>
            </NavLink>
          </Group>
        </Flex>
      </Container>
    </Header>
  );
}
