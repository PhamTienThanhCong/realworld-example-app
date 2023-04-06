import { Text, Button, Title } from "@mantine/core";
import { Badge } from '@mantine/core';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Feed({ feed }: { feed: any }) {
  return (
    <li className="list-item">
      {/* header */}
      <div className="box-flex">
        <div className="info-user">
          <Link to="/user">
            <img
              className="user-image"
              src={feed.author.image}
              alt={feed.author.username}
            />
          </Link>
          <div className="info">
            <Text className="name">
              <Link className="Link-to" to={`/user/${feed.author.username}`}>
                {feed.author.username}
              </Link>
            </Text>
            <Text className="date-come">
              {/* formate datetime updatedAt */}
              {
                new Date(feed.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }
            </Text>
          </div>
        </div>
        <div>
          <Button variant={feed.favorited? "filled":"outline"} color="green" size="xs" >
            <FontAwesomeIcon icon={faHeart} /> <Text size=".875rem" ml="0.2rem">{ feed.favoritesCount }</Text>
          </Button>
        </div>
      </div>
      <div className="Box-content">
        <Link to={`/feed/${feed.slug}`} className="Link-to" >
          <Title order={1} className="title-post" >
            {feed.title}
          </Title>
        </Link>
        <Text weight={300} size={"1rem"} color="#999" mt="0.3rem" mb="1rem">
          {feed.description}
        </Text>
      </div>
      <div className="box-flex">
        <Link to={`/feed/${feed.slug}`} className="Link-to link-red-more">
          Red more...
        </Link>
        <div className="list-tag">
          {
            feed.tagList.map((item: any, index: number) => (
              <Link to="/tag" className="Link-to" key={`tag-${feed.slug}-${index}`}>
                <Badge className="tag-name" ml="0.4rem" size="xs" radius="md" variant="outline">{item}</Badge>
              </Link>
            ))
          }
        </div>
      </div>
    </li>
  );
}
