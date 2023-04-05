import { Header, Text, Flex, Container, Title, Group, Avatar } from "@mantine/core";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function HeaderMenu() {
  const auth = useContext(AuthContext).auth;

  return (
    <Header height={56} style={{ borderBottom: "none" }}>
      <Container size={1200}>
        <Flex
          mih={56}
          justify="space-between"
          align="center"
          wrap="wrap"
          pl={"1.5rem"}
          pr={"1.5rem"}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Title
              size="1.5rem"
              color={process.env.REACT_APP_MAIN_COLOR}
              style={{ cursor: "pointer" }}
            >
              conduit
            </Title>
          </Link>
          <Group>
            <NavLink to="/" className="NavLink">
              <Text>Home</Text>
            </NavLink>
            {auth.logged ? (
              <>
                <NavLink to="/login" className="NavLink">
                  <Text>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <span> New Article</span>
                  </Text>
                </NavLink>
                <NavLink to="/settings" className="NavLink">
                  <Text>
                    <FontAwesomeIcon icon={faGear} />
                    <span> Setting</span>
                  </Text>
                </NavLink>
                <NavLink to="/register" className="NavLink">
                    {/* <Avatar radius="xl" w="26px" src={auth.user.image} alt={ auth.user.username } /> */}
                    <div className="avatar-header">
                      <img className="user-image-header" src={auth.user.image} alt={ auth.user.username } />
                      <span>{ auth.user.username }</span>
                    </div>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className="NavLink">
                  <Text>Sign in</Text>
                </NavLink>
                <NavLink to="/register" className="NavLink">
                  <Text>Sign up</Text>
                </NavLink>
              </>
            )}
          </Group>
        </Flex>
      </Container>
    </Header>
  );
}
