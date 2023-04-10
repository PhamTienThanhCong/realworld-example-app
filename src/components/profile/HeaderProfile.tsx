import { Box, Avatar, Flex, Title, Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "../web/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { getProfile, followProfile, unFollowProfile } from "../../apis/profile";
import { User } from "../../models/user";
import { DEFAULT_USER } from "../../models/user";

function HeaderProfile() {
  // get username from params
  let isMyProfile: boolean = true;
  const { username } = useParams<{ username: string }>();
  document.title = username + "";
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [actionFollow, setActionFollow] = useState<boolean>(false); // [true: flow, false: unflow
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const nav = useNavigate();

  const auth = useContext(AuthContext);

  if (username !== auth.auth.user?.username) {
    isMyProfile = false;
  }

  useEffect(() => {
    async function getUser() {
      try {
        const response: any = await getProfile(username || "");
        setIsFollowing(response.data.profile.following);
        setUser(response.data.profile);
      } catch (error) {
        nav("/404", { replace: true });
      } finally {
        setLoadingUser(false);
      }
    }
    setLoadingUser(true);
    if (isMyProfile) {
      setUser(auth.auth.user);
      setLoadingUser(false);
    } else {
      getUser();
    }
  }, [username, isMyProfile, auth.auth.user, nav]);

    const flowUser = async () => {
        if (!auth.auth.logged) return nav("/login", { replace: true });
        if (isMyProfile) {
            nav("/settings", { replace: true });
        } else {
            setActionFollow(true);
            try {
                if (isFollowing){
                    await unFollowProfile(username || "");
                    setIsFollowing(false);
                }else{
                    await followProfile(username || "");
                    setIsFollowing(true);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setActionFollow(false);
            }
        }
    };

  return (
    <Box bg="#f3f3f3" pt="2rem" pb="1rem">
      {loadingUser ? (
        <Loading heightValue="130px" sizeValue="lg" />
      ) : (
        <Flex gap="md" align="center" direction="column" wrap="wrap">
          <Avatar radius="100%" size="100px" src={user.image} />
          <Box>
            <Title order={2}>{user.username}</Title>
          </Box>
          <Box w="70%">
            <Button
              variant="outline"
              color="gray"
              size="xs"
              style={{ float: "right" }}
              onClick={() => {
                flowUser();
              }}
              disabled={actionFollow}
            >
              {isMyProfile ? (
                <>
                  <FontAwesomeIcon icon={faGear} />
                  <span style={{ marginLeft: "5px" }}> Edit Profile</span>
                </>
              ) : (
                <>
                  {isFollowing ? (
                    <>
                      <FontAwesomeIcon icon={faMinus} />
                      <span style={{ marginLeft: "5px" }}>
                        {" "}
                        UnFlow {user.username}
                      </span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPlus} />
                      <span style={{ marginLeft: "5px" }}>
                        {" "}
                        Flow {user.username}
                      </span>
                    </>
                  )}
                </>
              )}
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default HeaderProfile;
