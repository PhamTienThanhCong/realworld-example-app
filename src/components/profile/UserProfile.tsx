import {
  faHeart,
  faHeartCrack,
  faMinus,
  faPen,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Button, Group, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { ArticleResponse } from "../../models/article";
import { followProfile, unFollowProfile } from "../../apis/profile";
import { favoriteArticle, unFavoriteArticle, deleteArticle } from "../../apis/articles";
import { useContext, useState } from "react";
import "./style.css";
import { AuthContext } from "../../context/auth";
import { formatDate } from "../../Helper/TextFormat";

export function UserProfile({ article, setArticle }: { article: ArticleResponse, setArticle: (article: ArticleResponse) => void }) {
  const auth = useContext(AuthContext);
  const isMyProfile = auth.auth.user.username === article.author.username;
  const nav = useNavigate();

  const [loadingFollow, setLoadingFollow] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleFollow = async () => {
    if (!auth.auth.logged) return nav("/login");
    setLoadingFollow(true);
    if (article.author.following) {
      await unFollowProfile(article.author.username);
    } else {
      await followProfile(article.author.username);
    }
    setArticle({ ...article, author: { ...article.author, following: !article.author.following } });
    setLoadingFollow(false);
  };

  const handleFavorite = async () => {
    if (!auth.auth.logged) return nav("/login");
    setLoadingFavorite(true);
    if (article.favorited) {
      await unFavoriteArticle(article.slug);
    } else {
      await favoriteArticle(article.slug);
    }
    setArticle({ ...article, favorited: !article.favorited, favoritesCount: article.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1 });
    setLoadingFavorite(false);
  };

  const handleDeleteFavorite = async () => {
    if (!auth.auth.logged) return nav("/login");
    setLoadingDelete(true);
    await deleteArticle(article.slug);
    setLoadingDelete(false);
    nav("/");
  };
  return (
    <>
      <Box pt="2rem">
        <Box>
          <Group style={{ gap: "0.3rem" }}>
            <Link to={"/profile/" + article.author.username}>
              <Avatar
                radius="100%"
                size="32px"
                src={article.author.image}
                alt={article.author.username}
              />
            </Link>
            <div>
              <Link
                to={"/profile/" + article.author.username}
                style={{ textDecoration: "none" }}
              >
                <Text className="user-profile-name" style={{ lineHeight: 1.1 }} weight="400">
                  {article.author.username}
                </Text>
              </Link>
              <Text size="xs" color="#bbb">
                {formatDate(new Date(article.createdAt))}
              </Text>
            </div>
            {isMyProfile ? (
              // if my article
              <>
              <Button
                  className="btn-unActive"
                  ml="20px"
                  compact
                  leftIcon={<FontAwesomeIcon icon={faPen} />}
                  onClick={() => nav("/edit/" + article.slug)}
                >
                  Edit Article
                </Button>
                <Button
                  className="btn-unActive btn-red"
                  leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                  onClick={handleDeleteFavorite}
                  loading={loadingDelete}
                  compact
                >
                  delete article
                </Button>
              </>
            ) : (
              // if other article
              <>
                <Button
                  className={article.author.following ? "btn-Active" : "btn-unActive"}
                  ml="20px"
                  leftIcon={
                    <FontAwesomeIcon icon={article.author.following ? faMinus : faPlus} />
                  }
                  loading={loadingFollow}
                  onClick={handleFollow}
                  compact
                >
                  {article.author.following? "Unfollow": "Follow"} {article.author.username}
                </Button>
                <Button
                  className={
                    article.favorited ? "btn-Active-flow" : "btn-unActive-flow"
                  }
                  leftIcon={
                    <FontAwesomeIcon
                      icon={article.favorited ? faHeartCrack : faHeart}
                    />
                  }
                  loading={loadingFavorite}
                  onClick={handleFavorite}
                  compact
                >
                  {article.favorited? "Unfavorite":"Favorite"} Post({article.favoritesCount})
                </Button>
              </>
            )}
          </Group>
        </Box>
      </Box>
    </>
  );
}
